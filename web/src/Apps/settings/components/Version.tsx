import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

declare const __APPVERSION__: string;

const T = '#208692';

export default function Version() {
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <div
      style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: 'Oswald', letterSpacing: '0.08em', userSelect: 'none', cursor: 'default', flexShrink: 0 }}
      onMouseDown={() => { timerRef.current = setTimeout(() => navigate('/apps/settings/software'), 2000); }}
      onMouseUp={() => { if (timerRef.current) clearTimeout(timerRef.current); }}
      onMouseLeave={() => { if (timerRef.current) clearTimeout(timerRef.current); }}
    >
      ANGRY BOI OS&nbsp;<span style={{ color: T }}>v{typeof __APPVERSION__ !== 'undefined' ? __APPVERSION__ : ''}</span>
    </div>
  );
}
