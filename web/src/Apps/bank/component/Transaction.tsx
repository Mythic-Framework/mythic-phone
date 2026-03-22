import React from 'react';
import { useAppColor } from '../../../hooks';

interface Props { transaction: any; }
export default function Transaction({ transaction }: Props) {
  const T = useAppColor('bank');
  const isPositive = transaction.Amount > 0;

  return (
    <div>
      <div style={{ width: '100%', marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ color: '#fff', fontFamily: "'Oswald', sans-serif", fontWeight: 500, fontSize: 15 }}>
            {transaction.Title ?? 'Unknown'}
          </span>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 400, fontSize: 15, color: isPositive ? '#4caf7d' : '#e05555' }}>
            {isPositive ? '+' : '-'}${Math.abs(transaction.Amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 10, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
          {new Date(transaction.Timestamp * 1000).toLocaleString()}
        </div>
      </div>
      <hr style={{ width: '100%', borderColor: 'rgba(200,200,200,0.04)', borderWidth: 0.5, borderStyle: 'solid', marginTop: 8 }} />
    </div>
  );
}
