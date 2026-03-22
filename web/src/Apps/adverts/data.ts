import { green, red, blue, deepOrange } from '@mui/material/colors';

export interface Category {
  label: string;
  color: string;
}

export const Categories: Category[] = [
  { label: 'Services', color: green[500] },
  { label: 'Want-To-Buy', color: red[500] },
  { label: 'Want-To-Sell', color: blue[500] },
  { label: 'Help Wanted', color: deepOrange[500] },
];
