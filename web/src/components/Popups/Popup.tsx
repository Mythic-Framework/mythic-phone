import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Collapse } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DOMPurify from 'dompurify';
import { useDismisser, useMyApps, useAppColor, hexAlpha } from '../../hooks';
import Nui from '../../util/Nui';
import { RootState, AppDispatch } from '../../store';

interface Props { notification: any }

const Popup: FC<Props> = ({ notification }) => {
  const dispatch  = useDispatch<AppDispatch>();
  const dismisser = useDismisser();
  const phoneOpen = useSelector((s: RootState) => s.phone.visible);
  const apps      = useMyApps();
  const location  = useLocation();
  const navigate  = useNavigate();

  const app = typeof notification.app === 'object'
    ? notification.app
    : apps[notification.app];

  const accent = useAppColor(typeof notification.app === 'string' ? notification.app : '');
  const T20 = hexAlpha(accent, 0.2);
  const T50 = hexAlpha(accent, 0.5);

  const [showIcons, setShowIcons] = useState(false);
  const [show,      setShow]      = useState(false);
  const [hov,       setHov]       = useState(false);

  useEffect(() => {
    setShow(true);
    if (notification.duration !== -1) {
      const iv = setInterval(() => {
        if (Date.now() > notification.time + notification.duration) {
          setShow(false);
          clearInterval(iv);
        }
      }, 1000);
      return () => clearInterval(iv);
    }
  }, []);

  useEffect(() => {
    if (notification.collapsed) return;
    if (notification.duration === -1) {
      const t = setTimeout(() => {
        dispatch({ type: 'NOTIF_COLLAPSE', payload: { id: notification._id } });
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  const onClick = () => {
    if (notification.duration !== -1) setShow(false);
    else dispatch({ type: 'NOTIF_COLLAPSE', payload: { id: notification._id } });
  };

  const onView = () => {
    if (notification.duration !== -1) setShow(false);
    if (notification.action?.view === 'USE_SHARE') dispatch({ type: 'USE_SHARE', payload: {} });
    else navigate(`/apps/${app.name}/${notification.action?.view}`);
  };

  const onAccept = () => {
    setShow(false);
    Nui.send('AcceptPopup', { event: notification.action?.accept, data: notification.data });
  };

  const onCancel = () => {
    setShow(false);
    Nui.send('CancelPopup', { event: notification.action?.cancel, data: notification.data });
  };

  if (!app) return null;

  return (
    <Collapse
      collapsedSize={0} in={show}
      onEntered={() => setShowIcons(true)}
      onExiting={() => setShowIcons(false)}
      onExited={() => dismisser(notification._id)}
    >
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          // Exact Twitter pattern: solid dark base + 135deg gradient overlay
          backgroundColor: '#0a0c10',
          backgroundImage: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
          border: `1px solid ${hov ? T50 : hexAlpha(accent, 0.25)}`,
          borderRadius: 15, marginBottom: 7,
          boxShadow: hov
            ? `0 8px 28px rgba(0,0,0,0.5), 0 0 0 1px ${hexAlpha(accent, 0.1)}`
            : '0 3px 16px rgba(0,0,0,0.4)',
          overflow: 'hidden', transition: 'border 0.18s, box-shadow 0.18s',
        }}
      >
        {/* app header */}
        <Collapse in={!notification.collapsed} collapsedSize={0}>
          <div
            onClick={onClick}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '7px 11px 6px',
              borderBottom: `1px solid ${hexAlpha(accent, 0.15)}`,
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{
                width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                background: app.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, color: '#fff',
              }}>
                <FontAwesomeIcon icon={app.icon} />
              </div>
              <span style={{
                fontFamily: "'Oswald', sans-serif", fontSize: 10,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: accent,
              }}>
                {app.label}
              </span>
            </div>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.03em' }}>
              {new Date(notification.time).toLocaleTimeString()}
            </span>
          </div>
        </Collapse>

        {/* body */}
        <div style={{ padding: '8px 11px 9px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Collapse in={!notification.collapsed || !phoneOpen || location.pathname === '/'} collapsedSize={0}>
                <div style={{
                  fontSize: 13, color: '#fff', fontFamily: "'Oswald', sans-serif",
                  letterSpacing: '0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {notification.title}
                </div>
              </Collapse>
              <div style={{
                fontSize: 11, color: 'rgba(255,255,255,0.48)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2,
              }}>
                {DOMPurify.sanitize(notification.description ?? '', { ALLOWED_TAGS: [] })}
              </div>
            </div>

            {phoneOpen && showIcons && (notification.action?.view || notification.action?.accept || notification.action?.cancel) && (
              <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                {notification.action?.view && (
                  <button onClick={onView} style={{
                    background: hexAlpha(accent, 0.14), border: `1px solid ${hexAlpha(accent, 0.38)}`,
                    borderRadius: 7, padding: '4px 7px', cursor: 'pointer', color: accent,
                    fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <FontAwesomeIcon icon={['fas', 'eye']} />
                  </button>
                )}
                {notification.action?.accept && (
                  <button onClick={onAccept} style={{
                    background: 'rgba(82,152,74,0.18)', border: '1px solid rgba(82,152,74,0.38)',
                    borderRadius: 7, padding: '4px 7px', cursor: 'pointer', color: '#60eb50',
                    fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <FontAwesomeIcon icon={['fas', 'circle-check']} />
                  </button>
                )}
                {notification.action?.cancel && (
                  <button onClick={onCancel} style={{
                    background: 'rgba(110,22,22,0.18)', border: '1px solid rgba(161,52,52,0.38)',
                    borderRadius: 7, padding: '4px 7px', cursor: 'pointer', color: '#e07070',
                    fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <FontAwesomeIcon icon={['fas', 'circle-xmark']} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Collapse>
  );
};

export default Popup;
