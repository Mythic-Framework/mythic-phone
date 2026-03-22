import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useJobPermissions, useAppColor, hexAlpha } from '../../../hooks';

interface Props { jobData: any; playerJob: any; employee: any; onClick: (employee: any) => void; }

const Employee: React.FC<Props> = ({ jobData, playerJob, employee, onClick }) => {
  const T = useAppColor('comanager');
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const T15 = hexAlpha(T, 0.15);
  const T04 = hexAlpha(T, 0.04);
  const hasPerm = useJobPermissions();
  const player = useSelector((state: any) => state.data.data.player);

  const isOwner = player.SID == jobData?.Owner;
  const manageCompany = hasPerm('JOB_MANAGEMENT', jobData.Id) || isOwner;
  const manageEmployees = hasPerm('JOB_MANAGE_EMPLOYEES', jobData.Id) || isOwner;
  const fireEmployee = hasPerm('JOB_FIRE', jobData.Id) || isOwner;
  const canInteract = (jobData?.Owner != employee.SID || isOwner) && (playerJob.Grade.Level > employee.JobData.Grade.Level || isOwner) && (manageCompany || manageEmployees || fireEmployee);

  const isMe = player.SID == employee.SID;
  const isEmpOwner = jobData?.Owner == employee.SID;

  return (
    <div
      onClick={canInteract ? () => onClick(employee) : undefined}
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${hexAlpha(T, 0.08)}`, borderLeft: '3px solid transparent', transition: 'background 0.15s, border-left-color 0.15s', background: `linear-gradient(90deg, ${T04} 0%, transparent 100%)`, cursor: canInteract ? 'pointer' : 'default' }}
      onMouseEnter={e => { if (canInteract) { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderLeftColor = T; } }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `linear-gradient(90deg, ${T04} 0%, transparent 100%)`; (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'; }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: T15, border: `1px solid ${T50}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T, fontSize: 14, flexShrink: 0 }}>
        <FontAwesomeIcon icon={['fas', 'user']} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {isMe && <FontAwesomeIcon icon={['fas', 'user']} style={{ fontSize: 11, color: '#64b5f6' }} title="You" />}
          {isEmpOwner && !isMe && <FontAwesomeIcon icon={['fas', 'crown']} style={{ fontSize: 11, color: 'gold' }} title="Owner" />}
          {`${employee.First} ${employee.Last}`}
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{employee.JobData.Grade.Name}</div>
      </div>
      {canInteract && <FontAwesomeIcon icon={['fas', 'pen-to-square']} style={{ color: T, fontSize: 13, opacity: 0.6, flexShrink: 0 }} />}
    </div>
  );
};

export default Employee;
