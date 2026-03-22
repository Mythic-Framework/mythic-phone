import React, { useEffect, FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

interface Props {
  children: ReactNode;
}

/**
 * When FiveM serialises Lua tables → JSON → postMessage, any JS array that
 * was defined as  ['fab', 'twitter']  arrives as a plain object
 * { "0": "fab", "1": "twitter" }.  FontAwesome's icon resolver only accepts
 * a real Array or a string, so we must convert those objects back to arrays
 * before they reach the Redux store.
 */
function fixIcons(apps: Record<string, any>): Record<string, any> {
  if (!apps || typeof apps !== 'object') return apps;
  const fixed: Record<string, any> = {};
  for (const key of Object.keys(apps)) {
    const app = { ...apps[key] };
    if (app.icon !== null && typeof app.icon === 'object' && !Array.isArray(app.icon)) {
      // Convert {0: 'fab', 1: 'twitter'} → ['fab', 'twitter']
      const indices = Object.keys(app.icon)
        .filter(k => !isNaN(Number(k)))
        .sort((a, b) => Number(a) - Number(b));
      if (indices.length > 0) {
        app.icon = indices.map(i => app.icon[i]);
      }
    }
    fixed[key] = app;
  }
  return fixed;
}

const WindowListener: FC<Props> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleEvent = (event: MessageEvent) => {
      const { type, data } = event.data ?? {};
      if (type == null) return;

      // Arrays must stay arrays — spreading them turns them into plain objects
      let payload: any = Array.isArray(data) ? data : { ...data };

      // Fix icon arrays that JSON-serialisation turned into plain objects
      if (type === 'SET_APPS' && payload && typeof payload === 'object') {
        payload = fixIcons(payload);
      }

      dispatch({ type, payload });
    };

    window.addEventListener('message', handleEvent);
    return () => window.removeEventListener('message', handleEvent);
  }, [dispatch]);

  return <>{children}</>;
};

export default WindowListener;
