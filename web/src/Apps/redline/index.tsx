import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePermissions, useAppColor, hexAlpha, useAlert } from '../../hooks';
import Welcome from './components/Welcome';
import Tracks from './Tracks';
import Pending from './Pending';
import Recent from './Recent';
import Create from './Create';
import Unauthorized from './components/Unauthorized';
import { RootState, AppDispatch } from '../../store';
import Nui from '../../util/Nui';

const BG = '#0a0c10';

export default function RedlineIndex() {
  const dispatch = useDispatch<AppDispatch>();
  const showAlert = useAlert();
  const hasPerm = usePermissions();
  const T = useAppColor('redline');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const activeTab = useSelector((state: RootState) => (state as any).race?.tab ?? 0);
  const onDuty = useSelector((state: RootState) => state.data.data.onDuty);
  const alias = useSelector((state: RootState) => state.data.data.player?.Alias?.redline);
  const createState = useSelector((state: RootState) => (state as any).race?.creator);
  const canCreate = hasPerm('redline', 'create');

  const [tracksCreating, setTracksCreating] = useState(false);

  const handleTabChange = (tab: number) => dispatch({ type: 'SET_RACE_TAB', payload: { tab } });
  const tabs = ['Tracks', 'Pending', 'Recent'];

  const onCreateMap = async () => {
    try {
      const res = await (await Nui.send('CreateTrack')).json();
      showAlert(res ? 'Creator Started' : 'Unable to Start Creator');
      if (res) dispatch({ type: 'RACE_STATE_CHANGE', payload: { state: { checkpoints: 0, distance: 0, type: 'lap' } } });
    } catch { showAlert('Unable to Start Creator'); }
  };

  const onCancelMap = () => {
    Nui.send('StopCreator').catch(() => {});
    dispatch({ type: 'RACE_STATE_CHANGE', payload: { state: null } });
  };

  const btnStyle = (active = false): React.CSSProperties => ({
    width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 6, border: `1px solid ${active ? T50 : T20}`, cursor: 'pointer',
    color: T, fontSize: 14, transition: 'background 0.2s', background: active ? T20 : 'transparent',
  });

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
      {!alias ? <Welcome /> : onDuty === 'police' ? <Unauthorized /> : (
        <>
          {!tracksCreating && (
            <div style={{
              flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 8px 0 16px', height: 56,
              background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
              borderBottom: `1px solid ${T50}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
                <FontAwesomeIcon icon={['fas', 'flag-checkered']} style={{ fontSize: 16, color: T }} />
                Vroom — <span style={{ color: T }}>{alias}</span>
              </div>
              {canCreate && (
                <div style={{ display: 'flex', gap: 6 }}>
                  {createState != null && <div style={btnStyle()} onClick={onCancelMap}><FontAwesomeIcon icon={['fas', 'xmark']} /></div>}
                  <div style={btnStyle(createState != null)} onClick={createState == null ? onCreateMap : undefined}><FontAwesomeIcon icon={['fas', 'map-location-dot']} /></div>
                </div>
              )}
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
