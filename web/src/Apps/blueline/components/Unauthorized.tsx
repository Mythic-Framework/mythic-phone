import React from 'react';
import { useAppColor } from '../../../hooks';

export default function BluelineUnauthorized() {
  const T = useAppColor('blueline');

  return (
    <div style={{ height: '100%', background: '#0a0c10', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, textAlign: 'center', padding: 32 }}>
      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', color: T }}>
        Not Authorized
      </div>
      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>
        Please get your callsign set
      </div>
    </div>
  );
}
