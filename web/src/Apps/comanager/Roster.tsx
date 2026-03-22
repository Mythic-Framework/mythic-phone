import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat } from 'react-number-format';
import Nui from '../../util/Nui';
import { useAlert, useJobPermissions, useAppColor, hexAlpha } from '../../hooks';
import { Modal, Confirm } from '../../components';
import Workplace from './components/Workplace';

interface Props { refreshRoster: () => void; loading: boolean; jobData: any; playerJob: any; }

// ── Custom dropdown — stays 100% inside the phone DOM, no MUI portal escape ──
interface SelectOption { value: string; label: string; disabled?: boolean }
interface CustomSelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  disabled?: boolean;
  onChange: (value: string) => void;
  T: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, options, disabled, onChange, T }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const selected = options.find(o => o.value === value);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', marginBottom: 15, width: '100%' }}>
      {/* Field */}
      <div
        onClick={() => !disabled && setOpen(o => !o)}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '14px 36px 14px 14px',
          background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${open ? T : hexAlpha(T, 0.3)}`,
          borderRadius: open ? '8px 8px 0 0' : 8,
          color: disabled ? 'rgba(255,255,255,0.3)' : '#fff',
          fontFamily: "'Oswald', sans-serif",
          fontSize: 14,
          letterSpacing: '0.03em',
          cursor: disabled ? 'not-allowed' : 'pointer',
          position: 'relative',
          transition: 'border-color 0.15s',
          userSelect: 'none',
        }}
      >
        {/* Floating label */}
        <span style={{
          position: 'absolute',
          top: -9,
          left: 10,
          fontSize: 11,
          letterSpacing: '0.04em',
          color: open ? T : 'rgba(255,255,255,0.4)',
          background: 'rgba(12,16,22,1)',
          padding: '0 4px',
          fontFamily: "'Oswald', sans-serif",
          transition: 'color 0.15s',
          pointerEvents: 'none',
        }}>
          {label}
        </span>
        {selected?.label ?? ''}
        {/* Chevron */}
        <span style={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: `translateY(-50%) rotate(${open ? '180deg' : '0deg'})`,
          transition: 'transform 0.2s',
          color: 'rgba(255,255,255,0.4)',
          fontSize: 11,
          pointerEvents: 'none',
        }}>
          <FontAwesomeIcon icon="chevron-down" />
        </span>
      </div>

      {/* Dropdown — renders inline, no portal */}
      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 10002,
          // Exact Twitter header gradient: solid base + 90deg left→right
          backgroundColor: '#0a0c10',
          backgroundImage: `linear-gradient(90deg, ${T20} 0%, rgba(8,10,14,0.97) 100%)`,
          border: `1px solid ${T50}`,
          borderTop: `1px solid ${hexAlpha(T, 0.15)}`,
          borderRadius: '0 0 8px 8px',
          boxShadow: `0 8px 24px rgba(0,0,0,0.6)`,
          overflow: 'hidden',
        }}>
          {options.map(opt => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                onClick={() => { if (!opt.disabled) { onChange(opt.value); setOpen(false); } }}
                style={{
                  padding: '9px 14px',
                  paddingLeft: isSelected ? 11 : 14,
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 13,
                  letterSpacing: '0.04em',
                  color: opt.disabled ? 'rgba(255,255,255,0.2)' : isSelected ? T : '#fff',
                  background: isSelected ? T20 : 'transparent',
                  borderLeft: isSelected ? `3px solid ${T}` : '3px solid transparent',
                  cursor: opt.disabled ? 'not-allowed' : 'pointer',
                  transition: 'background 0.12s',
                  userSelect: 'none',
                }}
                onMouseEnter={e => { if (!opt.disabled && !isSelected) (e.currentTarget as HTMLElement).style.background = T20; }}
                onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── Main Roster component ──────────────────────────────────────────────────────
const Roster: React.FC<Props> = ({ refreshRoster, loading, jobData, playerJob }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sendAlert = useAlert();
  const T = useAppColor('comanager');
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const T10 = hexAlpha(T, 0.1);
  const hasPerm = useJobPermissions();
  const player = useSelector((state: any) => state.data.data.player);

  let initialPendingHire: any;
  if (jobData?.Workplaces) {
    initialPendingHire = { SID: '', Job: { Id: jobData.Id, Workplace: jobData?.Workplaces[0], Grade: jobData?.Workplaces[0]?.Grades[0] } };
  } else {
    initialPendingHire = { SID: '', Job: { Id: jobData.Id, Workplace: null, Grade: jobData?.Grades[0] } };
  }

  const isOwner = player.SID == jobData?.Owner;
  const manageCompany = hasPerm('JOB_MANAGEMENT', jobData.Id) || isOwner;
  const hireEmployee = hasPerm('JOB_HIRE', jobData.Id) || isOwner;
  const fireEmployee = hasPerm('JOB_FIRE', jobData.Id) || isOwner;

  const [viewing, setViewing] = useState<boolean>(false);
  const [quitConf, setQuitConf] = useState<boolean>(false);
  const [hiring, setHiring] = useState<any>(null);
  const [firing, setFiring] = useState<boolean>(false);

  const fieldSx = {
    mb: '15px', width: '100%',
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255,255,255,0.03)', borderRadius: '8px',
      '& fieldset': { borderColor: hexAlpha(T, 0.3) },
      '&:hover fieldset': { borderColor: hexAlpha(T, 0.6) },
      '&.Mui-focused fieldset': { borderColor: T },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: T },
    '& .MuiInputBase-input': { color: '#fff' },
    '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: 'rgba(255,255,255,0.3)' },
  };

  const headerBtn = (disabled = false): React.CSSProperties => ({
    width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 6, border: `1px solid ${T20}`, cursor: disabled ? 'not-allowed' : 'pointer',
    color: T, fontSize: 14, background: 'transparent', opacity: disabled ? 0.3 : 1,
    pointerEvents: disabled ? 'none' : 'auto', transition: 'background 0.2s, border-color 0.2s',
  });

  const onHire = async (e: any) => {
    e.preventDefault();
    if (hiring.edit) {
      try {
        let res = await (await Nui.send('UpdateEmployee', hiring)).json();
        if (res.success) refreshRoster(); else sendAlert('Unable To Update Employee');
      } catch { sendAlert('Unable To Update Employee'); }
    } else {
      try {
        if (hiring.SID != player.SID) {
          let res = await (await Nui.send('HireEmployee', hiring)).json();
          if (res.success) sendAlert('Employment Offer Sent');
          else { switch (res.code) { default: case 'ERROR': sendAlert('Unable To Hire Employee'); break; case 'INVALID_PERMISSIONS': sendAlert('Not Authorized'); break; case 'INVALID_TARGET': sendAlert('Invalid or Offline State ID'); break; case 'OUTSTANDING_OFFER': sendAlert('Person Has An Outstanding Employment Offer'); break; } }
        } else sendAlert('You Cannot Hire Yourself');
      } catch { sendAlert('Unable To Hire Employee'); }
    }
    setHiring(null);
  };

  const onFire = async () => {
    try {
      let res = await (await Nui.send('FireEmployee', hiring)).json();
      if (res.success) { sendAlert(`${hiring.First} ${hiring.Last} Has Been Fired`); refreshRoster(); }
      else { switch (res.code) { case 'INVALID_PERMISSIONS': sendAlert('Not Authorized'); break; default: sendAlert(`Unable To Fire ${hiring.First} ${hiring.Last}`); break; } }
    } catch { sendAlert(`Unable To Fire ${hiring.First} ${hiring.Last}`); }
    setFiring(false); setHiring(null);
  };

  const onQuit = async () => {
    if (isOwner) return;
    try {
      let res = await (await Nui.send('QuitJob', { JobId: jobData.Id })).json();
      if (res) sendAlert('You Quit'); else sendAlert('Unable To Quit Job');
      setQuitConf(false); setViewing(false);
    } catch { sendAlert('Unable To Quit Job'); }
  };

  return (
    <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 16px', height: 56, background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`, borderBottom: `1px solid ${T50}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.06em', color: '#fff', overflow: 'hidden' }}>
          <FontAwesomeIcon icon={['fas', 'building']} style={{ color: T, fontSize: 16, flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{jobData.Name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {[
            { icon: 'user', onClick: () => setViewing(true), show: true },
            { icon: 'plus', onClick: () => setHiring(initialPendingHire), show: hireEmployee },
            { icon: 'arrows-rotate', onClick: () => refreshRoster(), show: true, disabled: loading, spin: loading },
            { icon: 'house', onClick: () => navigate(-1), show: true },
          ].filter(b => b.show).map((btn, i) => (
            <div key={i} style={headerBtn(btn.disabled)} onClick={btn.onClick}
              onMouseEnter={e => { if (!btn.disabled) { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; } }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
              <FontAwesomeIcon icon={['fas', btn.icon as any]} className={btn.spin ? 'fa-spin' : ''} />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
        {jobData.Workplaces
          ? jobData.Workplaces.map((workplace: any) => (
            <Workplace key={workplace.Id} workplace={workplace} jobData={jobData} playerJob={playerJob} onEmployeeClick={(e: any) => setHiring({ ...e, SID: e.SID, Job: e.JobData, edit: true })} />
          ))
          : <Workplace workplace={false} jobData={jobData} playerJob={playerJob} onEmployeeClick={(e: any) => setHiring({ ...e, SID: e.SID, Job: e.JobData, edit: true })} />
        }
      </div>

      <Modal appColor={T} open={viewing} title="My Employment" onClose={() => setViewing(false)} onDelete={!isOwner ? () => setQuitConf(true) : null} deleteLang="Quit">
        <div style={{ padding: '8px 0' }}>
          {[
            { label: 'Job', value: playerJob.Name },
            ...(isOwner ? [{ label: 'Role', value: 'Owner' }] : []),
            ...(playerJob.Workplace ? [{ label: 'Workplace', value: playerJob.Workplace.Name }] : []),
            { label: 'Grade', value: playerJob.Grade.Name },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${T10}` }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Oswald', sans-serif", fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{row.label}</span>
              <span style={{ color: '#fff', fontFamily: "'Share Tech Mono', monospace", fontSize: 13 }}>{row.value}</span>
            </div>
          ))}
        </div>
      </Modal>

      {!isOwner && <Confirm title={`Quit ${jobData.Name}?`} open={quitConf} confirm="Yes" decline="No" onConfirm={onQuit} onDecline={() => setQuitConf(false)} />}

      {hireEmployee && Boolean(hiring) && (
        <Modal appColor={T} form open={hiring != null} title={hiring?.edit ? 'Update Employment' : 'Hire Employee'} onClose={() => setHiring(null)} onAccept={onHire} onDelete={hiring?.edit && (manageCompany || fireEmployee) && hiring?.SID != player.SID ? () => setFiring(true) : null} deleteLang="Fire">
          {Boolean(hiring) && (
            <>
              <NumericFormat
                fullWidth required label="State ID" name="sid"
                value={hiring.SID} disabled={hiring?.edit}
                onValueChange={(v: any) => setHiring({ ...hiring, SID: v.value })}
                type="tel" customInput={TextField} sx={fieldSx}
              />
              {jobData.Workplaces && (
                <CustomSelect
                  T={T}
                  label="Workplace"
                  value={hiring.Job.Workplace.Id}
                  disabled={!manageCompany}
                  options={jobData.Workplaces.map((w: any) => ({ value: w.Id, label: w.Name }))}
                  onChange={val => setHiring({ ...hiring, Job: { ...hiring.Job, Workplace: jobData.Workplaces.find((w: any) => w.Id == val), Grade: jobData.Workplaces.find((w: any) => w.Id == val).Grades[0] } })}
                />
              )}
              {jobData.Workplaces
                ? <CustomSelect
                    T={T}
                    label="Grade"
                    value={hiring.Job.Grade.Id}
                    options={jobData.Workplaces.find((w: any) => w.Id == hiring.Job.Workplace.Id).Grades.sort((a: any, b: any) => a.Level - b.Level).map((g: any) => ({ value: g.Id, label: g.Name, disabled: !isOwner && playerJob.Grade.Level <= g.Level }))}
                    onChange={val => setHiring({ ...hiring, Job: { ...hiring.Job, Grade: jobData.Workplaces.find((w: any) => w.Id == hiring.Job.Workplace.Id).Grades.find((g: any) => g.Id == val) } })}
                  />
                : <CustomSelect
                    T={T}
                    label="Grade"
                    value={hiring.Job.Grade.Id}
                    options={jobData.Grades.sort((a: any, b: any) => a.Level - b.Level).map((g: any) => ({ value: g.Id, label: g.Name, disabled: !isOwner && playerJob.Grade.Level <= g.Level }))}
                    onChange={val => setHiring({ ...hiring, Job: { ...hiring.Job, Grade: jobData.Grades.find((g: any) => g.Id == val) } })}
                  />
              }
            </>
          )}
        </Modal>
      )}
      {Boolean(hiring) && hiring?.edit && (
        <Confirm title={`Fire ${hiring.First} ${hiring.Last}?`} open={firing} confirm="Yes" decline="No" onConfirm={onFire} onDecline={() => setFiring(false)} />
      )}
    </div>
  );
};

export default Roster;
