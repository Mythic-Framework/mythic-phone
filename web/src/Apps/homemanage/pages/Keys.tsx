import React, { useState } from 'react';
import { TextField, Select, OutlinedInput, FormControl, MenuItem, InputLabel, Checkbox, ListItemText, FormHelperText } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat as NumberFormat } from 'react-number-format';
import { Loader, Modal } from '../../../components';
import DigiKey from '../components/DigiKey';
import { useAlert, useAppColor, hexAlpha } from '../../../hooks';
import Nui from '../../../util/Nui';

const propertyPermissions = [
  { value: 'upgrade', name: 'Manage Upgrades' },
  { value: 'furniture', name: 'Manage Furniture' },
];

interface Props { property: any; onRefresh: () => void; myKey: any; issuingKey?: boolean; onIssueKeyClose?: () => void; }

const Keys: React.FC<Props> = ({ property, onRefresh, myKey, issuingKey, onIssueKeyClose }) => {
  const showAlert = useAlert();
  const T = useAppColor('homemanage');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);

  const [loading, setLoading] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<any>({});
  const [key, setKey] = useState<any>({});

  // Sync external open trigger from header button
  const creating = issuingKey ?? false;
  const setCreating = (val: boolean) => { if (!val) onIssueKeyClose?.(); };

  const inputSx = {
    mb: '15px', width: '100%',
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255,255,255,0.03)', borderRadius: '8px',
      '& fieldset': { borderColor: hexAlpha(T, 0.3) },
      '&:hover fieldset': { borderColor: hexAlpha(T, 0.6) },
      '&.Mui-focused fieldset': { borderColor: T },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: T },
    '& .MuiInputBase-input': { color: '#fff' },
    '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: 'rgba(255,255,255,0.3)' },
  };

  const onAdd = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await (await Nui.send('Home:CreateDigiKey', { updating: key?.updating, id: property.id, target: +key?.target, permissions })).json();
      if (!res.error) {
        showAlert(key?.updating ? 'DigiKey Has Been Updated' : 'New DigiKey Has Been Issued');
        setCreating(false);
        onRefresh();
      } else {
        const msgs: Record<number, string> = { 1: 'Error Occured', 2: 'Invalid Property', 3: 'Not Allowed', 4: 'Invalid Target Player', 5: 'Invalid Target Character', 6: 'Person Already Has DigiKey', 7: 'Error Issuing DigiKey' };
        showAlert(msgs[res.code] ?? 'Error');
      }
    } catch { showAlert('Unable to Create DigiKey'); }
    setLoading(false);
  };

  const onStartUpdate = (data: any) => {
    setPermissions(data.Permissions ?? {});
    setKey({ updating: true, target: data.SID });
    setCreating(true);
  };

  return (
    <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowX: 'hidden', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
        {Object.keys(property.keys).sort((a: string, b: string) => property.keys[b].Owner - property.keys[a].Owner).map((k: string) => {
          const data = property.keys[k];
          return <DigiKey key={k} property={property} data={data} canRevoke={myKey.Owner && !data.Owner} onRefresh={onRefresh} onUpdate={() => onStartUpdate(data)} />;
        })}
      </div>

      {myKey.Owner && (
        <Modal form formStyle={{ position: 'relative' }} disabled={loading} open={creating} title={key?.updating ? 'Update DigiKey' : 'Create New DigiKey'} onAccept={onAdd} onClose={() => setCreating(false)} submitLang={key?.updating ? 'Update' : 'Create'} appColor={T}>
          <>
            {loading && <Loader static text={key?.updating ? 'Updating DigiKey' : 'Creating DigiKey'} />}
            <NumberFormat
              fullWidth required label="Target State ID" name="target" type="tel"
              valueIsNumericString customInput={TextField}
              disabled={loading || key?.updating}
              sx={inputSx}
              value={key.target}
              onChange={(e: any) => setKey({ ...key, [e.target.name]: e.target.value })}
            />
            <FormControl fullWidth sx={{ mb: '15px' }}>
              <InputLabel sx={{ color: 'rgba(255,255,255,0.4)', '&.Mui-focused': { color: T } }}>Permissions</InputLabel>
              <Select
                disabled={loading}
                value={Object.keys(permissions)}
                multiple
                input={<OutlinedInput fullWidth label="Permissions" />}
                renderValue={(selected: any) => selected.map((k: string) => propertyPermissions.find(p => p.value === k)?.name ?? k).join(', ')}
                onChange={(e: any) => { const t: any = {}; e.target.value.map((p: string) => { t[p] = true; }); setPermissions(t); }}
                sx={{
                  color: '#fff', background: 'rgba(255,255,255,0.03)', borderRadius: '8px',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: hexAlpha(T, 0.3) },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: hexAlpha(T, 0.6) },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: T },
                  '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.4)' },
                }}
              >
                {propertyPermissions.map(p => (
                  <MenuItem key={p.value} value={p.value}>
                    <Checkbox checked={Object.keys(permissions).indexOf(p.value) > -1} />
                    <ListItemText primary={p.name} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: 'rgba(255,255,255,0.35)' }}>Select Permissions</FormHelperText>
            </FormControl>
          </>
        </Modal>
      )}
    </div>
  );
};

export default Keys;
