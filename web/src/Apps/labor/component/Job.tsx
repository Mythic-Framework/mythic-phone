import React from 'react';
import { useSelector } from 'react-redux';
import Nui from '../../../util/Nui';
import { useAlert, useAppColor, hexAlpha } from '../../../hooks';

interface Props {
  job: any;
  myGroup: any;
  disabled: boolean;
  onRefresh: () => void;
}

const Job: React.FC<Props> = ({ job, myGroup, disabled, onRefresh }) => {
  const showAlert = useAlert();
  const T = useAppColor('labor');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T10 = hexAlpha(T, 0.1);
  const T07 = hexAlpha(T, 0.07);
  const T14 = hexAlpha(T, 0.14);
  const T18 = hexAlpha(T, 0.18);
  const T08 = hexAlpha(T, 0.08);
  const player = useSelector((state: any) => state.data.data.player);

  const onStart = async () => {
    try {
      let res = await (await Nui.send('StartLaborJob', { job: job.Id, isWorkgroup: Boolean(myGroup) })).json();
      if (res) { showAlert(`Started ${job.Name}`); setTimeout(onRefresh, 300); }
      else showAlert('Unable to Start Job');
    } catch (err) { console.log(err); showAlert('Unable to Start Job'); }
  };

  const onQuit = async () => {
    try {
      let res = await (await Nui.send('QuitLaborJob', job.Id)).json();
      if (res) { showAlert(`Quit ${job.Name}`); setTimeout(onRefresh, 300); }
      else showAlert('Unable to Quit Job');
    } catch (err) { console.log(err); showAlert('Unable to Quit Job'); }
  };

  const isOnDuty =
    job.OnDuty.filter((p: any) => p.Joiner == player.Source).length > 0 ||
    (Boolean(myGroup) && job.OnDuty.filter((p: any) => p.Joiner == myGroup.Creator.ID).length > 0);

  const isFull = job.Limit > 0 && job.OnDuty.length >= job.Limit;
  const dutyLabel = job.Limit === 0 ? `${job.OnDuty.length}` : `${job.OnDuty.length} / ${job.Limit}`;
  const startDisabled = (Boolean(myGroup) && myGroup.Creator.ID != player.Source) || Boolean(player.TempJob) || disabled;
  const quitDisabled = (Boolean(myGroup) && myGroup.Creator.ID != player.Source) || disabled;

  const wrapperStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', padding: '16px 18px',
    background: `linear-gradient(135deg, ${T07} 0%, rgba(255,255,255,0.02) 100%)`,
    border: `1px solid ${T18}`, borderLeft: `3px solid ${T}`,
    borderRadius: 4, marginBottom: 8,
    transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
  };

  const btnBase: React.CSSProperties = {
    background: T10, border: `1px solid ${hexAlpha(T, 0.35)}`,
    color: 'rgba(139,188,212,0.9)', fontFamily: "'Oswald', sans-serif",
    fontWeight: 600, fontSize: 12, letterSpacing: '0.14em',
    textTransform: 'uppercase', padding: '8px 16px', borderRadius: 3,
    cursor: 'pointer', minWidth: 64, transition: 'all 0.15s',
  };

  const btnActiveStyle: React.CSSProperties = {
    ...btnBase, background: 'rgba(76,175,122,0.1)',
    borderColor: 'rgba(76,175,122,0.5)', color: '#4caf7a',
  };

  return (
    <div
      style={wrapperStyle}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, ${T14} 0%, rgba(255,255,255,0.04) 100%)`; (e.currentTarget as HTMLElement).style.borderColor = T50; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${T08}`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, ${T07} 0%, rgba(255,255,255,0.02) 100%)`; (e.currentTarget as HTMLElement).style.borderColor = T18; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 17, fontWeight: 600, color: T, letterSpacing: '0.05em', lineHeight: 1.2 }}>
          {job.Name}
        </div>
        {job.Salary > 0 && (
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13, color: '#4caf7a', marginTop: 4, letterSpacing: '0.05em' }}>
            ${job.Salary} / hr
          </div>
        )}
      </div>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 17, fontWeight: 700, color: isFull ? '#f87171' : '#e2e8f0', minWidth: 64, textAlign: 'center', letterSpacing: '0.04em', padding: '0 8px' }}>
        {dutyLabel}
      </div>
      {isOnDuty ? (
        <button style={{ ...btnActiveStyle, opacity: quitDisabled ? 0.25 : 1, cursor: quitDisabled ? 'default' : 'pointer' }} disabled={quitDisabled} onClick={onQuit}>Quit</button>
      ) : (
        <button style={{ ...btnBase, opacity: startDisabled ? 0.25 : 1, cursor: startDisabled ? 'default' : 'pointer' }} disabled={startDisabled} onClick={onStart}>Start</button>
      )}
    </div>
  );
};

export default Job;
