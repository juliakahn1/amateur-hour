import React from "react";
import { closeModal } from "../../store/modals";
import { useDispatch, useSelector } from "react-redux";
import BookJob from "../BookJob/BookJob";
import "./Modal.css"


function Modal() {
	const dispatch = useDispatch();
	const modal = useSelector(state => state.modals);

	if (!modal) {
		return null;
	}

	const handleClick = e => {
		e.preventDefault();
		dispatch(closeModal());
	}

	let modalContent;
	switch (modal.type) {
		case 'book':
			modalContent = <BookJob />
			break;
		default:
			return null;
	}

	return (
		<>
			<div className="modal-background" onClick={handleClick}></div>
			<div className="modal">
				<header className="modal-header">
					<i className="fa-solid fa-xmark" onClick={handleClick}></i>
				</header>
				<div className="modal-child" onClick={(e) => e.stopPropagation()}>
					{ modalContent }
				</div>
			</div>
		</>
	)
}

export default Modal;
