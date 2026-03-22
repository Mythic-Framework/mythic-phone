import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../util/Nui';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import { Modal } from '../../components';
import { RootState } from '../../store';

interface Props { setLoading: (v: any) => void; refreshAccounts: () => void; }

// ── Custom single-select — stays inside phone DOM, no MUI portal ──────────────
interface SelectOption { value: any; label: string; disabled?: boolean }
interface CustomSelectProps {
  label: string;
  hint?: string;
  value: any;
  options: SelectOption[];
  onChange: (value: any) => void;
  T: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, hint, value, options, onChange, T }) => {
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
    <div ref={ref} style={{ position: 'relative', marginBottom: 16, width: '100%' }}>
      {/* Field */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '14px 36px 14px 14px',
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: `1px solid ${open ? T : hexAlpha(T, 0.3)}`,
          borderRadius: open ? '8px 8px 0 0' : 8,
          color: '#fff',
          fontFamily: "'Oswald', sans-serif",
          fontSize: 14, letterSpacing: '0.03em',
          cursor: 'pointer',
          transition: 'border-color 0.15s',
          userSelect: 'none',
          position: 'relative',
        }}
      >
        {/* Floating label */}
        <span style={{
          position: 'absolute', top: -9, left: 10,
          fontSize: 11, letterSpacing: '0.04em',
          color: open ? T : 'rgba(255,255,255,0.4)',
          background: 'rgba(12,16,22,1)',
          padding: '0 4px',
          fontFamily: "'Oswald', sans-serif",
          transition: 'color 0.15s', pointerEvents: 'none',
        }}>
          {label}
        </span>
        {selected?.label ?? ''}
        {/* Chevron */}
        <span style={{
          position: 'absolute', right: 12, top: '50%',
          transform: `translateY(-50%) rotate(${open ? '180deg' : '0deg'})`,
          transition: 'transform 0.2s',
          color: 'rgba(255,255,255,0.4)', fontSize: 11, pointerEvents: 'none',
        }}>
          <FontAwesomeIcon icon="chevron-down" />
        </span>
      </div>

      {/* Dropdown */}
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
                onClick={() => { if (!opt.disabled) { onChange(opt.value); setOpen(false); } }}
                style={{
                  padding: '9px 14px',
                  paddingLeft: isSelected ? 11 : 14,
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 13, letterSpacing: '0.04em',
                  color: opt.disabled ? 'rgba(255,255,255,0.2)' : isSelected ? T : '#fff',
                  background: isSelected ? T20 : 'transparent',
                  borderLeft: isSelected ? `3px solid ${T}` : '3px solid transparent',
                  cursor: opt.disabled ? 'not-allowed' : 'pointer',
                  transition: 'background 0.12s',
                  userSelect: 'none',
                }}
                onMouseEnter={e => { if (!opt.disabled && !isSelected) (e.currentTarget as HTMLElement).style.background = T20; }}
                onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}

      {/* Helper text */}
      {hint && (
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4, paddingLeft: 2, fontFamily: "'Oswald', sans-serif" }}>
          {hint}
        </div>
      )}
    </div>
  );
};

