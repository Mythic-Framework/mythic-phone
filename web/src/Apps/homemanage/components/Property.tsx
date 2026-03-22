import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../../hooks';
import { useDispatch } from 'react-redux';

interface Props { property: any; }

const Property: React.FC<Props> = ({ property }) => {
  const dispatch = useDispatch();
  const T = useAppColor('homemanage');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T08 = hexAlpha(T, 0.08);
  const T04 = hexAlpha(T, 0.04);

  const charId = useSelector((state: any) => state.data.data.player.ID);
  const myKey = property.keys[charId];

  const onClick = () => dispatch({ type: 'SET_SELECTED_PROPERTY', payload: property.id });

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '11px 16px',
        borderBottom: `1px solid ${T08}`,
        borderLeft: '3px solid transparent',
        background: `linear-gradient(90deg, ${T04} 0%, transparent 100%)`,
        cursor: 'pointer', transition: 'background 0.15s, border-left-color 0.15s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderLeftColor = T; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `linear-gradient(90deg, ${T04} 0%, transparent 100%)`; (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'; }}
    >
      <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, background: T20, color: T, border: `1px solid ${T50}` }}>
        <FontAwesomeIcon icon={['fas', myKey?.Owner ? 'house' : 'key']} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.03em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {property.label}
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: T, marginTop: 2 }}>
          {myKey?.Owner ? 'Owner' : 'Key Holder'}
        </div>
      </div>
      <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ color: T, fontSize: 12, opacity: 0.5, flexShrink: 0 }} />
    </div>
  );
};

export default Property;
