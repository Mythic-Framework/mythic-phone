import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Sanitize } from '../../util/Parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReadEmail, DeleteEmail, GPSRoute, Hyperlink } from './action';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';

const EmailView: React.FC = () => {
  const showAlert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const T = useAppColor('email');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T25 = hexAlpha(T, 0.25);
  const { id } = useParams<{ id: string }>();
  const emails = useSelector((state: any) => state.data.data.emails);
  const email = emails.find((e: any) => e._id === id);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!email) { showAlert('Email Has Been Deleted'); navigate(-1); return; }
    if (email?.unread) dispatch(ReadEmail(email) as any);
    let intrvl: any = null;
    if (email?.flags?.expires != null) {
      if (email.flags.expires < Date.now()) {
        showAlert('Email Has Expired');
        dispatch(DeleteEmail(email._id) as any);
        navigate(-1);
      } else {
        intrvl = setInterval(() => {
          if (email.flags.expires < Date.now()) {
            showAlert('Email Has Expired');
            dispatch(DeleteEmail(email._id) as any);
            navigate(-1);
          }
        }, 2500);
      }
    }
    return () => { clearInterval(intrvl); };
  }, [email]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const deleteEmail = () => {
    setMenuOpen(false);
    showAlert('Email Deleted');
    dispatch(DeleteEmail(email._id) as any);
    navigate(-1);
  };
  const gpsClicked = () => { if (email?.flags?.location != null) dispatch(GPSRoute(email._id, email.flags.location) as any); };
  const linkClicked = () => { if (email?.flags?.hyperlink != null) dispatch(Hyperlink(email._id, email.flags.hyperlink) as any); };

  if (!email) return null;

  const timeStr = new Date(+email.time).toLocaleString();
  const iconBtnStyle: React.CSSProperties = { color: 'rgba(255,255,255,0.4)', fontSize: 14 };

  return (
    <div style={{ height: '100%', background: 'rgba(10,13,18,0.98)', display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden' }}>

      {/* Header */}
      <div style={{
        flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 16px',
        background: `linear-gradient(135deg, ${T20} 0%, rgba(10,13,18,0) 100%)`,
        borderBottom: `1px solid ${T25}`,
        fontFamily: "'Oswald', sans-serif", fontSize: 19, fontWeight: 600,
        letterSpacing: '0.08em', color: '#fff',
      }}>
        <IconButton
          style={{ color: T, padding: 0, fontSize: 16 }}
          onClick={() => navigate(-1)}
          size="small"
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
        >
          <FontAwesomeIcon icon={['fas', 'arrow-left']} style={{ fontSize: 16 }} />
        </IconButton>

        <span style={{
          flex: 1,
          fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 16,
          color: '#fff', letterSpacing: '0.04em',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }} title={email.subject}>
          {email.subject}
        </span>

        {/* ⋮ button + custom dropdown */}
        <div ref={menuRef} style={{ position: 'relative', flexShrink: 0 }}>
          <IconButton
            style={{ color: menuOpen ? T : 'rgba(255,255,255,0.4)', padding: 0 }}
            onClick={() => setMenuOpen(o => !o)}
            size="small"
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#fff')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = menuOpen ? T : 'rgba(255,255,255,0.4)')}
          >
            <FontAwesomeIcon icon={['fas', 'ellipsis-vertical']} style={{ fontSize: 15 }} />
          </IconButton>

          {menuOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              right: 0,
              zIndex: 10002,
              minWidth: 160,
              backgroundColor: '#0a0c10',
              backgroundImage: `linear-gradient(90deg, ${T20} 0%, rgba(8,10,14,0.97) 100%)`,
              border: `1px solid ${T50}`,
              borderRadius: 10,
              boxShadow: `0 8px 24px rgba(0,0,0,0.6)`,
              overflow: 'hidden',
            }}>
              <div
                onClick={deleteEmail}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px',
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 13, letterSpacing: '0.06em',
                  color: '#e05a5a',
                  cursor: 'pointer',
                  transition: 'background 0.12s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(224,90,90,0.1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <FontAwesomeIcon icon={['fas', 'trash-can']} style={{ fontSize: 12 }} />
                Delete Email
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sender block */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: 42, height: 42, borderRadius: '50%', background: T20, border: `1px solid ${T50}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 17, color: T }}>
          {email.sender?.charAt(0)?.toUpperCase() ?? '?'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', letterSpacing: '0.03em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {email.sender}
          </div>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
            to: me · {timeStr}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
          {email?.flags?.location != null && (
            <IconButton style={iconBtnStyle} onClick={gpsClicked} size="small"
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = T)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)')}>
              <FontAwesomeIcon icon={['fas', 'location-crosshairs']} />
            </IconButton>
          )}
          {email?.flags?.hyperlink != null && (
            <IconButton style={iconBtnStyle} onClick={linkClicked} size="small"
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = T)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)')}>
              <FontAwesomeIcon icon={['fas', 'link']} />
            </IconButton>
          )}
        </div>
      </div>

      {/* Expiry bar */}
      {email?.flags?.expires != null && (
        <div style={{ padding: '8px 16px', background: 'rgba(200,60,60,0.15)', borderBottom: '1px solid rgba(200,60,60,0.3)', fontFamily: "'Oswald', sans-serif", fontSize: 12, color: '#e07070', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
          <FontAwesomeIcon icon={['fas', 'clock']} />
          Expires {new Date(+email.flags.expires).toLocaleString()}
        </div>
      )}

      {/* Body */}
      <div style={{ flex: 1, padding: '20px 18px', color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.7, fontFamily: 'sans-serif', overflowX: 'hidden', overflowY: 'auto' }}>
        {Sanitize(email?.body)}
      </div>
    </div>
  );
};

export default EmailView;
