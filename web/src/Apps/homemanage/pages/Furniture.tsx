import React, { useEffect, useState } from 'react';
import { FormControl, FormHelperText, Select, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../../util/Nui';
import { useAlert, useAppColor, hexAlpha } from '../../../hooks';
import { Modal } from '../../../components';
import FurnitureItem from '../components/Furniture';

interface Props { property: any; onRefresh: () => void; myKey: any; editMode?: boolean; onEditModeToggle?: () => void; addingFurniture?: boolean; onAddFurnitureClose?: () => void; }

const FurniturePage: React.FC<Props> = ({ property, onRefresh, myKey, editMode, onEditModeToggle, addingFurniture, onAddFurnitureClose }) => {
  const showAlert = useAlert();
  const T = useAppColor('homemanage');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T10 = hexAlpha(T, 0.1);

  const [furniture, setFurniture] = useState<any[]>([]);
  const [cats, setCats] = useState<any>({});
  const [catalog, setCatalog] = useState<any>({});
  const [err, setErr] = useState<string | null>('Must be inside property');
  const [expanded, setExpanded] = useState<number>(-1);
  const [selectedCat, setSelectedCat] = useState<string>('misc');

  // Driven by header buttons
  const choosing = addingFurniture ?? false;
  const setChoosing = (val: boolean) => { if (!val) onAddFurnitureClose?.(); };

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const mockFurniture = [
      { id: 'furn_001', name: 'Sofa', model: 'prop_couch_01', cat: 'living', dist: 1.2 },
      { id: 'furn_002', name: 'Coffee Table', model: 'prop_table_03', cat: 'living', dist: 2.4 },
      { id: 'furn_003', name: 'Bed Frame', model: 'prop_bed_02', cat: 'bedroom', dist: 5.1 },
      { id: 'furn_004', name: 'Wardrobe', model: 'prop_wardrobe_01', cat: 'bedroom', dist: 6.0 },
      { id: 'furn_005', name: 'Dining Table', model: 'prop_dining_table_01', cat: 'dining', dist: 3.8 },
      { id: 'furn_006', name: 'Bookshelf', model: 'prop_shelf_01', cat: 'misc', dist: 4.5 },
    ];
    const mockCatalog: Record<string, any> = {
      prop_couch_01: { name: 'Sofa', model: 'prop_couch_01', cat: 'living', id: 1 },
      prop_couch_02: { name: 'L-Shape Sofa', model: 'prop_couch_02', cat: 'living', id: 2 },
      prop_table_03: { name: 'Coffee Table', model: 'prop_table_03', cat: 'living', id: 3 },
      prop_table_04: { name: 'Side Table', model: 'prop_table_04', cat: 'living', id: 4 },
      prop_bed_02: { name: 'Bed Frame', model: 'prop_bed_02', cat: 'bedroom', id: 5 },
      prop_bed_03: { name: 'King Bed', model: 'prop_bed_03', cat: 'bedroom', id: 6 },
      prop_wardrobe_01: { name: 'Wardrobe', model: 'prop_wardrobe_01', cat: 'bedroom', id: 7 },
      prop_dining_table_01: { name: 'Dining Table', model: 'prop_dining_table_01', cat: 'dining', id: 8 },
      prop_dining_chair_01: { name: 'Dining Chair', model: 'prop_dining_chair_01', cat: 'dining', id: 9 },
      prop_shelf_01: { name: 'Bookshelf', model: 'prop_shelf_01', cat: 'misc', id: 10 },
      prop_lamp_01: { name: 'Floor Lamp', model: 'prop_lamp_01', cat: 'misc', id: 11 },
      prop_rug_01: { name: 'Area Rug', model: 'prop_rug_01', cat: 'misc', id: 12 },
    };
    const mockCats = {
      living: { name: 'Living Room' },
      bedroom: { name: 'Bedroom' },
      dining: { name: 'Dining Room' },
      misc: { name: 'Miscellaneous' },
    };
    setFurniture(mockFurniture);
    setCatalog(mockCatalog);
    setCats(mockCats);
    setErr(null);
  }, []);

  const handleClick = (index: number) => () => setExpanded(expanded === index ? -1 : index);
  const handleFurnitureChoose = (model: string) => { setChoosing(false); placeFurniture(selectedCat, model); };

  // Sync edit mode toggle from header
  const prevEditMode = React.useRef(editMode);
  React.useEffect(() => {
    if (editMode !== prevEditMode.current) {
      prevEditMode.current = editMode;
      Nui.send('Home:EditMode');
    }
  }, [editMode]);

  const placeFurniture = async (category: string, model: string) => {
    try {
      const res = await (await Nui.send('Home:PlaceFurniture', { category, model })).json();
      if (!res) showAlert('Unable to Start Placement');
    } catch { showAlert('Unable to Start Placement'); }
  };

  const findFurniture = async (id: any) => {
    try {
      const res = await (await Nui.send('Home:HighlightFurniture', { id })).json();
      if (res) showAlert('Furniture is Highlighted'); else showAlert('Unable to Find Furniture');
    } catch { showAlert('Unable to Find Furniture'); }
  };

  const editFurniture = async (id: any) => {
    try {
      const res = await (await Nui.send('Home:EditFurniture', { id })).json();
      if (!res) showAlert('Unable to Edit Furniture');
    } catch { showAlert('Unable to Edit Furniture'); }
  };

  const deleteFurniture = async (id: any) => {
    try {
      const res = await (await Nui.send('Home:DeleteFurniture', { id })).json();
      if (res) { showAlert('Furniture Deleted'); setFurniture(res); } else showAlert('Unable to Delete Furniture');
    } catch { showAlert('Unable to Delete Furniture'); }
  };

  const emptyMsg: React.CSSProperties = { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: "'Oswald', sans-serif", fontSize: 14 };

  if (!myKey?.Permissions?.furniture && !myKey?.Owner) {
    return <div style={{ height: '100%', background: '#0a0c10', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}><div style={emptyMsg}>Invalid Permissions</div></div>;
  }

  return (
    <div style={{ height: '100%', background: '#0a0c10', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {err != null || !furniture
        ? <div style={emptyMsg}>{err}</div>
        : <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* List */}
            <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
              {furniture.sort((a: any, b: any) => a.dist - b.dist).map((f: any, i: number) => (
                <FurnitureItem key={i} index={i} expanded={expanded} onClick={handleClick(i)} onEdit={editFurniture} onFind={findFurniture} onClone={placeFurniture} onDelete={deleteFurniture} furniture={f} />
              ))}
            </div>
          </div>
      }

      <Modal open={choosing} title="Place New Item" onClose={() => setChoosing(false)} appColor={T}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 12 }}><i>You can browse through a category once in placement mode by using your arrow keys!</i></p>
        <FormControl style={{ marginBottom: 20, width: '100%' }}>
          <Select
            value={selectedCat}
            onChange={(e: any) => setSelectedCat(e.target.value)}
            sx={{
              color: '#fff', background: 'rgba(255,255,255,0.03)', borderRadius: '8px',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: hexAlpha(T, 0.3) },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: hexAlpha(T, 0.6) },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: T },
              '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.4)' },
            }}
          >
            {Object.keys(cats).map((c: string) => <MenuItem key={c} value={c}>{cats[c].name}</MenuItem>)}
          </Select>
          <FormHelperText sx={{ color: 'rgba(255,255,255,0.35)' }}>Select a Category</FormHelperText>
        </FormControl>
        <div style={{ maxHeight: 300, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
          {Object.keys(catalog).filter((m: string) => catalog[m].cat === selectedCat).sort((a: string, b: string) => catalog[a].id - catalog[b].id).map((m: string) => (
            <div
              key={m}
              onClick={() => handleFurnitureChoose(m)}
              style={{ padding: '10px 12px', borderBottom: `1px solid ${T10}`, cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T20)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
            >
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, color: '#fff' }}>{catalog[m].name}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{catalog[m].model}</div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default FurniturePage;
