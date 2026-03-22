import React, { FC, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slide, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { RootState, AppDispatch } from '../../store';

const useStyles = makeStyles((theme: any) => ({
  wrapper: { position: 'absolute', bottom: '1%', right: '1%', width: 300, padding: 20, background: `${theme.palette.secondary.dark}80`, textShadow: '0 0 10px #000', color: theme.palette.text.main },
  label: { fontSize: 18, fontWeight: 'bold' },
  value: { fontSize: 20, fontWeight: 'bold', textAlign: 'right' },
}));

const pad = (n: number, size = 2) => String(n).padStart(size, '0');
const msToDisplay = (ms: number) => {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(cs)}`;
};

const Race: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const trackDetails = useSelector((state: RootState) => state.track);

  const [totalMs, setTotalMs] = useState(0);
  const [lapMs, setLapMs] = useState(0);
  const [dnfMs, setDnfMs] = useState<number | null>(null);
  const [fastest, setFastest] = useState<number | null>(null);
  const totalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lapRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dnfRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    totalRef.current = setInterval(() => setTotalMs((p) => p + 10), 10);
    lapRef.current = setInterval(() => setLapMs((p) => p + 10), 10);
    return () => {
      if (totalRef.current) clearInterval(totalRef.current);
      if (lapRef.current) clearInterval(lapRef.current);
    };
  }, []);

  useEffect(() => {
    if (trackDetails.dnfTime != null) {
      setDnfMs(trackDetails.dnfTime * 1000);
      dnfRef.current = setInterval(() => setDnfMs((p) => (p != null && p > 0 ? p - 10 : 0)), 10);
    } else {
      if (dnfRef.current) clearInterval(dnfRef.current);
    }
    return () => { if (dnfRef.current) clearInterval(dnfRef.current); };
  }, [trackDetails.dnfTime]);

  useEffect(() => {
    if (trackDetails.dnf) {
      setTimeout(() => dispatch({ type: 'RACE_END' }), 3000);
    }
  }, [trackDetails.dnf]);

  useEffect(() => {
    if (lapMs > 0) {
      dispatch({ type: 'ADD_LAP_TIME', payload: { time: lapMs, lapStart: trackDetails.lapStart, lapEnd: Date.now() } });
      if (!fastest || lapMs < fastest) setFastest(lapMs);
    }
    setLapMs(0);
  }, [trackDetails.lap]);

  const onHide = () => dispatch({ type: 'RACE_HUD_END' });

  return (
    <Slide direction="up" in={trackDetails.render} mountOnEnter unmountOnExit onExited={onHide}>
      {trackDetails.dnf ? (
        <Grid container className={classes.wrapper}>
          <Grid item xs={12} className={classes.label}>You DNF'd, Better Luck Next Time</Grid>
        </Grid>
      ) : (
        <Grid container className={classes.wrapper}>
          {dnfMs != null && (
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} className={classes.label}>DNF</Grid>
                <Grid item xs={6} className={classes.value}>{msToDisplay(dnfMs)}</Grid>
              </Grid>
            </Grid>
          )}
          {trackDetails.isLaps && (
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} className={classes.label}>Lap</Grid>
                <Grid item xs={6} className={classes.value}>{trackDetails.lap} / {trackDetails.totalLaps}</Grid>
              </Grid>
            </Grid>
          )}
          <Grid item xs={6} className={classes.label}>Checkpoint</Grid>
          <Grid item xs={6} className={classes.value}>{trackDetails.checkpoint} / {trackDetails.totalCheckpoints}</Grid>
          {trackDetails.isLaps && (
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} className={classes.label}>Current Lap</Grid>
                <Grid item xs={6} className={classes.value}>{msToDisplay(lapMs)}</Grid>
                <Grid item xs={6} className={classes.label}>Fastest Lap</Grid>
                <Grid item xs={6} className={classes.value}>{fastest ? msToDisplay(fastest) : '--:--:--.--'}</Grid>
              </Grid>
            </Grid>
          )}
          <Grid item xs={6} className={classes.label}>Total Time</Grid>
          <Grid item xs={6} className={classes.value}>{msToDisplay(totalMs)}</Grid>
        </Grid>
      )}
    </Slide>
  );
};

export default Race;
