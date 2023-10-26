import { useDispatch } from 'react-redux';
import { requestedJobStatuses, providedJobStatuses, statusOptions } from '../../../../constants';
import { updateJob } from '../../../../store/jobs';
import './JobItem.scss';
import { openModal } from '../../../../store/modals';

const JobItem = ({ indexType, job, name, service = {}, email }) => {
    const dispatch = useDispatch();

    const date = new Date(job.date);
    const statusIndex = statusOptions.indexOf(job.statusDescription);
    const status = indexType === "Requested" ?
        requestedJobStatuses[job.statusDescription] :
        providedJobStatuses[job.statusDescription];

    const handleDeleteModal = (e) => {
        e.preventDefault();
        const jobInfo = {
            ...job,
            indexType,
            name,
            category: service.category
        }
        dispatch(openModal("delete", jobInfo));
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
            {statusIndex < 3 ?
                <div className="job-item-delete" onClick={handleDeleteModal}>
                    <i className="fa-solid fa-xmark"></i>
                </div> : <></>
            }
            <div className="job-item-category">{service.category}</div>
            <div className="job-item-name">{name}</div>
            <div className="job-item-email">{email}</div>
            <div className="job-item-date-wrapper">
                <div className="job-item-category">Due Date:</div>
                <div className="job-item-date">{date.toLocaleDateString()}</div>
            </div>
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
