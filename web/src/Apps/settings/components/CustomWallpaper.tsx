import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UpdateSetting } from '../actions';
import { useAlert } from '../../../hooks';
import { Modal } from '../../../components';
import { Wallpapers } from '../../../util/Wallpapers';
import { RootState, AppDispatch } from '../../../store';

const T = '#208692';
const T50 = 'rgba(32,134,146,0.5)';
const T20 = 'rgba(32,134,146,0.2)';

export default function CustomWallpaper() {
  const showAlert = useAlert();
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.data.data.player.PhoneSettings);
  const isActive = Wallpapers[settings.wallpaper] == null;
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState(isActive ? settings.wallpaper : '');

  const onSave = () => {
    setOpen(false);
    if (val !== '') { dispatch(UpdateSetting('wallpaper', val)); showAlert('Custom Wallpaper Saved'); }
  };
  const removeImage = () => {
    setOpen(false); setVal('');
    dispatch(UpdateSetting('wallpaper', 'wallpaper')); showAlert('Wallpaper Deleted');
  };

  return (
    <>
      <div onClick={() => setOpen(true)} style={{
        borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
        border: isActive ? `2px solid ${T}` : '2px solid transparent',
        boxShadow: isActive ? `0 0 12px ${T}60` : 'none',
        transition: 'all 0.2s',
      }}>
        {isActive
          ? <img src={settings.wallpaper} alt="Custom" style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }} />
          : <div style={{ height: 90, background: T20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: T }}>
              <FontAwesomeIcon icon="plus" />
            </div>
        }
        <div style={{ padding: '4px 6px', background: 'rgba(10,12,16,0.9)', fontSize: 10, color: isActive ? T : 'rgba(255,255,255,0.5)', fontFamily: 'Oswald', letterSpacing: '0.04em' }}>Custom</div>
      </div>

      <Modal open={open} title="Custom Wallpaper" onClose={() => setOpen(false)} onDelete={isActive ? removeImage : undefined} onAccept={onSave} acceptLang="Save">
        <div>
          {val ? (
            <img src={val} alt="Preview" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 10, marginBottom: 12, display: 'block' }} />
          ) : (
            <div style={{ height: 200, background: T20, borderRadius: 10, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, color: T }}>
              <FontAwesomeIcon icon="image" />
            </div>
          )}
          <TextField label="Wallpaper URL" fullWidth value={val} onChange={e => setVal(e.target.value)} />
        </div>
      </Modal>
    </>
  );
}
