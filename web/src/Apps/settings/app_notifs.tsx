import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';
import { useMyApps } from '../../hooks';
import AppNotif from './components/AppNotif';
import Version from './components/Version';
import { RootState } from '../../store';

const T = '#208692';
const BG = '#0a0c10';

export default function AppNotifs() {
  const apps = useMyApps();
  const installed = useSelector((state: RootState) => state.data.data.player?.Apps?.installed ?? []);
  const settings = useSelector((state: RootState) => state.data.data.player.PhoneSettings);

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      {!settings.notifications && (
        <Alert variant="filled" severity="warning" elevation={6} style={{ borderRadius: 0, fontSize: 12 }}>
          Notifications disabled system-wide. Enable them in Settings to control per-app.
        </Alert>
      )}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {installed.map((a: string, i: number) => {
          const app = apps[a];
          if (!app) return null;
          return <AppNotif key={i} app={app} />;
        })}
      </div>
      <Version />
    </div>
  );
}
