import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Latest from './Latest';
import Categories from './Categories';
import { RootState } from '../../store';
import { useAppColor, hexAlpha } from '../../hooks';
import Nui from '../../util/Nui';

const BG = '#0a0c10';

const MOCK_ADVERTS: Record<string, any> = {
  1: { id: 1, title: 'Canyon Run Tonight — 5K Buy-In', author: 'Testy McTest', number: '121-195-9016', time: Date.now() - 1000 * 60 * 5, price: 5000, short: 'Organised race, canyon carve route. All skill levels welcome.', full: 'Meeting at the tunnel entrance on the east side of the canyon at midnight. Buy-in is $5,000, winner takes the pot. Clean race, no contact. Reach out to confirm your spot.', categories: ['Services'] },
  2: { id: 2, title: 'Mobile Mechanic — All Makes', author: 'Ray Kowalski', number: '555-201-3344', time: Date.now() - 1000 * 60 * 15, price: 0, short: 'On-site repairs, mods, and tune-ups. Fast response across the city.', full: 'Certified mechanic with 10+ years experience. I come to you — no towing needed. Specialising in engine work, suspension, custom bodywork, and performance tuning. Available most evenings and weekends.', categories: ['Services'] },
  3: { id: 3, title: 'Looking for a Clean Kuruma', author: 'D. Mercer', number: '555-874-0021', time: Date.now() - 1000 * 60 * 45, price: 85000, short: 'Cash in hand, needs to be clean with no damage history.', full: 'Serious buyer looking for a Kuruma in excellent condition. Preferably dark colour. Will pay a fair price for the right car. Contact by phone only.', categories: ['Want-To-Buy'] },
  4: { id: 4, title: 'Selling: Penthouse Unit — Rockford Hills', author: 'Sofia Bellante', number: '555-309-7712', time: Date.now() - 1000 * 60 * 90, price: 420000, short: 'Top floor penthouse, fully furnished, stunning views.', full: 'Luxury penthouse in the heart of Rockford Hills. 3 bedrooms, open plan living, private garage access. All appliances included. Ideal for serious buyers only — viewings by appointment.', categories: ['Want-To-Sell'] },
  5: { id: 5, title: 'Security Staff Needed — Nightclub', author: 'Club Tequi-la-la', number: '555-660-1190', time: Date.now() - 1000 * 60 * 120, price: 0, short: 'Looking for reliable door staff for weekend shifts.', full: 'We are hiring experienced security personnel for Friday and Saturday night shifts at a well-known Vinewood venue. Must be presentable, calm under pressure, and available on short notice. Pay discussed on application.', categories: ['Help Wanted'] },
  6: { id: 6, title: 'Unlicensed Firearms — Discreet', author: 'anon5519', number: '555-000-9921', time: Date.now() - 1000 * 60 * 200, price: 15000, short: 'Various items available. No questions asked. Serious buyers only.', full: 'Inventory changes frequently. Get in touch and I will let you know what is available. Cash deals only, meet in person.', categories: ['Want-To-Sell', 'Services'] },
  7: { id: 7, title: 'Towing & Recovery — 24/7', author: 'Santos Towing Co.', number: '555-477-3300', time: Date.now() - 1000 * 60 * 300, price: 500, short: 'Stuck? Impounded? We get you moving again.', full: 'Citywide towing and recovery service operating around the clock. Flat fee for standard tow. Additional charges may apply for specialty vehicles. Call or text anytime.', categories: ['Services'] },
};

export default function AdvertsIndex() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const T = useAppColor('adverts');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const [tab, setTab] = useState(0);
  const tabs = ['Latest', 'Categories'];

  useEffect(() => {
    if (import.meta.env.DEV) {
      dispatch({ type: 'SET_DATA', payload: { type: 'adverts', data: MOCK_ADVERTS } });
    } else {
      (async () => {
        try {
          const raw = await Nui.send('GetAdverts');
          if (!raw) return;
          const text = await raw.text();
          if (!text || text.trim() === '') return;
          const data = JSON.parse(text);
          if (data) dispatch({ type: 'SET_DATA', payload: { type: 'adverts', data } });
        } catch (e) { console.error('[Adverts] fetch error:', e); }
      })();
    }
  }, []);

  const headerStyle: React.CSSProperties = {
    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 8px 0 16px', height: 56,
    background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
    borderBottom: `1px solid ${T50}`,
  };
  const headerTitleStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 10,
    fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600,
    letterSpacing: '0.08em', color: '#fff',
  };
  const headerBtnStyle: React.CSSProperties = {
    width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14,
    background: 'transparent', transition: 'background 0.2s, border-color 0.2s',
  };
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
      <div style={headerStyle}>
        <div style={headerTitleStyle}>
          <FontAwesomeIcon icon={['fas', 'newspaper']} style={{ color: T }} />
          Yellow Pages
        </div>
        {tab === 0 && (
          <div style={headerBtnStyle}
            onClick={() => navigate('/apps/adverts/add')}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </div>
        )}
      </div>
      <div style={{ flex: 1, padding: '0 0 0 10px', overflow: 'hidden' }}>
        <div style={{ height: '100%' }} role="tabpanel" hidden={tab !== 0}>{tab === 0 && <Latest />}</div>
        <div style={{ height: '100%' }} role="tabpanel" hidden={tab !== 1}>{tab === 1 && <Categories />}</div>
      </div>
      <div style={tabBarStyle}>
        {tabs.map((label, i) => (
          <div key={i} onClick={() => setTab(i)} style={tabStyle(tab === i)}>{label}</div>
        ))}
      </div>
    </div>
  );
}
