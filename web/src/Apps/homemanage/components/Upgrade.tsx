import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert, useAppColor, hexAlpha } from '../../../hooks';
import { Modal } from '../../../components';
import Nui from '../../../util/Nui';

interface Props { property: any; type: string; upgrade: any; setLoading: (v: boolean) => void; onRefresh: () => void; }

const Upgrade: React.FC<Props> = ({ property, type, upgrade, setLoading, onRefresh }) => {
  const sendAlert = useAlert();
  const T = useAppColor('homemanage');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T08 = hexAlpha(T, 0.08);
  const T04 = hexAlpha(T, 0.04);

  const [buying, setBuying] = useState<boolean>(false);

  const current = upgrade.levels?.[(property?.upgrades?.[type] ?? 1) - 1];
  const next = upgrade.levels?.[(property?.upgrades?.[type] ?? 1)];
  const isMax = !next;

  const onPurchase = async () => {
    setLoading(true); setBuying(false);
    try {
      const res = await (await Nui.send('PurchasePropertyUpgrade', { upgrade: type, id: property.id })).json();
      if (res) { sendAlert('Upgrade Purchased'); onRefresh(); } else sendAlert('Unable to Purchase Upgrade');
    } catch { sendAlert('Unable to Purchase Upgrade'); }
    setLoading(false);
  };

  return (
    <>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: `1px solid ${T08}`,
        borderLeft: '3px solid transparent',
        background: `linear-gradient(90deg, ${T04} 0%, transparent 100%)`,
        transition: 'border-left-color 0.15s',
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.03em' }}>
            {current?.name}
          </div>
          {current?.info && (
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>
              {current.info}
            </div>
          )}
          {isMax && (
            <span style={{ display: 'inline-block', marginTop: 4, fontSize: 10, fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 4, background: T20, color: T, border: `1px solid ${T50}` }}>
              Max Level
            </span>
          )}
        </div>
        <div
          onClick={!isMax ? () => setBuying(true) : undefined}
          style={{ width: 34, height: 34, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${isMax ? 'rgba(255,255,255,0.08)' : T20}`, cursor: isMax ? 'not-allowed' : 'pointer', color: isMax ? 'rgba(255,255,255,0.15)' : T, fontSize: 14, background: 'transparent', transition: 'background 0.2s' }}
          onMouseEnter={e => { if (!isMax) (e.currentTarget as HTMLElement).style.background = T20; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
          <FontAwesomeIcon icon={['fas', 'arrow-up']} />
        </div>
      </div>

      <Modal form open={buying} title={`Purchase ${next?.name}?`} onAccept={onPurchase} submitLang="Purchase" onClose={() => setBuying(false)} appColor={T}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 6 }}>{next?.name}{next?.info ? ` — ${next.info}` : ''}</p>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 6 }}>Upgrade Cost: <strong style={{ color: T }}>${next?.price?.toLocaleString('en-US')}</strong></p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginBottom: 6 }}><i>Money will be taken from your main bank account.</i></p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Are you sure you want to upgrade? Purchases may not be refunded.</p>
      </Modal>
    </>
  );
};

export default Upgrade;
