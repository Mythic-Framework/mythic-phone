import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Popup from './Popup';
import { useMyApps } from '../../hooks';

const Popups: FC = () => {
  const newNotifs: any[] = useSelector((state: RootState) => state.notifications.notifications);
  const myApps = useMyApps();

  return (
    <div style={{ position: 'absolute', width: '75%', top: '10%', left: 0, right: 0, margin: 'auto', zIndex: 1000 }}>
      {newNotifs
        .sort((a, b) => b.time - a.time)
        .filter((n) => n.show && (typeof n.app === 'object' || Boolean(myApps[n.app])))
        .slice(0, 5)
        .map((n) => (
          <Popup key={n._id} notification={n} />
        ))}
    </div>
  );
};

export default Popups;
