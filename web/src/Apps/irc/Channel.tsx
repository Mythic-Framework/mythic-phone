import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../hooks';

interface Props { channel: any; }

const Channel: React.FC<Props> = ({ channel }) => {
  const navigate = useNavigate();
  const T = useAppColor('irc');
  const T20 = hexAlpha(T, 0.2);
  const T40 = hexAlpha(T, 0.4);
  const T08 = hexAlpha(T, 0.08);

  return (
    <div
      onClick={() => navigate(`/apps/irc/view/${channel.slug}`)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        cursor: 'pointer', transition: 'background 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = T08)}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: T20, border: `1px solid ${T40}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 18, color: T,
      }}>
        #
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', letterSpacing: '0.03em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {channel.slug}
        </div>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2, letterSpacing: '0.02em' }}>
          Joined {new Date(+channel.joined).toLocaleDateString()}
        </div>
      </div>
      <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, flexShrink: 0 }} />
    </div>
  );
};

export default Channel;
