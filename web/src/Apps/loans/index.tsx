import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { throttle } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loans from './Loans';
import Nui from '../../util/Nui';
import { Loader, Modal } from '../../components';
import { useAppColor, hexAlpha } from '../../hooks';

const BG = '#0a0c10';

const LoansIndex: React.FC = () => {
  const dispatch = useDispatch();
  const T = useAppColor('loans');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const activeTab = useSelector((state: any) => state.loans.tab);
  const loadedData = useSelector((state: any) => state.data.data.bankLoans);
  const creditScore = useSelector((state: any) => state.data.data.bankLoans?.creditScore);
  const [loading, setLoading] = useState(false);
  const [viewingCredit, setViewingCredit] = useState(false);

  const fetch = useMemo(() => throttle(async () => {
    if (loading) return;
    setLoading(true);
    try {
      let res = await (await Nui.send('Loans:GetData')).json();
      if (res) dispatch({ type: 'SET_DATA', payload: { type: 'bankLoans', data: res } });
      else throw res;
    } catch (err) { dispatch({ type: 'SET_DATA', payload: { type: 'bankLoans', data: Array() } }); }
    setLoading(false);
  }, 3500), []);

  useEffect(() => {
    if (import.meta.env.DEV) {
      dispatch({ type: 'SET_DATA', payload: { type: 'bankLoans', data: {
        creditScore: 720,
        loans: [
          {
            _id: 'loan_001',
            Type: 'vehicle',
            AssetIdentifier: 'JH4DA3340KS002789',
            InterestRate: 8.5,
            Remaining: 24500,
            Paid: 10500,
            TotalPayments: 24,
            PaidPayments: 6,
            MissablePayments: 3,
            MissedPayments: 0,
            Defaulted: false,
            NextPayment: Math.floor(Date.now() / 1000) + 86400 * 5,
            LastPayment: Math.floor(Date.now() / 1000) - 86400 * 25,
          },
          {
            _id: 'loan_002',
            Type: 'vehicle',
            AssetIdentifier: 'WBA3A5C55DF595899',
            InterestRate: 12,
            Remaining: 0,
            Paid: 18000,
            TotalPayments: 12,
            PaidPayments: 12,
            MissablePayments: 2,
            MissedPayments: 0,
            Defaulted: false,
            NextPayment: null,
            LastPayment: Math.floor(Date.now() / 1000) - 86400 * 60,
          },
          {
            _id: 'loan_003',
            Type: 'property',
            AssetIdentifier: '1 Rockford Hills Drive',
            InterestRate: 6.5,
            Remaining: 185000,
            Paid: 65000,
            TotalPayments: 104,
            PaidPayments: 26,
            MissablePayments: 4,
            MissedPayments: 2,
            Defaulted: false,
            NextPayment: Math.floor(Date.now() / 1000) + 86400 * 2,
            LastPayment: Math.floor(Date.now() / 1000) - 86400 * 35,
          },
        ],
      }}});
    } else {
      fetch();
    }
  }, []);
  const handleTabChange = (tab: number) => dispatch({ type: 'SET_LOAN_TAB', payload: { tab } });
  const tabs = ['Vehicle Loans', 'Property Loans'];

  const tabBarStyle: React.CSSProperties = { flexShrink: 0, display: 'flex', height: 46, background: 'rgba(8,10,14,0.98)', borderTop: `1px solid ${T20}` };
  const tabStyle = (active: boolean): React.CSSProperties => ({ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 10, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', userSelect: 'none', color: active ? T : 'rgba(255,255,255,0.35)', borderTop: active ? `2px solid ${T}` : '2px solid transparent', background: active ? T20 : 'transparent', transition: 'all 0.2s' });

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 16px', height: 56, background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`, borderBottom: `1px solid ${T50}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
          <FontAwesomeIcon icon={['fas', 'hand-holding-dollar']} style={{ color: T, fontSize: 16 }} />
          Loans — {activeTab === 0 ? 'Vehicle' : 'Property'}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, transition: 'background 0.2s', opacity: (loading || viewingCredit) ? 0.3 : 1 }} onClick={() => !loading && !viewingCredit && setViewingCredit(true)}>
            <FontAwesomeIcon icon={['fas', 'award']} />
          </div>
          <div style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, transition: 'background 0.2s', opacity: loading ? 0.3 : 1 }} onClick={() => !loading && fetch()}>
            <FontAwesomeIcon className={loading ? 'fa-spin' : ''} icon={['fas', 'arrows-rotate']} />
          </div>
        </div>
      </div>
      {loading || !loadedData ? <Loader static text="Loading Loans" /> : (
        <>
          <div style={{ flex: 1, padding: 10, overflowY: 'auto', overflowX: 'hidden' }}>
            <div role="tabpanel" hidden={activeTab !== 0}>{activeTab === 0 && <Loans loanType="vehicle" />}</div>
            <div role="tabpanel" hidden={activeTab !== 1}>{activeTab === 1 && <Loans loanType="property" />}</div>
          </div>
          <div style={tabBarStyle}>{tabs.map((label, i) => <div key={i} onClick={() => handleTabChange(i)} style={tabStyle(activeTab === i)}>{label}</div>)}</div>
          <Modal open={viewingCredit} title="Credit Score" onClose={() => setViewingCredit(false)} appColor={T}>
            <p style={{ marginTop: 0, marginBottom: 10, width: '100%', color: 'rgba(255,255,255,0.8)' }}>
              Your Credit Score is <span style={{ color: T }}>{creditScore ?? 0}</span><br /><br />
              You can improve your credit score by paying loans on time or in advance.
            </p>
          </Modal>
        </>
      )}
    </div>
  );
};

export default LoansIndex;
