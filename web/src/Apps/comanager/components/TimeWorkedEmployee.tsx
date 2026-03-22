import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../../hooks';

interface Props { jobData: any; playerJob?: any; employee: any; onClick: (employee: any) => void; }

const TimeWorkedEmployee: React.FC<Props> = ({ jobData, employee, onClick }) => {
  const T = useAppColor('comanager');
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const T15 = hexAlpha(T, 0.15);
  const T04 = hexAlpha(T, 0.04);
  const player = useSelector((state: any) => state.data.data.player);
  const isMe = player.SID == employee.SID;
  const isOwner = jobData?.Owner == employee.SID;

  return (
    <div
      onClick={() => onClick(employee)}
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${hexAlpha(T, 0.08)}`, borderLeft: '3px solid transparent', background: `linear-gradient(90deg, ${T04} 0%, transparent 100%)`, cursor: 'pointer', transition: 'background 0.15s, border-left-color 0.15s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderLeftColor = T; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `linear-gradient(90deg, ${T04} 0%, transparent 100%)`; (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'; }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: T15, border: `1px solid ${T50}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T, fontSize: 14, flexShrink: 0 }}>
        <FontAwesomeIcon icon={['fas', 'user']} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {isMe && <FontAwesomeIcon icon={['fas', 'user']} style={{ fontSize: 11, color: '#64b5f6' }} />}
          {isOwner && !isMe && <FontAwesomeIcon icon={['fas', 'crown']} style={{ fontSize: 11, color: 'gold' }} />}
          {`${employee.First} ${employee.Last}`}
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>SID: {employee.SID}</div>
      </div>
      <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ color: T, fontSize: 13, opacity: 0.5, flexShrink: 0 }} />
    </div>
  );
};

export default TimeWorkedEmployee;
