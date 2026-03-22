import React, { FC } from 'react';

const TEAL = '#208692';

interface Props {
  static?: boolean;
  number?: number | string;
  text?: string;
  subtext?: string;
}

const Loader: FC<Props> = (props) => {
  const isStatic = props.static;

  const inner = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
    }}>
      {/* SVG spinner */}
      <div style={{ position: 'relative', width: 64, height: 64 }}>
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          style={{ animation: 'loaderSpin 1.1s linear infinite' }}
        >
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(32,134,146,0.15)" strokeWidth="3" />
          <circle
            cx="32" cy="32" r="28"
            fill="none"
            stroke={TEAL}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="44 132"
          />
        </svg>
        {props.number != null && (
          <span style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: "'Oswald', sans-serif",
            fontSize: 18,
            fontWeight: 500,
            color: TEAL,
          }}>
            {props.number}
          </span>
        )}
      </div>

      {/* Text */}
      <div style={{
        fontFamily: "'Oswald', sans-serif",
        fontSize: 13,
        letterSpacing: '0.15em',
        color: 'rgba(255,255,255,0.6)',
        textTransform: 'uppercase',
      }}>
        {props.text ?? 'Loading Data'}
      </div>

      {props.subtext && (
        <div style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.06em',
        }}>
          {props.subtext}
        </div>
      )}

      <style>{`
        @keyframes loaderSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  if (isStatic) {
    return (
      <div style={{
        width: 'fit-content',
        height: 'fit-content',
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
        margin: 'auto',
        zIndex: 100,
      }}>
        {inner}
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', position: 'relative', zIndex: 100, padding: '20px 0' }}>
      {inner}
    </div>
  );
};

export default Loader;
