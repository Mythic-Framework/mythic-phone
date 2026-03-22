import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Account from './component/Account';
import { useAppColor, hexAlpha } from '../../hooks';
import { RootState } from '../../store';

export default function Accounts() {
  const T = useAppColor('bank');
  const T20 = hexAlpha(T, 0.2);
  const myAccounts = useSelector((state: RootState) => state.data.data.bankAccounts)?.accounts;
  const personal = myAccounts?.find((a: any) => a.Type === 'personal');
  const savings = myAccounts?.filter((a: any) => a.Type === 'personal_savings') ?? [];
  const orgs = myAccounts?.filter((a: any) => a.Type === 'organization') ?? [];

  if (!myAccounts) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'rgba(255,255,255,0.25)', fontFamily: "'Oswald', sans-serif", fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      <FontAwesomeIcon icon={['fas', 'building-columns']} style={{ fontSize: 32, color: T20 }} />
      No Accounts Found
    </div>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'transparent', overflow: 'auto', paddingTop: 10, scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
      {personal && <Account acc={personal} />}
      {savings.map((acc: any) => <Account key={acc.Account} acc={acc} />)}
      {orgs.map((acc: any) => <Account key={acc.Account} acc={acc} />)}
    </div>
  );
}
