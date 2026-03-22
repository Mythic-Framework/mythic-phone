import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Vehicle from './components/Vehicle';
import Nui from '../../util/Nui';
import { Loader } from '../../components';
import { useAppColor, hexAlpha } from '../../hooks';
import { throttle } from 'lodash';

const GarageIndex: React.FC = () => {
  const dispatch = useDispatch();
  const T = useAppColor('garage');
  const T15 = hexAlpha(T, 0.15);
  const T25 = hexAlpha(T, 0.25);
  const T50 = hexAlpha(T, 0.5);
  const cars = useSelector((state: any) => state.data.data.myVehicles);
  const [loading, setLoading] = useState(false);
  const [hov, setHov] = useState(false);
  const loadingRef = React.useRef(false);

  const fetch = useMemo(() => throttle(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const raw = await Nui.send('Garage:GetCars');
      if (!raw) { loadingRef.current = false; setLoading(false); return; }
      const res = await raw.json();
      dispatch({ type: 'SET_DATA', payload: { type: 'myVehicles', data: res ? res : [] } });
    } catch (e) { console.error('[Garage] fetch error:', e); }
    loadingRef.current = false;
    setLoading(false);
  }, 1000), []);

  useEffect(() => {
    if (import.meta.env.DEV) {
      const mockVehicles = [
        { VIN: 'JH4DA3340KS002789', Make: 'Benefactor', Model: 'Schwartzer', RegisteredPlate: 'BENE421', Spawned: false, Mileage: 4821, Storage: { Type: 1, Id: 'sa_ave_downtown' }, Damage: { Body: 980, Engine: 1000 }, DamagedParts: {} },
        { VIN: 'WBA3A5C55DF595899', Make: 'Obey', Model: 'Tailgater', RegisteredPlate: 'OBEY007', Spawned: true, Mileage: 12340, Storage: { Type: 1, Id: 'sa_ave_downtown' }, Damage: { Body: 750, Engine: 860 }, DamagedParts: { FrontBumper: 45 } },
      ];
      dispatch({ type: 'SET_DATA', payload: { type: 'myVehicles', data: mockVehicles } });
    } else {
      fetch();
    }
  }, []);

  return (
    <div style={{ height: '100%', background: 'rgba(10,13,18,0.98)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 8px 0 16px', height: 56,
        background: `linear-gradient(135deg, ${T15} 0%, rgba(10,13,18,0) 100%)`,
        borderBottom: `1px solid ${T25}`,
        overflow: 'visible',
      }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 600, letterSpacing: '0.08em', color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
          <FontAwesomeIcon icon={['fas', 'car-side']} style={{ color: T, fontSize: 18 }} />
          Garage
        </div>

        {/* Refresh button with left-side themed tooltip */}
        <div
          style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
          onMouseEnter={() => !loading && setHov(true)}
          onMouseLeave={() => setHov(false)}
        >
          <div
            onClick={() => !loading && fetch()}
            style={{
              width: 30, height: 30,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 6,
              border: `1px solid ${loading ? 'rgba(255,255,255,0.08)' : hov ? T50 : hexAlpha(T, 0.2)}`,
              background: loading ? 'transparent' : hov ? hexAlpha(T, 0.2) : 'transparent',
              color: loading ? 'rgba(255,255,255,0.2)' : hov ? T : 'rgba(255,255,255,0.45)',
              fontSize: 13,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <FontAwesomeIcon icon={['fas', 'arrows-rotate']} className={loading ? 'fa-spin' : ''} />
          </div>

          {hov && !loading && (
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
              color: T,
              boxShadow: `0 4px 16px rgba(0,0,0,0.6)`,
              pointerEvents: 'none',
            }}>
              {/* Arrow pointing right toward the button */}
              <div style={{
                position: 'absolute',
                top: '50%',
                right: -5,
                transform: 'translateY(-50%) rotate(45deg)',
                width: 8, height: 8,
                backgroundColor: 'rgb(8,10,14)',
                border: `1px solid ${T50}`,
                borderBottom: 'none', borderLeft: 'none',
              }} />
              Refresh
            </div>
          )}
        </div>
      </div>

      {loading ? <Loader static text="Loading Garage" /> : (
        cars.length > 0 ? (
          <List style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }} disablePadding>
            {cars.map((vehicle: any) => <Vehicle key={vehicle.VIN} vehicle={vehicle} />)}
          </List>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{ fontSize: 52, color: hexAlpha(T, 0.15) }}><FontAwesomeIcon icon={['fas', 'car-side']} /></div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em' }}>No Vehicles</div>
          </div>
        )
      )}
    </div>
  );
};

export default GarageIndex;
