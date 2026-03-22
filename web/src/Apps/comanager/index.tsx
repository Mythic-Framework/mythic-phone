import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { throttle } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader } from '../../components';
import Nui from '../../util/Nui';
import { useAlert, useJobPermissions, useAppColor, hexAlpha } from '../../hooks';

const ComanagerIndex: React.FC = () => {
  const dispatch = useDispatch();
  const sendAlert = useAlert();
  const navigate = useNavigate();
  const T = useAppColor('comanager');
  const T20 = hexAlpha(T, 0.2);
  const T25 = hexAlpha(T, 0.25);
  const T08 = hexAlpha(T, 0.08);
  const T40 = hexAlpha(T, 0.4);
  const rosters = useSelector((state: any) => state.com.roster);
  const rostersRefreshed = useSelector((state: any) => state.com.rosterUpdated);
  const externalJobs = useSelector((state: any) => state.data.data.externalJobs);
  const player = useSelector((state: any) => state.data.data.player);
  const [loading, setLoading] = useState<boolean>(false);

  const manageJob = (jobId: string) => {
    navigate(`/apps/comanager/view/${jobId}`);
    dispatch({ type: 'SET_COM_TAB', payload: { tab: 0 } });
  };

  const fetchRoster = useMemo(() => throttle(async () => {
    setLoading(true);
    try {
      const res = await (await Nui.send('FetchRoster', {})).json();
      if (res && res.rosterData) dispatch({ type: 'UPDATE_ROSTERS', payload: { roster: res.rosterData } });
      else throw res;
    } catch { sendAlert("Unable to Load Roster's"); dispatch({ type: 'UPDATE_ROSTERS', payload: { roster: false } }); }
    setLoading(false);
  }, 5000), []);

  useEffect(() => {
    if ((player.Jobs && player.Jobs.length) > 0) {
      if (!rosters || Date.now() - rostersRefreshed >= 180000) {
        const mockRoster: Record<string, any[]> = {
          testy_co: [
            { SID: 1, First: 'Testy', Last: 'McTest', JobData: { Id: 'testy_co', Workplace: { Id: 'hq', Name: 'Headquarters' }, Grade: { Id: 'owner', Name: 'Owner', Level: 9 } } },
          ],
        };
        dispatch({ type: 'UPDATE_ROSTERS', payload: { roster: mockRoster } });
      }
    }
  }, []);

  const jobs = player.Jobs?.filter((job: any) => !externalJobs.includes(job.Id)) ?? [];

  return (
    <div style={{ height: '100%', background: 'rgba(10,13,18,0.98)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px',
        background: `linear-gradient(135deg, ${T20} 0%, rgba(10,13,18,0) 100%)`,
        borderBottom: `1px solid ${T25}`,
        fontFamily: "'Oswald', sans-serif", fontSize: 19, fontWeight: 600,
        letterSpacing: '0.08em', color: '#fff',
      }}>
        <FontAwesomeIcon icon={['fas', 'building']} style={{ color: T, fontSize: 17 }} />
        Company Manager
      </div>
      {loading ? <Loader static text="Loading" /> : (
        jobs.length > 0 ? (
          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
            <List disablePadding>
              {jobs.map((job: any) => (
                <ListItem
                  key={`job-${job.Id}`}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'background 0.15s' }}
                  onClick={() => manageJob(job.Id)}
                  onMouseEnter={e => (e.currentTarget.style.background = T08)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <ListItemText
                    primary={<span style={{ color: '#fff', fontFamily: "'Oswald', sans-serif", fontWeight: 400, fontSize: 16 }}>{job.Workplace ? job.Workplace?.Name : job.Name}</span>}
                    secondary={<span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Employed as {job.Grade.Name}</span>}
                  />
                  <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ color: T40, fontSize: 14 }} />
                </ListItem>
              ))}
            </List>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{ fontSize: 52, color: hexAlpha(T, 0.15) }}><FontAwesomeIcon icon={['fas', 'building']} /></div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em' }}>Not Employed at a Company</div>
          </div>
        )
      )}
    </div>
  );
};

export default ComanagerIndex;
