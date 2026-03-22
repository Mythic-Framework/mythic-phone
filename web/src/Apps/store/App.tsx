import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../hooks';
import { install, uninstall } from './action';
import { RootState, AppDispatch } from '../../store';

interface Props { app: any; installed?: boolean; }
export default function StoreApp({ app, installed }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const T = useAppColor('store');
  const T10 = hexAlpha(T, 0.1);
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const T18 = hexAlpha(T, 0.18);
  const T07 = hexAlpha(T, 0.07);

  const storeState = useSelector((state: RootState) => (state as any).store);

  const installing = storeState.installing.includes(app.name);
  const installPending = storeState.installPending.includes(app.name);
  const installFailed = storeState.installFailed.includes(app.name);
  const uninstalling = storeState.uninstalling.includes(app.name);
  const uninstallPending = storeState.uninstallPending.includes(app.name);
  const uninstallFailed = storeState.uninstallFailed.includes(app.name);

  const isBusy = installed ? (uninstalling || uninstallPending || uninstallFailed) : (installing || installPending || installFailed);
  const isLoading = installed ? (uninstalling || uninstallPending) : (installing || installPending);

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', padding: '18px 16px', background: `linear-gradient(135deg, ${T07} 0%, rgba(255,255,255,0.02) 100%)`, border: `1px solid ${T18}`, borderLeft: `3px solid ${T}`, borderRadius: 4, marginBottom: 8, transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, ${T20} 0%, rgba(255,255,255,0.04) 100%)`; (e.currentTarget as HTMLElement).style.borderColor = T50; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${hexAlpha(T, 0.08)}`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, ${T07} 0%, rgba(255,255,255,0.02) 100%)`; (e.currentTarget as HTMLElement).style.borderColor = T18; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>

      {/* Icon */}
      <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#fff', marginRight: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.35)', background: app.color ?? T }}>
        <FontAwesomeIcon icon={app.icon} />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: '0.05em', color: T, lineHeight: 1.2 }}>{app.label}</div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 3, letterSpacing: '0.05em' }}>{installed ? 'Installed' : 'Available'}</div>
      </div>

      {/* Action */}
      <div style={{ flexShrink: 0, position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
        <button
          onClick={() => dispatch(installed ? uninstall(app.name) : install(app.name))}
          disabled={isBusy || (installed && !app.canUninstall)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: '50%', padding: 0, cursor: isBusy ? 'not-allowed' : 'pointer',
            opacity: (isBusy || (installed && !app.canUninstall)) ? 0.25 : 1,
            fontSize: 11, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase',
            transition: 'all 0.15s',
            ...(installed
              ? { background: 'rgba(180,40,40,0.1)', border: '1px solid rgba(180,40,40,0.35)', color: '#e07070' }
              : { background: T10, border: `1px solid ${hexAlpha(T, 0.35)}`, color: 'rgba(139,188,212,0.9)' }
            ),
          }}
          onMouseEnter={e => {
            if (!isBusy && !(installed && !app.canUninstall)) {
              if (installed) { (e.currentTarget as HTMLElement).style.background = 'rgba(180,40,40,0.25)'; (e.currentTarget as HTMLElement).style.borderColor = '#e07070'; }
              else { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T; (e.currentTarget as HTMLElement).style.color = '#fff'; }
            }
          }}
          onMouseLeave={e => {
            if (installed) { (e.currentTarget as HTMLElement).style.background = 'rgba(180,40,40,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(180,40,40,0.35)'; (e.currentTarget as HTMLElement).style.color = '#e07070'; }
            else { (e.currentTarget as HTMLElement).style.background = T10; (e.currentTarget as HTMLElement).style.borderColor = hexAlpha(T, 0.35); (e.currentTarget as HTMLElement).style.color = 'rgba(139,188,212,0.9)'; }
          }}>
          <FontAwesomeIcon icon={['fas', installed ? 'trash' : 'download']} />
        </button>

        {isLoading && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <CircularProgress size={36} style={{ color: installed ? '#e07070' : T }} />
          </div>
        )}
        {(installFailed || uninstallFailed) && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <CircularProgress size={36} variant="determinate" value={100} style={{ color: 'rgba(180,40,40,0.6)' }} />
          </div>
        )}
      </div>
    </div>
  );
}
