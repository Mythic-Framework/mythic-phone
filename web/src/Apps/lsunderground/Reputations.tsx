import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader } from '../../components';
import Reputation from './component/Reputation';

interface Props {
  myReputations: any[];
  loading?: boolean;
}

const Reputations: React.FC<Props> = ({ myReputations, loading }) => {
  return (
    <div style={{ height: '100%', background: '#0a0c10', overflowY: 'auto', overflowX: 'hidden' }}>
      {!Boolean(myReputations) ? (
        <Loader static text="Loading" />
      ) : myReputations.length > 0 ? (
        <div style={{ padding: '6px 10px' }}>
          {myReputations.map((rep: any) => (
            <Reputation key={`lsu-${rep.id}`} rep={rep} disabled={loading} />
          ))}
        </div>
      ) : (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', height: '100%', gap: 12,
        }}>
          <FontAwesomeIcon icon={['fas', 'list']} style={{ fontSize: 40, color: 'rgba(233,82,0,0.12)' }} />
          <div style={{ color: 'rgba(255,255,255,0.25)', fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>No Reputation Built</div>
        </div>
      )}
    </div>
  );
};

export default Reputations;
