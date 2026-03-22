import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import Version from './components/Version';
import Wallpaper from './components/Wallpaper';
import CustomWallpaper from './components/CustomWallpaper';
import { Wallpapers } from '../../util/Wallpapers';

const BG = '#0a0c10';

export default function WallpaperPage() {
  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={1} style={{ flex: 1, overflowY: 'auto', padding: '8px 6px 4px', margin: 0, alignContent: 'flex-start' }}>
        <Grid item xs={4}><CustomWallpaper /></Grid>
        {Object.keys(Wallpapers).map((item, i) => (
          <Grid key={i} item xs={4}><Wallpaper item={item} wallpaper={Wallpapers[item]} /></Grid>
        ))}
      </Grid>
      <Version />
    </div>
  );
}
