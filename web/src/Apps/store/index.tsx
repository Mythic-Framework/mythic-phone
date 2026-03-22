import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyList from './MyList';
import StoreList from './StoreList';
import banner from '../../banner.png';
import { RootState, AppDispatch } from '../../store';
import { useAppColor, hexAlpha } from '../../hooks';

const BG = '#0a0c10';

export default function StoreIndex() {
  const dispatch = useDispatch<AppDispatch>();
  const T = useAppColor('store');
  const T20 = hexAlpha(T, 0.2);
  const T60 = hexAlpha(T, 0.6);
  const activeTab = useSelector((state: RootState) => (state as any).store?.tab ?? 0);
  const tabs = ['Store', 'Installed'];

  const tabBarStyle: React.CSSProperties = { flexShrink: 0, display: 'flex', height: 46, background: 'rgba(8,10,14,0.98)', borderTop: `1px solid ${T20}` };
  const tabStyle = (active: boolean): React.CSSProperties => ({ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 11, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', userSelect: 'none', color: active ? T : 'rgba(255,255,255,0.35)', borderTop: active ? `2px solid ${T}` : '2px solid transparent', background: active ? T20 : 'transparent', transition: 'all 0.2s' });

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 90, overflow: 'hidden', backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${T60} 0%, rgba(8,10,14,0.88) 100%)` }} />
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {activeTab === 0 && <StoreList />}
        {activeTab === 1 && <MyList />}
      </div>
      <div style={tabBarStyle}>{tabs.map((label, i) => <div key={i} onClick={() => dispatch({ type: 'SET_STORE_TAB', payload: { tab: i } })} style={tabStyle(activeTab === i)}>{label}</div>)}</div>
    </div>
  );
}
