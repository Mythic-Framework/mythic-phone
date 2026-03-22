import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { throttle } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../util/Nui';
import { useAlert, useMyStates, useAppColor, hexAlpha } from '../../hooks';
import { Confirm } from '../../components';
import Jobs from './Jobs';
import Groups from './Groups';
import Reputations from './Reputations';

const BG = '#0a0c10';

const MOCK_DATA = {
  jobs: {
    garbage: { Id: 'garbage', Name: 'Garbage Collector', Salary: 120, Limit: 0, OnDuty: [{ Joiner: 2 }] },
    postal:  { Id: 'postal',  Name: 'Postal Worker',     Salary: 150, Limit: 6, OnDuty: [] },
    miner:   { Id: 'miner',   Name: 'Mine Worker',        Salary: 200, Limit: 4, OnDuty: [] },
  },
  groups: [
    { Creator: { ID: 2, SID: 'A102', First: 'Marcus', Last: 'Webb' }, Members: [{ ID: 3 }], Working: false },
  ],
  reputations: [
    { id: 'garbage', label: 'Garbage Collector', value: 340, current: { label: 'Rookie', value: 0 }, next: { label: 'Regular', value: 500 } },
  ],
};

const LaborIndex: React.FC = () => {
  const dispatch = useDispatch();
  const hasState = useMyStates();
  const showAlert = useAlert();
  const T = useAppColor('labor');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const player = useSelector((state: any) => state.data.data.player);
  const activeTab = useSelector((state: any) => state.labor.tab);
  const handleTabChange = (tab: number) => dispatch({ type: 'SET_LABOR_TAB', payload: { tab } });

  const [loading, setLoading] = useState(false);
  const loadingRef = React.useRef(false);
  const [jobs, setJobs] = useState<any>(null);
  const [filtered, setFiltered] = useState<any>(null);
  const [illegal, setIllegal] = useState<any>(null);
  const [groups, setGroups] = useState<any>(null);
  const [myGroup, setMyGroup] = useState<any>(null);
  const [myReputations, setMyReputations] = useState<any>(null);
  const [creating, setCreating] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [disbanding, setDisbanding] = useState(false);

  const fetch = useMemo(() => throttle(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    if (import.meta.env.DEV) {
      setJobs(MOCK_DATA.jobs); setGroups(MOCK_DATA.groups); setMyReputations(MOCK_DATA.reputations);
    } else {
      try {
        const raw = await Nui.send('GetLaborDetails');
        const res = await raw.json();
        if (res) { setJobs(res.jobs ?? null); setGroups(res.groups ?? []); setMyReputations(res.reputations ?? []); }
      } catch (err) { console.error('[Labor] fetch error:', err); }
    }
    loadingRef.current = false;
    setLoading(false);
  }, 1000), []);

  useEffect(() => { fetch(); }, []);
  const prevTempJob = React.useRef(player?.TempJob);
  useEffect(() => {
    if (prevTempJob.current !== player?.TempJob) {
      prevTempJob.current = player?.TempJob;
      fetch();
    }
  }, [player?.TempJob]);
  useEffect(() => { if (Boolean(groups)) setMyGroup(groups.filter((wg: any) => wg?.Creator?.ID == player.Source || (Boolean(wg?.Members) && wg?.Members.filter((m: any) => m.ID == player.Source).length > 0))[0]); }, [groups]);
  useEffect(() => { if (Boolean(jobs) && Boolean(player) && !loading) setFiltered(Object.keys(jobs).filter((k) => !jobs[k].Restricted).reduce((obj: any, key) => { obj[key] = jobs[key]; return obj; }, {})); }, [jobs, player, loading]);
  useEffect(() => { if (Boolean(jobs) && Boolean(player) && !loading && Object.keys(jobs).length > 0) setIllegal(Object.keys(jobs).filter((k) => Boolean(jobs[k].Restricted) && Boolean(jobs[k].Restricted?.state) && hasState(jobs[k].Restricted.state)).reduce((obj: any, key) => { obj[key] = jobs[key]; return obj; }, {})); else setIllegal(null); }, [jobs, player, loading]);

  const onCreate = async () => { try { let res = await (await Nui.send('CreateWorkgroup')).json(); showAlert(res ? 'Workgroup Created' : 'Unable to Create Workgroup'); setTimeout(() => fetch(), 200); } catch { showAlert('Unable to Create Workgroup'); } setCreating(false); };
  const onDisband = async () => { try { let res = await (await Nui.send('DisbandWorkgroup')).json(); showAlert(res ? 'Workgroup Disbanded' : 'Unable to Disband Workgroup'); setTimeout(() => fetch(), 200); } catch { showAlert('Unable to Disband Workgroup'); } setDisbanding(false); };
  const onLeave = async () => { try { let res = await (await Nui.send('LeaveWorkgroup', myGroup)).json(); showAlert(res ? 'Left Workgroup' : 'Unable to Leave Workgroup'); setTimeout(() => fetch(), 200); } catch { showAlert('Unable to Leave Workgroup'); } setLeaving(false); };

  const hasIllegal = Boolean(illegal) && Object.keys(illegal).length > 0;
  const tabs = ['Jobs', ...(hasIllegal ? ['Restricted'] : []), 'Groups', 'Reputation'];
  const groupTabIndex = hasIllegal ? 2 : 1;
  const isGroupTab = activeTab === groupTabIndex;

  const renderGroupBtn = () => {
    if (!isGroupTab) return null;
    const btnBase: React.CSSProperties = { width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, cursor: 'pointer', fontSize: 14, background: 'transparent', transition: 'background 0.2s' };
    if (Boolean(myGroup)) {
      if (myGroup.Creator.ID == player.Source) return <div style={{ ...btnBase, border: '1px solid rgba(180,40,40,0.4)', color: '#e07070' }} onClick={() => setDisbanding(true)}><FontAwesomeIcon icon={['fas', 'trash']} /></div>;
      const leaveDisabled = Boolean(player.TempJob) || loading || myGroup.Working;
      return <div style={{ ...btnBase, border: '1px solid rgba(180,40,40,0.4)', color: '#e07070', opacity: leaveDisabled ? 0.3 : 1 }} onClick={() => !leaveDisabled && setLeaving(true)}><FontAwesomeIcon icon={['fas', 'sign-out']} /></div>;
    }
    const createDisabled = Boolean(player.TempJob) || loading;
    return <div style={{ ...btnBase, border: `1px solid ${T20}`, color: T, opacity: createDisabled ? 0.3 : 1 }} onClick={() => !createDisabled && setCreating(true)}><FontAwesomeIcon icon={['fas', 'plus']} /></div>;
  };

  const tabBarStyle: React.CSSProperties = { flexShrink: 0, display: 'flex', height: 46, background: 'rgba(8,10,14,0.98)', borderTop: `1px solid ${T20}` };
  const tabStyle = (active: boolean): React.CSSProperties => ({ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 10, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', userSelect: 'none', color: active ? T : 'rgba(255,255,255,0.35)', borderTop: active ? `2px solid ${T}` : '2px solid transparent', background: active ? T20 : 'transparent', transition: 'all 0.2s' });

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 16px', height: 56, background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`, borderBottom: `1px solid ${T50}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
          <FontAwesomeIcon icon={['fas', 'briefcase']} style={{ fontSize: 16, color: T }} />
          Labor
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {renderGroupBtn()}
          <div style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: loading ? 'default' : 'pointer', color: T, fontSize: 14, opacity: loading ? 0.3 : 1 }} onClick={() => fetch()}>
            <FontAwesomeIcon icon={['fas', 'arrows-rotate']} className={loading ? 'fa-spin' : ''} />
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ height: '100%' }} role="tabpanel" hidden={activeTab !== 0}>{activeTab === 0 && <Jobs jobs={filtered} groups={groups} myGroup={myGroup} loading={loading} onRefresh={fetch} />}</div>
        {hasIllegal && <div style={{ height: '100%' }} role="tabpanel" hidden={activeTab !== 1}>{activeTab === 1 && <Jobs jobs={illegal} groups={groups} myGroup={myGroup} loading={loading} onRefresh={fetch} />}</div>}
        <div style={{ height: '100%' }} role="tabpanel" hidden={activeTab !== groupTabIndex}>{activeTab === groupTabIndex && <Groups groups={groups} myGroup={myGroup} loading={loading} onRefresh={fetch} />}</div>
        <div style={{ height: '100%' }} role="tabpanel" hidden={activeTab !== (hasIllegal ? 3 : 2)}>{activeTab === (hasIllegal ? 3 : 2) && <Reputations myReputations={myReputations} loading={loading} onRefresh={fetch} />}</div>
      </div>
      <div style={tabBarStyle}>{tabs.map((label, i) => <div key={i} onClick={() => handleTabChange(i)} style={tabStyle(activeTab === i)}>{label}</div>)}</div>
      <Confirm title="Create Workgroup?" open={creating} confirm="Create" decline="Cancel" onConfirm={onCreate} onDecline={() => setCreating(false)} />
      <Confirm title="Leave Workgroup?" open={leaving} confirm="Leave" decline="Cancel" onConfirm={onLeave} onDecline={() => setLeaving(false)} />
      <Confirm title="Disband Workgroup?" open={disbanding} confirm="Disband" decline="Cancel" onConfirm={onDisband} onDecline={() => setDisbanding(false)} />
    </div>
  );
};

export default LaborIndex;
