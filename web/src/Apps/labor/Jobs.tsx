import React from 'react';
import { Loader } from '../../components';
import Job from './component/Job';
import { useAppColor, hexAlpha } from '../../hooks';

interface Props {
  jobs: any;
  groups: any;
  myGroup: any;
  loading: boolean;
  onRefresh: () => void;
}

const Jobs: React.FC<Props> = ({ jobs, groups, myGroup, loading, onRefresh }) => {
  const T = useAppColor('labor');
  const T40 = hexAlpha(T, 0.4);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0a0c10' }}>
      <div style={{
        flex: 1, padding: 10, overflowY: 'auto', overflowX: 'hidden',
        scrollbarWidth: 'thin', scrollbarColor: `${T40} transparent`,
      }}>
        {!Boolean(jobs) ? (
          <Loader static text="Loading" />
        ) : Object.keys(jobs).length > 0 ? (
          Object.keys(jobs).map((k) => (
            <Job key={`labor-${k}`} job={jobs[k]} myGroup={myGroup} disabled={loading} onRefresh={onRefresh} />
          ))
        ) : (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(255,255,255,0.25)', fontFamily: "'Oswald', sans-serif", fontSize: 15, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            No Jobs Available
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
