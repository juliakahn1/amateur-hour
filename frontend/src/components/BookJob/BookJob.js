import React from "react";
import { closeModal } from "../../store/modals";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createJob } from "../../store/jobs";

function BookJob() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(null);
    const [statusDescription, setStatusDescription] = useState("");
    const [provider, setProvider] = useState("");
    const [client, setClient] = useState("");
    const [service, setService] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        const newJob = {
            service: service,
            provider: provider,
            client: {
                _id: currentUser.id,
                firstName: currentUser.firstName
            },
            statusDescription: statusDescription,
            date: date,
            description: description
        }
        dispatch(createJob(newJob));
        dispatch(closeModal());
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="book-job-container">
                <h3>Before we send your request, we need a few details from you.</h3>
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
            <input type="submit" value="Book" disabled={!description || !date}/>
        </form>
    )
}

export default BookJob;