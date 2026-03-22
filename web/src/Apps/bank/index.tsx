import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { throttle } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader } from '../../components';
import Nui from '../../util/Nui';
import Accounts from './Accounts';
import Bills from './Bills';
import { RootState, AppDispatch } from '../../store';
import { useAppColor, hexAlpha } from '../../hooks';

const BG = '#0a0c10';

const MOCK_BANK_DATA = {
  accounts: [
    { Account: 100001, Type: 'personal', Balance: 24580.75, Permissions: { BALANCE: true, WITHDRAW: true, DEPOSIT: true, TRANSACTIONS: true, BILL: false } },
    { Account: 100002, Type: 'personal_savings', Balance: 91200.00, Permissions: { BALANCE: true, WITHDRAW: true, DEPOSIT: true, TRANSACTIONS: true, BILL: false } },
    { Account: 200001, Type: 'organization', Name: 'Los Santos Police Department', Balance: 540000.00, Permissions: { BALANCE: true, WITHDRAW: false, DEPOSIT: true, TRANSACTIONS: true, BILL: true } },
  ],
  transactions: {
    100001: [
      { Title: 'Paycheck', Amount: 3200, Timestamp: Math.floor(Date.now() / 1000) - 3600 },
      { Title: 'Transfer to Savings', Amount: -1500, Timestamp: Math.floor(Date.now() / 1000) - 86400 },
    ],
    100002: [{ Title: 'Transfer from Current', Amount: 1500, Timestamp: Math.floor(Date.now() / 1000) - 86400 }],
    200001: [{ Title: 'City Funding', Amount: 100000, Timestamp: Math.floor(Date.now() / 1000) - 259200 }],
  },
  pendingBills: [
    { Id: 'bill_001', Name: 'Testy McTest', Account: 100001, Amount: 1200, Description: 'Vehicle impound fee', Timestamp: Math.floor(Date.now() / 1000) - 7200 },
  ],
};

const tabNames: Record<number, string> = { 0: 'Bank Accounts', 1: 'Pending Bills' };

export default function BankIndex() {
  const dispatch = useDispatch<AppDispatch>();
  const T = useAppColor('bank');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const activeTab = useSelector((state: RootState) => (state as any).bank?.tab ?? 0);
  const [loading, setLoading] = useState<string | false>(false);
  const loadingRef = React.useRef(false);

  const fetch = useMemo(() => throttle(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading('Loading Accounts');
    if (import.meta.env.DEV) {
      dispatch({ type: 'SET_DATA', payload: { type: 'bankAccounts', data: MOCK_BANK_DATA } });
    } else {
      try {
        const raw = await Nui.send('Banking:GetData');
        if (!raw) return;
        const res = await raw.json();
        if (res) dispatch({ type: 'SET_DATA', payload: { type: 'bankAccounts', data: res } });
      } catch (e) { console.error('[Bank] fetch error:', e); }
    }
    loadingRef.current = false;
    setLoading(false);
  }, 2000), []);

  useEffect(() => { fetch(); }, []);

  const tabBarStyle: React.CSSProperties = {
    flexShrink: 0, display: 'flex', height: 46,
    background: 'rgba(8,10,14,0.98)', borderTop: `1px solid ${T20}`,
  };
  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', fontSize: 11, fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.08em', textTransform: 'uppercase', userSelect: 'none',
    color: active ? T : 'rgba(255,255,255,0.35)',
    borderTop: active ? `2px solid ${T}` : '2px solid transparent',
    background: active ? T20 : 'transparent', transition: 'all 0.2s',
  });

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 8px 0 16px', height: 56,
        background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
        borderBottom: `1px solid ${T50}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
          <FontAwesomeIcon icon={['fas', 'building-columns']} style={{ color: T, fontSize: 16 }} />
          {tabNames[activeTab] ?? 'Banking'}
        </div>
        <div
          style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: Boolean(loading) ? 'default' : 'pointer', color: T, fontSize: 14, transition: 'background 0.2s', opacity: Boolean(loading) ? 0.3 : 1 }}
          onClick={() => fetch()}
        >
          <FontAwesomeIcon icon={['fas', 'arrows-rotate']} />
        </div>
      </div>
      {loading ? <Loader static text={loading} /> : (
        <>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
            <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
              {activeTab === 0 && <Accounts />}
              {activeTab === 1 && <Bills setLoading={setLoading} refreshAccounts={() => fetch()} />}
            </div>
          </div>
          <div style={tabBarStyle}>
            {['Accounts', 'Bills'].map((label, i) => (
              <div key={i} onClick={() => dispatch({ type: 'SET_BANK_TAB', payload: { tab: i } })} style={tabStyle(activeTab === i)}>{label}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
