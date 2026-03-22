import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Categories } from '../data';
import { RootState } from '../../../store';

const Y = '#f9a825';
const Y20 = 'rgba(249,168,37,0.2)';
const Y10 = 'rgba(249,168,37,0.1)';
const Y08 = 'rgba(249,168,37,0.08)';

const useStyles = makeStyles((_theme: any) => ({
  card: {
    margin: '0 12px 10px',
    borderRadius: 10,
    padding: '14px 16px',
    background: Y08,
    border: '1px solid rgba(249,168,37,0.12)',
    cursor: 'pointer',
    transition: 'background 0.15s, border-color 0.15s',
    '&:hover': {
      background: Y10,
      borderColor: 'rgba(249,168,37,0.3)',
    },
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 600,
    fontSize: 15,
    color: '#fff',
    letterSpacing: '0.04em',
    marginBottom: 5,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  short: {
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 300,
    fontSize: 12,
    color: 'rgba(255,255,255,0.45)',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    background: 'rgba(249,168,37,0.1)',
    marginBottom: 10,
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 4,
    flex: 1,
    minWidth: 0,
  },
  tag: {
    fontSize: 9,
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    padding: '2px 7px',
    borderRadius: 4,
    border: '1px solid transparent',
  },
  meta: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end',
    flexShrink: 0,
    gap: 2,
  },
  price: {
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 700,
    fontSize: 15,
    color: Y,
  },
  date: {
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 300,
    fontSize: 10,
    color: 'rgba(255,255,255,0.25)',
  },
  myBadge: {
    fontSize: 9,
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.08em',
    color: Y,
    border: `1px solid rgba(249,168,37,0.4)`,
    borderRadius: 4,
    padding: '1px 6px',
    textTransform: 'uppercase' as const,
  },
}));

interface Props { advert: any; }

export default function Advert({ advert }: Props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const myId = useSelector((state: RootState) => state.data.data.player?.Source);
  const cats = Categories.filter(cat => advert.categories?.includes(cat.label));

  return (
    <div className={classes.card} onClick={() => navigate(`/apps/adverts/view/${advert.id}`)}>
      <div className={classes.title}>{advert.title}</div>
      <div className={classes.short}>{advert.short}</div>
      <div className={classes.divider} />
      <div className={classes.bottom}>
        <div className={classes.tags}>
          {cats.map((cat, i) => (
            <span key={i} className={classes.tag} style={{ background: cat.color + '22', borderColor: cat.color + '66', color: cat.color }}>
              {cat.label}
            </span>
          ))}
        </div>
        <div className={classes.meta}>
          {advert.id === myId && <span className={classes.myBadge}>Your Ad</span>}
          <span className={classes.price}>{advert.price ? `$${Number(advert.price).toLocaleString()}` : 'Negotiable'}</span>
          <span className={classes.date}>{new Date(+advert.time).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
