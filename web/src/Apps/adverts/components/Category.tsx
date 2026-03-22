import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from '../../../store';
import { Category } from '../data';

const useStyles = makeStyles((_theme: any) => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 14px',
    borderRadius: 10,
    marginBottom: 8,
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'filter 0.15s',
    '&:hover': { filter: 'brightness(1.12)' },
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: 'rgba(0,0,0,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    color: '#fff',
    flexShrink: 0,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 600,
    fontSize: 14,
    color: '#fff',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
  },
  count: {
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 300,
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },
  chevron: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    flexShrink: 0,
  },
}));

const catIcons: Record<string, any> = {
  'Services': ['fas', 'briefcase'],
  'Want-To-Buy': ['fas', 'cart-shopping'],
  'Want-To-Sell': ['fas', 'tag'],
  'Help Wanted': ['fas', 'handshake'],
};

interface Props { category: Category; }

export default function CategoryCard({ category }: Props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const adObjs = useSelector((state: RootState) => state.data.data.adverts) ?? {};
  const count = Object.keys(adObjs).filter(a => a !== '0' && adObjs[a]?.categories?.includes(category.label)).length;

  return (
    <div
      className={classes.card}
      style={{ background: category.color + '22', borderColor: category.color + '44' }}
      onClick={() => navigate(`/apps/adverts/category-view/${category.label}`)}
    >
      <div className={classes.iconWrap}>
        <FontAwesomeIcon icon={catIcons[category.label] ?? ['fas', 'tag']} />
      </div>
      <div className={classes.info}>
        <div className={classes.label}>{category.label}</div>
        <div className={classes.count}>
          {count > 0 ? `${count} ${count === 1 ? 'listing' : 'listings'}` : 'No listings'}
        </div>
      </div>
      <FontAwesomeIcon icon={['fas', 'chevron-right']} className={classes.chevron} />
    </div>
  );
}
