import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';
import { Modal, Editor, LightboxImage } from '../../components';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import Nui from '../../util/Nui';

// ── Themed icon button with left-side tooltip ─────────────────────────────────
interface HdrBtnProps {
  icon: any;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  T: string;
}

const HdrBtn: React.FC<HdrBtnProps> = ({ icon, label, onClick, disabled, danger, T }) => {
  const [hov, setHov] = useState(false);
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        onClick={() => !disabled && onClick()}
        style={{
          width: 30, height: 30,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 6,
          border: `1px solid ${disabled ? 'rgba(255,255,255,0.08)' : danger ? (hov ? 'rgba(224,90,90,0.5)' : 'rgba(224,90,90,0.2)') : (hov ? T50 : hexAlpha(T, 0.2))}`,
          background: disabled ? 'transparent' : danger ? (hov ? 'rgba(224,90,90,0.1)' : 'transparent') : (hov ? T20 : 'transparent'),
          color: disabled ? 'rgba(255,255,255,0.2)' : danger ? (hov ? '#e05a5a' : 'rgba(224,90,90,0.5)') : (hov ? T : 'rgba(255,255,255,0.45)'),
          fontSize: 13, cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.15s',
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </div>

      {hov && !disabled && (
        <div style={{
          position: 'absolute',
          top: '50%',
          right: 'calc(100% + 10px)',
          transform: 'translateY(-50%)',
          zIndex: 99999,
          whiteSpace: 'nowrap',
          backgroundColor: 'rgb(8,10,14)',
          backgroundImage: `linear-gradient(90deg, ${hexAlpha(T, 0.35)} 0%, rgba(8,10,14,1) 100%)`,
          border: `1px solid ${T50}`,
          borderRadius: 8,
          padding: '8px 16px',
          fontFamily: "'Oswald', sans-serif",
          fontSize: 13,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: danger ? '#e05a5a' : T,
          boxShadow: `0 4px 16px rgba(0,0,0,0.6)`,
          pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute',
            top: '50%', right: -5,
            transform: 'translateY(-50%) rotate(45deg)',
            width: 8, height: 8,
            backgroundColor: 'rgb(8,10,14)',
            border: `1px solid ${T50}`,
            borderBottom: 'none', borderLeft: 'none',
          }} />
          {label}
        </div>
      )}
    </div>
  );
};

// ── Custom single-select for share modal ──────────────────────────────────────
interface SelectOption { value: any; label: string; disabled?: boolean }
interface CustomSelectProps {
  value: any;
  options: SelectOption[];
  onChange: (v: any) => void;
  T: string;
  style?: React.CSSProperties;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, options, onChange, T, style }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', ...style }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '12px 36px 12px 14px',
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: `1px solid ${open ? T : hexAlpha(T, 0.3)}`,
          borderRadius: open ? '8px 8px 0 0' : 8,
          color: '#fff', fontFamily: "'Oswald', sans-serif",
          fontSize: 14, letterSpacing: '0.03em',
          cursor: 'pointer', transition: 'border-color 0.15s',
          userSelect: 'none', position: 'relative',
        }}
      >
        {selected?.label ?? ''}
        <span style={{
          position: 'absolute', right: 12, top: '50%',
          transform: `translateY(-50%) rotate(${open ? '180deg' : '0deg'})`,
          transition: 'transform 0.2s',
          color: 'rgba(255,255,255,0.4)', fontSize: 11, pointerEvents: 'none',
        }}>
          <FontAwesomeIcon icon="chevron-down" />
        </span>
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10002,
          backgroundColor: '#0a0c10',
          backgroundImage: `linear-gradient(90deg, ${T20} 0%, rgba(8,10,14,0.97) 100%)`,
          border: `1px solid ${T50}`,
          borderTop: `1px solid ${hexAlpha(T, 0.15)}`,
          borderRadius: '0 0 8px 8px',
          boxShadow: `0 8px 24px rgba(0,0,0,0.6)`,
          overflow: 'hidden',
        }}>
          {options.map(opt => {
            const isSel = opt.value === value;
            return (
              <div
                key={String(opt.value)}
                onClick={() => { if (!opt.disabled) { onChange(opt.value); setOpen(false); } }}
                style={{
                  padding: '9px 14px', paddingLeft: isSel ? 11 : 14,
                  fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: '0.04em',
                  color: opt.disabled ? 'rgba(255,255,255,0.2)' : isSel ? T : '#fff',
                  background: isSel ? T20 : 'transparent',
                  borderLeft: isSel ? `3px solid ${T}` : '3px solid transparent',
                  cursor: opt.disabled ? 'not-allowed' : 'pointer',
                  transition: 'background 0.12s', userSelect: 'none',
                }}
                onMouseEnter={e => { if (!opt.disabled && !isSel) (e.currentTarget as HTMLElement).style.background = T20; }}
                onMouseLeave={e => { if (!isSel) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
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

// ── Main component ────────────────────────────────────────────────────────────
const DocumentView: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showAlert = useAlert();
  const T = useAppColor('documents');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T12 = hexAlpha(T, 0.12);
  const T07 = hexAlpha(T, 0.07);
  const T06 = hexAlpha(T, 0.06);

  const { id, mode } = useParams<{ id: string; mode: string }>();
  const docMode = (mode == 'edit' || mode == 'new') ? mode : false;

  const player = useSelector((state: any) => state.data.data.player);
  const myDocs = useSelector((state: any) => state.data.data.myDocuments);
  const doc = myDocs.find((d: any) => d._id === id);

  const [sharing, setSharing] = useState<any>(null);
  const [reqSignature, setReqSignature] = useState<boolean>(false);
  const [signed, setSigned] = useState<boolean>(false);
  const [disableSignature, setDisableSignature] = useState<boolean>(false);
  const [viewSignatures, setViewSignatures] = useState<boolean>(false);
  const [document, setDocument] = useState<any>({ title: doc?.title ?? '', content: doc?.content ?? '' });

  useEffect(() => {
    if (!docMode || (docMode === 'edit' && doc)) setDocument(doc);
    if (!docMode) {
      if (doc?.signed?.length > 0) {
        const hasSigned = doc.signed.find((sig: any) => sig.ID == player.ID);
        setSigned(Boolean(hasSigned));
        setDisableSignature(Boolean(hasSigned));
      } else { setSigned(false); setDisableSignature(false); }
      let reqSig = false;
      if (doc?.sharedWith?.length > 0) {
        const isShared = doc.sharedWith.find((p: any) => p.ID == player.ID);
        if (isShared?.RequireSignature) reqSig = true;
      }
      setReqSignature(reqSig);
    }
  }, [id, mode]);

  const onStartEdit = () => navigate(`/apps/documents/view/${id}/edit`);

  const onEdit = async () => {
    if (docMode === 'edit' && document.title.length >= 2) {
      try {
        let res = await (await Nui.send('EditDocument', { id: document._id, data: { title: document.title, content: document.content } })).json();
        if (res) {
          dispatch({ type: 'UPDATE_DATA', payload: { type: 'myDocuments', id: document._id, data: document } });
          navigate(`/apps/documents/view/${id}/v`, { replace: true });
          showAlert('Document Edited Successfully');
        } else showAlert('Error Editing Document');
      } catch (err) { console.log(err); showAlert('Error Editing Document'); }
    } else showAlert('Must Include Title');
  };

  const onDelete = async () => {
    try {
      let res = await (await Nui.send('DeleteDocument', { id: document._id })).json();
      if (res) {
        dispatch({ type: 'REMOVE_DATA', payload: { type: 'myDocuments', id: document._id } });
        navigate(`/apps/documents/`, { replace: true });
        showAlert('Document Deleted Successfully');
      } else showAlert('Error Deleting Document');
    } catch (err) { console.log(err); showAlert('Error Deleting Document'); }
  };

  const onCreate = async () => {
    try {
      let res = await (await Nui.send('CreateDocument', document)).json();
      if (res) {
        dispatch({ type: 'ADD_DATA', payload: { type: 'myDocuments', data: res } });
        navigate(`/apps/documents/view/${res._id}/v`, { replace: true });
        showAlert('Document Created Successfully');
      } else showAlert('Error Creating Document');
    } catch (err) { console.log(err); showAlert('Error Creating Document'); }
  };

  const onShare = async (isNearby: boolean) => {
    setSharing({ target: '', type: 1, nearby: isNearby });
  };

  const onConfirmShare = async () => {
    const sending = { ...sharing, target: +sharing.target, document };
    setSharing(null);
    try {
      let res = await (await Nui.send('ShareDocument', sending)).json();
      showAlert(res ? 'Document Shared' : 'Unable to Share Document');
    } catch (err) { console.log(err); showAlert('Unable to Share Document'); }
  };

  const onSignature = async (_e: any) => {
    setDisableSignature(true);
    try {
      let res = await (await Nui.send('SignDocument', document._id)).json();
      if (res) { showAlert('Document Signed'); setSigned(true); }
      else { showAlert('Unable to Sign Document'); setDisableSignature(false); }
    } catch (err) { console.log(err); showAlert('Unable to Sign Document'); setDisableSignature(false); }
  };

  const renderContent = (html: string) => parse(html ?? '');

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      background: T06,
      '& fieldset': { borderColor: hexAlpha(T, 0.25) },
      '&:hover fieldset': { borderColor: T50 },
      '&.Mui-focused fieldset': { borderColor: T },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.35)' },
    '& .MuiInputLabel-root.Mui-focused': { color: T },
    '& .MuiInputBase-input': { color: '#fff' },
  };

  return (
    <>
      <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden' }}>

        {/* Header */}
        <div style={{
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 8px 0 16px', height: 56,
          background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
          borderBottom: `1px solid ${T50}`,
          overflow: 'visible',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff', overflow: 'hidden' }}>
            <HdrBtn icon={['fas', 'chevron-left']} label="Back" onClick={() => navigate('/apps/documents/')} T={T} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 15, color: 'rgba(255,255,255,0.85)' }}>
              {docMode === 'new' ? 'New Document' : document?.title ?? 'Document'}
            </span>
            {(!docMode && document?.time) && (
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'inherit', letterSpacing: '0.04em', marginLeft: 4 }}>
                · {new Date(+document.time * 1000).toLocaleDateString()}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {docMode == 'new' && (
              <HdrBtn icon={['fas', 'floppy-disk']} label="Save Document" onClick={onCreate} T={T} />
            )}
            {docMode == 'edit' && (
              <HdrBtn icon={['fas', 'floppy-disk-pen']} label="Save Changes" onClick={onEdit} T={T} />
            )}
            {(!docMode && document?.owner == player.ID && (!document?.signed || document?.signed?.length <= 0)) && (
              <HdrBtn icon={['fas', 'pen-to-square']} label="Edit" onClick={onStartEdit} T={T} />
            )}
            {(!docMode || docMode == 'edit') && (
              <HdrBtn icon={['fas', 'trash-can']} label="Delete" onClick={onDelete} danger T={T} />
            )}
            {!docMode && <>
              {document?.signed?.length > 0 && (
                <HdrBtn icon={['fas', 'signature']} label="View Signatures" onClick={() => setViewSignatures(true)} T={T} />
              )}
              <HdrBtn icon={['fas', 'share']} label="Share" onClick={() => onShare(false)} T={T} />
              <HdrBtn icon={['fas', 'tower-broadcast']} label="Nearby Share" onClick={() => onShare(true)} T={T} />
            </>}
          </div>
        </div>

        {/* Body */}
        {!docMode
          ? <>
              <div style={{ flex: 1, padding: '10px 20px', overflowX: 'hidden', overflowY: 'auto', overflowWrap: 'break-word' }}
                className="ql-document-container"
              >
                {renderContent(document?.content ?? '')}
              </div>
              {reqSignature && (
                <div style={{ padding: '15px 35px', overflowX: 'hidden', overflowY: 'auto', textAlign: 'center', borderTop: `1px solid ${hexAlpha(T, 0.15)}` }}>
                  <FormControlLabel
                    control={<Checkbox disabled={disableSignature} checked={signed} onChange={(e) => onSignature(e)} />}
                    label={`${signed ? 'Document Signed' : 'Sign Document'} (as ${player.First[0]}. ${player.Last})`}
                  />
                </div>
              )}
            </>
          : <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 16px 0 16px', gap: 12, overflow: 'hidden', background: '#0a0c10' }}>
              <TextField
                fullWidth label="Title" variant="outlined"
                onChange={(e) => setDocument({ ...document, title: e.target.value })}
                value={document?.title ?? ''}
                inputProps={{ maxLength: 100 }}
                sx={inputSx}
              />
              <Editor value={document?.content ?? ''} onChange={(e: any) => setDocument({ ...document, content: e })} placeholder="Write Stuff Here" appColor={T} />
            </div>
        }
      </div>

      {sharing != null && (
        <Modal open={sharing != null} title="Share This Document" onAccept={onConfirmShare} onClose={() => setSharing(null)} acceptLang="Share" closeLang="Cancel" appColor={T}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 12 }}>
              Sharing without making a copy will allow the recipient to see any changes you make to the document!
            </p>
            <CustomSelect
              T={T}
              value={sharing.type}
              options={[
                { value: 1, label: 'Share a Copy' },
                { value: 2, label: 'Share', disabled: document?.owner !== player.ID || document?.shared },
                { value: 3, label: 'Share w/ Signature Request', disabled: document?.owner !== player.ID || document?.shared },
              ]}
              onChange={(v) => setSharing({ ...sharing, type: v })}
              style={{ marginBottom: 15 }}
            />
            {!sharing.nearby && (
              <TextField
                required fullWidth label="State ID" name="target" type="text"
                value={sharing.target}
                helperText="The State ID of who you want to share the document with."
                inputProps={{ maxLength: 6 }}
                onChange={(e) => setSharing({ ...sharing, target: e.target.value })}
                sx={inputSx}
              />
            )}
          </div>
        </Modal>
      )}

      {viewSignatures && (
        <Modal open={viewSignatures} title="Document Signatures" onClose={() => setViewSignatures(false)} closeLang="Close" appColor={T}>
          <div>
            {document?.signed?.map((s: any) => (
              <p key={s.ID} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, padding: '6px 0', borderBottom: `1px solid ${T12}` }}>
                {`${s.First} ${s.Last} (State ID: ${s.SID}) on ${new Date(+s.Time * 1000).toLocaleString()}`}
              </p>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default DocumentView;
