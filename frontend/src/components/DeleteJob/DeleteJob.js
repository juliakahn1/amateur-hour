import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/modals";
import { deleteJob } from "../../store/jobs";

import './DeleteJob.scss';

const DeleteJob = () => {
    const dispatch = useDispatch();
    const job = useSelector(state => state.modals.entity);

    const headerString = () => {
        const requested = job.indexType === "Requested" ? "requested" : "";
        const fromOrFor = job.indexType === "Requested" ? "from" : "for";
        const jobDetails = `${requested} ${job.category} job ${fromOrFor} ${job.name}`;
        return `Are you sure you would like to delete your ${jobDetails}?`
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(deleteJob(job._id));
        dispatch(closeModal());
    }
    return (
        <div className="delete-job-container">
            <div className="delete-job-header">
                {headerString()}
            </div>
            <button className="delete-job-button" onClick={handleClick}>Delete Job</button>
        </div>
    );
}

export default DeleteJob;