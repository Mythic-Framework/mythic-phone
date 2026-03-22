import React, { FC, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

interface Props {
  children: ReactNode;
}

const KeyListener: FC<Props> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => {
      // F3 (114) or Escape (27) closes the phone
      if (event.keyCode === 114 || event.keyCode === 27) {
        dispatch({ type: 'PHONE_NOT_VISIBLE' });
      }
    };
    window.addEventListener('keydown', handleEvent);
    return () => window.removeEventListener('keydown', handleEvent);
  }, [dispatch]);

  return <>{children}</>;
};

export default KeyListener;
