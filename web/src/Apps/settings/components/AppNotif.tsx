import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UpdateSetting } from '../actions';
import { RootState, AppDispatch } from '../../../store';

const T = '#208692';

interface Props { app: any; }

export default function AppNotif({ app }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.data.data.player.PhoneSettings);
  const [enabled, setEnabled] = useState(settings.appNotifications?.[app.name] == null);

  const toggle = () => {
    if (!settings.notifications) return;
    dispatch(UpdateSetting('appNotifications', enabled
      ? { ...settings.appNotifications, [app.name]: true }
      : Object.fromEntries(Object.entries(settings.appNotifications ?? {}).filter(([k]) => k !== app.name))
    ));
    setEnabled(!enabled);
  };

  return (
    <div onClick={toggle} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      cursor: settings.notifications ? 'pointer' : 'default',
      transition: 'background 0.15s',
      opacity: settings.notifications ? 1 : 0.5,
    }}
      onMouseEnter={e => { if (settings.notifications) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <Avatar variant="rounded" style={{ width: 36, height: 36, background: app.color, borderRadius: 10, fontSize: 16 }}>
        <FontAwesomeIcon icon={app.icon} />
      </Avatar>
      <span style={{ flex: 1, fontSize: 14, color: '#fff', fontFamily: 'Oswald', letterSpacing: '0.02em' }}>{app.label}</span>
      <Switch checked={enabled && settings.notifications} disabled={!settings.notifications} color="primary" size="small" />
    </div>
  );
}
