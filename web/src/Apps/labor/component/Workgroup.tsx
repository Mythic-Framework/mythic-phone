import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../../hooks';

interface Props {
  group: any;
  isInGroup: boolean;
  onJoin: (group: any) => void;
  disabled: boolean;
}

const Workgroup: React.FC<Props> = ({ group, isInGroup, onJoin, disabled }) => {
  const T = useAppColor('labor');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T10 = hexAlpha(T, 0.1);
  const T07 = hexAlpha(T, 0.07);
  const T14 = hexAlpha(T, 0.14);
  const T18 = hexAlpha(T, 0.18);
  const T08 = hexAlpha(T, 0.08);
  const player = useSelector((state: any) => state.data.data.player);

  const totalMembers = group.Members.length + 1;
  const isFull = group.Members.length >= 4;
  const isMyGroup = group.Creator.ID == player.Source;
  const joinDisabled = isInGroup || isFull || disabled || group.Working || Boolean(player.TempJob);
  const btnLabel = isMyGroup ? 'Mine' : group.Working ? 'Active' : isFull ? 'Full' : 'Join';

  const btnStyle: React.CSSProperties = {
    background: T10, border: `1px solid ${hexAlpha(T, 0.35)}`,
    color: 'rgba(139,188,212,0.9)', fontFamily: "'Oswald', sans-serif",
    fontWeight: 600, fontSize: 12, letterSpacing: '0.14em',
    textTransform: 'uppercase', padding: '8px 16px', borderRadius: 3,
    cursor: (joinDisabled || isMyGroup) ? 'default' : 'pointer',
    minWidth: 64, transition: 'all 0.15s',
    opacity: (joinDisabled || isMyGroup) ? 0.25 : 1,
  };

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', padding: '16px 18px',
        background: `linear-gradient(135deg, ${T07} 0%, rgba(255,255,255,0.02) 100%)`,
        border: `1px solid ${T18}`, borderLeft: `3px solid ${T}`,
        borderRadius: 4, marginBottom: 8,
        transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, ${T14} 0%, rgba(255,255,255,0.04) 100%)`; (e.currentTarget as HTMLElement).style.borderColor = T50; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${T08}`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, ${T07} 0%, rgba(255,255,255,0.02) 100%)`; (e.currentTarget as HTMLElement).style.borderColor = T18; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 17, fontWeight: 600, color: T, letterSpacing: '0.05em', lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: 7 }}>
          {isMyGroup && <FontAwesomeIcon icon={['fas', 'crown']} style={{ color: 'gold', fontSize: 13 }} />}
          {group.Creator.First} {group.Creator.Last}
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 4, letterSpacing: '0.05em' }}>
          #{group.Creator.SID}
        </div>
        {group.Working && (
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: '#4caf7a', marginTop: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            ● On Duty
          </div>
        )}
      </div>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 17, fontWeight: 700, color: isFull ? '#f87171' : '#e2e8f0', minWidth: 64, textAlign: 'center', letterSpacing: '0.04em', padding: '0 8px' }}>
        {totalMembers} / 5
      </div>
      <button style={btnStyle} disabled={joinDisabled || isMyGroup} onClick={() => onJoin(group)}>
        {btnLabel}
      </button>
    </div>
  );
};

export default Workgroup;
