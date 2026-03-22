import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useAppColor, hexAlpha } from '../../../hooks';

interface Props { vehicle: any; }

const Vehicle: React.FC<Props> = ({ vehicle }) => {
  const T = useAppColor('garage');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T10 = hexAlpha(T, 0.1);
  const T08 = hexAlpha(T, 0.08);
  const T04 = hexAlpha(T, 0.04);

  const garages = useSelector((state: any) => state.data.data.garages);

  const getGarage = () => {
    switch (vehicle.Storage.Type) {
      case 0: return garages?.impound;
      case 1: return garages?.[vehicle.Storage.Id];
      case 2: return vehicle.PropertyStorage;
    }
  };
  const garage = getGarage();
  const isImpound = vehicle.Storage.Type === 0;

  const badgeBase: React.CSSProperties = {
    fontSize: 10, fontFamily: "'Oswald', sans-serif", fontWeight: 600,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    padding: '1px 6px', borderRadius: 4,
  };

  return (
    <Link
      to={`/apps/garage/view/${vehicle.VIN}`}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '11px 16px',
        borderBottom: `1px solid ${T08}`,
        borderLeft: '3px solid transparent',
        background: `linear-gradient(90deg, ${T04} 0%, transparent 100%)`,
        textDecoration: 'none',
        transition: 'background 0.15s, border-left-color 0.15s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T10; (e.currentTarget as HTMLElement).style.borderLeftColor = T; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `linear-gradient(90deg, ${T04} 0%, transparent 100%)`; (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'; }}
    >
      {/* Icon */}
      {isImpound ? (
        <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, background: 'rgba(211,47,47,0.1)', color: '#ef5350', border: '1px solid rgba(211,47,47,0.3)' }}>
          <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} />
        </div>
      ) : (
        <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, background: T10, color: T, border: `1px solid ${T50}` }}>
          <FontAwesomeIcon icon={['fas', 'car-side']} />
        </div>
      )}

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.03em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {vehicle.Make} {vehicle.Model}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
            {garage?.label ?? vehicle.Storage.Id ?? 'Unknown'}
          </span>
          {vehicle.Spawned
            ? <span style={{ ...badgeBase, background: 'rgba(211,47,47,0.15)', color: '#ef5350', border: '1px solid rgba(211,47,47,0.3)' }}>Out</span>
            : isImpound
              ? <span style={{ ...badgeBase, background: 'rgba(255,152,0,0.12)', color: '#ffa726', border: '1px solid rgba(255,152,0,0.3)' }}>Impound</span>
              : <span style={{ ...badgeBase, background: 'rgba(76,175,80,0.12)', color: '#66bb6a', border: '1px solid rgba(76,175,80,0.25)' }}>Stored</span>
          }
        </div>
      </div>

      {/* Chevron */}
      <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ color: T, fontSize: 12, opacity: 0.5, flexShrink: 0 }} />
    </Link>
  );
};

export default Vehicle;
