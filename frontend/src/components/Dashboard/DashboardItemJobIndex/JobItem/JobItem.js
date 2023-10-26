import { useDispatch } from 'react-redux';
import { requestedJobStatuses, providedJobStatuses, statusOptions } from '../../../../constants';
import { updateJob } from '../../../../store/jobs';
import './JobItem.scss';
import { openModal } from '../../../../store/modals';

const JobItem = ({ indexType, job, name, service = {}, email }) => {
    const dispatch = useDispatch();

    const date = new Date(job.date);
    const status = indexType === "Requested" ?
        requestedJobStatuses[job.statusDescription] :
        providedJobStatuses[job.statusDescription];

    const handleDeleteModal = (e) => {
        e.preventDefault();
        dispatch(openModal("delete", job));
    }
    
    const handleClick = (e) => {
        e.preventDefault();
        const statusIndex = statusOptions.indexOf(job.statusDescription);
        const statusUpdate = {
            statusDescription: statusOptions[statusIndex + 1]
        };
        dispatch(updateJob(statusUpdate, job._id));
    }
    
    return (
        <div className="job-item-container">
            <div className="job-item-delete" onClick={handleDeleteModal}>x</div>
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
