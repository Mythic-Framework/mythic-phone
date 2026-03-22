import React, { useEffect, useState } from 'react';
import { Fade, Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
import vers1 from '../../vers/2.gif';

declare const __APPVERSION__: string;

const useStyles = makeStyles((theme: any) => ({
  wrapper: { height: '100%', background: theme.palette.secondary.main, textAlign: 'center', position: 'relative' },
  heading: { display: 'block', fontFamily: 'Oswald', fontSize: 40, userSelect: 'none' },
  subheading: { display: 'block', fontFamily: 'Oswald', fontSize: 30, userSelect: 'none' },
  versimg: { width: 300, height: 300, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto', borderRadius: 300 },
  footer: { display: 'block', width: '100%', textAlign: 'center', position: 'absolute', bottom: 0, padding: 10, fontFamily: 'Oswald', fontSize: 16, userSelect: 'none' },
}));

export default function Software() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  useEffect(() => {
    setOpen(true);
    const t2 = setTimeout(() => setOpen2(true), 500);
    const t3 = setTimeout(() => setOpen3(true), 1000);
    return () => { setOpen(false); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className={classes.wrapper}>
      <Slide in={open} direction="up" timeout={500}>
        <div>
          <span className={classes.heading}>Angry Boi OS</span>
          <span className={classes.subheading}>v{typeof __APPVERSION__ !== 'undefined' ? __APPVERSION__ : ''}</span>
        </div>
      </Slide>
      <Fade in={open2} timeout={500}>
        <img src={vers1} className={classes.versimg} alt="version" />
      </Fade>
      <Slide in={open3} direction="down" timeout={500}>
        <span className={classes.footer}>💙 From Alzar 😁</span>
      </Slide>
    </div>
  );
}
