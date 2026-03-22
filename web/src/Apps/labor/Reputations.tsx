import React from 'react';
import { Loader } from '../../components';
import Reputation from './component/Reputation';
import { useAppColor, hexAlpha } from '../../hooks';

interface Props {
  myReputations: any;
  loading: boolean;
  onRefresh: () => void;
}

const Reputations: React.FC<Props> = ({ myReputations, loading }) => {
  const T = useAppColor('labor');
  const T40 = hexAlpha(T, 0.4);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0a0c10', position: 'relative' }}>
      <div style={{
        flex: 1, padding: 10, overflowY: 'auto', overflowX: 'hidden',
        scrollbarWidth: 'thin', scrollbarColor: `${T40} transparent`,
      }}>
        {!Boolean(myReputations) ? (
          <Loader static text="Loading" />
        ) : myReputations.length > 0 ? (
          myReputations
            .sort((a: any, b: any) => a.label.localeCompare(b.label))
            .map((rep: any) => (
              <Reputation key={`labor-${rep.id}`} rep={rep} disabled={loading} />
            ))
        ) : (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(255,255,255,0.25)', fontFamily: "'Oswald', sans-serif", fontSize: 15, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            No Reputation Built
          </div>
        )}
      </div>
    </div>
  );
};

export default Reputations;
