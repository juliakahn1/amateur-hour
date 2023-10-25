import './JobItem.scss';

const JobItem = ({ job, name, service }) => {
    return (
        <div className="job-item-container">
            <div className="job-item-header">{name} - {service.category}</div>
            <div className="job-item-email">place@holder.email</div>
            <div className="job-item-description">{job.description}</div>
            <div className="job-item-status">
                {job.statusDescription}
                <div className="job-item-status-buttons">
                    <button>Yes</button>
                    <button>No</button>
                </div>
            </div>
        </div>
    );
}

export default JobItem;
