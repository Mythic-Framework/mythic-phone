import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Confirm } from '../../../components';
import Nui from '../../../util/Nui';
import { useAlert, useAppColor, hexAlpha } from '../../../hooks';

interface Props { property: any; data: any; canRevoke: boolean; onRefresh: () => void; onUpdate: () => void; }

const DigiKey: React.FC<Props> = ({ property, data, canRevoke, onRefresh, onUpdate }) => {
  const showAlert = useAlert();
  const T = useAppColor('homemanage');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T08 = hexAlpha(T, 0.08);
  const T04 = hexAlpha(T, 0.04);

  const [deleting, setDeleting] = useState<boolean>(false);

  const onDelete = async () => {
    try {
      const res = await (await Nui.send('Home:RevokeDigiKey', { id: property.id, target: data.Char })).json();
      if (!res.error) { showAlert('DigiKey Has Been Revoked'); setDeleting(false); onRefresh(); }
      else {
        const msgs: Record<number, string> = { 1: 'Error Occured', 2: 'Invalid Property', 3: 'Not Allowed', 4: 'Invalid Target Player', 5: 'Invalid Target Character', 6: "Person Doesn't Have A DigiKey", 7: 'Error Revoking DigiKey' };
        showAlert(msgs[res.code] ?? 'Error');
      }
    } catch { showAlert('Error Revoking DigiKey'); }
  };

  const isOwner = data.Owner;

  const iconStyle: React.CSSProperties = isOwner ? {
    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, background: 'rgba(255,193,7,0.1)', color: '#ffc107',
    border: '1px solid rgba(255,193,7,0.3)',
  } : {
    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, background: T20, color: T, border: `1px solid ${T50}`,
  };

  const actionBtnStyle: React.CSSProperties = {
    width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer',
    color: T, fontSize: 13, background: 'transparent', transition: 'background 0.2s',
  };

  const deleteBtnStyle: React.CSSProperties = {
    width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 6, border: '1px solid rgba(211,47,47,0.25)', cursor: 'pointer',
    color: '#ef5350', fontSize: 13, background: 'transparent', transition: 'background 0.2s',
  };

  return (
    <>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '11px 16px',
        borderBottom: `1px solid ${T08}`,
        borderLeft: '3px solid transparent',
        background: `linear-gradient(90deg, ${T04} 0%, transparent 100%)`,
      }}>
        <div style={iconStyle}>
          <FontAwesomeIcon icon={['fas', isOwner ? 'crown' : 'key']} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {data.Name ?? `${data.First ?? ''} ${data.Last ?? ''}`.trim()}
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: isOwner ? '#ffc107' : T, marginTop: 2 }}>
            {isOwner ? 'Owner' : 'Key Holder'}
          </div>
        </div>
        {canRevoke && (
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <div
              style={actionBtnStyle}
              onClick={onUpdate}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T20)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
            >
              <FontAwesomeIcon icon={['fas', 'pen-to-square']} />
            </div>
            <div
              style={deleteBtnStyle}
              onClick={() => setDeleting(true)}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(211,47,47,0.15)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
            >
              <FontAwesomeIcon icon={['fas', 'trash']} />
            </div>
          </div>
        )}
      </div>
      {canRevoke && (
        <Confirm title="Revoke DigiKey?" open={deleting} confirm="Yes" decline="No" onConfirm={onDelete} onDecline={() => setDeleting(false)}>
          <p>Removing the DigiKey will revoke access to this property and shared assets for this person. Are you sure?</p>
        </Confirm>
      )}
    </>
  );
};

export default DigiKey;
