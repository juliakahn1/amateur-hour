import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchJobs } from '../../../store/jobs';
import './DashboardItemJobIndex.css';

const DashboardItemJobIndex = ({indexType}) => {
    // get all jobs from the store/backend with useEffect and useSelector
    const dispatch = useDispatch();
    const currentUser = useSelector(store => store.session.user);
    const allJobs = Object.values(useSelector(store => store.jobs));
    const services = useSelector(state => state.services);

    let specificJobs
    indexType === "requests" ?
        specificJobs = allJobs.filter(job => job.client._id === currentUser._id) : 
        specificJobs = allJobs.filter(job => job.provider._id === currentUser._id);

    useEffect(() => {   
        if (allJobs.length === 0) dispatch(fetchJobs())
    }, []);

    return (
        <>
            <div className="dashboard-item-job-index-container">
                <div className="dashboard-item-header">{indexType}</div>
                <div className="job-index-container">
                    {specificJobs.map(job => {
                        return (
                            <div key={job._id}>
                                <div>{indexType === "requests" ? job.provider.firstName : job.client.firstName}</div>
                                <div>{job.description}</div>
                                <div>{job.statusDescription}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default DashboardItemJobIndex;