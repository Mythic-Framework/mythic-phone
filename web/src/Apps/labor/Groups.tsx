import React from 'react';
import { Loader } from '../../components';
import Workgroup from './component/Workgroup';
import Nui from '../../util/Nui';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';

interface Props {
  groups: any;
  myGroup: any;
  loading: boolean;
  onRefresh: () => void;
}

const Groups: React.FC<Props> = ({ groups, myGroup, loading, onRefresh }) => {
  const showAlert = useAlert();
  const T = useAppColor('labor');
  const T40 = hexAlpha(T, 0.4);

  const onJoin = async (group: any) => {
    if (group.Working) return;
    try {
      let res = await (await Nui.send('JoinWorkgroup', group)).json();
      if (res) showAlert('Sent Request To Join');
      else showAlert('Unable to Join Workgroup');
      setTimeout(() => { onRefresh(); }, 200);
    } catch (err) { console.log(err); showAlert('Unable to Join Workgroup'); }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0a0c10', position: 'relative' }}>
      <div style={{
        flex: 1, padding: 10, overflowY: 'auto', overflowX: 'hidden',
        scrollbarWidth: 'thin', scrollbarColor: `${T40} transparent`,
      }}>
        {!Boolean(groups) ? (
          <Loader static text="Loading" />
        ) : groups.length > 0 ? (
          groups.map((workgroup: any, k: number) => (
            <Workgroup
              key={`wg-${k}`}
              group={workgroup}
              onJoin={onJoin}
              disabled={loading}
              isInGroup={Boolean(myGroup)}
            />
          ))
        ) : (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(255,255,255,0.25)', fontFamily: "'Oswald', sans-serif", fontSize: 15, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            No Workgroups
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
