import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../hooks';
import { Confirm } from '../../components';
import Upgrade from './components/Upgrade';

interface Props { jobData: any; playerJob: any; refreshRoster?: () => void; }

const Upgrades: React.FC<Props> = ({ jobData }) => {
  const navigate = useNavigate();
  const T = useAppColor('comanager');
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const upgrades = useSelector((state: any) => state.data.data.companyUpgrades);

  return (
    <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 16px', height: 56, background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`, borderBottom: `1px solid ${T50}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.06em', color: '#fff' }}>
          <FontAwesomeIcon icon={['fas', 'arrow-up-right-dots']} style={{ color: T, fontSize: 16 }} />
          <span>{jobData.Name}</span>
        </div>
        <div
          onClick={() => navigate(-1)}
          style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, background: 'transparent', transition: 'background 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
          <FontAwesomeIcon icon={['fas', 'house']} />
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
        {!Boolean(upgrades)
          ? <div style={{ width: '100%', textAlign: 'center', fontSize: 16, fontFamily: "'Oswald', sans-serif", color: 'rgba(255,255,255,0.25)', marginTop: '25%' }}>No Upgrades Available</div>
          : upgrades.map((upgrade: any, k: number) => <Upgrade key={`upgrade-${k}`} upgrade={upgrade} />)
        }
      </div>
    </div>
  );
};

export default Upgrades;
