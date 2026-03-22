import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat } from 'react-number-format';
import { TextField } from '@mui/material';

import Nui from '../../../util/Nui';
import { Modal, Loader } from '../../../components';
import { CurrencyFormat } from '../../../util/Parser';
import { useAlert, useAppColor, hexAlpha } from '../../../hooks';

const GREEN = '#4caf7a';
const GREEN20 = 'rgba(76,175,122,0.15)';

interface Props { coin: any; }

const XchangeCoin: React.FC<Props> = ({ coin }) => {
  const showAlert = useAlert();
  const T = useAppColor('crypto');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T15 = hexAlpha(T, 0.15);
  const T07 = hexAlpha(T, 0.07);

  const [loading, setLoading] = useState(false);
  const [buying, setBuying] = useState<any>(null);

  const inputSx = {
    mb: '15px',
    '& .MuiOutlinedInput-root': { background: 'rgba(255,255,255,0.03)', borderRadius: '8px', '& fieldset': { borderColor: hexAlpha(T, 0.3) }, '&:hover fieldset': { borderColor: hexAlpha(T, 0.6) }, '&.Mui-focused fieldset': { borderColor: T } },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: T },
    '& .MuiInputBase-input': { color: '#fff' },
    '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: 'rgba(255,255,255,0.3)' },
  };

  const onBuy = async (_e: any) => {
    setLoading(true);
    try {
      let res = await (await Nui.send('BuyCrypto', { Short: coin.Short, Quantity: buying.Quantity })).json();
      if (!res.error) { showAlert(`Purchased ${coin.Name}`); setBuying(null); }
      else showAlert(`Unable to Buy ${coin.Name}`);
    } catch (err) { console.log(err); showAlert(`Unable to Buy ${coin.Name}`); }
    setBuying(null);
    setLoading(false);
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '14px 16px',
    background: `linear-gradient(135deg, ${T07} 0%, rgba(255,255,255,0.02) 100%)`,
    border: `1px solid ${T15}`,
    borderLeft: `3px solid ${T}`,
    borderRadius: 4,
    marginBottom: 8,
    transition: 'border-color 0.2s, background 0.2s',
    cursor: 'default',
  };

  return (
    <>
      <div
        style={rowStyle}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, ${T07} 0%, rgba(255,255,255,0.02) 100%)`; (e.currentTarget as HTMLElement).style.borderColor = T15; }}
      >
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(176,230,85,0.12)', border: '1px solid rgba(176,230,85,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b0e655', fontSize: 18, flexShrink: 0 }}>
          <FontAwesomeIcon icon={['fab', 'bitcoin']} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 15, color: T, letterSpacing: '0.04em' }}>
            {coin.Name}{' '}
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>${coin.Short}</span>
          </div>
          {coin.Price > 0 && <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: GREEN, marginTop: 2, letterSpacing: '0.04em' }}>${coin.Price.toLocaleString()} / coin</div>}
        </div>
        <button
          style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 4, background: GREEN20, border: '1px solid rgba(76,175,122,0.4)', color: GREEN, fontSize: 12, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.15s' }}
          onClick={() => setBuying({ Price: coin.Price, Quantity: 1 })}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(76,175,122,0.25)'; (e.currentTarget as HTMLElement).style.borderColor = GREEN; (e.currentTarget as HTMLElement).style.color = '#6fdc9a'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = GREEN20; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(76,175,122,0.4)'; (e.currentTarget as HTMLElement).style.color = GREEN; }}
        >
          <FontAwesomeIcon icon={['fas', 'bag-shopping']} /> Buy
        </button>
      </div>

      {Boolean(buying) && (
        <Modal form formStyle={{ position: 'relative' }} open={true} title={`Buy $${coin.Short}`} onClose={() => setBuying(null)} onAccept={onBuy} submitLang={`Buy ${coin.Name}`} closeLang="Cancel" appColor={T}>
          <>
            {loading && <Loader static text="Buying" />}
            <TextField fullWidth label="Price Per Unit" disabled={true} sx={inputSx} value={CurrencyFormat.format(buying.Price)} />
            <NumericFormat fullWidth required label="Quantity" sx={inputSx} value={buying.Quantity} disabled={loading} onValueChange={(v: any) => setBuying({ ...buying, Quantity: +v.value })} type="tel" customInput={TextField} />
            <TextField fullWidth label="You Will Pay" disabled={true} sx={inputSx} value={CurrencyFormat.format(buying.Price * buying.Quantity)} />
          </>
        </Modal>
      )}
    </>
  );
};

export default XchangeCoin;
