import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from '../../store';
import Advert from './components/Advert';

const Y20 = 'rgba(249,168,37,0.2)';

const useStyles = makeStyles((_theme: any) => ({
  wrapper: {
    height: '100%',
    background: 'transparent',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingTop: 10,
    '&::-webkit-scrollbar': { width: 3 },
    '&::-webkit-scrollbar-thumb': { background: 'rgba(249,168,37,0.3)', borderRadius: 4 },
    '&::-webkit-scrollbar-track': { background: 'transparent' },
  },
  empty: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    color: 'rgba(255,255,255,0.25)',
    fontFamily: "'Oswald', sans-serif",
    fontSize: 13,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    '& svg': { fontSize: 36, color: Y20 },
  },
}));

interface Props { del?: boolean; }

export default function Latest({ del }: Props) {
  const classes = useStyles();
  const adverts = useSelector((state: RootState) => state.data.data.adverts) ?? {};
  const filtered = Object.keys(adverts).filter(a => a !== '0');

  return (
    <div className={classes.wrapper}>
      {filtered.length > 0 ? (
        [...filtered].sort((a, b) => adverts[b].time - adverts[a].time).map((ad, i) => (
          <Advert key={i} advert={adverts[ad]} />
        ))
      ) : (
        <div className={classes.empty}>
          <FontAwesomeIcon icon={['fas', 'newspaper']} />
          No Advertisements
        </div>
      )}
    </div>
  );
}
