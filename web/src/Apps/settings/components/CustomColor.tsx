import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ColorPicker } from '../../../components';

interface Props { label: string; color: string; onSave: (hex: string) => void; disabled?: boolean; }

export default function CustomColor({ label, color: initColor, onSave, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(initColor);

  // Sync internal color state whenever the saved color changes externally
  useEffect(() => {
    setColor(initColor);
  }, [initColor]);

  const handleOpen = () => {
    if (disabled) return;
    setColor(initColor); // always reset to current saved color on open
    setOpen(true);
  };

  const handleSave = () => {
    setOpen(false);
    onSave(color);
  };

  return (
    <div style={{ opacity: disabled ? 0.5 : 1 }}>
      <div onClick={handleOpen} style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        cursor: disabled ? 'default' : 'pointer', transition: 'background 0.15s',
      }}
        onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: initColor,
          border: '2px solid rgba(255,255,255,0.15)',
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, color: '#fff',
        }}>
          <FontAwesomeIcon icon={['fas', 'eye-dropper']} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#fff', fontFamily: 'Oswald', letterSpacing: '0.02em' }}>{label}</div>
          <div style={{ fontSize: 11, color: initColor, marginTop: 2, fontFamily: 'Oswald' }}>{initColor}</div>
        </div>
        <FontAwesomeIcon icon="chevron-right" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }} />
      </div>
      <Modal open={open} title={`Select ${label}`} onClose={() => setOpen(false)} onAccept={handleSave} acceptLang="Save">
        <ColorPicker color={color} onChange={(e: any) => setColor(e.hex)} />
      </Modal>
    </div>
  );
}
