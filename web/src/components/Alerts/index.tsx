import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fade } from '@mui/material';
import { RootState, AppDispatch } from '../../store';

const Alerts: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const alerts: string[] = useSelector((state: RootState) => state.alerts.alerts);
  const [show, setShow] = useState(false);
  const [alertTimer, setAlertTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (alerts.length > 0) {
      if (!alertTimer) {
        setShow(true);
        setAlertTimer(
          setTimeout(() => {
            setShow(false);
            setTimeout(() => {
              dispatch({ type: 'ALERT_EXPIRE' });
              setAlertTimer(null);
            }, 500);
          }, 2500),
        );
      }
    } else {
      setShow(false);
    }
  }, [alerts, alertTimer]);

  return (
    <Fade in={show}>
      <div style={{
        position: 'absolute',
        bottom: '25%',
        left: 0,
        right: 0,
        margin: 'auto',
        width: 'fit-content',
        maxWidth: '80%',
        minHeight: 36,
        zIndex: 10004,
        pointerEvents: 'none',
        /* Glass pill */
        background: 'rgba(14,18,24,0.88)',
        border: '1px solid rgba(32,134,146,0.45)',
        borderRadius: 40,
        padding: '8px 18px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(32,134,146,0.1)',
        /* Text */
        fontFamily: "'Oswald', sans-serif",
        fontSize: 13,
        letterSpacing: '0.06em',
        color: '#ffffff',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        /* Teal left accent line */
        borderLeft: '3px solid #208692',
      }}>
        {alerts.length > 0 ? alerts[0] : null}
      </div>
    </Fade>
  );
};

export default Alerts;
