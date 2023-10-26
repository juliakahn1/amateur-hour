import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/modals";

const DeleteJob = () => {
    const dispatch = useDispatch();
    // state.modals.service is the job to delete; 
    // openModal action is also used for BookJob component
    const job = useSelector(state => state.modals.service);

    const handleClick = (e) => {
        e.preventDefault();
        console.log(`deleting job ${job._id}`);
        dispatch(closeModal());
    }
    return (
        <div className="delete-job-container">
            <div className="delete-job-header">
                {`Are you sure you would like to delete job ${job._id}?`}
            </div>
            <button className="delete-job-button" onClick={handleClick}>Delete Job</button>
        </div>
    );
}

export default DeleteJob;