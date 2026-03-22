import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from '../../components';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import Nui from '../../util/Nui';
import { TrackTypes } from './trackTypes';
import { RootState, AppDispatch } from '../../store';

function formatDuration(ms: number) {
  const h = Math.floor(ms / 3600000); const m = Math.floor((ms % 3600000) / 60000); const s = Math.floor((ms % 60000) / 1000); const ms2 = ms % 1000;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}:${String(ms2).padStart(3,'0')}`;
}

const EMPTY_FORM = { name: '', buyin: '', laps: 1, dnf_start: '', dnf_time: '', countdown: '5' };

interface Props {
  onCreatingChange?: (creating: boolean) => void;
}

export default function BluelineTracks({ onCreatingChange }: Props) {
  const showAlert = useAlert();
  const dispatch = useDispatch<AppDispatch>();

  const T   = useAppColor('blueline');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T08 = hexAlpha(T, 0.08);
  const T15 = hexAlpha(T, 0.15);
  const T06 = hexAlpha(T, 0.06);

  const tracks = useSelector((state: RootState) => state.data.data.tracks_pd) ?? [];
  const inRace = useSelector((state: RootState) => (state as any).pdRace?.inRace);
  const alias  = useSelector((state: RootState) => state.data.data.player?.Callsign);

  const [expanded,  setExpanded]  = useState<number | null>(null);
  const [records,   setRecords]   = useState<any>(null);
  const [creating,  setCreating]  = useState<any>(null);
  const [formState, setFormState] = useState({ ...EMPTY_FORM });

  useEffect(() => { onCreatingChange?.(Boolean(creating)); }, [creating]);

  const onChange = (e: any) => setFormState(p => ({ ...p, [e.target.name]: e.target.value }));

  const openCreate = (track: any) => { setFormState({ ...EMPTY_FORM }); setCreating(track); };
  const closeCreate = () => { setCreating(null); setFormState({ ...EMPTY_FORM }); };

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await (await Nui.send('CreateRacePD', { ...formState, track: creating._id })).json();
      closeCreate();
      showAlert(!res?.failed ? 'Race Created' : 'Unable to Create');
      if (!res?.failed) dispatch({ type: 'PD_I_RACE', payload: { state: true } });
    } catch { closeCreate(); showAlert('Unable To Create'); }
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '8px',
      '& fieldset': { borderColor: hexAlpha(T, 0.3) },
      '&:hover fieldset': { borderColor: hexAlpha(T, 0.6) },
      '&.Mui-focused fieldset': { borderColor: T },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: T },
    '& .MuiInputBase-input': { color: '#fff' },
    '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: 'rgba(255,255,255,0.3)' },
  };

  const sectionLabel: React.CSSProperties = {
    fontSize: 11, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.12em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 4,
  };

  const btnStyle = (disabled = false): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 6,
    border: `1px solid ${T20}`, background: 'transparent', color: T, fontSize: 11,
    fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase',
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.25 : 1,
    transition: 'background 0.15s, border-color 0.15s',
  });

  const footerBtn = (danger = false): React.CSSProperties => ({
    flex: 1, height: 44, borderRadius: 10, fontSize: 13,
    fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em',
    textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.18s',
    background: danger ? 'rgba(180,40,40,0.15)' : T20,
    border: danger ? '1px solid rgba(180,40,40,0.4)' : `1px solid ${T50}`,
    color: danger ? '#e07070' : T,
  });

  const canSubmit = !!(formState.name.trim() && formState.dnf_start && formState.dnf_time);

  // ── CREATE full-page view ───────────────────────────────────────────────
  if (creating) {
    return (
      <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 8px 0 16px', height: 56,
          background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
          borderBottom: `1px solid ${T50}`,
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
            <FontAwesomeIcon icon={['fas', 'flag-checkered']} style={{ fontSize: 16, color: T }} />
            Create Trial
          </span>
          <button
            onClick={closeCreate}
            style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, background: 'transparent', transition: 'background 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}
          >
            <FontAwesomeIcon icon={['fas', 'arrow-left']} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14, scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>

          {/* Track Info */}
          <div style={{ background: T06, border: `1px solid ${T20}`, borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={sectionLabel}>Track Info</div>
            <TextField fullWidth label="Host" disabled value={alias ?? ''} sx={inputSx} />
            <TextField fullWidth label="Track" disabled value={creating.Name} sx={inputSx} />
            <TextField fullWidth label="Track Type" disabled value={TrackTypes[creating.Type] ?? creating.Type} sx={inputSx} />
          </div>

          {/* Race Settings */}
          <div style={{ background: T06, border: `1px solid ${T20}`, borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={sectionLabel}>Trial Settings</div>
            <TextField fullWidth label="Event Name" name="name" variant="outlined" value={formState.name} onChange={onChange} inputProps={{ maxLength: 32 }} sx={inputSx} />
            <TextField fullWidth label="# of Laps" name="laps" variant="outlined" type="number" disabled={creating.Type === 'p2p'} value={formState.laps} onChange={onChange} sx={inputSx} />
            <TextField fullWidth label="Countdown (seconds)" name="countdown" variant="outlined" type="number" value={formState.countdown} onChange={onChange} sx={inputSx} />
          </div>

          {/* DNF Rules */}
          <div style={{ background: T06, border: `1px solid ${T20}`, borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={sectionLabel}>DNF Rules</div>
            <TextField fullWidth label="DNF Start (lap #)" name="dnf_start" variant="outlined" type="number" value={formState.dnf_start} onChange={onChange} sx={inputSx} />
            <TextField fullWidth label="DNF Time (seconds)" name="dnf_time" variant="outlined" type="number" value={formState.dnf_time} onChange={onChange} sx={inputSx} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ flexShrink: 0, display: 'flex', gap: 10, padding: '12px 16px', borderTop: `1px solid ${T20}`, background: 'rgba(8,10,14,0.98)' }}>
          <button
            style={footerBtn(true)}
            onClick={closeCreate}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(180,40,40,0.3)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(180,40,40,0.15)'; }}
          >
            Cancel
          </button>
          <button
            style={{ ...footerBtn(false), opacity: !canSubmit ? 0.35 : 1, cursor: !canSubmit ? 'not-allowed' : 'pointer' }}
            disabled={!canSubmit}
            onClick={onCreate as any}
            onMouseEnter={e => { if (canSubmit) (e.currentTarget as HTMLElement).style.background = T50; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T20; }}
          >
            Create Trial
          </button>
        </div>
      </div>
    );
  }

  // ── TRACK LIST ──────────────────────────────────────────────────────────
  if (tracks.length === 0) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'rgba(255,255,255,0.25)', fontSize: 13, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      <FontAwesomeIcon icon={['fas', 'flag-checkered']} style={{ fontSize: 32, color: T20 }} />
      No Tracks Available
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
      {tracks.map((track: any, k: number) => {
        const open = expanded === k;
        return (
          <div key={k}
            style={{ borderBottom: `1px solid ${T15}`, background: 'transparent', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = T08)}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <div onClick={() => setExpanded(open ? null : k)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer', userSelect: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 15, color: '#fff', letterSpacing: '0.04em' }}>{track.Name}</span>
                <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{track.Distance}</span>
              </div>
              <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ fontSize: 12, color: T, transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }} />
            </div>
            {open && (
              <div style={{ padding: '0 16px 12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Type</span>
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{TrackTypes[track.Type] ?? track.Type}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
                  <button style={btnStyle()}
                    onClick={() => setRecords(track)}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
                    <FontAwesomeIcon icon={['fas', 'trophy']} /> Lap Records
                  </button>
                  <button style={btnStyle(inRace)} disabled={inRace}
                    onClick={() => openCreate(track)}
                    onMouseEnter={e => { if (!inRace) { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; } }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
                    <FontAwesomeIcon icon={['fas', 'flag-checkered']} /> Create
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <Modal open={Boolean(records)} title="Lap Records" onClose={() => setRecords(null)} closeLang="Close" appColor={T}>
        {Boolean(records) && (records.Fastest?.length > 0 ? records.Fastest.map((lap: any, i: number) => (
          <div key={i} style={{ padding: '8px 0', borderBottom: `1px solid ${T15}` }}>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff' }}>#{i + 1} {lap.alias} — {lap.car}</div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{formatDuration(lap.lapEnd - lap.lapStart)}</div>
          </div>
        )) : <div style={{ fontFamily: "'Oswald', sans-serif", color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>No Lap Records</div>)}
      </Modal>
    </div>
  );
}
