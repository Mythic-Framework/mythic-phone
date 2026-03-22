import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { throttle } from 'lodash';
import ChopList from './ChopList';
import Reputations from './Reputations';
import Nui from '../../util/Nui';
import { useAppColor, hexAlpha } from '../../hooks';

const BG = '#0a0c10';

const MOCK_LSU_DATA = {
  chopList: { 'Personal': { id: 'personal_001', public: false, list: [{ name: 'Elegy RH8', hv: true }, { name: 'Kuruma', hv: false }] } },
  reputations: [{ id: 'chopping', label: 'Chopping', value: 420, current: { label: 'Rookie', value: 0 }, next: { label: 'Regular', value: 500 } }],
};

const LSUnderground: React.FC = () => {
  const dispatch = useDispatch();
  const T = useAppColor('lsunderground');
  const T20 = hexAlpha(T, 0.2);
  const T10 = hexAlpha(T, 0.08);
  const T35 = hexAlpha(T, 0.35);
  const [loading, setLoading] = useState(false);
  const loadingRef = React.useRef(false);
  const [tab, setTab] = useState(0);
  const [chops, setChops] = useState<any>({});
  const [reps, setReps] = useState<any[]>([]);

  const fetch = useMemo(() => throttle(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    if (import.meta.env.DEV) {
      setChops(MOCK_LSU_DATA.chopList); setReps(MOCK_LSU_DATA.reputations);
    } else {
      try {
        const raw = await Nui.send('GetLSUDetails');
        if (!raw) return;
        const text = await raw.text();
        if (!text || text.trim() === '') return;
        const res = JSON.parse(text);
        if (res) { setChops(res.chopList ?? {}); setReps(res.reputations ?? []); }
      } catch (err) { console.error('[LSU] fetch error:', err); }
    }
    loadingRef.current = false;
    setLoading(false);
  }, 1000), []);

  useEffect(() => { fetch(); }, []);

  const tabBarStyle: React.CSSProperties = { flexShrink: 0, display: 'flex', height: 46, background: 'rgba(8,10,14,0.98)', borderTop: `1px solid ${T20}` };
  const tabStyle = (active: boolean): React.CSSProperties => ({ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 10, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', userSelect: 'none', gap: 6, color: active ? T : 'rgba(255,255,255,0.35)', borderTop: active ? `2px solid ${T}` : '2px solid transparent', background: active ? T10 : 'transparent', transition: 'all 0.2s' });

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 16px', height: 56, background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`, borderBottom: `1px solid ${T35}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
          <FontAwesomeIcon icon={['fas', 'screwdriver-wrench']} style={{ color: T, fontSize: 16 }} />
          LS Underground
        </div>
        <div style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${hexAlpha(T, 0.2)}`, cursor: 'pointer', color: T, fontSize: 14, opacity: loading ? 0.4 : 1, pointerEvents: loading ? 'none' : 'auto', transition: 'background 0.2s' }}
          onClick={() => fetch()}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T20)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
          <FontAwesomeIcon icon={['fas', 'arrows-rotate']} className={loading ? 'fa-spin' : ''} />
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ height: '100%' }} role="tabpanel" hidden={tab !== 0}>{tab === 0 && <ChopList chopList={chops} />}</div>
        <div style={{ height: '100%' }} role="tabpanel" hidden={tab !== 1}>{tab === 1 && <Reputations myReputations={reps} />}</div>
      </div>
      <div style={tabBarStyle}>
        {[{ label: 'Chop List', icon: 'screwdriver-wrench' as any }, { label: 'Reputation', icon: 'list' as any }].map((t, i) => (
          <div key={i} style={tabStyle(tab === i)} onClick={() => setTab(i)}>
            <FontAwesomeIcon icon={['fas', t.icon]} />{t.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LSUnderground;
