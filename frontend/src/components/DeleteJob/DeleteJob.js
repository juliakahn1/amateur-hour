import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/modals";
import { deleteJob } from "../../store/jobs";

import './DeleteJob.scss';

const DeleteJob = () => {
	const dispatch = useDispatch();
	const job = useSelector(state => state.modals.entity);

	const fromOrFor = job.indexType === "Requested" ? "from" : "for";

	const headerString = () => {
		return `${job.category} job ${fromOrFor} ${job.name}`;
	}

	const messageString = () => {
		const requested = job.indexType === "Requested" ? "requested" : "";
		const jobDetails = `${requested} ${job.category} job ${fromOrFor} ${job.name}`;
		return `Are you sure you want to delete your ${jobDetails}? Deleting a job cannot be undone, and neither the client nor provider will be responsible for compensation or completing the service.`
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
			<div className="delete-job-text">
				{messageString()}
			</div>
			<button className="delete-job-button" onClick={handleClick}>Delete Job</button>
		</div>
	);
}

export default DeleteJob;
