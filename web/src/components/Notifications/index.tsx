import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Slide } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from '../../store';
import { useAlert, useAppView, useDismisser, useAppColor, hexAlpha } from '../../hooks';

function usePhoneColor(): string {
  return useSelector((state: RootState) => {
    const c = state.data.data.player?.PhoneSettings?.colors;
    return (c?.phone && c.phone !== '#ffffff') ? c.phone : '#208692';
  });
}

interface RowProps {
  notif: any;
  onOpen: (n: any) => void;
  onDismiss: (id: string) => void;
}

const NotifRow: FC<RowProps> = ({ notif, onOpen, onDismiss }) => {
  const accent = useAppColor(typeof notif.app === 'string' ? notif.app : '');
  const [hov, setHov] = useState(false);
  const [xHov, setXHov] = useState(false);

  const time = notif.time
    ? new Date(+notif.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 10px', marginBottom: 5, borderRadius: 14,
        background: hov ? hexAlpha(accent, 0.09) : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hexAlpha(accent, hov ? 0.4 : 0.15)}`,
        transition: 'all 0.15s ease',
        cursor: notif.app ? 'pointer' : 'default',
      }}
    >
      <div
        onClick={notif.app ? () => onOpen(notif) : undefined}
        style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: hexAlpha(accent, 0.14),
          border: `1px solid ${hexAlpha(accent, 0.28)}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: accent, fontSize: 15,
          transform: hov ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.15s',
        }}
      >
        <FontAwesomeIcon icon={notif.icon} />
      </div>

      <div onClick={notif.app ? () => onOpen(notif) : undefined} style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, color: '#fff', fontFamily: "'Oswald', sans-serif",
          fontWeight: 400, letterSpacing: '0.04em', lineHeight: 1.25,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {notif.title ?? notif.text}
        </div>
        {notif.description && (
          <div style={{
            fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {notif.description}
          </div>
        )}
        <div style={{
          fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 3,
          fontFamily: "'Oswald', sans-serif", letterSpacing: '0.04em',
        }}>
          {time}
        </div>
      </div>

      {notif.app && (
        <div style={{
          fontSize: 9, color: accent,
          background: hexAlpha(accent, 0.1),
          border: `1px solid ${hexAlpha(accent, 0.22)}`,
          borderRadius: 5, padding: '2px 5px',
          fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em',
          textTransform: 'uppercase', flexShrink: 0,
          maxWidth: 50, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {notif.app}
        </div>
      )}

      <div
        onClick={() => onDismiss(String(notif._id))}
        onMouseEnter={() => setXHov(true)}
        onMouseLeave={() => setXHov(false)}
        style={{
          width: 26, height: 26, borderRadius: 7, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, cursor: 'pointer',
          color: xHov ? '#e05a5a' : 'rgba(255,255,255,0.2)',
          background: xHov ? 'rgba(224,90,90,0.1)' : 'transparent',
          border: xHov ? '1px solid rgba(224,90,90,0.22)' : '1px solid transparent',
          transition: 'all 0.15s ease',
        }}
      >
        <FontAwesomeIcon icon="xmark" />
      </div>
    </div>
  );
};

const DismissAll: FC<{ color: string; onClick: () => void }> = ({ color, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0, padding: '9px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: '0.12em',
        textTransform: 'uppercase', cursor: 'pointer',
        color: hov ? color : 'rgba(255,255,255,0.28)',
        borderTop: `1px solid ${hexAlpha(color, 0.12)}`,
        background: hov ? hexAlpha(color, 0.05) : 'transparent',
        transition: 'all 0.15s',
      }}
    >
      <FontAwesomeIcon icon="trash-can" style={{ fontSize: 10 }} />
      Dismiss All
    </div>
  );
};

const Notifications: FC = () => {
  const navigate  = useNavigate();
  const openedApp = useAppView();
  const showAlert = useAlert();
  const dismiss   = useDismisser();
  const chrome    = usePhoneColor();

  const notifications: any[] = useSelector((s: RootState) => s.notifications.notifications);
  const visible = notifications.filter(n => n.show !== false);

  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(true); }, []);
  useEffect(() => { if (visible.length === 0) setOpen(false); }, [visible.length]);

  const onOpen = (n: any) => {
    openedApp(n.app);
    navigate(`/apps/${n.app}${n.app_data ? '/' + n.app_data : ''}`);
  };

  return (
    <Slide in={open} onExited={() => navigate(-1)}>
      {/* position:relative so the ::before pseudo-layer sits behind content */}
      <div style={{
        height: '100%',
        display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 20,
        position: 'relative',
        // Solid dark base — fully opaque so wallpaper doesn't bleed through
        backgroundColor: 'rgb(8,10,14)',
        // Color gradient overlay on top of the solid base
        backgroundImage: `linear-gradient(90deg, ${hexAlpha(chrome, 0.35)} 0%, transparent 60%)`,
      }}>
        {/* header */}
        <div style={{
          padding: '12px 14px 10px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `1px solid ${hexAlpha(chrome, 0.5)}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            {visible.length > 0 && (
              <span style={{
                width: 6, height: 6, borderRadius: '50%', display: 'inline-block', flexShrink: 0,
                background: chrome, boxShadow: `0 0 5px ${hexAlpha(chrome, 0.8)}`,
              }} />
            )}
            <span style={{
              fontFamily: "'Oswald', sans-serif", fontSize: 11,
              letterSpacing: '0.16em', textTransform: 'uppercase', color: chrome,
            }}>
              Notifications
            </span>
          </div>
          <span style={{
            fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: '0.06em',
            color: visible.length > 0 ? hexAlpha(chrome, 0.85) : 'rgba(255,255,255,0.2)',
            background: visible.length > 0 ? hexAlpha(chrome, 0.1) : 'transparent',
            border: `1px solid ${visible.length > 0 ? hexAlpha(chrome, 0.22) : 'transparent'}`,
            borderRadius: 5, padding: '1px 6px',
          }}>
            {visible.length} NEW
          </span>
        </div>

        {/* list */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '6px 9px 4px' }}>
          {visible.length === 0 ? (
            <div style={{
              height: '100%', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 9,
              color: 'rgba(255,255,255,0.13)',
            }}>
              <FontAwesomeIcon icon="bell-slash" style={{ fontSize: 26 }} />
              <span style={{
                fontFamily: "'Oswald', sans-serif", fontSize: 11,
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                No Notifications
              </span>
            </div>
          ) : visible.map((n, i) => (
            <NotifRow
              key={n._id ?? i}
              notif={n}
              onOpen={onOpen}
              onDismiss={id => dismiss(id)}
            />
          ))}
        </div>

        {/* footer */}
        {visible.length > 0 && (
          <DismissAll color={chrome} onClick={() => { dismiss(); showAlert('Notifications Dismissed'); }} />
        )}
      </div>
    </Slide>
  );
};

export default Notifications;
