import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader } from '../../components';
import Nui from '../../util/Nui';
import { useAppColor, hexAlpha } from '../../hooks';

const Property: React.FC = () => {
  const dispatch = useDispatch();
  const T = useAppColor('leoassist');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T15 = hexAlpha(T, 0.15);
  const T08 = hexAlpha(T, 0.08);
  const T06 = hexAlpha(T, 0.06);

  const search = useSelector((state: any) => state.leo.propertySearch);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [focused, setFocused] = useState(false);

  const fetch = useMemo(() => debounce(async (value: string) => {
    try {
      const res = await (await Nui.send('SearchProperty', value)).json();
      dispatch({ type: 'SEARCH_RESULTS', payload: { type: 'property', results: res } });
    } catch {
      dispatch({ type: 'SEARCH_RESULTS', payload: { type: 'property', results: [] } });
    }
    setLoading(false); setSearched(true);
  }, 1000), []);

  useEffect(() => () => { fetch.cancel(); }, []);

  const onSearch = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); fetch(search.term); };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0a0c10' }}>
      {/* Search bar */}
      <div style={{ flexShrink: 0, padding: '10px 12px', borderBottom: `1px solid ${T15}` }}>
        <form onSubmit={onSearch}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: focused ? T20 : 'rgba(255,255,255,0.04)',
            border: `1px solid ${focused ? T50 : hexAlpha(T, 0.25)}`,
            borderRadius: 10, padding: '8px 12px', transition: 'all 0.2s',
          }}>
            <FontAwesomeIcon icon={['fas', 'magnifying-glass']} style={{ color: focused ? T : 'rgba(255,255,255,0.3)', fontSize: 13, flexShrink: 0 }} />
            <input
              value={search.term}
              onChange={e => { dispatch({ type: 'SEARCH_VAL_CHANGE', payload: { type: 'property', term: e.target.value } }); setSearched(false); }}
              onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              placeholder="Search by address..."
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 13, fontFamily: 'Oswald', caretColor: T }}
            />
            <button type="submit" style={{ background: 'transparent', border: 'none', color: T, cursor: 'pointer', padding: 0, fontSize: 14 }}>
              <FontAwesomeIcon icon={['fas', 'arrow-right']} />
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '8px 10px', scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
        {loading ? <Loader static text="Searching" /> : search.results.length > 0 ? (
          search.results.map((p: any, k: number) => {
            const open = expanded === k;
            return (
              <div key={k} style={{ marginBottom: 8, borderRadius: 10, border: `1px solid ${open ? T50 : T15}`, background: open ? T08 : T06, overflow: 'hidden', transition: 'all 0.15s' }}>
                <div onClick={() => setExpanded(open ? null : k)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', cursor: 'pointer', userSelect: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: T20, border: `1px solid ${T50}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T, fontSize: 13, flexShrink: 0 }}>
                      <FontAwesomeIcon icon={['fas', p.sold ? 'house-lock' : 'house']} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: '0.03em' }}>{p.label}</div>
                      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: p.sold ? '#ef5350' : '#66bb6a', marginTop: 1 }}>{p.sold ? 'Sold' : 'Available'}</div>
                    </div>
                  </div>
                  <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ color: T, fontSize: 11, transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }} />
                </div>
                {open && (
                  <div style={{ borderTop: `1px solid ${T15}`, padding: '8px 14px 12px' }}>
                    {[['Address', p.label], ['Status', p.sold ? 'Sold' : 'Available'], ['Owner', p.owner ?? 'No Owner']].map(([label, value]) => (
                      <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${T08}` }}>
                        <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{label}</span>
                        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: label === 'Status' ? (p.sold ? '#ef5350' : '#66bb6a') : '#fff' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : searched ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, paddingTop: 40, color: 'rgba(255,255,255,0.25)', fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: '0.08em' }}>
            <FontAwesomeIcon icon={['fas', 'house-circle-xmark']} style={{ fontSize: 28, color: T20 }} />
            No Results Found
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Property;
