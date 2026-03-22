import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TweetList from './TweetList';
import MyProfile from './MyProfile';
import { RootState, AppDispatch } from '../../store';
import { useAppColor, hexAlpha } from '../../hooks';

const BG = '#0a0c10';

export default function TwitterIndex() {
  const dispatch = useDispatch<AppDispatch>();
  const T = useAppColor('twitter');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const activeTab = useSelector((state: RootState) => (state as any).twitter?.tab ?? 0);
  const player = useSelector((state: RootState) => state.data.data.player);
  const [tweetOpen, setTweetOpen] = useState(false);

  const btnStyle: React.CSSProperties = { width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, transition: 'background 0.2s' };
  const tabBarStyle: React.CSSProperties = { flexShrink: 0, display: 'flex', height: 46, background: 'rgba(8,10,14,0.98)', borderTop: `1px solid ${T20}` };
  const tabStyle = (active: boolean): React.CSSProperties => ({ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', userSelect: 'none', color: active ? T : 'rgba(255,255,255,0.35)', borderTop: active ? `2px solid ${T}` : '2px solid transparent', background: active ? T20 : 'transparent', transition: 'all 0.2s' });

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, padding: '0 8px 0 16px', background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`, borderBottom: `1px solid ${T50}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
          <FontAwesomeIcon icon={['fab', 'twitter']} style={{ fontSize: 16, color: T }} />
          Twitter
        </div>
        {activeTab === 0 && (
          <div style={{ display: 'flex', gap: 6 }}>
            {tweetOpen
              ? <div style={btnStyle} onClick={() => setTweetOpen(false)}><FontAwesomeIcon icon={['fas', 'arrow-left']} /></div>
              : <div style={{ ...btnStyle, opacity: !player.Alias?.twitter ? 0.3 : 1 }} onClick={() => player.Alias?.twitter && setTweetOpen(true)}><FontAwesomeIcon icon={['fas', 'plus']} /></div>
            }
          </div>
        )}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {activeTab === 0 && <TweetList tweetOpen={tweetOpen} setTweetOpen={setTweetOpen} />}
        {activeTab === 1 && <MyProfile />}
      </div>
      <div style={tabBarStyle}>
        {[{ icon: 'bars' }, { icon: 'user' }].map((t, i) => (
          <div key={i} onClick={() => dispatch({ type: 'SET_TWITTER_TAB', payload: { tab: i } })} style={tabStyle(activeTab === i)}>
            <FontAwesomeIcon icon={['fas', t.icon as any]} style={{ fontSize: 15 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
