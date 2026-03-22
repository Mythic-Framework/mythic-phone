import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../../hooks';

interface Props { chopRequest: any; }

const ChopItem: React.FC<Props> = ({ chopRequest }) => {
  const T = useAppColor('lsunderground');
  const T20 = hexAlpha(T, 0.2);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '9px 12px', marginBottom: 6, borderRadius: 10,
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${chopRequest.hv ? 'rgba(255,190,0,0.25)' : 'rgba(255,255,255,0.06)'}`,
    }}>
      {chopRequest.hv && (
        <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} style={{ color: '#ffbe00', fontSize: 13, flexShrink: 0 }} title="High Value" />
      )}
      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: '#fff', fontWeight: 500, letterSpacing: '0.03em', flex: 1 }}>
        {chopRequest.name}
      </div>
      {chopRequest.hv && (
        <span style={{ fontSize: 9, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffbe00', background: 'rgba(255,190,0,0.1)', border: '1px solid rgba(255,190,0,0.25)', borderRadius: 4, padding: '2px 6px' }}>HV</span>
      )}
    </div>
  );
};

export default ChopItem;
