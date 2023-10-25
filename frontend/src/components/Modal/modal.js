import React from "react";
import { closeModal } from "../../store/modals";
import { useDispatch, useSelector } from "react-redux";
import BookJob from "../BookJob/BookJob";
import "./Modal.css"


function Modal () {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal);

    if (!modal) {
        return null;
    }

    const handleClick = e => {
        e.preventDefault();
        dispatch(closeModal());
    }

    let component;
    switch(modal) {
        case 'book':
            component = <BookJob />
            break;
        default:
            return null;
    }

    return (
        <>
            <div className="modal-background" onClick={handleClick}></div>
            <div className="modal">
                <header className="modal-header">
                    <span onClick={handleClick}>X</span>
                </header>
                <div className="modal-child" onClick={(e) => e.stopPropagation()}>
                    {component}
                </div>
            </div>
        </>
    )
}

export default Modal;