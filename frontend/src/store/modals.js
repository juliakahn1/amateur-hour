export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (modalType, service) => {
    return {
        type: OPEN_MODAL,
        modalType,
        service
    }
}

export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
}

function modalReducer(state = null, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {type: action.modalType, service: action.service};
        case CLOSE_MODAL:
            return null;
        default:
            return state;
    }
}

export default modalReducer;