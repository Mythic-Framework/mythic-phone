import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert, useAppColor, hexAlpha } from '../../../hooks';
import Nui from '../../../util/Nui';
import { AppDispatch } from '../../../store';

export default function Welcome() {
  const showAlert = useAlert();
  const dispatch = useDispatch<AppDispatch>();
  const T = useAppColor('redline');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T25 = hexAlpha(T, 0.25);
  const [alias, setAlias] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!alias.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await (await Nui.send('UpdateAlias', { app: 'redline', alias: alias.trim(), unique: true })).json();
      showAlert(res ? 'Alias Created' : 'Unable to Create Alias');
      if (res) dispatch({ type: 'UPDATE_DATA', payload: { type: 'player', id: 'Alias', key: 'redline', data: alias.trim() } });
    } catch { showAlert('Unable to Create Alias'); }
    setSubmitting(false);
  };

  const canSubmit = !submitting && alias.trim().length > 0;

  return (
    <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 16px', height: 56, background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`, borderBottom: `1px solid ${T50}`, gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
        <FontAwesomeIcon icon={['fas', 'flag-checkered']} style={{ color: T, fontSize: 16 }} />
        Vroom
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', gap: 0 }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: T20, border: `1px solid ${T50}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: T, marginBottom: 20 }}>
          <FontAwesomeIcon icon={['fas', 'flag-checkered']} />
        </div>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', color: '#fff', marginBottom: 6 }}>
          Welcome Racer
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em', marginBottom: 28, textAlign: 'center' }}>
          Set your alias to get started
        </div>

        <form onSubmit={onSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            value={alias}
            onChange={e => setAlias(e.target.value)}
            maxLength={32}
            required
            placeholder="Enter alias..."
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: `1px solid ${alias ? T50 : 'rgba(255,255,255,0.1)'}`, borderRadius: 8, padding: '10px 14px', color: '#fff', fontFamily: "'Oswald', sans-serif", fontSize: 14, letterSpacing: '0.06em', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
            onFocus={e => (e.target.style.borderColor = T50)}
            onBlur={e => (e.target.style.borderColor = alias ? T50 : 'rgba(255,255,255,0.1)')}
          />
          <button
            type="submit"
            disabled={!canSubmit}
            style={{ width: '100%', padding: '10px 0', background: canSubmit ? T : T25, border: 'none', borderRadius: 8, color: canSubmit ? '#fff' : 'rgba(255,255,255,0.3)', fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: canSubmit ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
          >
            {submitting ? 'Creating...' : 'Confirm Alias'}
          </button>
        </form>

        <div style={{ marginTop: 16, fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em', textAlign: 'center' }}>
          Think hard — you cannot change this later
        </div>
      </div>
    </div>
  );
}
