import React, { FC } from 'react';
import Sketch from '@uiw/react-color-sketch';
import {
  lightGreen, green, purple, blue, orange, red, teal, grey, amber, pink, indigo, lightBlue, deepOrange, deepPurple,
} from '@mui/material/colors';

const shades = [500, 600, 700, 800, 900, 'A400', 'A700'] as const;
const palettes = [grey, lightGreen, green, purple, deepPurple, indigo, lightBlue, blue, teal, orange, red, deepOrange, amber, pink];
const presetColors: string[] = palettes.flatMap((p) => shades.map((s) => p[s as keyof typeof p] as string));

interface Props {
  color: string;
  onChange: (color: { hex: string }) => void;
}

const ColorPicker: FC<Props> = ({ color, onChange }) => {
  return (
    <div style={{ width: 'fit-content', margin: 'auto' }}>
      <Sketch
        color={color}
        onChange={(c) => onChange({ hex: c.hex })}
        presetColors={presetColors}
        disableAlpha
        width={320}
      />
    </div>
  );
};

export default ColorPicker;
