import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../hooks';
import Loan from './component/Loan';
import { getLoanTypeName } from './utils';

interface Props { loanType: string; }

const Loans: React.FC<Props> = ({ loanType }) => {
  const T = useAppColor('loans');
  const T20 = hexAlpha(T, 0.2);
  const T12 = hexAlpha(T, 0.12);

  const myLoans = useSelector((state: any) => state.data.data.bankLoans.loans);
  const loansWithType = myLoans && myLoans.filter((acc: any) => acc.Type === loanType && acc.Remaining > 0);
  const loansExpiredWithType = myLoans && myLoans.filter((acc: any) => acc.Type === loanType && acc.Remaining <= 0);

  if ((loansWithType && loansWithType.length > 0) || (loansExpiredWithType && loansExpiredWithType.length > 0)) {
    return (
      <div style={{ height: '100%', background: 'transparent' }}>
        {loansWithType && loansWithType.length > 0 &&
          loansWithType.sort((a: any, b: any) => a.NextPayment - b.NextPayment).map((loan: any) => <Loan key={loan._id} loan={loan} />)}
        {loansExpiredWithType?.length > 0 && (
          <div style={{ textAlign: 'center', borderBottom: `1px solid ${T20}`, marginBottom: 10 }}>
            <h3 style={{ color: hexAlpha(T, 0.7), fontWeight: 400, fontSize: 16, marginBottom: 5 }}>
              Paid Off {getLoanTypeName(loanType)} Loans
            </h3>
          </div>
        )}
        {loansExpiredWithType?.length > 0 &&
          loansExpiredWithType.sort((a: any, b: any) => b.LastPayment - a.LastPayment).map((loan: any) => <Loan key={loan._id} loan={loan} />)}
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 46, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'transparent', pointerEvents: 'none' }}>
      <FontAwesomeIcon icon={['fas', 'face-disappointed']} style={{ fontSize: 80, color: T12, marginBottom: 16 }} />
      <div style={{ color: 'rgba(255,255,255,0.35)', textAlign: 'center', fontSize: 16, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em' }}>
        You Have No {getLoanTypeName(loanType)} Loans
      </div>
    </div>
  );
};

export default Loans;
