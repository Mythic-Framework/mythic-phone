// Vite uses ES imports for assets — no require() needed
import w1 from '../Wallpapers/1.webp';
import w2 from '../Wallpapers/2.webp';
import w3 from '../Wallpapers/3.webp';
import w4 from '../Wallpapers/4.webp';
import w5 from '../Wallpapers/5.webp';
import w6 from '../Wallpapers/6.webp';
import w7 from '../Wallpapers/7.webp';
import w8 from '../Wallpapers/8.webp';
import w9 from '../Wallpapers/9.webp';
import w10 from '../Wallpapers/10.webp';
import w11 from '../Wallpapers/11.webp';
import w12 from '../Wallpapers/12.webp';
import w13 from '../Wallpapers/13.webp';
import w14 from '../Wallpapers/14.webp';
import w15 from '../Wallpapers/15.webp';
import w16 from '../Wallpapers/16.webp';
import w17 from '../Wallpapers/17.webp';
import w18 from '../Wallpapers/18.webp';
import w19 from '../Wallpapers/19.webp';
import w20 from '../Wallpapers/20.webp';
import w21 from '../Wallpapers/21.webp';
import w22 from '../Wallpapers/22.webp';
import w23 from '../Wallpapers/23.webp';
import w24 from '../Wallpapers/24.webp';
import w25 from '../Wallpapers/25.webp';

export interface Wallpaper {
  file: string;
  label: string;
}

export const Wallpapers: Record<string, Wallpaper> = {
  wallpaper:   { file: w1,  label: 'Wallpaper 1' },
  wallpaper2:  { file: w2,  label: 'Wallpaper 2' },
  wallpaper3:  { file: w3,  label: 'Wallpaper 3' },
  wallpaper4:  { file: w4,  label: 'Wallpaper 4' },
  wallpaper5:  { file: w5,  label: 'Wallpaper 5' },
  wallpaper6:  { file: w6,  label: 'Wallpaper 6' },
  wallpaper7:  { file: w7,  label: 'Wallpaper 7' },
  wallpaper8:  { file: w8,  label: 'Wallpaper 8' },
  wallpaper9:  { file: w9,  label: 'Wallpaper 9' },
  wallpaper10: { file: w10, label: 'Wallpaper 10' },
  wallpaper11: { file: w11, label: 'Wallpaper 11' },
  wallpaper12: { file: w12, label: 'Wallpaper 12' },
  wallpaper13: { file: w13, label: 'Wallpaper 13' },
  wallpaper14: { file: w14, label: 'Wallpaper 14' },
  wallpaper15: { file: w15, label: 'Wallpaper 15' },
  wallpaper16: { file: w16, label: 'Wallpaper 16' },
  wallpaper17: { file: w17, label: 'Wallpaper 17' },
  wallpaper18: { file: w18, label: 'Wallpaper 18' },
  wallpaper19: { file: w19, label: 'Wallpaper 19' },
  wallpaper20: { file: w20, label: 'Wallpaper 20' },
  wallpaper21: { file: w21, label: 'Wallpaper 21' },
  wallpaper22: { file: w22, label: 'Wallpaper 22' },
  wallpaper23: { file: w23, label: 'Wallpaper 23' },
  wallpaper24: { file: w24, label: 'Wallpaper 24' },
  wallpaper25: { file: w25, label: 'Wallpaper 25' },
};
