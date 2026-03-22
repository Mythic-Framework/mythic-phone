import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props { app: { icon: any; color?: string; [key: string]: any } }

const AppLoader: FC<Props> = ({ app }) => {
  return (
    <div style={{
      height: '100%',
      width: '100%',
      background: 'linear-gradient(160deg, rgba(10,13,18,0.98) 0%, rgba(14,20,28,0.95) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow blob */}
      <div style={{
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(32,134,146,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'pulse 2s ease-in-out infinite',
      }} />

      {/* Icon container with spinning ring */}
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        {/* Spinning arc */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            animation: 'spin 1.2s linear infinite',
          }}
        >
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="rgba(32,134,146,0.15)"
            strokeWidth="3"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="#208692"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="56 170"
            strokeDashoffset="0"
          />
        </svg>

        {/* App icon */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 52,
          height: 52,
          borderRadius: '0.85rem',
          background: app.color ?? '#208692',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 26,
          color: '#fff',
          boxShadow: `0 4px 20px ${app.color ?? '#208692'}55`,
        }}>
          <FontAwesomeIcon icon={app.icon} />
        </div>
      </div>

      {/* Loading label */}
      <div style={{
        fontFamily: "'Oswald', sans-serif",
        fontSize: 12,
        letterSpacing: '0.2em',
        color: 'rgba(32,134,146,0.7)',
        textTransform: 'uppercase',
      }}>
        Loading
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default AppLoader;
