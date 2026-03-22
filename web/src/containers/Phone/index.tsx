import React, { FC, lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slide } from '@mui/material';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import {
  Header,
  Footer,
  AppLoader,
  Home,
  List,
  Notifications,
  Alerts,
  USB,
  QuickShare,
} from '../../components';
import Popups from '../../components/Popups';
import { useMyApps } from '../../hooks';
import { Wallpapers } from '../../util/Wallpapers';
import { RootState, AppDispatch } from '../../store';
import phoneImg from '../../s10.png';

const lazyCache: Record<string, React.LazyExoticComponent<any>> = {};

function getLazyIndex(app: string): React.LazyExoticComponent<any> {
  const key = `${app}/index`;
  if (!lazyCache[key]) {
    lazyCache[key] = lazy(
      () => import(`../../Apps/${app}/index.tsx` as string),
    );
  }
  return lazyCache[key];
}

function getLazySub(app: string, sub: string): React.LazyExoticComponent<any> {
  const key = `${app}/${sub}`;
  if (!lazyCache[key]) {
    lazyCache[key] = lazy(
      () => import(`../../Apps/${app}/${sub}.tsx` as string),
    );
  }
  return lazyCache[key];
}

const Phone: FC = () => {
  const navigate = useNavigate();
  const apps = useMyApps();
  const dispatch = useDispatch<AppDispatch>();

  const visible = useSelector((state: RootState) => state.phone.visible);
  const player = useSelector((state: RootState) => (state.data.data as any).player);
  const expanded = useSelector((state: RootState) => state.phone.expanded);
  const folderBlurOpen = useSelector((state: RootState) => state.phone.folderBlurOpen);
  const installed: string[] = useSelector(
    (state: RootState) => (state.data.data as any).player?.Apps?.installed ?? [],
  );
  const settings = useSelector(
    (state: RootState) => (state.data.data as any).player?.PhoneSettings,
  );
  const clear = useSelector((state: RootState) => state.phone.clear);
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications,
  );

  const [hasNotifs, setHasNotifs] = useState(0);
  const [showing, setShowing] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShowing(true);
    } else {
      const t = setTimeout(() => setShowing(false), 400);
      return () => clearTimeout(t);
    }
  }, [visible]);

  useEffect(() => {
    if (clear) {
      setTimeout(() => {
        navigate('/');
        dispatch({ type: 'CLEARED_HISTORY' });
      }, 2000);
    }
  }, [clear]);

  useEffect(() => {
    const t = notifications
      .sort((a: any, b: any) => b.time - a.time)
      .filter(
        (n: any) =>
          n.show && (typeof n.app === 'object' || Boolean(apps[n.app])),
      )
      .slice(0, 2);
    setHasNotifs(t?.length ?? 0);
  }, [notifications]);

  const routesRef = useRef<React.ReactElement[]>([]);
  const seenRef = useRef<Set<string>>(new Set());

  const appRoutes = useMemo(() => {
    if (!Object.keys(apps).length || !installed.length) return routesRef.current;

    let changed = false;

    installed
      .filter((app) => app !== 'home')
      .forEach((app) => {
        const appData = apps[app];
        if (!appData || seenRef.current.has(app)) return;

        seenRef.current.add(app);
        changed = true;

        const LazyApp = getLazyIndex(app);
        routesRef.current.push(
          <Route
            key={app}
            path={`/apps/${app}/${appData.params ?? ''}`}
            element={
              <Suspense fallback={<AppLoader app={appData} />}>
                <LazyApp />
              </Suspense>
            }
          />,
        );

        if (appData.internal) {
          appData.internal.forEach((subapp: any) => {
            const subKey = `${app}__${subapp.app}`;
            if (seenRef.current.has(subKey)) return;
            seenRef.current.add(subKey);

            const LazySub = getLazySub(app, subapp.app);
            routesRef.current.push(
              <Route
                key={subKey}
                path={`/apps/${app}/${subapp.app}/${subapp.params ?? ''}`}
                element={
                  <Suspense fallback={<AppLoader app={appData} />}>
                    <LazySub />
                  </Suspense>
                }
              />,
            );
          });
        }
      });

    if (changed) return [...routesRef.current];
    return routesRef.current;
  }, [installed, apps]);

  const zoom = settings?.zoom ?? 100;
  const wallpaperSrc =
    Wallpapers[settings?.wallpaper]?.file ?? settings?.wallpaper ?? '';

  const notifMode = hasNotifs > 0 && !visible;

  const wrapperStyle: React.CSSProperties = expanded && visible
    ? {
        height: 1000,
        width: 500,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        overflow: 'hidden',
      }
    : notifMode
    ? {
        height: 1000,
        width: 500,
        position: 'absolute',
        bottom: -750,
        right: '2%',
        overflow: 'hidden',
        zoom: `${zoom}%`,
        transition: 'bottom 0.3s ease',
      }
    : {
        height: 1000,
        width: 500,
        position: 'absolute',
        bottom: '2%',
        right: '2%',
        overflow: 'hidden',
        zoom: `${zoom}%`,
      };

  if (!player) return null;

  return (
    <Slide direction="up" in={hasNotifs > 0 || visible} mountOnEnter unmountOnExit={!showing}>
      <div style={wrapperStyle}>
        {/* Phone shell image — on top of everything */}
        <img
          style={{
            zIndex: 100,
            background: 'transparent no-repeat center',
            height: '100%',
            width: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            userSelect: 'none',
            right: 1,
          }}
          src={phoneImg}
          alt="phone"
        />

        <div style={{ height: '100%', width: '100%', padding: '35px 30px', overflow: 'hidden' }}>
          {/* Wallpaper — behind everything */}
          <img
            style={{
              height: '92%',
              width: '88%',
              position: 'absolute',
              zIndex: -1,
              borderRadius: 30,
              userSelect: 'none',
            }}
            src={wallpaperSrc}
            alt="wallpaper"
          />

          {/* Folder blur overlay — no backdropFilter to avoid CEF black corners on rounded rects */}
          {folderBlurOpen && (
            <div
              style={{
                position: 'absolute',
                top: 35,
                left: 30,
                width: '88%',
                height: '92%',
                zIndex: 50,
                borderRadius: 30,
                overflow: 'hidden',
                pointerEvents: 'none',
                background: 'rgba(0,0,0,0.55)',
              }}
            />
          )}

          <Header />
          <Alerts />
          <USB />
          <Popups />
          <QuickShare />
          <div style={{ height: '84%', width: '99.099%', overflow: 'clip' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apps" element={<List />} />
              <Route path="/notifications" element={<Notifications />} />
              {appRoutes}
              {appRoutes.length === 0 && (
                <Route path="*" element={<Navigate to="/" replace />} />
              )}
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Slide>
  );
};

export default Phone;
