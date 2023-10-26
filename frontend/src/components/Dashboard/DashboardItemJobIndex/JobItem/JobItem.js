import { requestedJobStatuses, providedJobStatuses } from '../../../../constants';

import './JobItem.scss';

const JobItem = ({ indexType, job, name, service = {}, email }) => {
    const date = new Date(job.date);
    const status = indexType === "Requested" ?
        requestedJobStatuses[job.statusDescription] :
        providedJobStatuses[job.statusDescription];
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
                        <button>Yes</button>
                    </div> : <></>}
            </div>
        </div>
    );
}

export default JobItem;
