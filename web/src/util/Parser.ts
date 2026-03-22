import { renderToStaticMarkup } from 'react-dom/server';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

export const Sanitize = (html: string) => {
  return parse(DOMPurify.sanitize(html));
};

export const Slugify = (input: string): string => {
  return input
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export const CurrencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const TitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const DurationToTime = (duration: number): string => {
  const pad = (num: number, size: number): string =>
    ('000' + num).slice(size * -1);
  const time = parseFloat(String(duration)).toFixed(3);
  const hours = Math.floor(Number(time) / 60 / 60);
  const minutes = Math.floor(Number(time) / 60) % 60;
  const seconds = Math.floor(Number(time) - minutes * 60);
  return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
};
