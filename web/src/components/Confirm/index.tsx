import React, { FC } from 'react';

const TEAL = '#208692';
const TEAL_50 = 'rgba(32,134,146,0.5)';
const TEAL_20 = 'rgba(32,134,146,0.2)';

interface Props {
  open: boolean | null;
  title?: string;
  confirm?: string;
  decline?: string;
  onConfirm?: () => void;
  onDecline?: () => void;
  children?: React.ReactNode;
}

const Confirm: FC<Props> = ({ open, title, confirm, decline, onConfirm, onDecline, children }) => {
  if (!open) return null;

  return (
    <>
      {/* Dialog — perfectly centered */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '78%',
        background: 'rgba(12,16,22,0.98)',
        border: `1px solid ${TEAL_50}`,
        borderRadius: 16,
        zIndex: 10003,
        boxShadow: `0 16px 48px rgba(0,0,0,0.7)`,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}>
        {/* Top accent line */}
        <div style={{
          height: 2,
          background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)`,
        }} />

        {/* Content */}
        <div style={{ padding: '20px 20px 8px' }}>
          {title && (
            <h2 style={{
              margin: '0 0 10px',
              fontFamily: "'Oswald', sans-serif",
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: '#fff',
              textAlign: 'center',
            }}>
              {title}
            </h2>
          )}
          {children && (
            <div style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.55)',
              textAlign: 'center',
              lineHeight: 1.6,
              paddingBottom: 10,
            }}>
              {children}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex' }}>
          <button
            onClick={onDecline}
            style={{
              flex: 1, padding: '14px 10px',
              background: 'rgba(255,255,255,0.04)',
              border: 'none',
              borderRight: '1px solid rgba(32,134,146,0.2)',
              borderTop: '1px solid rgba(32,134,146,0.15)',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: "'Oswald', sans-serif",
              fontSize: 13, letterSpacing: '0.1em',
              textTransform: 'uppercase', cursor: 'pointer',
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
          >
            {decline}
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: '14px 10px',
              background: TEAL_20,
              border: 'none',
              borderTop: '1px solid rgba(32,134,146,0.15)',
              color: TEAL,
              fontFamily: "'Oswald', sans-serif",
              fontSize: 13, letterSpacing: '0.1em',
              textTransform: 'uppercase', cursor: 'pointer',
              fontWeight: 600, transition: 'all 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = TEAL_50; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = TEAL_20; e.currentTarget.style.color = TEAL; }}
          >
            {confirm}
          </button>
        </div>
      </div>
    </>
  );
};

export default Confirm;
