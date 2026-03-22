import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert, useAppColor, hexAlpha } from '../../../hooks';
import { Modal, Confirm } from '../../../components';
import Nui from '../../../util/Nui';

const calculatePrice = (currentPrice: number, price: number, cost: number): number => {
  return currentPrice > price ? cost : cost + (price - currentPrice);
};

interface Props { property: any; type: any; upgrade: any; setLoading: (v: boolean) => void; onRefresh: () => void; }

const InteriorUpgrade: React.FC<Props> = ({ property, type, upgrade, setLoading, onRefresh }) => {
  const sendAlert = useAlert();
  const T = useAppColor('homemanage');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T08 = hexAlpha(T, 0.08);
  const T04 = hexAlpha(T, 0.04);

  const [buying, setBuying] = useState<boolean>(false);
  const [purchase, setPurchase] = useState<any>(null);
  const current = upgrade.levels.find((l: any) => l.id == property?.upgrades?.interior);

  const onConfirmPurchase = (name: string, int: any) => setPurchase({ name, int });

  const onPurchase = async (int: any) => {
    setPurchase(false); setLoading(true); setBuying(false);
    try {
      const res = await (await Nui.send('PurchasePropertyInterior', { int, id: property.id })).json();
      if (res) { sendAlert('Interior Upgraded'); onRefresh(); } else sendAlert('Unable to Purchase Upgrade');
    } catch { sendAlert('Unable to Purchase Upgrade'); }
    setLoading(false);
  };

  const onPreview = (e: any, int: any) => { e.stopPropagation(); Nui.send('PreviewPropertyInterior', { int }); };

  return (
    <>
      {/* Row */}
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
            Interior
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>
            {current?.name} (${current?.price?.toLocaleString('en-US')})
          </div>
        </div>
        <div
          onClick={() => setBuying(true)}
          style={{ width: 34, height: 34, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, background: 'transparent', transition: 'background 0.2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T20)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
        >
          <FontAwesomeIcon icon={['fas', 'bag-shopping']} />
        </div>
      </div>

      {/* Buy modal */}
      <Modal open={buying} title="Upgrade Interior" onClose={() => setBuying(false)} appColor={T}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 6 }}>Upgrading the Interior Will <b>RESET</b> All Placed Furniture!</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginBottom: 12 }}><i>Money will be taken from your main bank account.</i></p>
        <div style={{ maxHeight: 280, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
          {upgrade.levels.sort((a: any, b: any) => a.price - b.price).map((int: any) => {
            const isCurrent = int.id === current?.id;
            return (
              <div key={int.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderBottom: `1px solid ${T08}`, opacity: isCurrent ? 0.45 : 1 }}>
                <div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: '#fff', fontWeight: 600 }}>{int.name}</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                    ${calculatePrice(current?.price ?? 0, int.price, 50000).toLocaleString('en-US')} — {int.info?.description}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div
                    onClick={!isCurrent ? (e) => onPreview(e, int.id) : undefined}
                    style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: isCurrent ? 'not-allowed' : 'pointer', color: isCurrent ? 'rgba(255,255,255,0.2)' : T, fontSize: 12, background: 'transparent', transition: 'background 0.15s' }}
                    onMouseEnter={e => { if (!isCurrent) (e.currentTarget as HTMLElement).style.background = T20; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    <FontAwesomeIcon icon={['fas', 'eye']} />
                  </div>
                  <div
                    onClick={!isCurrent ? () => onConfirmPurchase(int.name, int.id) : undefined}
                    style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: isCurrent ? 'not-allowed' : 'pointer', color: isCurrent ? 'rgba(255,255,255,0.2)' : T, fontSize: 12, background: 'transparent', transition: 'background 0.15s' }}
                    onMouseEnter={e => { if (!isCurrent) (e.currentTarget as HTMLElement).style.background = T20; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    <FontAwesomeIcon icon={['fas', 'bag-shopping']} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>

      <Confirm title={`Purchase Interior ${purchase?.name}`} open={purchase != null} confirm="Yes" decline="No" onConfirm={() => onPurchase(purchase?.int)} onDecline={() => setPurchase(null)} />
    </>
  );
};

export default InteriorUpgrade;
