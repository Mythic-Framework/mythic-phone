import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function hexAlpha(hex: string, alpha: number): string {
  try {
    const clean = hex.replace('#', '');
    const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
    const n = parseInt(full, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
  } catch {
    return `rgba(32,134,146,${alpha})`;
  }
}

const DEFAULT_COLOR = '#208692';

interface ModalProps {
  className?: string;
  open: boolean;
  title?: string;
  onClose: () => void;
  hideClose?: boolean;
  disabled?: boolean;
  form?: boolean;
  formStyle?: React.CSSProperties | null;
  onAccept?: ((e?: any) => void) | null;
  onDelete?: (() => void) | null;
  submitLang?: string;
  deleteLang?: string;
  acceptLang?: string;
  closeLang?: string;
  children?: React.ReactNode;
  /** Pass the app's useAppColor value so the modal border reacts to the user's chosen color */
  appColor?: string;
}

const Modal: FC<ModalProps> = ({
  className, open, title, onClose, hideClose = false, disabled = false,
  form = false, formStyle = null, onAccept = null, onDelete = null,
  submitLang = 'Submit', deleteLang = 'Delete', acceptLang = 'Accept', closeLang = 'Close',
  children = null,
  appColor,
}) => {
  if (!open) return null;

  const T     = appColor ?? DEFAULT_COLOR;
  const T50   = hexAlpha(T, 0.5);
  const T20   = hexAlpha(T, 0.2);

  const actionBtn = (
    label: string,
    onClick: (() => void) | undefined,
    variant: 'teal' | 'danger' | 'ghost' = 'ghost',
    isSubmit = false,
  ) => {
    const colors = {
      teal:  { bg: T20, border: T50, color: T },
      danger: { bg: 'rgba(110,22,22,0.25)', border: 'rgba(161,52,52,0.5)', color: '#e07070' },
      ghost:  { bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' },
    }[variant];

    return (
      <button
        type={isSubmit ? 'submit' : 'button'}
        disabled={disabled}
        onClick={!isSubmit ? onClick : undefined}
        style={{
          flex: 1,
          padding: '9px 14px',
          background: disabled ? 'rgba(255,255,255,0.04)' : colors.bg,
          border: `1px solid ${disabled ? 'rgba(255,255,255,0.08)' : colors.border}`,
          borderRadius: 10,
          color: disabled ? 'rgba(255,255,255,0.25)' : colors.color,
          fontFamily: "'Oswald', sans-serif",
          fontSize: 12,
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.18s',
        }}
        onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLElement).style.filter = 'brightness(1.2)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'none'; }}
      >
        {label}
      </button>
    );
  };

  const Actions = (
    <div style={{ display: 'flex', gap: 8, padding: '12px 0 0 0' }}>
      {!hideClose && actionBtn(closeLang, onClose, 'ghost')}
      {onDelete && actionBtn(deleteLang, onDelete, 'danger')}
      {form
        ? actionBtn(submitLang, undefined, 'teal', true)
        : onAccept && actionBtn(acceptLang, onAccept, 'teal')
      }
    </div>
  );

  return (
    <div>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 10000 }} />

      {/* Modal panel */}
      <div
        className={className ?? ''}
        style={{
          height: 'fit-content',
          width: '78%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(12,16,22,0.96)',
          border: `1px solid ${T50}`,
          borderRadius: 18,
          padding: '16px 16px 14px',
          zIndex: 10001,
          boxShadow: '0 12px 60px rgba(0,0,0,0.7)',
          boxSizing: 'border-box' as const,
          overflow: 'visible',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
          paddingBottom: 10,
          borderBottom: `1px solid ${T20}`,
        }}>
          {title && (
            <span style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 15,
              letterSpacing: '0.1em',
              color: '#ffffff',
              textTransform: 'uppercase',
            }}>
              {title}
            </span>
          )}
          <button
            onClick={onClose}
            style={{
              marginLeft: 'auto',
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.35)',
              cursor: 'pointer',
              padding: 4,
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#fff')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)')}
          >
            <FontAwesomeIcon icon={['fas', 'x']} />
          </button>
        </div>

        {/* Body + Actions */}
        {form ? (
          <form onSubmit={(e) => { e.preventDefault(); onAccept?.(e); }} style={formStyle ?? undefined}>
            <div style={{
              padding: '4px 2px 0',
              overflow: 'visible',
              ...(formStyle ?? {}),
            }}>
              {children}
            </div>
            {Actions}
          </form>
        ) : (
          <>
            <div style={{
              padding: '4px 2px 0',
              overflow: 'visible',
              color: 'rgba(255,255,255,0.8)',
              fontSize: 14,
              lineHeight: 1.6,
              ...(formStyle ?? {}),
            }}>
              {children}
            </div>
            {Actions}
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
