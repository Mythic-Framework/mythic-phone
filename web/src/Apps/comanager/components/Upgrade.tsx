import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert, useCompanyUpgrades, useAppColor, hexAlpha } from '../../../hooks';
import { Confirm } from '../../../components';
import Nui from '../../../util/Nui';

interface Props { upgrade: any; }

const Upgrade: React.FC<Props> = ({ upgrade }) => {
  const sendAlert = useAlert();
  const T = useAppColor('comanager');
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const hasUpgrade = useCompanyUpgrades();
  const isOwned = hasUpgrade(upgrade.value);
  const [buying, setBuying] = useState<boolean>(false);

  const onPurchase = async () => {
    try {
      let res = await (await Nui.send('PurchaseUpgrade', upgrade)).json();
      if (!res.error) {
      } else {
        switch (res.code) {
          case 1: sendAlert('Unable to Purchase Upgrade'); break;
          case 2: sendAlert('Not Authorized'); break;
          case 3: sendAlert('Unable to Purchase Upgrade'); break;
          case -1: sendAlert('Not Yet Implemented'); break;
        }
      }
    } catch (err) { console.log(err); sendAlert('Unable to Purchase Upgrade'); }
    setBuying(false);
  };

  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: isOwned ? hexAlpha(T, 0.04) : 'transparent' }}>
      <div>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.03em' }}>{upgrade.label}</div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: isOwned ? T : 'rgba(255,255,255,0.35)', marginTop: 2 }}>
          {isOwned ? 'Owned' : `$${upgrade.price}`}
        </div>
      </div>
      {!isOwned && (
        <div
          onClick={() => setBuying(true)}
          style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, background: 'transparent', transition: 'background 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
          <FontAwesomeIcon icon={['fas', 'money-check-dollar']} />
        </div>
      )}
      <Confirm title={`Purchase ${upgrade.label}?`} open={buying} confirm="Yes" decline="No" onConfirm={onPurchase} onDecline={() => setBuying(false)}>
        <p>Purchases may not be refunded, additional costs may be associated with using this purchase.</p>
      </Confirm>
    </div>
  );
};

export default Upgrade;
