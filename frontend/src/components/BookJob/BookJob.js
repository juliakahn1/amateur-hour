import React from "react";
import { closeModal } from "../../store/modals";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createJob } from "../../store/jobs";
import { useHistory } from "react-router-dom";
import './BookJob.scss'

function BookJob() {
	const dispatch = useDispatch();
	const history = useHistory();
	const currentUser = useSelector(state => state.session.user);
	const [description, setDescription] = useState("");
	const [date, setDate] = useState(null);
	const service = useSelector(state => state.modals.service);
	const provider = service.provider;

	const handleSubmit = e => {
		e.preventDefault();
		const newJob = {
			service: service._id,
			provider: provider._id,
			client: {
				_id: currentUser._id,
				firstName: currentUser.firstName
			},
			statusDescription: "requested",
			date: date,
			description: description
		}
		dispatch(createJob(newJob));
		dispatch(closeModal());
		history.push('/dashboard');
	}

	return (
			<div className="book-job-container">
				<form onSubmit={handleSubmit}>
					<h2 className="book-job-header">Before you book your {service.category} job with {provider.firstName}, add when and details</h2>
					<div className="book-job-description-field">
						<span className="book-job-field-label">Job details</span>
							<textarea
								className="book-job-textarea-input"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								rows={5}
								cols={30}
								placeholder={`Who, what, and where? Give ${service.provider.firstName} a few more details about the job you're booking.`}
							/>
					</div>
					<div className="book-job-date-field">
						<span className="book-job-field-label">What's the date for this job?</span>
						<input
							type="date"
							// selected={new Date()}
							onChange={(e) => setDate(e.target.value)}
						/>
					</div>
					<input type="submit"
						className="book-job-form-button"
						value="Send booking request"
						disabled={!description || !date} />
				</form>
			</div>
	)
}

export default BookJob;
