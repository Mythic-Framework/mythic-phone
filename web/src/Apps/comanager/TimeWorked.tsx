import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { throttle } from 'lodash';
import { Loader, Modal } from '../../components';
import moment from 'moment';
import Nui from '../../util/Nui';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import TimeWorkedEmployee from './components/TimeWorkedEmployee';

const parseDutyTime = (dutyTime: any, job: string): string => {
  if (dutyTime && dutyTime[job]) {
    const afterTime = moment().subtract(7, 'days').unix();
    let timeWorked = 0;
    dutyTime[job].forEach((t: any) => { if (t.time >= afterTime) timeWorked += t.minutes; });
    return timeWorked > 0 ? moment.duration(timeWorked, 'minutes').humanize() : '0 minutes';
  }
  return '0 minutes';
};

const parseLastDutyTime = (lastDuty: any, job: string): string => {
  if (lastDuty && lastDuty[job]) return `${moment(lastDuty[job] * 1000).format('LLL')} (${moment(lastDuty[job] * 1000).fromNow()})`;
  return 'Never';
};

interface Props { jobData: any; playerJob: any; refreshRoster?: () => void; }

const TimeWorked: React.FC<Props> = ({ jobData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sendAlert = useAlert();
  const T = useAppColor('comanager');
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const T10 = hexAlpha(T, 0.1);

  const timeWorked = useSelector((state: any) => state.com.timeWorked);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewing, setViewing] = useState<any>(null);

  const fetchTimeWorked = useMemo(() => throttle(async () => {
    setLoading(true);
    try {
      let res = await (await Nui.send('FetchTimeWorked', jobData.Id)).json();
      if (res) dispatch({ type: 'UPDATE_TIMEWORKED', payload: { timeWorked: res, timeWorkedJob: jobData.Id } });
      else throw res;
    } catch { sendAlert('Unable to Load Time Worked'); }
    setLoading(false);
  }, 5000), []);

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    const mockTimeWorked = [
      { SID: 1, First: 'Testy', Last: 'McTest', LastClockOn: { [jobData.Id]: now - 3600 }, TimeClockedOn: { [jobData.Id]: [{ time: now - 86400, minutes: 95 }, { time: now - 172800, minutes: 120 }, { time: now - 259200, minutes: 45 }] } },
      { SID: 2, First: 'Jane', Last: 'Doe', LastClockOn: { [jobData.Id]: now - 7200 }, TimeClockedOn: { [jobData.Id]: [{ time: now - 86400, minutes: 60 }, { time: now - 345600, minutes: 30 }] } },
      { SID: 3, First: 'John', Last: 'Smith', LastClockOn: { [jobData.Id]: now - 604800 }, TimeClockedOn: { [jobData.Id]: [{ time: now - 600000, minutes: 15 }] } },
    ];
    dispatch({ type: 'UPDATE_TIMEWORKED', payload: { timeWorked: mockTimeWorked, timeWorkedJob: jobData.Id } });
  }, []);

  const headerBtn = (disabled = false): React.CSSProperties => ({
    width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 6, border: `1px solid ${T20}`, cursor: disabled ? 'not-allowed' : 'pointer',
    color: T, fontSize: 14, background: 'transparent', opacity: disabled ? 0.3 : 1,
    pointerEvents: disabled ? 'none' : 'auto', transition: 'background 0.2s, border-color 0.2s',
  });

  return (
    <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 16px', height: 56, background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`, borderBottom: `1px solid ${T50}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.06em', color: '#fff', overflow: 'hidden' }}>
          <FontAwesomeIcon icon={['fas', 'clock']} style={{ color: T, fontSize: 16, flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{jobData.Name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={headerBtn(loading)} onClick={() => fetchTimeWorked()}
            onMouseEnter={e => { if (!loading) { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; } }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
            <FontAwesomeIcon icon={['fas', 'arrows-rotate']} className={loading ? 'fa-spin' : ''} />
          </div>
          <div style={headerBtn()} onClick={() => navigate(-1)}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
            <FontAwesomeIcon icon={['fas', 'house']} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
        {loading
          ? <Loader static text="Loading" />
          : timeWorked && timeWorked.length > 0
            ? timeWorked.map((employee: any) => (
              <TimeWorkedEmployee key={employee.SID} employee={employee} jobData={jobData} onClick={() => setViewing(employee)} />
            ))
            : <Loader static text="Loading" />
        }
      </div>

      <Modal appColor={T} open={viewing != null} title="Time Worked" onClose={() => setViewing(null)} onAccept={null} onDelete={null}>
        {viewing != null && (
          <div style={{ padding: '8px 0' }}>
            {[
              { label: 'Employee', value: `${viewing.First} ${viewing.Last}` },
              { label: 'State ID', value: viewing.SID },
              { label: 'Last On Duty', value: parseLastDutyTime(viewing.LastClockOn, jobData.Id) },
              { label: 'This Week', value: parseDutyTime(viewing.TimeClockedOn, jobData.Id) },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${T10}` }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Oswald', sans-serif", fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{row.label}</span>
                <span style={{ color: '#fff', fontFamily: "'Share Tech Mono', monospace", fontSize: 13 }}>{row.value}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TimeWorked;
