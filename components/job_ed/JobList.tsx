// components/JobList.tsx
import React from 'react';
import JobItem from './JobItem';

interface Job {
  logo: string;
  title: string;
  company: string;
  date: string;
  status: string;
  salary: string;
  cvLink: string;
}

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div className="">
      {jobs.map((job, index) => (
        <JobItem
          key={index}
          logo={job.logo}
          title={job.title}
          company={job.company}
          date={job.date}
          status={job.status}
          salary={job.salary}
          cvLink={job.cvLink}
        />
      ))}
    </div>
  );
};

export default JobList;