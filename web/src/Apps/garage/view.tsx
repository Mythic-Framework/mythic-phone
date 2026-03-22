import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import Nui from '../../util/Nui';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';

const GarageView: React.FC = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const T = useAppColor('garage');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T18 = hexAlpha(T, 0.18);
  const T15 = hexAlpha(T, 0.15);
  const T12 = hexAlpha(T, 0.12);
  const T10 = hexAlpha(T, 0.1);
  const T06 = hexAlpha(T, 0.06);
  const T04 = hexAlpha(T, 0.04);
  const T30 = hexAlpha(T, 0.3);

  const { vin } = useParams<{ vin: string }>();
  const garages = useSelector((state: any) => state.data.data.garages);
  const car = useSelector((state: any) => state.data.data.myVehicles)?.find((v: any) => v.VIN === vin);

  useEffect(() => { if (!car) navigate('/apps/garage', { replace: true }); }, [car]);

  if (!car) return null;

  const getGarage = () => {
    switch (car.Storage.Type) {
      case 0: return garages?.impound;
      case 1: return garages?.[car.Storage.Id];
      case 2: return car.PropertyStorage;
    }
  };
  const garage = getGarage();
  const isImpound = car.Storage.Type === 0;

  const onGPS = async () => {
    try {
      let res = await (await Nui.send('Garage:TrackVehicle', vin)).json();
      showAlert(res ? 'Vehicle Marked on GPS' : 'Unable To Mark Vehicle');
    } catch { showAlert('Unable To Mark Vehicle'); }
  };

  const bodyPct  = Math.ceil(((car.Damage?.Body   ?? 1000) / 1000) * 100);
  const enginePct = Math.ceil(((car.Damage?.Engine ?? 1000) / 1000) * 100);

  const healthColor = (val: number): string => {
    const pct = Math.ceil((val / 1000) * 100);
    if (pct >= 75) return '#66bb6a';
    if (pct >= 40) return '#ffa726';
    return '#ef5350';
  };

  // shared styles
  const rowStyle: React.CSSProperties = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '9px 14px', borderBottom: `1px solid ${hexAlpha(T, 0.06)}`,
  };
  const rowLabel: React.CSSProperties = {
    fontFamily: "'Oswald', sans-serif", fontSize: 11,
    letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
  };
  const rowValue: React.CSSProperties = {
    fontFamily: "'Share Tech Mono', monospace", fontSize: 13, color: '#fff',
  };
  const sectionStyle: React.CSSProperties = {
    marginBottom: 12, borderRadius: 6, overflow: 'hidden', border: `1px solid ${T12}`,
  };
  const sectionHeader: React.CSSProperties = {
    padding: '7px 14px',
    background: `linear-gradient(90deg, ${T15} 0%, ${T04} 100%)`,
    borderBottom: `1px solid ${T12}`,
    fontFamily: "'Oswald', sans-serif", fontSize: 12, fontWeight: 600,
    letterSpacing: '0.1em', textTransform: 'uppercase', color: T,
  };
  const headerBtnStyle: React.CSSProperties = {
    width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer',
    color: T, fontSize: 14, background: 'transparent', transition: 'background 0.2s',
  };

  return (
    <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 16px', height: 56, background: `linear-gradient(135deg, ${T18} 0%, rgba(10,13,18,0) 100%)`, borderBottom: `1px solid ${T30}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.06em', color: '#fff' }}>
          <FontAwesomeIcon icon={['fas', 'car-side']} style={{ color: T, fontSize: 16 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{car.Make} {car.Model}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div
            style={headerBtnStyle} onClick={onGPS}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T10; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            <FontAwesomeIcon icon={['fas', 'location-crosshairs']} />
          </div>
          <div
            style={headerBtnStyle} onClick={() => navigate('/apps/garage')}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T10; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            <FontAwesomeIcon icon={['fas', 'chevron-left']} />
          </div>
        </div>
      </div>

      {/* Sub bar */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 16px', height: 36, background: T06, borderBottom: `1px solid ${T12}`, gap: 16 }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
          VIN:<span style={{ color: '#fff', marginLeft: 4 }}>{car.VIN}</span>
        </span>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
          PLATE:<span style={{ color: '#fff', marginLeft: 4 }}>{car.RegisteredPlate}</span>
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: 12, scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>

        {/* Storage section */}
        <div style={sectionStyle}>
          <div style={sectionHeader}>Storage</div>
          <div style={rowStyle}>
            <span style={rowLabel}>Location</span>
            <span style={rowValue}>{garage?.label ?? car.Storage.Id ?? 'Unknown'}</span>
          </div>
          <div style={rowStyle}>
            <span style={rowLabel}>Status</span>
            {car.Spawned
              ? <span style={{ fontSize: 10, fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 4, background: 'rgba(211,47,47,0.15)', color: '#ef5350', border: '1px solid rgba(211,47,47,0.3)' }}>Out</span>
              : isImpound
                ? <span style={{ fontSize: 10, fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 4, background: 'rgba(255,152,0,0.12)', color: '#ffa726', border: '1px solid rgba(255,152,0,0.3)' }}>Impounded</span>
                : <span style={{ fontSize: 10, fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 4, background: 'rgba(76,175,80,0.12)', color: '#66bb6a', border: '1px solid rgba(76,175,80,0.25)' }}>Stored</span>
            }
          </div>
          {isImpound && (
            <div style={rowStyle}>
              <span style={rowLabel}>Fine</span>
              <span style={{ ...rowValue, color: '#ef5350' }}>${car.Storage.Fine?.toLocaleString()}</span>
            </div>
          )}
          {isImpound && car.Storage.TimeHold && (
            <div style={rowStyle}>
              <span style={rowLabel}>Hold Release</span>
              <span style={rowValue}>{new Date(+car.Storage.TimeHold.ExpiresAt * 1000).toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Diagnostics section */}
        <div style={sectionStyle}>
          <div style={sectionHeader}>Diagnostics</div>
          <div style={rowStyle}>
            <span style={rowLabel}>Mileage</span>
            <span style={rowValue}>{car.Mileage?.toLocaleString()} mi</span>
          </div>
          <div style={rowStyle}>
            <span style={rowLabel}>Body</span>
            <span style={{ ...rowValue, color: healthColor(car.Damage?.Body ?? 1000) }}>{bodyPct}%</span>
          </div>
          <div style={{ ...rowStyle, borderBottom: car.DamagedParts ? `1px solid ${hexAlpha(T, 0.06)}` : 'none' }}>
            <span style={rowLabel}>Engine</span>
            <span style={{ ...rowValue, color: healthColor(car.Damage?.Engine ?? 1000) }}>{enginePct}%</span>
          </div>
          {car.DamagedParts && Object.keys(car.DamagedParts).map((part: string, i: number, arr: string[]) => (
            <div key={part} style={{ ...rowStyle, borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${hexAlpha(T, 0.06)}` }}>
              <span style={rowLabel}>{part.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/g).join(' ')}</span>
              <span style={{ ...rowValue, color: '#ffa726' }}>{Math.ceil(car.DamagedParts[part])}%</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default GarageView;
