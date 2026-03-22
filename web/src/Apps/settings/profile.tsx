import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMyApps, useAlert } from '../../hooks';
import Nui from '../../util/Nui';
import Version from './components/Version';
import { RootState } from '../../store';

const T = '#208692';
const T50 = 'rgba(32,134,146,0.5)';
const T20 = 'rgba(32,134,146,0.2)';
const BG = '#0a0c10';
const CARD = 'rgba(16,20,28,0.97)';

const InfoRow = ({ label, value }: { label: string; value: any }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'Oswald', letterSpacing: '0.06em' }}>{label.toUpperCase()}</span>
    <span style={{ fontSize: 13, color: '#fff', fontFamily: 'Oswald' }}>{value ?? '—'}</span>
  </div>
);

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: CARD, borderRadius: 14, border: '1px solid rgba(32,134,146,0.1)', marginBottom: 12, overflow: 'hidden' }}>
    <div style={{ padding: '10px 16px 6px', fontSize: 10, color: T, fontFamily: 'Oswald', letterSpacing: '0.12em', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{title.toUpperCase()}</div>
    {children}
  </div>
);

export default function Profile() {
  const showAlert = useAlert();
  const myApps = useMyApps();
  const player = useSelector((state: RootState) => state.data.data.player);

  const onShare = async () => {
    try {
      const res = await (await Nui.send('ShareMyContact')).json();
      showAlert(res ? 'Contact Shared to All Nearby' : 'Unable to Share Contact');
    } catch { showAlert('Unable to Share Contact'); }
  };

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
        {/* Profile header */}
        <div style={{ background: CARD, borderRadius: 16, border: `1px solid rgba(32,134,146,0.15)`, padding: '24px 16px 20px', marginBottom: 12, textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, rgba(32,134,146,0.3), rgba(32,134,146,0.08))`, border: `2px solid ${T50}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 32, color: T }}>
            <FontAwesomeIcon icon={['fas','user']} />
          </div>
          <div style={{ fontSize: 24, color: '#fff', fontFamily: 'Oswald', letterSpacing: '0.04em' }}>{`${player.First} ${player.Last}`}</div>
          <div style={{ fontSize: 13, color: T, fontFamily: 'Oswald', marginTop: 4 }}>{player.Phone}</div>
          <button onClick={onShare} style={{
            marginTop: 14, padding: '8px 20px', borderRadius: 10,
            background: T20, border: `1px solid ${T50}`, color: T,
            fontFamily: 'Oswald', fontSize: 12, letterSpacing: '0.06em', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = T50)}
            onMouseLeave={e => (e.currentTarget.style.background = T20)}
          >SHARE CONTACT</button>
        </div>

        <SectionCard title="Personal Details">
          <InfoRow label="Server ID" value={player.Source} />
          <InfoRow label="State ID" value={player.SID} />
          <InfoRow label="Passport ID" value={player.User} />
        </SectionCard>

        {player.Licenses && (
          <SectionCard title="Licenses">
            {Object.keys(player.Licenses).sort().map(k => {
              const lic = player.Licenses[k];
              const status = lic?.Suspended ? 'Suspended' : lic?.Active ? 'Valid' : 'None';
              const color = lic?.Suspended ? '#e05555' : lic?.Active ? '#5ec750' : 'rgba(255,255,255,0.35)';
              return (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'Oswald', letterSpacing: '0.06em' }}>{k.toUpperCase()}</span>
                  <span style={{ fontSize: 13, color, fontFamily: 'Oswald' }}>{status}</span>
                </div>
              );
            })}
          </SectionCard>
        )}

        {player.Alias && (
          <SectionCard title="App Aliases">
            {Object.keys(player.Alias).map(k => {
              const alias = player.Alias[k];
              const app = myApps[k];
              if (!app) return null;
              return <InfoRow key={k} label={app.label} value={alias instanceof Object ? alias.name : alias} />;
            })}
          </SectionCard>
        )}
      </div>
      <Version />
    </div>
  );
}
