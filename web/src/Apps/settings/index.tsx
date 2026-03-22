import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from '@mui/material';
import { green, purple, blue, orange, teal, deepOrange, deepPurple } from '@mui/material/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Version from './components/Version';
import { Modal } from '../../components';
import { UpdateSetting } from './actions';
import { RootState, AppDispatch } from '../../store';

const T = '#208692';
const T50 = 'rgba(32,134,146,0.5)';
const T20 = 'rgba(32,134,146,0.2)';
const BG = '#0a0c10';
const CARD = 'rgba(16,20,28,0.97)';

const SettingRow = ({ icon, iconBg, label, sub, onClick, right }: { icon: any; iconBg: string; label: string; sub?: string; onClick?: () => void; right?: React.ReactNode }) => (
  <div onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    cursor: onClick ? 'pointer' : 'default', transition: 'background 0.15s',
  }}
    onMouseEnter={e => { if (onClick) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
  >
    <div style={{ width: 38, height: 38, borderRadius: 10, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, flexShrink: 0 }}>
      <FontAwesomeIcon icon={icon} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 14, color: '#fff', fontFamily: 'Oswald', letterSpacing: '0.02em' }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{sub}</div>}
    </div>
    {right ?? (onClick && <FontAwesomeIcon icon="chevron-right" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }} />)}
  </div>
);

const SectionLabel = ({ label }: { label: string }) => (
  <div style={{ padding: '10px 16px 4px', fontSize: 10, color: T, fontFamily: 'Oswald', letterSpacing: '0.12em' }}>{label.toUpperCase()}</div>
);

export default function SettingsIndex() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.data.data.player?.PhoneSettings);
  const [zoomInfo, setZoomInfo] = useState(false);

  if (!settings) return null;

  const toggleNotifs = () => dispatch(UpdateSetting('notifications', !settings.notifications));
  const volumeAdd = () => { if (settings.volume < 100) dispatch(UpdateSetting('volume', settings.volume + 5)); };
  const volumeMinus = () => { if (settings.volume >= 5) dispatch(UpdateSetting('volume', settings.volume - 5)); };
  const toggleMute = () => dispatch(UpdateSetting('volume', settings.volume === 0 ? 100 : 0));
  const zoomAdd = () => { if (settings.zoom < 100) dispatch(UpdateSetting('zoom', settings.zoom + 10)); };
  const zoomMinus = () => { if (settings.zoom >= 60) dispatch(UpdateSetting('zoom', settings.zoom - 10)); };

  const StepControl = ({ value, onMinus, onPlus, onToggle, toggleIcon }: any) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {onToggle && (
        <button onClick={onToggle} style={{ background: 'none', border: `1px solid rgba(255,255,255,0.12)`, borderRadius: 8, color: '#e05555', width: 30, height: 30, cursor: 'pointer', fontSize: 12 }}>
          <FontAwesomeIcon icon={toggleIcon} />
        </button>
      )}
      <button onClick={onMinus} style={{ background: 'none', border: `1px solid rgba(255,255,255,0.12)`, borderRadius: 8, color: 'rgba(255,255,255,0.6)', width: 30, height: 30, cursor: 'pointer', fontSize: 13 }}>−</button>
      <span style={{ minWidth: 38, textAlign: 'center', fontSize: 13, color: T, fontFamily: 'Oswald' }}>{value}%</span>
      <button onClick={onPlus} style={{ background: 'none', border: `1px solid rgba(255,255,255,0.12)`, borderRadius: 8, color: 'rgba(255,255,255,0.6)', width: 30, height: 30, cursor: 'pointer', fontSize: 13 }}>+</button>
    </div>
  );

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <SectionLabel label="Account" />
        <SettingRow icon={['fas','user']} iconBg="#1976d2" label="Personal Details" sub="View your profile" onClick={() => navigate('/apps/settings/profile')} />

        <SectionLabel label="Notifications" />
        <SettingRow icon={['fas','bell']} iconBg={green[600]} label="Notifications" sub="Enable or disable all" right={<Switch checked={!!settings.notifications} onChange={toggleNotifs} color="primary" size="small" />} />
        <SettingRow icon={['fas','bell']} iconBg={purple[500]} label="App Notifications" onClick={() => navigate('/apps/settings/app_notifs')} />

        <SectionLabel label="Personalization" />
        <SettingRow icon={['fas','volume-high']} iconBg={teal[600]} label="Volume" right={<StepControl value={settings.volume} onMinus={volumeMinus} onPlus={volumeAdd} onToggle={toggleMute} toggleIcon={settings.volume === 0 ? 'volume-off' : 'volume-xmark'} />} />
        <SettingRow icon={['fas','music']} iconBg={deepOrange[500]} label="Sounds" onClick={() => navigate('/apps/settings/sounds')} />
        <SettingRow icon={['fas','images']} iconBg={orange[600]} label="Wallpaper" onClick={() => navigate('/apps/settings/wallpaper')} />
        <SettingRow icon={['fas','magnifying-glass']} iconBg={blue[600]} label="Zoom"
          right={<div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button onClick={() => setZoomInfo(true)} style={{ background: 'none', border: `1px solid rgba(255,255,255,0.12)`, borderRadius: 8, color: 'rgba(255,255,255,0.4)', width: 28, height: 28, cursor: 'pointer', fontSize: 11 }}>?</button>
            <StepControl value={settings.zoom} onMinus={zoomMinus} onPlus={zoomAdd} />
          </div>}
        />
        <SettingRow icon={['fas','swatchbook']} iconBg={deepPurple[500]} label="Colors" onClick={() => navigate('/apps/settings/colors')} />
      </div>
      <Version />

      <Modal open={zoomInfo} title="Phone Zoom" onClose={() => setZoomInfo(false)}>
        <p>Zooming only works when the phone is minimized.</p>
        <p>Zooming may have adverse effects on some features. <b>You've been warned</b>.</p>
      </Modal>
    </div>
  );
}
