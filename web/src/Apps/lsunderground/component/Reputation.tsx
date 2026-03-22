import React from 'react';
import { useAppColor, hexAlpha } from '../../../hooks';

interface Props { rep: any; disabled?: boolean; }

const Reputation: React.FC<Props> = ({ rep }) => {
  const T = useAppColor('lsunderground');
  const T20 = hexAlpha(T, 0.2);

  const min = rep?.current?.value ?? 0;
  const max = rep?.next?.value ?? 1000;
  const pct = Math.min(100, Math.max(0, ((rep.value - min) * 100) / (max - min)));

  return (
    <div style={{ padding: '12px 14px', marginBottom: 8, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>
          {rep.label}
        </div>
        <span style={{ fontSize: 10, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', color: T, background: T20, border: `1px solid ${hexAlpha(T, 0.4)}`, borderRadius: 4, padding: '2px 7px' }}>
          {rep.current?.label ?? 'No Rank'}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ position: 'relative', height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, borderRadius: 3, background: `linear-gradient(90deg, ${T} 0%, ${hexAlpha(T, 0.6)} 100%)`, transition: 'width 0.4s ease' }} />
      </div>

      {/* Labels below bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.04em' }}>
          {rep.current?.label ?? 'No Rank'}
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.04em' }}>
          {rep.next?.label ?? 'Max'}
        </div>
      </div>
    </div>
  );
};

export default Reputation;
