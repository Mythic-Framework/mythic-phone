import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../../hooks';

interface Props { property: any; onRefresh: () => void; }

const Placements: React.FC<Props> = ({ property, onRefresh }) => {
  const T = useAppColor('homemanage');
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);

  return (
    <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: 16, scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
        <div style={{ background: hexAlpha(T, 0.06), border: `1px solid ${T20}`, borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, marginBottom: 12, borderBottom: `1px solid ${T20}` }}>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 16, color: '#fff', letterSpacing: '0.06em' }}>
              Furniture
            </span>
            <FontAwesomeIcon icon={['fas', 'chair-office']} style={{ color: T, fontSize: 16, opacity: 0.5 }} />
          </div>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, color: T, letterSpacing: '0.04em' }}>
            Coming Soon...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placements;
