const JobItem = ({ job, client }) => {
    return (
        <div key={job._id}>
            <div>{client}</div>
            <div>{job.description}</div>
            <div>{job.statusDescription}</div>
        </div>
    );
}

export default JobItem;
