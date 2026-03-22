import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateSetting } from '../actions';
import { useAlert } from '../../../hooks';
import { RootState, AppDispatch } from '../../../store';

const T = '#208692';
const T50 = 'rgba(32,134,146,0.5)';
const T20 = 'rgba(32,134,146,0.2)';

interface Props { item: string; wallpaper: { file: string; label: string }; }

export default function Wallpaper({ item, wallpaper }: Props) {
  const showAlert = useAlert();
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.data.data.player.PhoneSettings);
  const isActive = settings.wallpaper === item;

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(UpdateSetting('wallpaper', item));
    showAlert('Wallpaper Updated');
  };

  useEffect(() => {
    if (isActive) document.querySelector(`#wp-${item}`)?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [settings.wallpaper]);

  return (
    <div id={`wp-${item}`} onClick={onClick} style={{
      borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
      border: isActive ? `2px solid ${T}` : '2px solid transparent',
      boxShadow: isActive ? `0 0 12px ${T}60` : 'none',
      transition: 'all 0.2s',
    }}>
      <img src={wallpaper.file} alt={wallpaper.label} style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }} />
      <div style={{ padding: '4px 6px', background: 'rgba(10,12,16,0.9)', fontSize: 10, color: isActive ? T : 'rgba(255,255,255,0.5)', fontFamily: 'Oswald', letterSpacing: '0.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {wallpaper.label}
      </div>
    </div>
  );
}
