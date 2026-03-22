import React from 'react';
import { useSelector } from 'react-redux';
import { useAppColor, hexAlpha } from '../../../hooks';
import Employee from './Employee';

interface Props { jobData: any; playerJob: any; workplace: any; onEmployeeClick: (employee: any) => void; }

const Workplace: React.FC<Props> = ({ jobData, playerJob, workplace, onEmployeeClick }) => {
  const T = useAppColor('comanager');
  const T20 = hexAlpha(T, 0.2);
  const T04 = hexAlpha(T, 0.04);
  const roster = useSelector((state: any) => state.com.roster);

  let filtered: any[] = [];
  if (Boolean(roster) && roster[jobData.Id]) {
    filtered = workplace
      ? roster[jobData.Id].filter((p: any) => p.JobData.Workplace?.Id == workplace.Id)
      : roster[jobData.Id];
  }

  if (filtered.length === 0) return null;

  return (
    <div>
      {workplace && (
        <div style={{ padding: '10px 16px 6px', fontFamily: "'Oswald', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: T, borderBottom: `1px solid ${T20}`, background: T04 }}>
          {workplace.Name}
        </div>
      )}
      {filtered.sort((a: any, b: any) => b.JobData.Grade.Level - a.JobData.Grade.Level).map((person: any) => (
        <Employee key={person.SID} jobData={jobData} playerJob={playerJob} employee={person} onClick={onEmployeeClick} />
      ))}
    </div>
  );
};

export default Workplace;
