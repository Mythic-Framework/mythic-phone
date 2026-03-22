import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMyApps, useAppColor, hexAlpha } from '../../hooks';
import StoreApp from './App';
import { RootState } from '../../store';

export default function MyList() {
  const T = useAppColor('store');
  const T20 = hexAlpha(T, 0.2);
  const T30 = hexAlpha(T, 0.3);
  const T12 = hexAlpha(T, 0.12);
  const T60 = hexAlpha(T, 0.6);

  const apps = useMyApps();
  const installed = useSelector((state: RootState) => state.data.data.player?.Apps?.installed ?? []);
  const [searchVal, setSearchVal] = useState('');
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    setFiltered(
      installed
        .filter((k: string) => apps[k]?.canUninstall && (apps[k]?.label.toUpperCase().includes(searchVal.toUpperCase()) || searchVal === ''))
        .map((k: string) => apps[k])
    );
  }, [searchVal, installed]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Search */}
      <div style={{ flexShrink: 0, padding: '12px 14px', borderBottom: `1px solid ${T12}`, background: 'rgba(8,10,14,0.6)' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.05)', border: `1px solid ${T30}`, borderRadius: 30, padding: '8px 14px', transition: 'border-color 0.2s' }}
          onFocus={e => (e.currentTarget.style.borderColor = hexAlpha(T, 0.7))}
          onBlur={e => (e.currentTarget.style.borderColor = T30)}>
          <FontAwesomeIcon icon={['fas', 'magnifying-glass']} style={{ color: T60, fontSize: 13, flexShrink: 0 }} />
          <input
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: '0.06em' }}
            placeholder="Search installed..."
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
          />
          {searchVal && (
            <FontAwesomeIcon icon={['fas', 'xmark']} style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, cursor: 'pointer' }} onClick={() => setSearchVal('')} />
          )}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8, scrollbarWidth: 'thin', scrollbarColor: `${T20} transparent` }}>
          {filtered.map((app: any) => <StoreApp key={app.name} app={app} installed />)}
        </div>
      ) : (
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', fontSize: 16, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em', color: 'rgba(255,255,255,0.25)' }}>
            No Apps Installed
          </div>
        </div>
      )}
    </div>
  );
}
