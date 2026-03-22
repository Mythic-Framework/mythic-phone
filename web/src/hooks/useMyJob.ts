import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default () => {
  const myJobs = useSelector((state: RootState) => state.data.data.player?.Jobs);
  return (jobs: Record<string, any>, workplaces: Record<string, any> | null = null, grades: Record<string, any> | null = null): boolean => {
    if (jobs && myJobs) {
      for (const myJob of myJobs) {
        const jobMatch = jobs[myJob.Id];
        const workplaceMatch = !workplaces || workplaces[myJob.Workplace?.Id];
        const gradeMatch = !grades || grades[myJob.Grade.Id];
        if (jobMatch && workplaceMatch && gradeMatch) return true;
      }
    }
    return false;
  };
};
