import { useDispatch } from 'react-redux';
import { requestedJobStatuses, providedJobStatuses, statusOptions } from '../../../../constants';
import './JobItem.scss';

const JobItem = ({ indexType, job, name, service = {}, email }) => {
    const dispatch = useDispatch();

    const date = new Date(job.date);
    const status = indexType === "Requested" ?
        requestedJobStatuses[job.statusDescription] :
        providedJobStatuses[job.statusDescription];

    const handleClick = (e) => {
        e.preventDefault();
        const statusIndex = statusOptions.indexOf(job.statusDescription);
        if (statusIndex < statusOptions.length - 1) {
            console.log('next status: ', statusOptions[statusIndex + 1])
        } else {
            console.log('final status: ', statusOptions[statusIndex])
        }
    }
    
    return (
        <div className="job-item-container">
            <div className="job-item-header">{name} - {service.category}</div>
            <div className="job-item-email">{email}</div>
            <div className="job-item-date">{date.toLocaleDateString()}</div>
            <div className="job-item-description">{job.description}</div>
            <div className="job-item-status">
                {status}
                {status.includes("?") ?
                    <div className="job-item-status-buttons">
                        <button onClick={handleClick}>Yes</button>
                    </div> : <></>}
            </div>
        </div>
    );
}

export default JobItem;
