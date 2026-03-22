import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat } from 'react-number-format';
import Nui from '../../util/Nui';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import { Modal, Confirm, Loader } from '../../components';

interface Props { refreshRoster: () => void; jobData: any; playerJob: any; }

// ── Custom multi-select for permissions — stays 100% inside the phone DOM ──
interface MultiSelectProps {
  label: string;
  value: string[];
  options: { value: string; label: string }[];
  disabled?: boolean;
  onChange: (value: string[]) => void;
  T: string;
}

const CustomMultiSelect: React.FC<MultiSelectProps> = ({ label, value, options, disabled, onChange, T }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const toggle = (val: string) => {
    onChange(value.includes(val) ? value.filter(v => v !== val) : [...value, val]);
  };

  const displayLabel = value.length === 0
    ? ''
    : value.length === 1
    ? (options.find(o => o.value === value[0])?.label ?? value[0])
    : `${value.length} selected`;

  return (
    <div ref={ref} style={{ position: 'relative', marginBottom: 15, width: '100%' }}>
      {/* Field */}
      <div
        onClick={() => !disabled && setOpen(o => !o)}
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '14px 36px 14px 14px',
          background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${open ? T : hexAlpha(T, 0.3)}`,
          borderRadius: open ? '8px 8px 0 0' : 8,
          color: disabled ? 'rgba(255,255,255,0.3)' : value.length > 0 ? '#fff' : 'rgba(255,255,255,0.3)',
          fontFamily: "'Oswald', sans-serif",
          fontSize: 14, letterSpacing: '0.03em',
          cursor: disabled ? 'not-allowed' : 'pointer',
          position: 'relative',
          transition: 'border-color 0.15s',
          userSelect: 'none',
          minHeight: 52,
          display: 'flex', alignItems: 'center',
        }}
      >
        {/* Floating label */}
        <span style={{
          position: 'absolute', top: -9, left: 10,
          fontSize: 11, letterSpacing: '0.04em',
          color: open ? T : 'rgba(255,255,255,0.4)',
          background: 'rgba(12,16,22,1)',
          padding: '0 4px',
          fontFamily: "'Oswald', sans-serif",
          transition: 'color 0.15s', pointerEvents: 'none',
        }}>
          {label}
        </span>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {displayLabel}
        </span>
        {/* Chevron */}
        <span style={{
          position: 'absolute', right: 12, top: '50%',
          transform: `translateY(-50%) rotate(${open ? '180deg' : '0deg'})`,
          transition: 'transform 0.2s',
          color: 'rgba(255,255,255,0.4)', fontSize: 11, pointerEvents: 'none',
        }}>
          <FontAwesomeIcon icon="chevron-down" />
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10002,
          backgroundColor: '#0a0c10',
          backgroundImage: `linear-gradient(90deg, ${T20} 0%, rgba(8,10,14,0.97) 100%)`,
          border: `1px solid ${T50}`,
          borderTop: `1px solid ${hexAlpha(T, 0.15)}`,
          borderRadius: '0 0 8px 8px',
          boxShadow: `0 8px 24px rgba(0,0,0,0.6)`,
          maxHeight: 180, overflowY: 'auto',
          scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent`,
        }}>
          {options.map(opt => {
            const checked = value.includes(opt.value);
            return (
              <div
                key={opt.value}
                onClick={() => toggle(opt.value)}
                style={{
                  padding: '8px 14px',
                  paddingLeft: checked ? 11 : 14,
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 13, letterSpacing: '0.04em',
                  color: checked ? T : '#fff',
                  background: checked ? T20 : 'transparent',
                  borderLeft: checked ? `3px solid ${T}` : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'background 0.12s',
                  userSelect: 'none',
                }}
                onMouseEnter={e => { if (!checked) (e.currentTarget as HTMLElement).style.background = T20; }}
                onMouseLeave={e => { if (!checked) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {/* Checkbox indicator */}
                <div style={{
                  width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                  border: `1px solid ${checked ? T : 'rgba(255,255,255,0.3)'}`,
                  background: checked ? T : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.12s',
                }}>
                  {checked && <FontAwesomeIcon icon="check" style={{ fontSize: 8, color: '#000' }} />}
                </div>
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── Main Management component ─────────────────────────────────────────────────
const Management: React.FC<Props> = ({ refreshRoster, jobData, playerJob }) => {
  const sendAlert = useAlert();
  const navigate = useNavigate();
  const T = useAppColor('comanager');
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const T12 = hexAlpha(T, 0.12);
  const T08 = hexAlpha(T, 0.08);
  const T04 = hexAlpha(T, 0.04);
  const T06 = hexAlpha(T, 0.06);

  const player = useSelector((state: any) => state.data.data.player);
  const jobPermissions = useSelector((state: any) => state.data.data.NamedJobPermissions);
  const isOwner = player.SID == jobData?.Owner;
  const initialGrade = { Id: '', Name: '', Level: 1, Permissions: {} };

  const [ownerMenu, setOwnerMenu] = useState<boolean>(false);
  const [renaming, setRenaming] = useState<boolean>(false);
  const [disband, setDisband] = useState<boolean>(false);
  const [transfer, setTransfer] = useState<any>(null);
  const [xferConf, setXferConf] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [workplace, setWorkplace] = useState<any>(null);
  const [grade, setGrade] = useState<any>(null);
  const [deleteGradeConf, setDeleteGradeConf] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<any>(false);

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

  const onSubmit = async (e: any) => {
    e.preventDefault(); setLoading(true);
    try {
      let res = await (await Nui.send('EditWorkplace', { JobId: workplace.JobId, WorkplaceId: workplace.Id, NewName: workplace.Name })).json();
      if (res.success) { sendAlert('Workplace Updated'); refreshRoster(); }
      else sendAlert(res.code === 'INVALID_PERMISSIONS' ? 'Not Authorized' : 'Unable to Update Workplace');
    } catch { sendAlert('Unable to Update Workplace'); }
    setLoading(false);
  };

  const onSubmitGrade = async (e: any) => {
    e.preventDefault(); setLoading(true);
    try {
      let res = await (await Nui.send(grade.edit ? 'EditGrade' : 'CreateGrade', grade)).json();
      if (res.success) { sendAlert(`Grade ${grade.edit ? 'Updated' : 'Created'}`); refreshRoster(); }
      else sendAlert(res.code === 'INVALID_PERMISSIONS' ? 'Not Authorized' : `Unable To ${grade.edit ? 'Update' : 'Create'} Grade`);
    } catch { sendAlert(`Unable to ${grade.edit ? 'Update' : 'Create'} Grade`); }
    setLoading(false);
  };

  const onDeleteGrade = async () => {
    setDeleteGradeConf(false); setLoading(true);
    try {
      let res = await (await Nui.send('DeleteGrade', grade)).json();
      if (res.success) { sendAlert('Grade Deleted'); refreshRoster(); }
      else { switch (res.code) { case 'INVALID_PERMISSIONS': sendAlert('Not Authorized'); break; case 'JOB_OCCUPIED': sendAlert('Cannot Delete a Grade With Employees In'); break; default: sendAlert('Unable to Delete Grade'); break; } }
    } catch { sendAlert('Unable to Delete Grade'); }
    setLoading(false);
  };

  const onSubmitRename = async (e: any) => {
    e.preventDefault(); if (!isOwner) return; setLoading(true);
    try {
      let res = await (await Nui.send('RenameCompany', e.target.name.value)).json();
      if (res.success) { sendAlert('Company Name Updated'); refreshRoster(); }
      else sendAlert(res.code === 'INVALID_PERMISSIONS' ? 'Not Authorized' : 'Unable To Edit Company');
    } catch { sendAlert('Unable to Edit Company'); }
    setLoading(false);
  };

  const onDisband = async (e: any) => {
    e.preventDefault(); if (!isOwner) return; setLoading(true);
    try {
      let res = await (await Nui.send('DisbandCompany')).json();
      if (res.success) { sendAlert('Company Has Been Deleted'); navigate(-1); }
      else sendAlert(res.code === 'INVALID_PERMISSIONS' ? 'Not Authorized' : 'Unable to Disband Company');
    } catch { sendAlert('Unable to Disband Company'); }
    setDisband(false); setLoading(false);
  };

  const onTransfer = async (e: any) => {
    e.preventDefault(); if (!isOwner) return; setLoading(true);
    try {
      let res = await (await Nui.send('TransferCompany', { target: transfer.target })).json();
      if (res.success) { sendAlert('Ownership Transferred'); refreshRoster(); }
      else sendAlert('Unable To Transfer Company Ownership');
    } catch { sendAlert('Unable To Transfer Company Ownership'); }
    setXferConf(false); setTransfer(null); setLoading(false);
  };

  const permOptions = Object.keys(jobPermissions ?? {})
    .filter((p: string) => { const pData = jobPermissions[p]; return !pData.restricted || pData.restricted?.includes(jobData?.Id); })
    .sort()
    .map((key: string) => ({ value: key, label: jobPermissions[key]?.name ?? key }));

  const renderGrades = (grades: any[], workplaceId: string | null) => (
    grades.sort((a: any, b: any) => a.Level - b.Level).map((g: any) => {
      const canEdit = g.Level < playerJob.Grade.Level || isOwner;
      return (
        <div key={`grade-${g.Id}`}
          onClick={canEdit ? () => setGrade({ ...g, JobId: jobData.Id, WorkplaceId: workplaceId, edit: true }) : undefined}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: `1px solid ${T08}`, cursor: canEdit ? 'pointer' : 'default', transition: 'background 0.15s' }}
          onMouseEnter={e => { if (canEdit) (e.currentTarget as HTMLElement).style.background = T06; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
              {g?.Permissions?.JOB_MANAGEMENT && <FontAwesomeIcon icon={['fas', 'user-shield']} style={{ color: T, fontSize: 12 }} />}
              {g.Name}
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
              {Object.keys(g.Permissions).filter((p: string) => g.Permissions[p]).length} permissions
            </div>
          </div>
          {canEdit && <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ color: T, fontSize: 12, opacity: 0.5 }} />}
        </div>
      );
    })
  );

  return (
    <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 16px', height: 56, background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`, borderBottom: `1px solid ${T50}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.06em', color: '#fff', overflow: 'hidden' }}>
          <FontAwesomeIcon icon={['fas', 'building']} style={{ color: T, fontSize: 16, flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{jobData.Name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {isOwner && (
            <div style={headerBtn()} onClick={() => setOwnerMenu(true)}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
              <FontAwesomeIcon icon={['fas', 'gear']} />
            </div>
          )}
          {!jobData.Workplaces && (
            <div style={headerBtn()} onClick={() => setGrade({ JobId: jobData.Id, WorkplaceId: null, ...initialGrade })}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
              <FontAwesomeIcon icon={['fas', 'plus']} />
            </div>
          )}
          <div style={headerBtn(loading)} onClick={() => refreshRoster()}
            onMouseEnter={e => { if (!loading) { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; } }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
            <FontAwesomeIcon icon={['fas', 'arrows-rotate']} className={loading ? 'fa-spin' : ''} />
          </div>
          <div style={headerBtn()} onClick={() => navigate(-1)}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
            <FontAwesomeIcon icon={['fas', 'house']} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
        {jobData.Workplaces && jobData.Workplaces.length > 0
          ? jobData.Workplaces.map((wp: any) => (
            <div key={`wp-${wp.Id}`} style={{ borderBottom: `1px solid ${T12}`, overflow: 'hidden' }}>
              <div
                onClick={() => setExpanded(expanded === wp.Id ? false : wp.Id)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer', background: T04, transition: 'background 0.15s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T20)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = T04)}>
                <div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.04em' }}>{wp.Name}</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{wp.Grades.length} grades</div>
                </div>
                <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ color: T, fontSize: 12, transition: 'transform 0.2s', transform: expanded === wp.Id ? 'rotate(90deg)' : 'rotate(0deg)' }} />
              </div>
              {expanded === wp.Id && (
                <>
                  <div style={{ display: 'flex', gap: 6, padding: '8px 16px', borderBottom: `1px solid ${T08}`, background: 'rgba(0,0,0,0.2)' }}>
                    {[{ icon: 'plus', label: 'New Grade', onClick: () => setGrade({ ...initialGrade, JobId: jobData.Id, WorkplaceId: wp.Id }) }, { icon: 'pen-to-square', label: 'Edit Workplace', onClick: () => setWorkplace({ JobId: jobData.Id, ...wp, edit: true }) }].map((btn, i) => (
                      <div key={i} onClick={btn.onClick}
                        style={{ flex: 1, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 12, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em', background: 'transparent', transition: 'background 0.2s' }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T20)}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
                        <FontAwesomeIcon icon={['fas', btn.icon as any]} /> {btn.label}
                      </div>
                    ))}
                  </div>
                  {renderGrades(wp.Grades, wp.Id)}
                </>
              )}
            </div>
          ))
          : (
            <>
              <div style={{ padding: '12px 16px 6px', fontFamily: "'Oswald', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: T, borderBottom: `1px solid ${T20}` }}>Grades</div>
              {renderGrades(jobData.Grades, null)}
            </>
          )
        }
      </div>

      {/* Modals */}
      <Confirm title="Delete Grade?" open={deleteGradeConf} confirm="Yes" decline="No" onConfirm={onDeleteGrade} onDecline={() => setDeleteGradeConf(false)}>
        <p>Deleting this grade will remove all permissions related to it. This cannot be undone.</p>
      </Confirm>

      <Modal appColor={T} form formStyle={{ position: 'relative' }} disabled={loading} open={workplace != null} title="Edit Workplace" onAccept={onSubmit} onClose={() => setWorkplace(null)} submitLang="Edit">
        {workplace != null && <>{loading && <Loader static text="Submitting" />}<TextField fullWidth required label="Workplace Name" name="Name" disabled={loading} value={workplace.Name} onChange={(e) => setWorkplace({ ...workplace, Name: e.target.value })} sx={fieldSx} /></>}
      </Modal>

      <Modal appColor={T} disabled={loading} form formStyle={{ position: 'relative', overflow: 'visible' }} open={grade != null} title={`${grade?.edit ? 'Edit' : 'Create'} Grade`} onAccept={onSubmitGrade} onClose={() => setGrade(null)} onDelete={grade?.edit && !grade?.Owner ? () => setDeleteGradeConf(true) : null} submitLang={grade?.edit ? 'Edit' : 'Create'}>
        {grade != null && (
          <>
            {loading && <Loader static text="Submitting" />}
            <TextField fullWidth required label="Grade Name" name="Name" disabled={loading} value={grade.Name} onChange={(e) => setGrade({ ...grade, Name: e.target.value })} sx={fieldSx} />
            <NumericFormat fullWidth required label="Grade Level" helperText="Determines rank hierarchy position" name="Level" disabled={grade.Owner || loading} value={grade.Level} onValueChange={(v: any) => setGrade({ ...grade, Level: v.value })} type="tel" customInput={TextField} sx={fieldSx} />
            <CustomMultiSelect
              T={T}
              label="Permissions"
              disabled={grade.Owner || loading}
              value={Object.keys(grade.Permissions)}
              options={permOptions}
              onChange={(selected) => {
                const t: any = {};
                selected.forEach(p => { t[p] = true; });
                setGrade({ ...grade, Permissions: t });
              }}
            />
          </>
        )}
      </Modal>

      {isOwner && (
        <>
          <Modal appColor={T} open={ownerMenu} title="Owner Actions" onClose={() => setOwnerMenu(false)} hideClose>
            <div style={{ padding: '8px 0' }}>
              {[
                { icon: 'pen-to-square', label: 'Rename Company', onClick: () => { setOwnerMenu(false); setRenaming(true); }, danger: false },
                { icon: 'right-left', label: 'Transfer Ownership', onClick: undefined, danger: true },
                { icon: 'trash-can', label: 'Disband Company', onClick: undefined, danger: true },
              ].map((btn, i) => (
                <div key={i} onClick={btn.onClick}
                  style={{ width: '100%', padding: '10px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 6, cursor: btn.onClick ? 'pointer' : 'not-allowed', color: '#fff', fontSize: 13, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em', background: 'transparent', transition: 'background 0.2s', opacity: btn.danger ? 0.4 : 1, pointerEvents: btn.danger ? 'none' : 'auto', border: btn.danger ? '1px solid rgba(211,47,47,0.3)' : `1px solid ${T20}` }}
                  onMouseEnter={e => { if (!btn.danger) (e.currentTarget as HTMLElement).style.background = T20; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                  <FontAwesomeIcon icon={['fas', btn.icon as any]} /> {btn.label}
                </div>
              ))}
            </div>
          </Modal>

          <Modal appColor={T} form formStyle={{ position: 'relative' }} disabled={loading} open={renaming} title={`Rename ${jobData.Name}`} onAccept={onSubmitRename} onClose={() => setRenaming(false)} submitLang="Submit">
            <>{loading && <Loader static text="Submitting" />}<TextField fullWidth required label="Company Name" name="name" disabled={loading} defaultValue={jobData.Name} sx={fieldSx} /></>
          </Modal>

          {Boolean(transfer) && (
            <>
              <Modal appColor={T} form formStyle={{ position: 'relative' }} disabled={loading} open={true} title={`Transfer ${jobData.Name} Ownership`} onAccept={() => setXferConf(true)} onClose={() => setTransfer(null)} submitLang="Transfer Ownership">
                <>{loading && <Loader static text="Submitting" />}<NumericFormat fullWidth required label="Target State ID" name="target" value={transfer.target} disabled={loading} onValueChange={(v: any) => setTransfer({ ...transfer, target: v.value })} type="tel" customInput={TextField} sx={fieldSx} /></>
              </Modal>
              <Confirm title="Transfer Company?" open={xferConf} confirm="Yes" decline="No" onConfirm={() => onTransfer({})} onDecline={() => setXferConf(false)}>
                <p>This transfers full ownership and is not reversable.</p>
              </Confirm>
            </>
          )}

          <Confirm title="Disband Company?" open={disband} confirm="Yes" decline="No" onConfirm={() => onDisband({})} onDecline={() => setDisband(false)}>
            <p>This is permanent and cannot be undone.</p>
          </Confirm>
        </>
      )}
    </div>
  );
};

export default Management;
