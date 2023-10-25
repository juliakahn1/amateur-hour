import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchJobs } from '../../../store/jobs';
import JobItem from './JobItem/JobItem';
import './DashboardItemJobIndex.scss';

const DashboardItemJobIndex = ({ indexType }) => {
    // get all jobs from the store/backend with useEffect and useSelector
    const dispatch = useDispatch();
    const currentUser = useSelector(store => store.session.user);
    const jobs = Object.values(useSelector(store => store.jobs));
    const services = useSelector(state => state.services);

    let filteredJobs;
    indexType === "Requested" ?
        filteredJobs = jobs.filter(job => job.client._id === currentUser._id) :
        filteredJobs = jobs.filter(job => job.provider._id === currentUser._id);

    useEffect(() => {
        if (jobs.length === 0) dispatch(fetchJobs())
    }, []);

    return (
        <>
            <div className="dashboard-item-job-index-container">
                <div className="dashboard-item-header">Your {indexType} Jobs</div>
                <div className="job-index-container">
                    {filteredJobs.map(job => {
                        const name = indexType === "Requested" ? job.provider.firstName : job.client.firstName;
                        const service = services[job.service];
                        return (
                            <JobItem
                                key={job._id}
                                job={job}
                                name={name}
                                service={service}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default DashboardItemJobIndex;