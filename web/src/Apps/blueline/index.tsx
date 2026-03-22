import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Unauthorized from './components/Unauthorized';
import Tracks from './Tracks';
import Pending from './Pending';
import Recent from './Recent';
import Create from './Create';
import { useJobPermissions, useAppColor, hexAlpha } from '../../hooks';
import { RootState, AppDispatch } from '../../store';

const BG = '#0a0c10';

export default function BluelineIndex() {
  const dispatch = useDispatch<AppDispatch>();
  const T = useAppColor('blueline');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const hasPerm = useJobPermissions();
  const activeTab = useSelector((state: RootState) => (state as any).pdRace?.tab ?? 0);
  const alias = useSelector((state: RootState) => state.data.data.player?.Callsign);
  const canCreate = hasPerm('PD_MANAGE_TRIALS', 'police');

  const [tracksCreating, setTracksCreating] = useState(false);

  const handleTabChange = (tab: number) => dispatch({ type: 'PD_SET_RACE_TAB', payload: { tab } });
  const tabs = ['Tracks', 'Pending', 'Recent', ...(canCreate ? ['Create'] : [])];

  const tabBarStyle: React.CSSProperties = {
    flexShrink: 0, display: 'flex', height: 46,
    background: 'rgba(8,10,14,0.98)', borderTop: `1px solid ${T20}`,
  };
  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', fontSize: 11, fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.08em', textTransform: 'uppercase', userSelect: 'none',
    color: active ? T : 'rgba(255,255,255,0.35)',
    borderTop: active ? `2px solid ${T}` : '2px solid transparent',
    background: active ? T20 : 'transparent', transition: 'all 0.2s',
  });

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      {!alias ? <Unauthorized /> : (
        <>
          {!tracksCreating && (
            <div style={{
              flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px',
              height: 56,
              background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
              borderBottom: `1px solid ${T50}`,
              fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600,
              letterSpacing: '0.08em', color: '#fff',
            }}>
              <FontAwesomeIcon icon={['fas', 'shield-halved']} style={{ fontSize: 16, color: T }} />
              Trials — <span style={{ color: T }}>#{alias}</span>
            </div>
          )}

          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            {activeTab === 0 && <Tracks onCreatingChange={setTracksCreating} />}
            {activeTab === 1 && <Pending />}
            {activeTab === 2 && <Recent />}
            {activeTab === 3 && canCreate && <Create />}
          </div>

          {!tracksCreating && (
            <div style={tabBarStyle}>
              {tabs.map((label, i) => (
                <div key={i} onClick={() => handleTabChange(i)} style={tabStyle(activeTab === i)}>{label}</div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
