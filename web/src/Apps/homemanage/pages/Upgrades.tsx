import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../../hooks';
import Upgrade from '../components/Upgrade';
import InteriorUpgrade from '../components/InteriorUpgrade';

interface Props { property: any; onRefresh: () => void; setLoading: (v: boolean) => void; myKey: any; }

const Upgrades: React.FC<Props> = ({ property, onRefresh, setLoading, myKey }) => {
  const T = useAppColor('homemanage');
  const T20 = hexAlpha(T, 0.2);
  const availableUpgrades = useSelector((state: any) => state.data.data.propertyUpgrades)?.[property.type];

  const emptyMsg: React.CSSProperties = {
    height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'rgba(255,255,255,0.3)', fontFamily: "'Oswald', sans-serif", fontSize: 14,
  };

  if (!myKey?.Permissions?.upgrade && !myKey?.Owner) {
    return (
      <div style={{ height: '100%', background: '#0a0c10', overflow: 'hidden' }}>
        <div style={emptyMsg}>
          <FontAwesomeIcon icon={['fas', 'lock']} style={{ marginRight: 8, color: T20 }} />
          Invalid Permissions
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', background: '#0a0c10', overflow: 'hidden', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${hexAlpha(T, 0.5)} transparent` }}>
      {availableUpgrades ? (
        <>
          <InteriorUpgrade property={property} type="interior" upgrade={availableUpgrades.interior} setLoading={setLoading} onRefresh={onRefresh} />
          {Object.keys(availableUpgrades).filter((u: string) => u !== 'interior').map((upgrade: string) => (
            <Upgrade key={`upgrade-${upgrade}`} property={property} type={upgrade} upgrade={availableUpgrades[upgrade]} setLoading={setLoading} onRefresh={onRefresh} />
          ))}
        </>
      ) : (
        <div style={emptyMsg}>No Property Upgrades Available</div>
      )}
    </div>
  );
};

export default Upgrades;
