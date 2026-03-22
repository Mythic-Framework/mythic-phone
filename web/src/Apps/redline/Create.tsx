import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import Nui from '../../util/Nui';
import { Confirm } from '../../components';
import { TrackTypes } from './trackTypes';
import { RootState, AppDispatch } from '../../store';

const useStyles = makeStyles(() => ({
  wrapper: {
    height: '100%',
    background: '#0a0c10',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
  },
  body: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: 16,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 14,
    scrollbarWidth: 'thin' as const,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.35)',
    marginBottom: 6,
  },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    fontSize: 13,
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'all 0.18s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    '&:disabled': { opacity: 0.35, cursor: 'not-allowed' },
  },
}));

export default function RedlineCreate() {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const showAlert = useAlert();

  const T    = useAppColor('redline');
  const T50  = hexAlpha(T, 0.5);
  const T20  = hexAlpha(T, 0.2);
  const T15  = hexAlpha(T, 0.15);
  const T08  = hexAlpha(T, 0.08);
  const T06  = hexAlpha(T, 0.06);

  const tracks     = useSelector((state: RootState) => state.data.data.tracks) ?? [];
  const createState = useSelector((state: RootState) => (state as any).race?.creator);

  // "Save Map" inline form state
  const [trackName, setTrackName] = useState('');
  const [trackType, setTrackType] = useState('laps');
  const [saving,    setSaving]    = useState(false);

  // Per-track actions
  const [expanded,  setExpanded]  = useState<number | null>(null);
  const [deleting,  setDeleting]  = useState<any>(null);
  const [resetting, setResetting] = useState<any>(null);

  const onSaveMap = async () => {
    if (!trackName.trim()) { showAlert('Enter a track name'); return; }
    setSaving(true);
    try {
      const res = await (await Nui.send('FinishCreator', { name: trackName.trim(), type: trackType })).json();
      showAlert(res ? 'Track Created' : 'Unable to Create Track');
      if (res) { setTrackName(''); setTrackType('laps'); }
    } catch { showAlert('Unable to Create Track'); }
    setSaving(false);
  };

  const onDelete = async () => {
    try { const res = await (await Nui.send('DeleteTrack', deleting)).json(); showAlert(res ? 'Track Deleted' : 'Unable to Delete Track'); } catch { showAlert('Unable to Delete Track'); }
    setDeleting(null); setExpanded(null);
  };

  const onReset = async () => {
    try { const res = await (await Nui.send('ResetTrackHistory', resetting)).json(); showAlert(res ? 'Track History Reset' : 'Unable to Reset'); } catch { showAlert('Unable to Reset'); }
    setResetting(null);
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
    '& .MuiSvgIcon-root': { color: 'rgba(255,255,255,0.5)' },
  };

  return (
    <div className={classes.wrapper}>

      {/* ── Header ── */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        height: 56,
        background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
        borderBottom: `1px solid ${T50}`,
      }}>
        <span style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600,
          letterSpacing: '0.08em', color: '#fff',
        }}>
          <FontAwesomeIcon icon={['fas', 'flag-checkered']} style={{ fontSize: 16, color: T }} />
          Track Manager
        </span>
        {createState != null && (
          <span style={{
            fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: T,
            background: T08, border: `1px solid ${T20}`,
            borderRadius: 6, padding: '3px 10px',
          }}>
            <FontAwesomeIcon icon={['fas', 'circle']} style={{ fontSize: 7, marginRight: 6, verticalAlign: 'middle' }} />
            Creator Active
          </span>
        )}
      </div>

      {/* ── Scrollable Body ── */}
      <div className={classes.body} style={{ scrollbarColor: `${T50} transparent` }}>

        {/* Save Map card — only shown when creator is active */}
        {createState != null && (
          <div style={{
            background: T06,
            border: `1px solid ${T20}`,
            borderRadius: 12,
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            <div className={classes.sectionLabel}>
              <FontAwesomeIcon icon={['fas', 'map']} style={{ marginRight: 6, color: T }} />
              Save New Track
            </div>
            <TextField
              fullWidth
              label="Track Name"
              variant="outlined"
              value={trackName}
              onChange={e => setTrackName(e.target.value)}
              inputProps={{ maxLength: 48 }}
              sx={inputSx}
            />
            <TextField
              select
              fullWidth
              label="Track Type"
              variant="outlined"
              value={trackType}
              onChange={e => setTrackType(e.target.value)}
              sx={inputSx}
            >
              {Object.keys(TrackTypes).map(k => (
                <MenuItem key={k} value={k}>{TrackTypes[k]}</MenuItem>
              ))}
            </TextField>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className={classes.btn}
                disabled={saving || !trackName.trim()}
                onClick={onSaveMap}
                style={{
                  background: T20,
                  border: `1px solid ${T50}`,
                  color: T,
                  opacity: (saving || !trackName.trim()) ? 0.35 : 1,
                  cursor: (saving || !trackName.trim()) ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={e => { if (!saving && trackName.trim()) (e.currentTarget as HTMLElement).style.background = T50; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T20; }}
              >
                <FontAwesomeIcon icon={['fas', 'floppy-disk']} />
                {saving ? 'Saving...' : 'Save Track'}
              </button>
            </div>
          </div>
        )}

        {/* Existing Tracks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {tracks.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 12, padding: '40px 0',
              color: 'rgba(255,255,255,0.2)', fontSize: 13,
              fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              <FontAwesomeIcon icon={['fas', 'road']} style={{ fontSize: 32, color: hexAlpha(T, 0.15) }} />
              No Tracks Yet
            </div>
          ) : (
            <>
              <div className={classes.sectionLabel}>
                <FontAwesomeIcon icon={['fas', 'list']} style={{ marginRight: 6, color: T }} />
                Existing Tracks ({tracks.length})
              </div>
              {tracks.map((track: any, k: number) => {
                const open = expanded === k;
                return (
                  <div
                    key={k}
                    style={{
                      background: open ? T08 : T06,
                      border: `1px solid ${open ? T50 : T15}`,
                      borderRadius: 12,
                      overflow: 'hidden',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                  >
                    {/* Track row */}
                    <div
                      onClick={() => setExpanded(open ? null : k)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '12px 16px', cursor: 'pointer', userSelect: 'none',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span style={{
                          fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 15,
                          color: '#fff', letterSpacing: '0.04em',
                        }}>
                          {track.Name}
                        </span>
                        <span style={{
                          fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 12,
                          color: 'rgba(255,255,255,0.4)',
                        }}>
                          {track.Distance} &nbsp;·&nbsp; {TrackTypes[track.Type] ?? track.Type}
                        </span>
                      </div>
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        style={{
                          fontSize: 12, color: T,
                          transition: 'transform 0.2s',
                          transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                        }}
                      />
                    </div>

                    {/* Expanded actions */}
                    {open && (
                      <div style={{
                        borderTop: `1px solid ${T15}`,
                        padding: '10px 16px 14px',
                        display: 'flex',
                        gap: 8,
                      }}>
                        <button
                          onClick={() => setResetting(track._id)}
                          style={{
                            flex: 1, height: 38, borderRadius: 8,
                            border: `1px solid ${T20}`, background: 'transparent',
                            color: T, fontSize: 11, fontFamily: "'Oswald', sans-serif",
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            cursor: 'pointer', transition: 'background 0.15s',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}
                        >
                          <FontAwesomeIcon icon={['fas', 'rotate-left']} />
                          Lap Records
                        </button>
                        <button
                          onClick={() => setDeleting(track._id)}
                          style={{
                            flex: 1, height: 38, borderRadius: 8,
                            border: '1px solid rgba(224,82,82,0.3)', background: 'transparent',
                            color: '#e05252', fontSize: 11, fontFamily: "'Oswald', sans-serif",
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            cursor: 'pointer', transition: 'background 0.15s',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(224,82,82,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(224,82,82,0.6)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(224,82,82,0.3)'; }}
                        >
                          <FontAwesomeIcon icon={['fas', 'trash']} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <Confirm title="Delete Track?" open={deleting != null}  confirm="Yes" decline="No" onConfirm={onDelete} onDecline={() => setDeleting(null)} />
      <Confirm title="Reset Lap Records?" open={resetting != null} confirm="Yes" decline="No" onConfirm={onReset} onDecline={() => setResetting(null)} />
    </div>
  );
}
