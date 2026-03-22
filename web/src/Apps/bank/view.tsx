import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { IconButton, TextField, Pagination } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader, Modal } from '../../components';
import Nui from '../../util/Nui';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import Transaction from './component/Transaction';
import { getAccountName, getAccountType } from './utils';
import { RootState, AppDispatch } from '../../store';

const BG = '#0a0c10';

// ── Custom single-select — stays inside phone DOM, no MUI portal ──────────────
interface SelectOption { value: any; label: string }
interface CustomSelectProps {
  label: string;
  value: any;
  options: SelectOption[];
  onChange: (value: any) => void;
  T: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, options, onChange, T }) => {
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
                onClick={() => { onChange(opt.value); setOpen(false); }}
                style={{
                  padding: '9px 14px',
                  paddingLeft: isSelected ? 11 : 14,
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 13, letterSpacing: '0.04em',
                  color: isSelected ? T : '#fff',
                  background: isSelected ? T20 : 'transparent',
                  borderLeft: isSelected ? `3px solid ${T}` : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'background 0.12s',
                  userSelect: 'none',
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

// ── Main BankView ─────────────────────────────────────────────────────────────
export default function BankView() {
  const showAlert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const T = useAppColor('bank');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T15 = hexAlpha(T, 0.15);

  const { account } = useParams<{ account: string }>();
  const myAccounts = useSelector((state: RootState) => state.data.data.bankAccounts);
  const accountData = myAccounts?.accounts?.find((a: any) => a.Account == account);
  const accountTransactions = myAccounts?.transactions?.[accountData?.Account?.toString()];
  const pages = accountTransactions ? Math.ceil(accountTransactions.length / 8) : 0;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(0);
  const [transactions, setTransactions] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [tState, setTState] = useState<{ targetType: boolean; target: string; amount: string; description: string }>({ targetType: false, target: '', amount: '', description: '' });
  const [billing, setBilling] = useState(false);
  const [bState, setBState] = useState({ target: '', description: '', amount: '' });

  const onTChange = (e: any) => setTState(p => ({ ...p, [e.target.name]: e.target.value }));
  const onBChange = (e: any) => setBState(p => ({ ...p, [e.target.name]: e.target.value }));

  const onTransfer = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(1);
    try {
      const res = await (await Nui.send('Banking:Transfer', { account: accountData.Account, targetType: tState.targetType, target: tState.target, amount: tState.amount, description: tState.description })).json();
      if (res) { showAlert('Funds Transferred Successfully'); setTimeout(() => navigate(-1), 250); }
      else showAlert('Error Transferring Funds');
    } catch { showAlert('Error Transferring Funds'); }
    setTransfer(false); setTState({ targetType: false, target: '', amount: '', description: '' }); setLoading(0);
  };

  const onBill = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(2);
    try {
      const res = await (await Nui.send('Banking:Bill', { fromAccount: accountData.Account, target: bState.target, description: bState.description, amount: bState.amount })).json();
      if (res) { showAlert('Bill Sent Successfully'); navigate(-1); }
      else showAlert('Error Creating Bill');
    } catch { showAlert('Error Creating Bill'); }
    setBilling(false); setBState({ target: '', description: '', amount: '' }); setLoading(0);
  };

  const fieldSx = {
    mb: '16px', width: '100%',
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

  const actionBtn = (disabled = false): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
    background: 'rgba(255,255,255,0.04)', border: `1px solid ${T15}`,
    borderRadius: 12, cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.3 : 1, pointerEvents: disabled ? 'none' : 'auto',
    transition: 'all 0.18s',
  });

  if (loading) return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      <Loader static text={loading === 1 ? 'Completing Transfer' : 'Creating Bill'} />
    </div>
  );
  if (!accountData) return (
    <div style={{ height: '100%', background: BG, padding: 20, color: '#fff' }}>Something Went Wrong</div>
  );

  const balance = accountData.Permissions?.BALANCE ? `$${accountData.Balance.toLocaleString('en-US')}` : '???';

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', height: 72, background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`, borderBottom: `1px solid ${T50}` }}>
        <IconButton onClick={() => navigate(-1)} style={{ color: T, padding: 8 }}>
          <FontAwesomeIcon icon={['fas', 'arrow-left']} style={{ fontSize: 16 }} />
        </IconButton>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, color: '#fff', fontFamily: 'Oswald', letterSpacing: '0.03em' }}>{getAccountName(accountData)}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>#{accountData.Account} · {getAccountType(accountData)}</div>
        </div>
        <div style={{ fontFamily: 'Oswald', fontSize: 18, color: '#4caf7d' }}>{balance}</div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={actionBtn()}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: T20, border: `1px solid ${T50}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T, fontSize: 16, flexShrink: 0 }}>
            <FontAwesomeIcon icon={['fas', 'dollar-sign']} />
          </div>
          <div>
            <div style={{ fontFamily: 'Oswald', fontSize: 14, color: '#fff', letterSpacing: '0.02em' }}>Balance</div>
            <div style={{ fontSize: 11, color: '#4caf7d', marginTop: 2 }}>{balance}</div>
          </div>
        </div>

        <div
          style={actionBtn(!accountData.Permissions?.TRANSACTIONS)}
          onClick={() => accountData.Permissions?.TRANSACTIONS && accountTransactions && setTransactions(true)}
          onMouseEnter={e => { if (accountData.Permissions?.TRANSACTIONS) { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; } }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = T15; }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: T20, border: `1px solid ${T50}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T, fontSize: 16, flexShrink: 0 }}>
            <FontAwesomeIcon icon={['fas', 'magnifying-glass-dollar']} />
          </div>
          <div>
            <div style={{ fontFamily: 'Oswald', fontSize: 14, color: '#fff', letterSpacing: '0.02em' }}>Previous Transactions</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>View transaction history</div>
          </div>
        </div>

        <div
          style={actionBtn(!accountData.Permissions?.WITHDRAW)}
          onClick={() => accountData.Permissions?.WITHDRAW && accountData.Balance > 0 && setTransfer(true)}
          onMouseEnter={e => { if (accountData.Permissions?.WITHDRAW) { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; } }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = T15; }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: T20, border: `1px solid ${T50}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T, fontSize: 16, flexShrink: 0 }}>
            <FontAwesomeIcon icon={['fas', 'money-bill-1-wave']} />
          </div>
          <div>
            <div style={{ fontFamily: 'Oswald', fontSize: 14, color: '#fff', letterSpacing: '0.02em' }}>Transfer Funds</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>Send money to another account</div>
          </div>
        </div>

        {accountData.Permissions?.BILL && (
          <div
            style={actionBtn()}
            onClick={() => setBilling(true)}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = T15; }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: T20, border: `1px solid ${T50}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T, fontSize: 16, flexShrink: 0 }}>
              <FontAwesomeIcon icon={['fas', 'file-invoice-dollar']} />
            </div>
            <div>
              <div style={{ fontFamily: 'Oswald', fontSize: 14, color: '#fff', letterSpacing: '0.02em' }}>Create Bill</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>Send a bill to another player</div>
            </div>
          </div>
        )}
      </div>

      {/* Transaction history modal */}
      <Modal appColor={T} open={transactions} title="Account Transaction History" onClose={() => setTransactions(false)}>
        {transactions && accountTransactions && (
          <div>
            {[...accountTransactions].sort((a: any, b: any) => b.Timestamp - a.Timestamp).slice((page - 1) * 8, page * 8).map((t: any, k: number) => <Transaction key={k} transaction={t} />)}
          </div>
        )}
        {pages > 1 && (
          <Pagination
            count={pages} page={page} onChange={(_, v) => setPage(v)}
            variant="outlined"
            sx={{
              '& .MuiPaginationItem-root': { color: 'rgba(255,255,255,0.5)', borderColor: hexAlpha(T, 0.3) },
              '& .MuiPaginationItem-root.Mui-selected': { background: T20, borderColor: T, color: T },
              '& .MuiPaginationItem-root:hover': { background: T20, borderColor: T },
            }}
          />
        )}
      </Modal>

      {/* Send bill modal */}
      <Modal appColor={T} form open={billing} title="Send Bill" submitLang="Bill" onAccept={onBill} onClose={() => setBilling(false)}>
        <TextField required fullWidth label="Billing State ID" name="target" value={bState.target} onChange={onBChange} inputProps={{ maxLength: 6 }} sx={fieldSx} />
        <TextField required fullWidth label="Description" name="description" value={bState.description} multiline onChange={onBChange} inputProps={{ maxLength: 240 }} sx={fieldSx} />
        <TextField required fullWidth label="Amount" name="amount" type="number" value={bState.amount} onChange={onBChange} sx={fieldSx} />
      </Modal>

      {/* Transfer funds modal */}
      <Modal appColor={T} form open={transfer} title="Transfer Funds" submitLang="Transfer" onAccept={onTransfer} onClose={() => setTransfer(false)}>
        <TextField disabled fullWidth label="Transferring From" value={accountData.Account} sx={fieldSx} />
        <CustomSelect
          T={T}
          label="Transfer Type"
          value={tState.targetType}
          options={[
            { value: false, label: 'By Bank Account' },
            { value: true,  label: 'By State ID' },
          ]}
          onChange={val => setTState(p => ({ ...p, targetType: val }))}
        />
        <TextField required fullWidth label="Transferring To" name="target" value={tState.target} onChange={onTChange} inputProps={{ maxLength: 6 }} sx={fieldSx} />
        <TextField required fullWidth label="Amount" name="amount" type="number" value={tState.amount} onChange={onTChange} sx={fieldSx} />
        <TextField fullWidth multiline label="Description" name="description" value={tState.description} onChange={onTChange} inputProps={{ maxLength: 240 }} sx={{ ...fieldSx, mb: 0 }} />
      </Modal>
    </div>
  );
}
