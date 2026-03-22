import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { throttle } from 'lodash';
import Nui from '../../util/Nui';
import { Loader, Confirm } from '../../components';
import MyHouse from './MyHouse';
import Select from './Select';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';

// ── Themed icon button with left-side tooltip ─────────────────────────────────
interface HdrBtnProps {
  icon: any;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  danger?: boolean;
  spin?: boolean;
  T: string;
}

const HdrBtn: React.FC<HdrBtnProps> = ({ icon, label, onClick, disabled, active, danger, spin, T }) => {
  const [hov, setHov] = useState(false);
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const color = danger
    ? (hov ? '#e05a5a' : 'rgba(224,90,90,0.5)')
    : active
    ? T
    : (hov ? T : 'rgba(255,255,255,0.45)');
  const border = danger
    ? (hov ? 'rgba(224,90,90,0.5)' : 'rgba(224,90,90,0.2)')
    : (hov ? T50 : hexAlpha(T, 0.2));
  const bg = danger
    ? (hov ? 'rgba(224,90,90,0.1)' : 'transparent')
    : active
    ? T20
    : (hov ? T20 : 'transparent');

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        onClick={() => !disabled && onClick()}
        style={{
          width: 30, height: 30,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 6,
          border: `1px solid ${disabled ? 'rgba(255,255,255,0.08)' : border}`,
          background: disabled ? 'transparent' : bg,
          color: disabled ? 'rgba(255,255,255,0.2)' : color,
          fontSize: 13, cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.15s',
        }}
      >
        <FontAwesomeIcon icon={icon} className={spin ? 'fa-spin' : ''} />
      </div>

      {/* Tooltip — floats to the LEFT of the button */}
      {hov && !disabled && (
        <div style={{
          position: 'absolute',
          top: '50%',
          right: 'calc(100% + 10px)',
          transform: 'translateY(-50%)',
          zIndex: 99999,
          whiteSpace: 'nowrap',
          backgroundColor: 'rgb(8,10,14)',
          backgroundImage: `linear-gradient(90deg, ${hexAlpha(T, 0.35)} 0%, rgba(8,10,14,1) 100%)`,
          border: `1px solid ${T50}`,
          borderRadius: 8,
          padding: '8px 16px',
          fontFamily: "'Oswald', sans-serif",
          fontSize: 13,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: danger ? '#e05a5a' : T,
          boxShadow: `0 4px 16px rgba(0,0,0,0.6)`,
          pointerEvents: 'none',
        }}>
          {/* Arrow pointing right toward the button */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: -5,
            transform: 'translateY(-50%) rotate(45deg)',
            width: 8, height: 8,
            backgroundColor: 'rgb(8,10,14)',
            border: `1px solid ${T50}`,
            borderBottom: 'none', borderLeft: 'none',
          }} />
          {label}
        </div>
      )}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const HomemanageIndex: React.FC = () => {
  const dispatch = useDispatch();
  const showAlert = useAlert();
  const T = useAppColor('homemanage');
  const T25 = hexAlpha(T, 0.25);
  const T35 = hexAlpha(T, 0.35);
  const selected = useSelector((state: any) => state.home.selected);
  const myProperties = useSelector((state: any) => state.data.data.myProperties);
  const charId = useSelector((state: any) => state.data.data.player.ID);
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [isValid, setIsValid] = useState<any>(null);
  const [myKey, setMyKey] = useState<any>(null);
  const [issuingKey, setIssuingKey] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addingFurniture, setAddingFurniture] = useState(false);
  const activeTab = useSelector((state: any) => state.home.tab);

  useEffect(() => { if (Boolean(isValid)) setMyKey(isValid.keys[charId]); }, [isValid]);
  useEffect(() => {
    if (Boolean(selected) && Boolean(myProperties)) setIsValid(myProperties.filter((p: any) => p.id == selected)[0]);
    else setIsValid(null);
  }, [selected, myProperties]);

  const fetch = useMemo(() => throttle(async () => {
    if (loading) return;
    setLoading(true);
    try {
      let res = await (await Nui.send('Home:GetMyProperties')).json();
      if (res) {
        dispatch({ type: 'SET_DATA', payload: { type: 'myProperties', data: res.properties } });
        dispatch({ type: 'SET_DATA', payload: { type: 'propertyUpgrades', data: res.upgrades } });
      } else dispatch({ type: 'SET_DATA', payload: { type: 'myProperties', data: [] } });
    } catch { dispatch({ type: 'SET_DATA', payload: { type: 'myProperties', data: [] } }); }
    setLoading(false);
  }, 1000), []);

  useEffect(() => {
    if (import.meta.env.DEV) {
      const mockProperties = [
        {
          id: 'prop_001',
          label: '1 Rockford Hills Drive',
          type: 'high_end',
          locked: false,
          upgrades: { interior: 1 },
          keys: { [charId]: { Owner: true, Permissions: { upgrade: true, furniture: true } } },
        },
        {
          id: 'prop_002',
          label: '2 Portola Drive, Apt 3B',
          type: 'apartment',
          locked: true,
          upgrades: { interior: 1 },
          keys: { [charId]: { Owner: false, Permissions: { upgrade: false, furniture: true } } },
        },
      ];
      const mockUpgrades = {
        high_end: {
          interior: { levels: [{ id: 1, name: 'Standard', price: 0, info: { description: 'Basic interior style' } }, { id: 2, name: 'Modern', price: 50000, info: { description: 'Clean modern look' } }, { id: 3, name: 'Luxury', price: 120000, info: { description: 'High-end luxury finish' } }, { id: 4, name: 'Penthouse', price: 250000, info: { description: 'Top-tier penthouse style' } }] },
          security: { name: 'Security System', levels: [{ id: 1, name: 'Basic', price: 0 }, { id: 2, name: 'Advanced', price: 25000 }, { id: 3, name: 'Elite', price: 60000 }] },
          garage: { name: 'Garage', levels: [{ id: 1, name: 'Single', price: 0 }, { id: 2, name: 'Double', price: 30000 }, { id: 3, name: 'Triple', price: 60000 }, { id: 4, name: 'Quad', price: 100000 }] },
        },
        apartment: {
          interior: { levels: [{ id: 1, name: 'Standard', price: 0, info: { description: 'Basic interior style' } }, { id: 2, name: 'Modern', price: 20000, info: { description: 'Clean modern look' } }, { id: 3, name: 'Luxury', price: 60000, info: { description: 'High-end luxury finish' } }] },
          security: { name: 'Security System', levels: [{ id: 1, name: 'Basic', price: 0 }, { id: 2, name: 'Advanced', price: 15000 }] },
        },
      };
      dispatch({ type: 'SET_DATA', payload: { type: 'myProperties', data: mockProperties } });
      dispatch({ type: 'SET_DATA', payload: { type: 'propertyUpgrades', data: mockUpgrades } });
    } else {
      fetch();
    }
  }, []);

  const lockProperty = useMemo(() => throttle(async (property: any) => {
    if (loading) return; setLoading(true);
    try {
      let res = await (await Nui.send('Home:LockProperty', { id: property.id })).json();
      if (res) { showAlert('Property Locked'); dispatch({ type: 'UPDATE_DATA', payload: { type: 'myProperties', id: property.id, data: { ...property, locked: true } } }); }
      else showAlert('Unable to Lock Property');
    } catch { showAlert('Unable to Lock Property'); }
    setLoading(false);
  }, 1000), []);

  const onBack = () => dispatch({ type: 'SET_SELECTED_PROPERTY', payload: null });
  const onRemove = async () => {
    setLoading(true);
    try {
      let res = await (await Nui.send('Home:RemoveMyKey', { id: isValid.id })).json();
      if (res) { onBack(); showAlert('Removed DigiKey'); } else showAlert('Unable to Remove DigiKey');
    } catch { setRemoving(false); showAlert('Unable to Remove DigiKey'); }
    setLoading(false);
  };

  const title = Boolean(isValid) ? isValid.label : 'Smart Home';
  const showIssueBtn = Boolean(isValid) && Boolean(myKey) && myKey?.Owner && activeTab === 0;
  const canManageFurniture = Boolean(isValid) && Boolean(myKey) && (myKey?.Owner || myKey?.Permissions?.furniture) && activeTab === 2;

  return (
    <div style={{ height: '100%', background: 'rgba(10,13,18,0.98)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 8px 0 16px', height: 56,
        background: `linear-gradient(135deg, ${hexAlpha(T, 0.25)} 0%, rgba(10,13,18,0) 100%)`,
        borderBottom: `1px solid ${T35}`,
        overflow: 'visible',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.06em', color: '#fff', overflow: 'hidden' }}>
          {Boolean(isValid)
            ? <HdrBtn icon={['fas', 'chevron-left']} label="Back" onClick={onBack} T={T} />
            : <FontAwesomeIcon icon={['fas', 'house-signal']} style={{ color: hexAlpha(T, 0.8), fontSize: 17 }} />
          }
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {Boolean(isValid) && Boolean(myKey) && !myKey?.Owner && (
            <HdrBtn icon={['fas', 'trash-can']} label="Remove DigiKey" onClick={() => setRemoving(true)} disabled={loading} danger T={T} />
          )}
          {showIssueBtn && (
            <HdrBtn icon={['fas', 'plus']} label="Issue DigiKey" onClick={() => setIssuingKey(true)} disabled={loading} T={T} />
          )}
          {canManageFurniture && (
            <HdrBtn icon={['fas', 'arrows-up-down-left-right']} label="Toggle Edit Mode" onClick={() => setEditMode(v => !v)} disabled={loading} active={editMode} T={T} />
          )}
          {canManageFurniture && (
            <HdrBtn icon={['fas', 'couch']} label="Add Item" onClick={() => setAddingFurniture(true)} disabled={loading} T={T} />
          )}
          {Boolean(isValid) && !isValid.locked && (
            <HdrBtn icon={['fas', 'lock']} label="Lock Property" onClick={() => lockProperty(isValid)} disabled={loading} T={T} />
          )}
          <HdrBtn icon={['fas', 'arrows-rotate']} label="Refresh" onClick={() => fetch()} disabled={loading} spin={loading} T={T} />
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {loading ? <Loader static text="Loading" />
          : Boolean(isValid) ? <MyHouse property={isValid} onRefresh={fetch} setLoading={setLoading} issuingKey={issuingKey} onIssueKeyClose={() => setIssuingKey(false)} editMode={editMode} onEditModeToggle={() => setEditMode(v => !v)} addingFurniture={addingFurniture} onAddFurnitureClose={() => setAddingFurniture(false)} />
          : <Select />}
      </div>
      {Boolean(isValid) && Boolean(myKey) && !myKey?.Owner && (
        <Confirm title="Remove DigiKey?" open={removing} confirm="Yes" decline="No" onConfirm={onRemove} onDecline={() => setRemoving(false)}>
          <p>Removing the DigiKey will revoke access to this property and shared assets. Are you sure?</p>
        </Confirm>
      )}
    </div>
  );
};

export default HomemanageIndex;
