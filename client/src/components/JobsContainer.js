import { useEffect } from 'react';
import { useAppContext } from '../context/appContext.js';
import Job from './Job.js';
import Wrapper from '../assets/wrappers/JobsContainer.js';
import Loading from './Loading.js';

const JobContainer = () => {
  const { getJobs, jobs, isLoading, page, totalJobs } = useAppContext();

  useEffect(() => {
    getJobs();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    <Wrapper>
      <h2>No jobs to display...</h2>
    </Wrapper>;
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
    </Wrapper>
  );
};

export default JobContainer;
