import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, InputAdornment, IconButton, Alert, Slider } from '@mui/material';
import { debounce } from 'lodash';
import { NumericFormat as NumberFormat } from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from './assets/dyn8.png';
import { useAlert, useJobPermissions, useAppColor, hexAlpha } from '../../hooks';
import { Loader, Modal, Confirm } from '../../components';
import Nui from '../../util/Nui';
import Property from './components/Property';
import { CurrencyFormat } from '../../util/Parser';

// ── Custom single-select ──────────────────────────────────────────────────────
interface SelectOption { value: any; label: string }
interface CustomSelectProps {
  label: string;
  value: any;
  options: SelectOption[];
  onChange: (value: any) => void;
  T: string;
  style?: React.CSSProperties;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, options, onChange, T, style }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', ...style }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '14px 36px 14px 14px',
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: `1px solid ${open ? T : hexAlpha(T, 0.3)}`,
          borderRadius: open ? '8px 8px 0 0' : 8,
          color: '#fff', fontFamily: "'Oswald', sans-serif",
          fontSize: 14, letterSpacing: '0.03em',
          cursor: 'pointer', transition: 'border-color 0.15s',
          userSelect: 'none', position: 'relative',
        }}
      >
        <span style={{
          position: 'absolute', top: -9, left: 10,
          fontSize: 11, letterSpacing: '0.04em',
          color: open ? T : 'rgba(255,255,255,0.4)',
          background: 'rgba(12,16,22,1)', padding: '0 4px',
          fontFamily: "'Oswald', sans-serif",
          transition: 'color 0.15s', pointerEvents: 'none',
        }}>
          {label}
        </span>
        {selected?.label ?? ''}
        <span style={{
          position: 'absolute', right: 12, top: '50%',
          transform: `translateY(-50%) rotate(${open ? '180deg' : '0deg'})`,
          transition: 'transform 0.2s',
          color: 'rgba(255,255,255,0.4)', fontSize: 11, pointerEvents: 'none',
        }}>
          <FontAwesomeIcon icon="chevron-down" />
        </span>
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10002,
          backgroundColor: '#0a0c10',
          backgroundImage: `linear-gradient(90deg, ${T20} 0%, rgba(8,10,14,0.97) 100%)`,
          border: `1px solid ${T50}`,
          borderTop: `1px solid ${hexAlpha(T, 0.15)}`,
          borderRadius: '0 0 8px 8px',
          boxShadow: `0 8px 24px rgba(0,0,0,0.6)`,
          overflow: 'hidden',
        }}>
          {options.map(opt => {
            const isSelected = opt.value === value;
            return (
              <div
                key={String(opt.value)}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                style={{
                  padding: '9px 14px',
                  paddingLeft: isSelected ? 11 : 14,
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 13, letterSpacing: '0.04em',
                  color: isSelected ? T : '#fff',
                  background: isSelected ? T20 : 'transparent',
                  borderLeft: isSelected ? `3px solid ${T}` : '3px solid transparent',
                  cursor: 'pointer', transition: 'background 0.12s', userSelect: 'none',
                }}
                onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = T20; }}
                onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── Themed tooltip button ─────────────────────────────────────────────────────
interface TooltipBtnProps {
  icon: any;
  label: string;
  onClick: () => void;
  T: string;
  accentLight: string;
}

const TooltipBtn: React.FC<TooltipBtnProps> = ({ icon, label, onClick, T, accentLight }) => {
  const [hov, setHov] = useState(false);
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Button */}
      <div
        onClick={onClick}
        style={{
          width: 34, height: 34,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 6,
          border: `1px solid ${hov ? T50 : hexAlpha(T, 0.2)}`,
          background: hov ? T20 : 'transparent',
          color: hov ? accentLight : 'rgba(255,255,255,0.45)',
          fontSize: 15, cursor: 'pointer',
          transition: 'all 0.15s',
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </div>

      {/* Tooltip — floats to the LEFT of the button */}
      {hov && (
        <div style={{
          position: 'absolute',
          top: '50%',
          right: 'calc(100% + 10px)',
          transform: 'translateY(-50%)',
          zIndex: 99999,
          whiteSpace: 'nowrap',
          backgroundColor: 'rgb(8,10,14)',
          backgroundImage: `linear-gradient(90deg, ${hexAlpha(T, 0.35)} 0%, rgba(8,10,14,1) 100%)`,
          border: `1px solid ${T50}`,
          borderRadius: 8,
          padding: '8px 16px',
          fontFamily: "'Oswald', sans-serif",
          fontSize: 13,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: accentLight,
          boxShadow: `0 4px 16px rgba(0,0,0,0.6)`,
          pointerEvents: 'none',
        }}>
          {label}
          {/* Arrow pointing right toward the button */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: -5,
            transform: 'translateY(-50%) rotate(45deg)',
            width: 8, height: 8,
            backgroundColor: 'rgb(8,10,14)',
            border: `1px solid ${T50}`,
            borderBottom: 'none', borderLeft: 'none',
          }} />
        </div>
      )}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const Dyn8Index: React.FC = () => {
  const dispatch = useDispatch();
  const showAlert = useAlert();
  const hasJobPerm = useJobPermissions();
  const T = useAppColor('dyn8');
  const T20 = hexAlpha(T, 0.2);
  const T30 = hexAlpha(T, 0.3);
  const T40 = hexAlpha(T, 0.4);
  const T50 = hexAlpha(T, 0.5);
  const search = useSelector((state: any) => state.dyn8.propertySearch);

  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<any>(null);
  const [selling, setSelling] = useState<any>(null);
  const [sellConf, setSellConf] = useState(false);
  const [creditCheck, setCreditCheck] = useState<any>(null);
  const [creditCheckView, setCreditCheckView] = useState<any>(null);

  const onSearchChange = (e: any) => { dispatch({ type: 'DYN8_SEARCH_CHANGE', payload: { term: e.target.value } }); setSearched(false); };
  const onSearch = (e: any) => { e.preventDefault(); setLoading(true); fetch(search.term); };
  const onSell = (e: any) => { if (!hasJobPerm('JOB_SELL', 'realestate')) return; setSelling({ ...e, target: '', loan: false, deposit: 20, time: 8 }); };
  const onCheckCredit = () => setCreditCheck({ target: '' });

  const onStartCreditCheck = async () => {
    try {
      let res = await (await Nui.send('Dyn8:CheckCredit', { target: +creditCheck.target })).json();
      setCreditCheck(null);
      if (res) setCreditCheckView(res);
      else showAlert('Error');
    } catch { showAlert('Error'); }
  };

  const onStartSale = async () => {
    try {
      let res = await (await Nui.send('Dyn8:SellProperty', { property: selling._id, target: +selling.target, loan: selling.loan, deposit: selling.deposit, time: selling.time })).json();
      if (!res.error) showAlert('Notification of Sale Sent To Client');
      else {
        const msgs: Record<number, string> = { 0: 'Not on Duty', 1: 'Invalid Property', 2: 'Property Already Being Sold', 3: 'Invalid Target' };
        showAlert(msgs[res.code] ?? 'Error');
      }
      setSellConf(false); setSelling(null);
    } catch { showAlert('Unable to Start Sale Process'); }
  };

  const fetch = useMemo(() => debounce(async (value: string) => {
    try {
      let res = await (await Nui.send('Dyn8:SearchProperty', value)).json();
      dispatch({ type: 'DYN8_RESULTS', payload: { results: res } });
    } catch { dispatch({ type: 'DYN8_RESULTS', payload: { results: [] } }); }
    setLoading(false); setSearched(true);
  }, 1000), []);

  useEffect(() => {
    if (import.meta.env.DEV) {
      const mockResults = [
        { _id: 'prop_001', label: '1 Rockford Hills Drive', price: 850000, sold: false, owner: null },
        { _id: 'prop_002', label: '2 Portola Drive, Apt 3B', price: 320000, sold: true, owner: { First: 'Jane', Last: 'Doe' } },
        { _id: 'prop_003', label: '15 Vinewood Boulevard', price: 1200000, sold: false, owner: null },
      ];
      dispatch({ type: 'DYN8_RESULTS', payload: { results: mockResults } });
      setSearched(true);
    }
    return () => { fetch.cancel(); };
  }, []);

  const calcLoan = (full: number, dp: number) => Math.round((full - dp) * 1.15);
  const accentLight = T === '#136231' ? '#4caf50' : T;

  const fieldSx = {
    width: '100%', marginBottom: '15px',
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255,255,255,0.03)', borderRadius: '8px',
      '& fieldset': { borderColor: hexAlpha(T, 0.3) },
      '&:hover fieldset': { borderColor: hexAlpha(T, 0.6) },
      '&.Mui-focused fieldset': { borderColor: T },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: T },
    '& .MuiInputBase-input': { color: '#fff' },
    '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: 'rgba(255,255,255,0.3)' },
  };

  return (
    <>
      <div style={{ height: '100%', background: 'rgba(10,13,18,0.98)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        <img src={logo} style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, margin: 'auto', width: '100%', maxWidth: 200, opacity: 0.04, pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 16px', height: 56, background: `linear-gradient(135deg, ${hexAlpha(T, 0.3)} 0%, rgba(10,13,18,0) 100%)`, borderBottom: `1px solid ${T40}`, zIndex: 1, overflow: 'visible' }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 600, letterSpacing: '0.08em', color: accentLight, display: 'flex', alignItems: 'center', gap: 10 }}>
            <FontAwesomeIcon icon={['fas', 'house']} style={{ fontSize: 18 }} />
            Dynasty 8
          </div>
          {hasJobPerm('JOB_SELL', 'realestate') && (
            <TooltipBtn
              icon={['fas', 'sack-dollar']}
              label="Check Credit"
              onClick={onCheckCredit}
              T={T}
              accentLight={accentLight}
            />
          )}
        </div>
        <div style={{ flexShrink: 0, padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', zIndex: 1 }}>
          <form onSubmit={onSearch}>
            <TextField required fullWidth size="small" value={search.term} onChange={onSearchChange} label="Search Property"
              InputProps={{ endAdornment: <InputAdornment position="end"><IconButton size="small" type="submit"><FontAwesomeIcon icon={['fas', 'magnifying-glass-location']} /></IconButton></InputAdornment> }} />
          </form>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: 10, zIndex: 1 }}>
          {loading ? <Loader static text="Loading" />
            : search.results.length > 0
            ? search.results.map((v: any, k: number) => (
              <Property key={`property-${k}`} expanded={expanded === k} property={v} onSell={onSell} onClick={expanded === k ? () => setExpanded(null) : () => setExpanded(k)} />
            ))
            : searched ? <Alert variant="filled" severity="error">No Search Results</Alert> : null}
        </div>
      </div>

      {Boolean(selling) && (
        <>
          <Modal form formStyle={{ position: 'relative', overflow: 'visible' }} open={true} title={`Sell ${selling.label}`} onClose={() => { setSellConf(false); setSelling(null); }} onAccept={() => setSellConf(true)} submitLang="Begin Sale" closeLang="Cancel" appColor={T}>
            <>
              {loading && <Loader static text="Submitting" />}
              <TextField fullWidth label="Price" value={CurrencyFormat.format(selling.price)} disabled sx={{ ...fieldSx }} />
              <CustomSelect
                T={T} label="Sale Type" value={selling.loan}
                options={[{ value: false, label: 'Cash Sale' }, { value: true, label: 'Loan' }]}
                onChange={val => setSelling({ ...selling, loan: val })}
                style={{ marginBottom: 15 }}
              />
              {Boolean(selling.loan) && <>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Oswald', sans-serif", fontSize: 13, margin: '0 0 6px' }}>
                  Deposit: {CurrencyFormat.format(Math.ceil(selling.price * (selling.deposit / 100)))}
                </p>
                <Slider size="small" style={{ marginBottom: 15, width: '90%', marginLeft: '5%' }} value={selling.deposit} onChange={(e: any) => setSelling({ ...selling, deposit: e.target.value })} min={20} step={5} max={75} valueLabelDisplay="auto" valueLabelFormat={(x: number) => `${x}%`} />
                <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Oswald', sans-serif", fontSize: 13, margin: '0 0 6px' }}>
                  Length: {selling.time} Weeks
                </p>
                <Slider size="small" style={{ marginBottom: 15, width: '90%', marginLeft: '5%' }} value={selling.time} onChange={(e: any) => setSelling({ ...selling, time: e.target.value })} min={8} step={1} max={24} valueLabelDisplay="auto" />
                <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Oswald', sans-serif", fontSize: 13, margin: '0 0 4px' }}>
                  Remaining After Interest: {CurrencyFormat.format(calcLoan(selling.price, selling.price * (selling.deposit / 100)))}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Oswald', sans-serif", fontSize: 13, margin: '0 0 12px' }}>
                  Weekly Payments: {CurrencyFormat.format(calcLoan(selling.price, selling.price * (selling.deposit / 100)) / selling.time)}
                </p>
              </>}
              <NumberFormat fullWidth required autoFocus label="Target State ID" value={selling.target} disabled={loading} onChange={(e: any) => setSelling({ ...selling, target: e.target.value })} type="tel" valueIsNumericString customInput={TextField} sx={{ ...fieldSx, mb: 0 }} />
            </>
          </Modal>
          <Confirm title="Start Sale?" open={sellConf} confirm="Yes" decline="No" onConfirm={onStartSale} onDecline={() => setSellConf(false)}>
            <p>By starting this sale, nobody else will be able to begin the sale process for this property until the client either declines or it times out.</p>
          </Confirm>
        </>
      )}

      {Boolean(creditCheck) && (
        <Modal form formStyle={{ position: 'relative' }} open={true} title="Check Credit" onClose={() => setCreditCheck(null)} onAccept={onStartCreditCheck} submitLang="Check Credit" closeLang="Cancel" appColor={T}>
          <>
            {loading && <Loader static text="Submitting" />}
            <NumberFormat fullWidth required autoFocus label="Target State ID" style={{ marginBottom: 15 }} value={creditCheck.target} disabled={loading} onChange={(e: any) => setCreditCheck({ ...creditCheck, target: e.target.value })} type="tel" valueIsNumericString customInput={TextField} />
          </>
        </Modal>
      )}

      {Boolean(creditCheckView) && (
        <Confirm title="Credit Check Results" open={true} confirm="Okay" decline="Dismiss" onConfirm={() => setCreditCheckView(null)} onDecline={() => setCreditCheckView(null)}>
          <p>{creditCheckView.First} {creditCheckView.Last} has a credit score of {creditCheckView.Score} so can take out a loan of up to {CurrencyFormat.format(creditCheckView.Amount)}</p>
        </Confirm>
      )}
    </>
  );
};

export default Dyn8Index;
