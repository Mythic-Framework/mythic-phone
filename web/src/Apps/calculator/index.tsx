import React, { useState, useEffect } from 'react';
import mexp from 'math-expression-evaluator';
import { useAppColor, hexAlpha } from '../../hooks';

const BG = '#0a0c10';
const PANEL = 'rgba(16,20,28,0.95)';

const btn = (label: string, value: string, type: 'num' | 'op' | 'action' | 'eq') => ({ label, value, type });

const KEYS = [
  [btn('7','7','num'), btn('8','8','num'), btn('9','9','num'), btn('Del','del','action')],
  [btn('4','4','num'), btn('5','5','num'), btn('6','6','num'), btn('+','+','op')],
  [btn('1','1','num'), btn('2','2','num'), btn('3','3','num'), btn('−','-','op')],
  [btn('.','.',  'num'), btn('0','0','num'), btn('÷','/','op'), btn('×','*','op')],
  [btn('Reset','reset','action'), btn('=','=','eq')],
];

export default function Calculator() {
  const T = useAppColor('calculator');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string,string> = {'Backspace':'del','Enter':'=','*':'*','/':'/','+':('+'),'-':'-'};
      const k = map[e.key] ?? e.key;
      if ('0123456789.+-*/='.includes(k) || k === 'del') onPress(k);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const onPress = (k: string) => {
    switch (k) {
      case 'reset': setExpr(''); setResult(''); break;
      case 'del': setExpr(p => p.slice(0,-1)); setResult(''); break;
      case '=':
        try {
          const r = mexp.eval(expr);
          setResult(!isNaN(r) ? r.toString() : 'Error');
        } catch { setResult('Error'); }
        break;
      default: setExpr(p => p + k); setResult('');
    }
  };

  const getStyle = (type: string): React.CSSProperties => {
    if (type === 'eq') return { flex: 2, background: T, color: '#fff', boxShadow: `0 4px 20px ${T}60` };
    if (type === 'action') return { flex: 1, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' };
    if (type === 'op') return { flex: 1, background: T20, color: T, border: `1px solid ${T50}` };
    return { flex: 1, background: 'rgba(255,255,255,0.05)', color: '#fff' };
  };

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column', padding: 12, gap: 10, boxSizing: 'border-box' }}>
      <div style={{ background: PANEL, borderRadius: 16, padding: '16px 20px', border: `1px solid ${hexAlpha(T, 0.15)}`, flexShrink: 0 }}>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', minHeight: 22, fontFamily: 'Oswald', letterSpacing: '0.05em', wordBreak: 'break-all' }}>
          {expr.replace(/\*/g,'×').replace(/\//g,'÷') || ' '}
        </div>
        <div style={{ fontSize: 38, color: result === 'Error' ? '#e05555' : result ? T : '#fff', fontFamily: 'Oswald', fontWeight: 300, letterSpacing: '-0.02em', wordBreak: 'break-all', minHeight: 50 }}>
          {result || expr.replace(/\*/g,'×').replace(/\//g,'÷') || '0'}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {KEYS.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 8, flex: 1 }}>
            {row.map(({ label, value, type }) => (
              <button
                key={value}
                onClick={() => onPress(value)}
                style={{
                  ...getStyle(type),
                  height: '100%',
                  borderRadius: 14,
                  border: (getStyle(type) as any).border ?? '1px solid transparent',
                  fontSize: type === 'op' ? 22 : 20,
                  fontFamily: 'Oswald',
                  fontWeight: 400,
                  cursor: 'pointer',
                  transition: 'all 0.12s',
                  letterSpacing: '0.02em',
                }}
                onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.94)')}
                onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
