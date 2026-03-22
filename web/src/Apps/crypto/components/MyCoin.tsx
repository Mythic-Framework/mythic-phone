import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat } from 'react-number-format';
import { TextField } from '@mui/material';

import Nui from '../../../util/Nui';
import { Modal, Loader } from '../../../components';
import { CurrencyFormat } from '../../../util/Parser';
import { useAlert, useAppColor, hexAlpha } from '../../../hooks';

const GREEN = '#4caf7a';
const GREEN20 = 'rgba(76,175,122,0.15)';

interface Props { coin: any; owned: { Short: string; Quantity: number }; }

const MyCoin: React.FC<Props> = ({ coin, owned }) => {
  const showAlert = useAlert();
  const T = useAppColor('crypto');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T15 = hexAlpha(T, 0.15);
  const T07 = hexAlpha(T, 0.07);

  const player = useSelector((state: any) => state.data.data.player);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [selling, setSelling] = useState<any>(null);

  const inputSx = {
    mb: '15px',
    '& .MuiOutlinedInput-root': { background: 'rgba(255,255,255,0.03)', borderRadius: '8px', '& fieldset': { borderColor: hexAlpha(T, 0.3) }, '&:hover fieldset': { borderColor: hexAlpha(T, 0.6) }, '&.Mui-focused fieldset': { borderColor: T } },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: T },
    '& .MuiInputBase-input': { color: '#fff' },
    '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: 'rgba(255,255,255,0.3)' },
  };

  const onSell = async (e: any) => {
    setLoading(true);
    try {
      let res = await (await Nui.send('SellCrypto', { Short: owned.Short, Quantity: selling.Quantity })).json();
      if (!res.error) { showAlert(`Sold ${e.target.quantity.value} ${coin.Name}`); setSelling(null); }
      else showAlert(`Unable to Sell ${coin.Name}`);
    } catch (err) { console.log(err); showAlert(`Unable to Sell ${coin.Name}`); }
    setSelling(false);
    setLoading(false);
  };

  const onTransfer = async (e: any) => {
    setLoading(true);
    try {
      let res = await (await Nui.send('TransferCrypto', { Short: owned.Short, Quantity: +e.target.quantity.value, Target: e.target.target.value })).json();
      if (res) showAlert(`Sent ${e.target.quantity.value} ${Boolean(coin) ? coin.Name : owned.Short}`);
      else showAlert(`Unable to Transfer ${Boolean(coin) ? coin.Name : owned.Short}`);
    } catch (err) { console.log(err); showAlert(`Unable to Transfer ${Boolean(coin) ? coin.Name : owned.Short}`); }
    setSending(false);
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

  const btnBase: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 5,
    padding: '6px 10px', borderRadius: 4,
    border: `1px solid ${hexAlpha(T, 0.3)}`,
    background: 'transparent', color: 'rgba(139,188,212,0.85)',
    fontSize: 11, fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.08em', textTransform: 'uppercase',
    cursor: 'pointer', transition: 'all 0.15s',
  };

  const sellBtnBase: React.CSSProperties = {
    ...btnBase,
    borderColor: 'rgba(76,175,122,0.3)', color: GREEN,
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
          <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 15, color: T, letterSpacing: '0.04em' }}>{coin ? coin.Name : owned.Short}</div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 2, letterSpacing: '0.05em' }}>${owned.Short} · Wallet: {player.CryptoWallet}</div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13, color: GREEN, letterSpacing: '0.04em' }}>{owned.Quantity} owned</div>
        </div>
        {owned.Quantity > 0 && (
          <div style={{ display: 'flex', gap: 6 }}>
            {Boolean(coin) && Boolean(coin.Sellable) && (
              <button
                style={sellBtnBase}
                onClick={() => setSelling({ Price: coin.Price, Quantity: 1 })}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GREEN20; (e.currentTarget as HTMLElement).style.borderColor = GREEN; (e.currentTarget as HTMLElement).style.color = '#6fdc9a'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(76,175,122,0.3)'; (e.currentTarget as HTMLElement).style.color = GREEN; }}
              >
                <FontAwesomeIcon icon={['fas', 'dollar-sign']} /> Sell
              </button>
            )}
            <button
              style={btnBase}
              onClick={() => setSending(true)}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T; (e.currentTarget as HTMLElement).style.color = T; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = hexAlpha(T, 0.3); (e.currentTarget as HTMLElement).style.color = 'rgba(139,188,212,0.85)'; }}
            >
              <FontAwesomeIcon icon={['fas', 'arrow-up-from-bracket']} /> Send
            </button>
          </div>
        )}
      </div>

      {sending && (
        <Modal form formStyle={{ position: 'relative' }} open={true} title={`Send $${owned.Short}`} onClose={() => setSending(false)} onAccept={onTransfer} submitLang="Send" closeLang="Cancel" appColor={T}>
          <>
            {loading && <Loader static text="Sending" />}
            <TextField fullWidth required label="Target Wallet ID" name="target" sx={inputSx} disabled={loading} />
            <NumericFormat fullWidth required label="Quantity" name="quantity" sx={inputSx} disabled={loading} type="tel" customInput={TextField} />
          </>
        </Modal>
      )}
      {Boolean(selling) && (
        <Modal form formStyle={{ position: 'relative' }} open={true} title={`Sell $${owned.Short}`} onClose={() => setSelling(null)} onAccept={onSell} submitLang="Sell" closeLang="Cancel" appColor={T}>
          <>
            {loading && <Loader static text="Selling" />}
            <TextField fullWidth label="Price Per Unit" disabled={true} sx={inputSx} value={CurrencyFormat.format(coin.Sellable)} />
            <NumericFormat fullWidth required label="Quantity" name="quantity" sx={inputSx} disabled={loading} value={selling.Quantity} onValueChange={(v: any) => setSelling({ ...selling, Quantity: isNaN(+v.value) ? selling.Quantity : +v.value })} isAllowed={({ floatValue }: any) => (floatValue ?? 0) >= 1 && (floatValue ?? 0) <= owned.Quantity} type="tel" customInput={TextField} />
            <TextField fullWidth label="You Will Receive" disabled={true} sx={inputSx} value={CurrencyFormat.format(coin.Sellable * selling.Quantity)} />
          </>
        </Modal>
      )}
    </>
  );
};

export default MyCoin;
