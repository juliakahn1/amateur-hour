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
	const service = useSelector(state => state.modals.entity);
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
					<h1 className="book-job-header">Your new booking with {provider.firstName}</h1>
					<h2 className="book-job-subheader">Before you book your {service.category} job with {provider.firstName}, add the date and details.</h2>
					<div className="book-job-description-field">
						<span className="book-job-field-label">Job details</span>
							<textarea
								className="book-job-textarea-input"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								rows={5}
								cols={30}
								placeholder={`Who, what, and where? Give ${service.provider.firstName} some more info about the job you're booking so they can prepare.`}
							/>
					</div>
					<div className="book-job-date-field">
						<span className="book-job-field-label">What's the date for this job?</span>
						<input
							type="date"
							selected={new Date()}
							min={new Date().toISOString().slice(0, 10)}
							onChange={(e) => setDate(e.target.value)}
							className="calendar"
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
