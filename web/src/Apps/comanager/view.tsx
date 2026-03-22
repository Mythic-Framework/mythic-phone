import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { throttle } from 'lodash';
import { Loader } from '../../components';
import Management from './Management';
import Roster from './Roster';
import TimeWorked from './TimeWorked';
import { useAlert, useJobPermissions, useAppColor, hexAlpha } from '../../hooks';
import Nui from '../../util/Nui';

const ComanagerView: React.FC = () => {
  const dispatch = useDispatch();
  const sendAlert = useAlert();
  const navigate = useNavigate();
  const T = useAppColor('comanager');
  const T20 = hexAlpha(T, 0.2);
  const { jobId } = useParams<{ jobId: string }>();
  const hasPerm = useJobPermissions();

  const [loading, setLoading] = useState<boolean>(false);
  const player = useSelector((state: any) => state.data.data.player);
  const AllJobData = useSelector((state: any) => state.data.data.JobData);
  const activeTab = useSelector((state: any) => state.com.tab);

  const playerJobData = player.Jobs.find((job: any) => job.Id == jobId);
  const jobData = AllJobData.find((j: any) => j.Id == playerJobData?.Id);

  if (!playerJobData || !jobData) { navigate(-1); return null; }

  const isOwner = player.SID == jobData?.Owner;
  const canManage = hasPerm('JOB_MANAGEMENT', playerJobData.Id) || isOwner;

  const fetchRoster = useMemo(() => throttle(async () => {
    setLoading(true);
    try {
      let res = await (await Nui.send('FetchRoster', { ReqUpdate: true })).json();
      if (res && res.rosterData) {
        dispatch({ type: 'UPDATE_ROSTERS', payload: { roster: res.rosterData } });
        if (res.jobData) dispatch({ type: 'SET_DATA', payload: { type: 'JobData', data: res.jobData } });
      } else throw res;
    } catch { sendAlert("Unable to Load Roster's"); dispatch({ type: 'UPDATE_ROSTERS', payload: { roster: false } }); }
    setLoading(false);
  }, 5000), []);

  if (loading) return (
    <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Loader static text="Loading" />
    </div>
  );

  const tabs = [
    { label: 'Roster', disabled: false },
    { label: 'Manage', disabled: !canManage },
    { label: 'Time Worked', disabled: !canManage },
  ];

  return (
    <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ height: '100%' }} role="tabpanel" hidden={activeTab !== 0}>
          {activeTab === 0 && <Roster loading={loading} refreshRoster={() => fetchRoster()} jobData={jobData} playerJob={playerJobData} />}
        </div>
        <div style={{ height: '100%' }} role="tabpanel" hidden={activeTab !== 1}>
          {activeTab === 1 && <Management refreshRoster={() => fetchRoster()} jobData={jobData} playerJob={playerJobData} />}
        </div>
        <div style={{ height: '100%' }} role="tabpanel" hidden={activeTab !== 2}>
          {activeTab === 2 && <TimeWorked refreshRoster={() => fetchRoster()} jobData={jobData} playerJob={playerJobData} />}
        </div>
      </div>
      <div style={{ flexShrink: 0, display: 'flex', height: 46, background: 'rgba(8,10,14,0.98)', borderTop: `1px solid ${T20}` }}>
        {tabs.map((t, i) => (
          <div key={i}
            onClick={() => !t.disabled && dispatch({ type: 'SET_COM_TAB', payload: { tab: i } })}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: t.disabled ? 'not-allowed' : 'pointer', fontSize: 10, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', userSelect: 'none', color: t.disabled ? 'rgba(255,255,255,0.15)' : activeTab === i ? T : 'rgba(255,255,255,0.35)', borderTop: activeTab === i && !t.disabled ? `2px solid ${T}` : '2px solid transparent', background: activeTab === i && !t.disabled ? T20 : 'transparent', transition: 'all 0.2s', pointerEvents: t.disabled ? 'none' : 'auto' }}>
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComanagerView;
