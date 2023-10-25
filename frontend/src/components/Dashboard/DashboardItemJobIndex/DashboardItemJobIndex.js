import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchJobs } from '../../../store/jobs';
import './DashboardItemJobIndex.css';

const DashboardItemJobIndex = ({indexType}) => {
    // get all jobs from the store/backend with useEffect and useSelector
    const dispatch = useDispatch();
    const allJobs = Object.values(useSelector(store => store.jobs));

    useEffect(() => {   
        if (allJobs.length === 0) dispatch(fetchJobs())
    }, []);

    return (
        <>
            <div className="dashboard-item-job-index-container">
                <div className="dashboard-item-header">{indexType}</div>
            </div>
        </>
    );
}

export default DashboardItemJobIndex;