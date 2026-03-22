import React from 'react';
import { useSelector } from 'react-redux';
import { useAppColor, hexAlpha } from '../../hooks';
import MyCoin from './components/MyCoin';

interface Props { coins: any[]; loading: boolean; onRefresh?: () => void; }

const Portfolio: React.FC<Props> = ({ coins }) => {
  const T = useAppColor('crypto');
  const T20 = hexAlpha(T, 0.2);

  const player = useSelector((state: any) => state.data.data.player);

  const ownedCoins = Boolean(coins) && Boolean(player.Crypto)
    ? coins.filter((c) => Boolean(player.Crypto[c.Short]))
    : [];

  if (!Boolean(ownedCoins) || Object.keys(ownedCoins).length === 0) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'rgba(255,255,255,0.25)', fontFamily: "'Oswald', sans-serif", fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      <svg style={{ fontSize: 32, color: T20, width: 32, height: 32 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 256 128 208 128C124 128 64 152 64 176c0 5.3 4.1 10.5 11.4 15.4L44.7 228.1C16.7 212.9 0 195 0 176c0-52.8 114.6-96 256-96c88.8 0 167.2 19.6 211.3 49.2C484.3 136.1 512 108.5 512 80zM208 256c-41.8 0-81.4-6.5-113.7-17.8L48 266.7V288c0 17.3 14.1 33.2 37.3 46.6L64 384c0 52.8 114.6 96 256 96s256-43.2 256-96V304.7l-21.3-49.5C554.1 289.2 512 304 464 304c-61.9 0-116.1-20.5-148.5-51.6C296.5 254.8 272.3 256 256 256H208z"/></svg>
      You Don't Own Any Crypto
    </div>
  );

  return (
    <div style={{ padding: 10, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {Object.keys(player.Crypto).map((k: string) => (
        <MyCoin key={`coin-${k}`} coin={coins.filter((c) => c.Short == k)[0]} owned={{ Short: k, Quantity: player.Crypto[k] }} />
      ))}
    </div>
  );
};

export default Portfolio;
