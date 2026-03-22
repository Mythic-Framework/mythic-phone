import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../../hooks';
import { getAccountName, getAccountType } from '../utils';

const GREEN = '#4caf7d';

const iconMap: Record<string, any> = {
  personal: ['fas', 'building-columns'],
  personal_savings: ['fas', 'piggy-bank'],
  organization: ['fas', 'briefcase'],
};

interface Props { acc: any; }
export default function Account({ acc }: Props) {
  const T = useAppColor('bank');
  const T50 = hexAlpha(T, 0.5);

  const balance = acc.Permissions?.BALANCE
    ? `$${acc.Balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
    : '???';

  return (
    <Link to={`/apps/bank/view/${acc.Account}`} style={{ textDecoration: 'none', display: 'block', padding: '0 12px 10px' }}>
      <div
        style={{ position: 'relative', overflow: 'hidden', borderRadius: 12, padding: '16px 18px', background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)', transition: 'border-color 0.2s, background 0.2s', cursor: 'pointer' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)'; }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 16, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{getAccountName(acc)}</span>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, padding: '2px 8px' }}>{getAccountType(acc)}</span>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 14 }} />

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em', lineHeight: 1.6 }}>
            Account No.<br />{acc.Account}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>Balance</div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 22, color: GREEN, letterSpacing: '0.02em', lineHeight: 1 }}>{balance}</div>
          </div>
        </div>

        <FontAwesomeIcon icon={iconMap[acc.Type] ?? ['fas', 'building-columns']} style={{ position: 'absolute', bottom: -10, left: 12, fontSize: 90, color: 'rgba(255,255,255,0.03)', pointerEvents: 'none', userSelect: 'none' }} />
      </div>
    </Link>
  );
}
