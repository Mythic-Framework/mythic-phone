import React from 'react';
import { makeStyles } from '@mui/styles';
import { Categories } from './data';
import CategoryCard from './components/Category';

const useStyles = makeStyles((_theme: any) => ({
  wrapper: {
    height: '100%',
    background: 'transparent',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '10px 12px',
    '&::-webkit-scrollbar': { width: 3 },
    '&::-webkit-scrollbar-thumb': { background: 'rgba(249,168,37,0.3)', borderRadius: 4 },
    '&::-webkit-scrollbar-track': { background: 'transparent' },
  },
}));

export default function CategoriesView() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {Categories.map((category, i) => <CategoryCard key={i} category={category} />)}
    </div>
  );
}
