import React, { useEffect } from 'react';
import Nui from '../../util/Nui';

export default function Camera() {
  useEffect(() => { Nui.send('OpenCamera'); }, []);
  return null;
}
