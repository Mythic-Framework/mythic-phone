import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../hooks';
import { Categories } from './data';
import Advert from './components/Advert';
import { RootState } from '../../store';

const catIcons: Record<string, any> = {
  'Services':      ['fas', 'briefcase'],
  'Want-To-Buy':   ['fas', 'cart-shopping'],
  'Want-To-Sell':  ['fas', 'tag'],
  'Help Wanted':   ['fas', 'handshake'],
};

export default function CategoryView() {
  const navigate = useNavigate();
  const T = useAppColor('adverts');
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);

  const { category } = useParams<{ category: string }>();
  const catData = Categories.find(cat => cat.label === category);
  const adverts = useSelector((state: RootState) => state.data.data.adverts) ?? {};
  const [filtered, setFiltered] = useState<Record<string, any>>({});

  useEffect(() => {
    const t: Record<string, any> = {};
    Object.keys(adverts).filter(a => a !== '0').forEach(a => {
      if (adverts[a]?.categories?.includes(category)) t[a] = adverts[a];
    });
    setFiltered(t);
  }, [adverts]);

  return (
    <div style={{ height: '100%', background: 'rgba(10,13,18,0.98)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 16px', height: 56, background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`, borderBottom: `1px solid ${T50}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
          <div
            onClick={() => navigate(-1)}
            style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, cursor: 'pointer', border: `1px solid ${T20}`, color: T, fontSize: 14, background: 'transparent', flexShrink: 0, transition: 'background 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
            <FontAwesomeIcon icon={['fas', 'chevron-left']} />
          </div>
          {catData && (
            <FontAwesomeIcon
              icon={catIcons[catData.label] ?? ['fas', 'tag']}
              style={{ fontSize: 16, flexShrink: 0, color: catData.color }}
            />
          )}
          <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 18, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {catData?.label}
          </span>
        </div>
      </div>

      {/* List */}
      {Object.keys(filtered).length > 0 ? (
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingTop: 10, scrollbarWidth: 'thin', scrollbarColor: `${hexAlpha(T, 0.3)} transparent` }}>
          {Object.keys(filtered).sort((a, b) => filtered[b].time - filtered[a].time).map((ad, i) => (
            <Advert key={i} advert={filtered[ad]} />
          ))}
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'rgba(255,255,255,0.25)', fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          No listings in this category
        </div>
      )}
    </div>
  );
}