// ── Bills component ───────────────────────────────────────────────────────────
export default function Bills({ setLoading, refreshAccounts }: Props) {
  const showAlert = useAlert();
  const T = useAppColor('bank');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const bankData = useSelector((state: RootState) => state.data.data.bankAccounts);
  const myAccounts = bankData?.accounts ?? [];
  const pendingBills = bankData?.pendingBills ?? [];
  const personalAccount = myAccounts.find((a: any) => a.Type === 'personal');

  const [acceptBilling, setAcceptBilling] = useState(false);
  const [bState, setBState] = useState<any>({ billData: null, billId: null, withAccount: personalAccount?.Account });

  const openAcceptBilling = (bill: any) => {
    setBState({ billData: bill, billId: bill.Id, withAccount: personalAccount?.Account });
    setAcceptBilling(true);
  };

  const onAcceptBill = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading('Accepting Bill');
    const payingAccount = myAccounts.find((a: any) => a.Account === bState.withAccount);
    if (payingAccount && payingAccount.Balance >= bState?.billData?.Amount) {
      try {
        const res = await (await Nui.send('Banking:AcceptBill', { bill: bState.billId, account: bState.withAccount })).json();
        showAlert(res ? 'Bill Has Been Paid' : 'Error Paying Bill');
        setTimeout(() => refreshAccounts(), 750);
      } catch { showAlert('Error Paying Bill'); setLoading(false); }
      setAcceptBilling(false);
      setBState({ billData: null, billId: null, withAccount: personalAccount?.Account });
    } else { showAlert('Insufficient Funds to Pay Bill'); setLoading(false); }
  };

  const onDenyBill = async (bill: any) => {
    setLoading('Dismissing Bill');
    try {
      const res = await (await Nui.send('Banking:DismissBill', { bill: bill.Id })).json();
      if (res) { showAlert('Bill Has Been Dismissed'); setTimeout(() => refreshAccounts(), 750); }
      else { showAlert('Error Dismissing Bill'); setLoading(false); }
    } catch { showAlert('Error Dismissing Bill'); setLoading(false); }
  };

  const getAccountName = (acc: any) => {
    if (acc.Type === 'personal') return 'Personal Account';
    if (acc.Type === 'personal_savings') return 'Personal Savings Account';
    return acc.Name;
  };

  if (pendingBills.length === 0) return (
    <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'rgba(255,255,255,0.25)', fontSize: 14, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      <FontAwesomeIcon icon={['fas', 'circle-check']} style={{ fontSize: 32, color: 'rgba(76,175,125,0.3)' }} />
      No Pending Bills
    </div>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'transparent', overflow: 'auto', padding: '10px 12px', gap: 8, scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
      {[...pendingBills].sort((a: any, b: any) => b.Timestamp - a.Timestamp).map((bill: any) => (
        <div key={bill.Id} style={{ borderRadius: 10, padding: '14px 16px', background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 0 }}>
              <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', letterSpacing: '0.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{bill.Name}</span>
              <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.03em' }}>
                {bill.Account && `Account #${bill.Account} · `}{bill.Description}
              </span>
            </div>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 20, color: '#e05555', letterSpacing: '0.02em', flexShrink: 0, lineHeight: 1 }}>
              -${bill.Amount.toLocaleString('en-US')}
            </span>
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button
              onClick={() => onDenyBill(bill)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 6, fontSize: 11, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', background: 'rgba(224,85,85,0.12)', color: '#e05555', border: '1px solid rgba(224,85,85,0.3)', transition: 'opacity 0.15s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}>
              <FontAwesomeIcon icon={['fas', 'xmark']} /> Dismiss
            </button>
            <button
              onClick={() => openAcceptBilling(bill)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 6, fontSize: 11, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', background: 'rgba(76,175,125,0.12)', color: '#4caf7d', border: '1px solid rgba(76,175,125,0.3)', transition: 'opacity 0.15s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}>
              <FontAwesomeIcon icon={['fas', 'check']} /> Pay Bill
            </button>
          </div>
        </div>
      ))}

      <Modal appColor={T} form open={acceptBilling} title={`Accept Bill of $${bState.billData?.Amount}`} submitLang="Accept Bill" onAccept={onAcceptBill} onClose={() => setAcceptBilling(false)}>
        <CustomSelect
          T={T}
          label="Pay With Account"
          hint="Select the account to pay with."
          value={bState.withAccount ?? ''}
          options={myAccounts.map((acc: any) => ({
            value: acc.Account,
            label: `${getAccountName(acc)} — #${acc.Account}`,
            disabled: !acc.Permissions?.WITHDRAW,
          }))}
          onChange={val => setBState((prev: any) => ({ ...prev, withAccount: val }))}
        />
      </Modal>
    </div>
  );
}
