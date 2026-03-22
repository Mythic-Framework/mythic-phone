import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../../hooks';
import { getLoanTypeName, getActualRemainingAmount, getNextPaymentAmount } from '../utils';

interface Props { loan: any; }

const Loan: React.FC<Props> = ({ loan }) => {
  const T = useAppColor('loans');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T08 = hexAlpha(T, 0.08);
  const T04 = hexAlpha(T, 0.04);

  const loanRemainingAmount = getActualRemainingAmount(loan);
  const loanRemainingPayments = loan.TotalPayments - loan.PaidPayments;

  const getNextDuePayment = () => loan.NextPayment ? new Date(loan.NextPayment * 1000).toLocaleDateString() : 'No Due Payments';

  const getWarning = (): string | false => {
    if (loan.Defaulted) return 'This loan has been defaulted because you missed too many payments.';
    if (loan.MissedPayments > 0) return loan.MissedPayments > 1 ? `You missed the last ${loan.MissedPayments} payments for this loan.` : 'You missed the last payment for this loan.';
    return false;
  };

  const isDefaulted = loan.Defaulted || (loan.MissablePayments > 1 && loan.MissedPayments >= loan.MissablePayments - 1);
  const hasMissed = !isDefaulted && loan.MissedPayments > 0;

  const borderColor = isDefaulted ? 'rgba(211,47,47,0.6)' : hasMissed ? 'rgba(255,152,0,0.5)' : `1px solid ${T20}`;

  return (
    <Link to={`/apps/loans/view/${loan._id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 10 }}>
      <div style={{
        position: 'relative', padding: '14px 16px', borderRadius: 10, overflow: 'hidden',
        background: `linear-gradient(135deg, ${T08} 0%, ${T04} 100%)`,
        border: `1px solid ${isDefaulted ? 'rgba(211,47,47,0.5)' : hasMissed ? 'rgba(255,152,0,0.4)' : T20}`,
        borderLeft: `3px solid ${isDefaulted ? '#ef5350' : hasMissed ? '#ffa726' : T}`,
        transition: 'background 0.2s, border-color 0.2s',
        cursor: 'pointer',
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, ${T08} 0%, ${T04} 100%)`; }}
      >
        {/* Background icon */}
        <FontAwesomeIcon icon={['fas', 'hand-holding-dollar']} style={{ position: 'absolute', top: '6%', right: '4%', fontSize: 70, color: hexAlpha(T, 0.06), pointerEvents: 'none' }} />

        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, paddingBottom: 10, borderBottom: `1px solid ${T08}` }}>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 600, color: '#fff', letterSpacing: '0.04em' }}>
            {getLoanTypeName(loan.Type)} Loan
          </span>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: '#66bb6a', fontWeight: 600 }}>
            ${loanRemainingAmount.toLocaleString('en-US')} remaining
          </span>
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            ['Interest Rate', `${loan.InterestRate}%`],
            ['Remaining Payments', loanRemainingPayments],
            ['Next Payment Due', getNextDuePayment()],
            ...(loan.Remaining > 0 && loan.NextPayment ? [['Next Payment Amount', `$${getNextPaymentAmount(loan).toLocaleString('en-US')}`]] : []),
          ].map(([label, value]) => (
            <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ fontFamily: "'Oswald', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>{label}</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", color: '#fff' }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Warning */}
        {getWarning() && (
          <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: isDefaulted ? 'rgba(211,47,47,0.12)' : 'rgba(255,152,0,0.1)', border: `1px solid ${isDefaulted ? 'rgba(211,47,47,0.3)' : 'rgba(255,152,0,0.3)'}`, fontFamily: "'Oswald', sans-serif", fontSize: 12, color: isDefaulted ? '#ef9090' : '#ffa726' }}>
            <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} style={{ marginRight: 6 }} />
            {getWarning()}
          </div>
        )}
      </div>
    </Link>
  );
};

export default Loan;
