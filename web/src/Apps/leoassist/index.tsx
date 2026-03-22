import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../hooks';
import Notifications from './Notifications';
import Person from './Person';
import Vehicle from './Vehicle';
import Property from './Property';

const LeoAssist: React.FC = () => {
  const dispatch = useDispatch();
  const T = useAppColor('leoassist');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const activeTab = useSelector((state: any) => state.leo.tab);

  const tabs = [
    { label: 'Activity', icon: 'bell' as const },
    { label: 'People',   icon: 'user' as const },
    { label: 'Vehicle',  icon: 'car-side' as const },
    { label: 'Property', icon: 'house' as const },
  ];

  return (
    <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10,
        padding: '0 16px', height: 56,
        background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
        borderBottom: `1px solid ${T50}`,
        fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600,
        letterSpacing: '0.08em', color: '#fff',
      }}>
        <FontAwesomeIcon icon={['fas', 'shield-halved']} style={{ color: T, fontSize: 16 }} />
        Leo Assist
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ height: '100%' }} hidden={activeTab !== 0}>{activeTab === 0 && <Notifications />}</div>
        <div style={{ height: '100%' }} hidden={activeTab !== 1}>{activeTab === 1 && <Person />}</div>
        <div style={{ height: '100%' }} hidden={activeTab !== 2}>{activeTab === 2 && <Vehicle />}</div>
        <div style={{ height: '100%' }} hidden={activeTab !== 3}>{activeTab === 3 && <Property />}</div>
      </div>

      {/* Tab bar */}
      <div style={{ flexShrink: 0, display: 'flex', height: 46, background: 'rgba(8,10,14,0.98)', borderTop: `1px solid ${T20}` }}>
        {tabs.map((tab, i) => (
          <div
            key={i}
            onClick={() => dispatch({ type: 'SET_LEO_TAB', payload: { tab: i } })}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', gap: 3, userSelect: 'none',
              color: activeTab === i ? T : 'rgba(255,255,255,0.35)',
              borderTop: activeTab === i ? `2px solid ${T}` : '2px solid transparent',
              background: activeTab === i ? T20 : 'transparent',
              transition: 'all 0.2s',
            }}
          >
            <FontAwesomeIcon icon={['fas', tab.icon]} style={{ fontSize: 12 }} />
            <span style={{ fontSize: 9, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}>{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeoAssist;
