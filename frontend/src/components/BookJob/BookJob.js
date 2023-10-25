import React from "react";
import { closeModal } from "../../store/modals";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createJob } from "../../store/jobs";
import { useHistory } from "react-router-dom";

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
        <form onSubmit={handleSubmit}>
            <div className="book-job-container">
                <h3>Before we send your {service.category} request to {provider.firstName}, we need a few details from you.</h3>
                <div className="description-field">
                    <label>
                        Tell us about what you want done on this job.
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            cols={30}
                        />
                    </label>
                </div>
                <div className="date-field">
                    <p>When would you like this job completed?</p>
                    <input 
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </div>
            <input type="submit" value="Send request" disabled={!description || !date}/>
        </form>
    )
}

export default BookJob;