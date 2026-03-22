import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../../util/Nui';
import { useAlert, useAppColor, hexAlpha } from '../../../hooks';

interface Props { alert: any; }

const AlertComponent: React.FC<Props> = ({ alert }) => {
  const showAlert = useAlert();
  const T = useAppColor('leoassist');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T08 = hexAlpha(T, 0.08);

  const onClick = async () => {
    try {
      const res = await (await Nui.send('LEOPin', alert.location)).json();
      showAlert(res ? 'Location Pinned' : 'Unable to Pin Location');
    } catch { showAlert('Unable to Pin Location'); }
  };

  return (
    <div style={{
      marginBottom: 8, borderRadius: 10, overflow: 'hidden',
      background: T08, border: `1px solid ${T20}`,
    }}>
      {/* Title row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', borderBottom: `1px solid ${T20}`,
        background: `linear-gradient(90deg, ${T20} 0%, rgba(8,10,14,0) 100%)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 10, fontFamily: "'Oswald', sans-serif", fontWeight: 700,
            letterSpacing: '0.1em', padding: '2px 7px', borderRadius: 4,
            background: 'rgba(255,152,0,0.2)', color: '#ffa726',
            border: '1px solid rgba(255,152,0,0.4)',
          }}>
            {alert.code}
          </span>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.03em' }}>
            {alert.title}
          </span>
        </div>
        <div
          onClick={onClick}
          style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 13, background: 'transparent', transition: 'background 0.15s', flexShrink: 0 }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T20)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
        >
          <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
        </div>
      </div>

      {/* Details */}
      <div style={{ padding: '8px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {alert.location?.street1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            <FontAwesomeIcon icon={['fas', 'location-dot']} style={{ color: T, fontSize: 11, flexShrink: 0 }} />
            {alert.location.street1}, {alert.location.area}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
          <FontAwesomeIcon icon={['fas', 'clock']} style={{ color: T, fontSize: 11, flexShrink: 0 }} />
          {new Date(alert.time).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default AlertComponent;
