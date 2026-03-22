import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Slide } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDismisser, useAppColor, hexAlpha } from '../../hooks';

/**
 * Inner content of the toast — needs its own component so useAppColor
 * (a hook) can be called per-notification without violating rules of hooks.
 */
const ToastBody: React.FC<{ notif: any }> = ({ notif }) => {
  // Color always from settings, never from notif.color
  const accent = useAppColor(typeof notif?.app === 'string' ? notif.app : '');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', minWidth: 0 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 9, flexShrink: 0,
        background: hexAlpha(accent, 0.16),
        border: `1px solid ${hexAlpha(accent, 0.36)}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: accent, fontSize: 13,
      }}>
        <FontAwesomeIcon icon={notif?.icon ?? 'bell'} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Oswald', sans-serif", fontSize: 13, color: '#fff',
          letterSpacing: '0.04em', lineHeight: 1.3,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {notif?.title ?? notif?.text}
        </div>
        {notif?.description && (
          <div style={{
            fontSize: 11, color: 'rgba(255,255,255,0.48)', marginTop: 1,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {notif.description}
          </div>
        )}
      </div>

      {notif?.app && (
        <div style={{
          fontSize: 9, color: accent,
          background: hexAlpha(accent, 0.1),
          border: `1px solid ${hexAlpha(accent, 0.22)}`,
          borderRadius: 4, padding: '2px 5px',
          fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em',
          textTransform: 'uppercase', flexShrink: 0,
          maxWidth: 46, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {notif.app}
        </div>
      )}

      <div style={{
        fontSize: 9, color: 'rgba(255,255,255,0.28)',
        fontFamily: "'Oswald', sans-serif", letterSpacing: '0.05em',
        flexShrink: 0, alignSelf: 'flex-start', marginTop: 1,
      }}>
        now
      </div>
    </div>
  );
};

const Notifications: React.FC = () => {
  const newNotifs = useSelector((s: any) => s.notifications.new);
  const phoneOpen = useSelector((s: any) => s.phone.visible);
  const dismisser = useDismisser();

  // chrome: colors.phone — Settings → Colors → Phone → Accent Color
  const chrome = useSelector((s: any) => {
    const c = s.data?.data?.player?.PhoneSettings?.colors;
    return (c?.phone && c.phone !== '#ffffff') ? c.phone : '#208692';
  });

  const [show,  setShow]  = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (newNotifs.length > 0 && !phoneOpen) {
      if (!timer) {
        setShow(true);
        setTimer(setTimeout(() => {
          setShow(false);
          setTimer(null);
        }, 3000));
      }
    } else {
      setShow(false);
    }
  }, [newNotifs, phoneOpen]);

  if (phoneOpen) return null;

  const notif = newNotifs[0] ?? null;

  return (
    <Slide direction="down" in={show} onExited={() => dismisser('new')} mountOnEnter unmountOnExit>
      <div style={{
        position: 'absolute', top: 18, right: 480, zIndex: 200, width: 335,
      }}>
        {/* progress bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: hexAlpha(chrome, 0.12), borderRadius: '12px 12px 0 0', overflow: 'hidden', zIndex: 1,
        }}>
          <div style={{
            height: '100%',
            background: `linear-gradient(90deg, ${hexAlpha(chrome, 0.3)}, ${chrome})`,
            animation: show ? 'toastProgress 3s linear forwards' : 'none',
          }} />
        </div>

        <div style={{
          background: 'rgba(11,15,21,0.96)',
          border: `1px solid ${hexAlpha(chrome, 0.22)}`,
          borderRadius: 14, padding: '11px 13px',
          boxShadow: `0 12px 36px rgba(0,0,0,0.55), 0 0 0 1px ${hexAlpha(chrome, 0.06)}`,
          display: 'flex', alignItems: 'center', overflow: 'hidden',
        }}>
          {notif && <ToastBody notif={notif} />}
        </div>

        <style>{`
          @keyframes toastProgress {
            from { width: 0% }
            to   { width: 100% }
          }
        `}</style>
      </div>
    </Slide>
  );
};

export default Notifications;
