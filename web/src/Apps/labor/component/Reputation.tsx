import React from 'react';
import { useAppColor, hexAlpha } from '../../../hooks';

interface Props {
  rep: any;
  disabled?: boolean;
}

const Reputation: React.FC<Props> = ({ rep }) => {
  const T = useAppColor('labor');
  const T50 = hexAlpha(T, 0.5);
  const T07 = hexAlpha(T, 0.07);
  const T14 = hexAlpha(T, 0.14);
  const T18 = hexAlpha(T, 0.18);
  const T08 = hexAlpha(T, 0.08);

  const normalise = (value: number = 0): number => {
    const min = rep?.current?.value ?? 0;
    const max = rep?.next?.value ?? 1000;
    if (max === min) return 100;
    return Math.min(100, Math.max(0, ((value - min) * 100) / (max - min)));
  };

  const pct = normalise(rep.value);

  return (
    <div
      style={{
        padding: '18px 18px 16px',
        background: `linear-gradient(135deg, ${T07} 0%, rgba(255,255,255,0.02) 100%)`,
        border: `1px solid ${T18}`, borderLeft: `3px solid ${T}`,
        borderRadius: 4, marginBottom: 8,
        transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, ${T14} 0%, rgba(255,255,255,0.04) 100%)`; (e.currentTarget as HTMLElement).style.borderColor = T50; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${T08}`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, ${T07} 0%, rgba(255,255,255,0.02) 100%)`; (e.currentTarget as HTMLElement).style.borderColor = T18; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 17, fontWeight: 600, color: T, letterSpacing: '0.05em' }}>
          {rep.label}
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
          {rep.value} XP
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', whiteSpace: 'nowrap', minWidth: 54 }}>
          {rep.current?.label ?? 'No Rank'}
        </span>
        <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${T}, ${hexAlpha(T, 0.6)})`, borderRadius: 3, transition: 'width 0.5s ease', boxShadow: `0 0 6px ${T50}` }} />
        </div>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', whiteSpace: 'nowrap', minWidth: 54, textAlign: 'right' }}>
          {rep.next?.label ?? 'Max'}
        </span>
      </div>
    </div>
  );
};

export default Reputation;
