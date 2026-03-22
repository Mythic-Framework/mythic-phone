import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader, Modal } from '../../components';
import Nui from '../../util/Nui';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import { getLoanTypeName, getLoanIdentifierType, getActualRemainingAmount, getNextPaymentAmount } from './utils';

const loanTypeIcons: Record<string, string> = {
  vehicle: 'car-side',
  property: 'house-building',
};

const LoanView: React.FC = () => {
  const showAlert = useAlert();
  const navigate = useNavigate();
  const T = useAppColor('loans');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T15 = hexAlpha(T, 0.15);
  const T08 = hexAlpha(T, 0.08);

  const { loan } = useParams<{ loan: string }>();
  const myLoans = useSelector((state: any) => state.data.data.bankLoans?.loans);
  const loanData = myLoans && myLoans.find((l: any) => l._id == loan);

  const [loading, setLoading] = useState(false);
  const [weeklyPayment, setWeeklyPayment] = useState(false);
  const [WPState, setWPState] = useState<any>({});

  if (!loanData) return null;

  const openWeeklyPayment = (ahead?: boolean) => {
    if (ahead) {
      let minWeeks = 1;
      if (loanData.MissedPayments > 1) {
        const remainingPayments = loanData.TotalPayments - loanData.PaidPayments;
        minWeeks = loanData.MissedPayments;
        if (minWeeks > remainingPayments) minWeeks = remainingPayments;
      }
      setWPState({ minWeeks, weeks: minWeeks, allowAhead: true });
    } else {
      setWPState({ minWeeks: 1, weeks: 1, allowAhead: false });
    }
    setWeeklyPayment(true);
  };

  const makeWeeklyPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setWeeklyPayment(false);
    setLoading(true);
    try {
      const res = await (await Nui.send('Loans:Payment', { loan: loanData._id, weeks: WPState.weeks, paymentAhead: WPState.allowAhead })).json();
      if (res && res.success) {
        if (res.paidOff) showAlert('Loan Paid Off Completely!');
        else showAlert(`Loan Payment of $${res.paymentAmount} Successful`);
        navigate(-1);
      } else showAlert(res.message ?? 'Loan Payment Failed');
    } catch { showAlert('Loan Payment Failed'); }
    setLoading(false);
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 0', borderBottom: `1px solid ${T08}`,
  };
  const rowLabel: React.CSSProperties = { fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' };
  const rowValue: React.CSSProperties = { fontFamily: "'Share Tech Mono', monospace", fontSize: 13, color: '#fff' };

  return (
    <>
      <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 16px', height: 56, background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`, borderBottom: `1px solid ${T50}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
            <FontAwesomeIcon icon={['fas', (loanTypeIcons[loanData.Type] ?? 'hand-holding-dollar') as any]} style={{ color: T, fontSize: 16 }} />
            {getLoanTypeName(loanData.Type)} Loan
          </div>
          <IconButton size="small" style={{ color: 'rgba(255,255,255,0.5)' }} onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={['fas', 'arrow-left']} />
          </IconButton>
        </div>

        {loading ? <Loader static text="Completing Loan Payment..." /> : (
          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: 12, display: 'flex', flexDirection: 'column', gap: 12, scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>

            {/* Info card */}
            <div style={{ background: T08, border: `1px solid ${T20}`, borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Loan Details</div>
              <div style={rowStyle}>
                <span style={rowLabel}>{getLoanIdentifierType(loanData.Type)}</span>
                <span style={rowValue}>{loanData.AssetIdentifier}</span>
              </div>
              <div style={rowStyle}>
                <span style={rowLabel}>Remaining</span>
                <span style={{ ...rowValue, color: '#ef5350' }}>${getActualRemainingAmount(loanData).toLocaleString('en-US')}</span>
              </div>
              <div style={rowStyle}>
                <span style={rowLabel}>Paid</span>
                <span style={{ ...rowValue, color: '#66bb6a' }}>${loanData.Paid.toLocaleString('en-US')}</span>
              </div>
              <div style={rowStyle}>
                <span style={rowLabel}>Payments Paid</span>
                <span style={rowValue}>{loanData.PaidPayments}</span>
              </div>
              <div style={rowStyle}>
                <span style={rowLabel}>Payments Remaining</span>
                <span style={rowValue}>{loanData.TotalPayments - loanData.PaidPayments}</span>
              </div>
              <div style={rowStyle}>
                <span style={rowLabel}>Interest Rate</span>
                <span style={rowValue}>{loanData.InterestRate}%</span>
              </div>
              {loanData.MissablePayments > 0 && (
                <div style={rowStyle}>
                  <span style={rowLabel}>Missed Payments</span>
                  <span style={{ ...rowValue, color: loanData.MissedPayments > 0 ? '#ffa726' : '#fff' }}>{loanData.MissedPayments}/{loanData.MissablePayments}</span>
                </div>
              )}
              <div style={rowStyle}>
                <span style={rowLabel}>Last Payment</span>
                <span style={rowValue}>{loanData.LastPayment ? new Date(loanData.LastPayment * 1000).toLocaleString() : 'None'}</span>
              </div>
              <div style={{ ...rowStyle, borderBottom: 'none' }}>
                <span style={rowLabel}>Next Due</span>
                <span style={rowValue}>{loanData.NextPayment ? new Date(loanData.NextPayment * 1000).toLocaleString() : 'N/A'}</span>
              </div>
              {loanData.Remaining > 0 && loanData.NextPayment && (
                <div style={{ ...rowStyle, borderBottom: 'none', paddingTop: 4 }}>
                  <span style={rowLabel}>Next Payment Amount</span>
                  <span style={{ ...rowValue, color: T }}>${getNextPaymentAmount(loanData).toLocaleString('en-US')}</span>
                </div>
              )}
            </div>

            {/* Warning banner */}
            {(loanData.Defaulted || loanData.MissedPayments > 0) && (
              <div style={{ background: 'rgba(211,47,47,0.12)', border: '1px solid rgba(211,47,47,0.3)', borderRadius: 10, padding: '12px 14px', fontFamily: "'Oswald', sans-serif", fontSize: 13, color: '#ef9090', lineHeight: 1.5 }}>
                <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} style={{ marginRight: 8 }} />
                {loanData.Defaulted
                  ? 'This loan has been defaulted. The asset(s) have been seized until you pay the outstanding amount.'
                  : `You have missed the last ${loanData.MissedPayments > 1 ? `${loanData.MissedPayments} payments` : 'payment'} for this loan.`}
              </div>
            )}

            {/* Pay button */}
            <div
              onClick={() => openWeeklyPayment()}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: T08, border: `1px solid ${T20}`, borderRadius: 12, cursor: 'pointer', transition: 'all 0.18s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T08; (e.currentTarget as HTMLElement).style.borderColor = T20; }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 10, background: T20, border: `1px solid ${T50}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T, fontSize: 16, flexShrink: 0 }}>
                <FontAwesomeIcon icon={['fas', loanData.Defaulted ? 'sack-dollar' : 'circle-dollar-to-slot']} />
              </div>
              <div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, color: '#fff', letterSpacing: '0.02em' }}>
                  {loanData.Defaulted ? 'Pay Loan Debt' : 'Make Next Payment'}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                  ${getNextPaymentAmount(loanData).toLocaleString('en-US')} from Personal Account
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      <Modal
        form
        open={weeklyPayment}
        title={`Loan Payment - $${getNextPaymentAmount(loanData, WPState.weeks).toLocaleString('en-US')}`}
        submitLang="Make Payment"
        closeLang="Cancel"
        onAccept={makeWeeklyPayment}
        onClose={() => setWeeklyPayment(false)}
        appColor={T}
      >
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 8 }}>
          Loan payments are taken from your Personal Checking Account.
        </p>
        <p style={{ color: '#fff', fontSize: 14, fontFamily: "'Oswald', sans-serif" }}>
          Due: <span style={{ color: T }}>${getNextPaymentAmount(loanData, WPState.weeks).toLocaleString('en-US')}</span>
        </p>
      </Modal>
    </>
  );
};

export default LoanView;
