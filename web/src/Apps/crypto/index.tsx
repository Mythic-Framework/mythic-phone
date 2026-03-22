import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { throttle } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../util/Nui';
import Exchange from './Exchange';
import Portfolio from './Portfolio';
import { Loader } from '../../components';
import { useAppColor, hexAlpha } from '../../hooks';

const BG = '#0a0c10';

const CryptoIndex: React.FC = () => {
  const dispatch = useDispatch();
  const T = useAppColor('crypto');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const activeTab = useSelector((state: any) => state.crypto.tab);
  const tcoins = useSelector((state: any) => state.data.data.cryptoCoins);
  const [loading, setLoading] = useState<boolean>(false);
  const [coins, setCoins] = useState<any[] | null>(null);

  const fetch = useMemo(() => throttle(async () => {
    if (loading) return;
    setLoading(true);
    try {
      let res = await (await Nui.send('GetCryptoCoins')).json();
      setCoins(res ? res : []);
    } catch (err) { console.log(err); setCoins(tcoins); }
    setLoading(false);
  }, 1000), []);

  useEffect(() => { fetch(); }, []);

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
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 8px 0 16px', height: 56,
        background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
        borderBottom: `1px solid ${T50}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
          <FontAwesomeIcon icon={['fas', 'coins']} style={{ color: T, fontSize: 16 }} />
          CryptoX
        </div>
        <div
          style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, transition: 'background 0.2s' }}
          onClick={() => fetch()}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T20)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
        >
          <FontAwesomeIcon className={loading ? 'fa-spin' : ''} icon={['fas', 'arrows-rotate']} />
        </div>
      </div>
      {!Boolean(coins) ? (
        <Loader static text="Loading Coins" />
      ) : (
        <>
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
              {activeTab === 0 && <Portfolio coins={coins!} loading={loading} onRefresh={fetch} />}
              {activeTab === 1 && <Exchange coins={coins!} loading={loading} onRefresh={fetch} />}
            </div>
          </div>
          <div style={tabBarStyle}>
            {['Portfolio', 'Xchange'].map((label, i) => (
              <div key={i} onClick={() => dispatch({ type: 'SET_CRYPTO_TAB', payload: { tab: i } })} style={tabStyle(activeTab === i)}>{label}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoIndex;
