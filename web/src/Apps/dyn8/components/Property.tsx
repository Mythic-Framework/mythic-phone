import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../../util/Nui';
import { useAlert, useJobPermissions, useAppColor, hexAlpha } from '../../../hooks';

const G = '#4caf50';
const G20 = 'rgba(76,175,80,0.2)';

interface Props { property: any; expanded: boolean; onClick: () => void; onSell: (property: any) => void; }

const Property: React.FC<Props> = ({ property, expanded, onClick, onSell }) => {
  const showAlert = useAlert();
  const hasJobPerm = useJobPermissions();
  const T = useAppColor('dyn8');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T12 = hexAlpha(T, 0.12);
  const T10 = hexAlpha(T, 0.1);
  const T07 = hexAlpha(T, 0.07);
  const T04 = hexAlpha(T, 0.04);

  const onMark = async () => {
    try {
      let res = await (await Nui.send('Dyn8:MarkProperty', property._id)).json();
      showAlert(res ? 'GPS Marked' : 'Unable to Mark GPS');
    } catch { showAlert('Unable to Mark GPS'); }
  };

  const cardStyle: React.CSSProperties = {
    borderBottom: `1px solid ${T12}`,
    borderLeft: expanded ? `3px solid ${T}` : '3px solid transparent',
    background: expanded
      ? `linear-gradient(90deg, ${T20} 0%, ${T04} 100%)`
      : `linear-gradient(90deg, ${T04} 0%, transparent 100%)`,
    transition: 'border-left-color 0.15s, background 0.15s',
  };

  const actionBtnStyle: React.CSSProperties = {
    flex: 1, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 12,
    fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em', background: 'transparent', transition: 'background 0.2s',
  };

  const sellBtnStyle: React.CSSProperties = {
    flex: 1, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderRadius: 6, border: `1px solid ${G20}`, cursor: 'pointer', color: G, fontSize: 12,
    fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em', background: 'transparent', transition: 'background 0.2s',
  };

  return (
    <div style={cardStyle}>
      {/* Summary row */}
      <div
        onClick={onClick}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', cursor: 'pointer', userSelect: 'none' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, background: T20, color: T, border: `1px solid ${hexAlpha(T, 0.25)}` }}>
            <FontAwesomeIcon icon={['fas', property.sold ? 'house-lock' : 'house']} />
          </div>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.03em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {property.label}
          </span>
          {property.sold && (
            <span style={{ fontSize: 10, fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 4, background: 'rgba(211,47,47,0.15)', color: '#ef5350', border: '1px solid rgba(211,47,47,0.3)', flexShrink: 0 }}>
              Sold
            </span>
          )}
        </div>
        <FontAwesomeIcon
          icon={['fas', 'chevron-down']}
          style={{ color: T, fontSize: 12, flexShrink: 0, marginLeft: 8, transition: 'transform 0.2s', transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        />
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{ padding: '0 16px 12px', borderTop: `1px solid ${T10}` }}>
          {[
            ['Price', `$${Number(property.price).toLocaleString()}`, null],
            ['Status', property.sold ? 'Sold' : 'Available', property.sold ? '#ef5350' : G],
            ['Owner', property.owner ? `${property.owner.First} ${property.owner.Last}` : 'No Owner', null],
          ].map(([label, value, color]) => (
            <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: `1px solid ${T07}` }}>
              <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{label}</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13, color: (color as string) ?? '#fff' }}>{value}</span>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 8, padding: '8px 0 4px' }}>
            {!property.sold && (
              <div
                style={actionBtnStyle}
                onClick={onMark}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <FontAwesomeIcon icon={['fas', 'location-crosshairs']} /> Mark GPS
              </div>
            )}
            {!property.sold && hasJobPerm('JOB_SELL', 'realestate') && (
              <div
                style={sellBtnStyle}
                onClick={() => onSell(property)}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = G20; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <FontAwesomeIcon icon={['fas', 'handshake']} /> Sell Property
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Property;
