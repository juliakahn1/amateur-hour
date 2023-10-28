import { useDispatch } from 'react-redux';
import { requestedJobStatuses, providedJobStatuses, statusOptions } from '../../../../constants';
import { updateJob } from '../../../../store/jobs';
import './JobItem.scss';
import { openModal } from '../../../../store/modals';

const JobItem = ({ indexType, job, name, service = {}, email, location }) => {
	const dispatch = useDispatch();
	const dispatch = useDispatch();

	const date = new Date(job.date);
	const statusIndex = statusOptions.indexOf(job.statusDescription);
	const status = indexType === "Requested" ?
		requestedJobStatuses[job.statusDescription] :
		providedJobStatuses[job.statusDescription];
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

	const handleEmail = (e) => {
		e.preventDefault();
		navigator.clipboard.writeText(email);
		const tooltip = e.currentTarget.children[0];
		tooltip.innerText = "Copied to clipboard!";
	}
	const handleEmail = (e) => {
		e.preventDefault();
		navigator.clipboard.writeText(email);
		const tooltip = e.currentTarget.children[0];
		tooltip.innerText = "Copied to clipboard!";
	}

	const resetTooltip = (e) => {
		e.preventDefault();
		const tooltip = e.currentTarget.children[0];
		tooltip.innerText = email;
	}
	const resetTooltip = (e) => {
		e.preventDefault();
		const tooltip = e.currentTarget.children[0];
		tooltip.innerText = email;
	}

	const handleStatus = (e) => {
		e.preventDefault();
		const statusIndex = statusOptions.indexOf(job.statusDescription);
		const statusUpdate = {
			statusDescription: statusOptions[statusIndex + 1]
		};
		dispatch(updateJob(statusUpdate, job._id));
	}
	const handleStatus = (e) => {
		e.preventDefault();
		const statusIndex = statusOptions.indexOf(job.statusDescription);
		const statusUpdate = {
			statusDescription: statusOptions[statusIndex + 1]
		};
		dispatch(updateJob(statusUpdate, job._id));
	}

	return (
		<div className="job-item-container">
			<div className="job-item-container-inner">
				<div className="job-item-x-loc-service-container">
					{statusIndex < 3 ?
						<div className="job-item-delete" onClick={handleDeleteModal}>
							<i className="fa-solid fa-xmark"></i>
						</div> : <></>
					}
					<div className="job-item-header-wrapper">
						<div className="job-item-category">{`${service.category}`}</div>
						<div className="job-item-location">{`| ${location}`}</div>
					</div>
				</div>
				<div className='job-item-horiz-wrapper'>
					<div className='job-item-image-container'>
						<img id='job-item-image' className='job-item-image' src={service.imageUrl} alt='job-profile'></img>
					</div>
					<div className='job-item-left'>
						<div className="job-item-name">{name}</div>
						<div className="job-item-email-portfolio-flex">
							<div className="job-item-email-wrapper" onClick={handleEmail} onMouseLeave={resetTooltip}>
								<span id="email-copy-tooltip" className="email-copy-tooltip">{email}</span>
								<div className="job-item-email">Copy email</div>
								<i className="fas fa-clipboard email-clipboard"></i>
							</div>
							<div className="portfolio-info">
								<a href="" target="_blank" rel="noreferrer">
									<span className="service-tile-portfolio job-item-portfolio">visit portfolio</span>
									<i className="fa-solid fa-arrow-up-right-from-square"></i>
								</a>
							</div>
						</div>
						<div className="job-item-date-wrapper">
							<div className="job-item-category">job date </div>
							<div className="job-item-date">{date.toLocaleDateString()}</div>
						</div>
					</div>
				</div>
				<div className="job-item-description-wrapper">
					<div className="job-item-category">Description </div>
					<div className="job-item-description">{job.description}</div>
				</div>
				<div className="job-item-status">
					<div className="job-item-category">Status </div>
					{status}
				</div>
				{status.includes("?") ?
					<button
						className="job-item-status-button"
						onClick={handleStatus}
					>
						Yes
					</button> : <></>
				}
			</div>
		</div>
		);
}

export default JobItem;
