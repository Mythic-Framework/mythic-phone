import React from 'react';
import { useAppColor, hexAlpha } from '../../hooks';
import XchangeCoin from './components/XchangeCoin';

interface Props { coins: any[]; loading: boolean; onRefresh?: () => void; }

const Exchange: React.FC<Props> = ({ coins }) => {
  const T = useAppColor('crypto');
  const T20 = hexAlpha(T, 0.2);

  const buyable = coins.filter((c) => c.Buyable);

  if (buyable.length === 0) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'rgba(255,255,255,0.25)', fontFamily: "'Oswald', sans-serif", fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      <svg style={{ width: 32, height: 32, color: T20 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor"><path d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
      No Coins Listed On Xchange
    </div>
  );

  return (
    <div style={{ padding: 10, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {buyable.map((coin) => <XchangeCoin key={`coin-${coin.Short}`} coin={coin} />)}
    </div>
  );
};

export default Exchange;
