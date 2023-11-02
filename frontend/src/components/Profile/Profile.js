import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../../store/services";
import './Profile.scss';
import { openModal } from "../../store/modals";

function Profile() {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.session.user);
	const [userService, setUserService] = useState(false);
	const servicesObj = useSelector(state => state.services);
	const services = Object.values(servicesObj);
	// debugger
	const makeServices = () => {
		services.forEach(service => {
			if (service.provider._id === currentUser._id) {
				setUserService(service);
			}
		})
	}

	useEffect(() => {
		if (services.length > 0) {
			makeServices();
		}
	}, []);

	const handleClick = e => {
		e.preventDefault();
		dispatch(openModal("profile-edit"))
	}

	return (userService)  ? (
		<>
			<div className="service-info-container">
				<div className="user-image-container">
                    <img className='user-image' src={userService.imageUrl} alt='service-profile'></img>
                </div>
				<div className="welcome-header">
					<h1>Hello, {currentUser.firstName}</h1>
				</div>
				<div className="user-info-container">
					<div className="user-info-item">
						<span className="profile-modal-label">Service</span>
						<p className="profile-modal-info service-category">{userService.category}</p>
					</div>
					<div className="user-info-item">
						<span className="profile-modal-label">Compensation</span>
						<p className="profile-modal-info">{userService.compensation}</p>
					</div>
					<div className="user-info-item">
						<span className="profile-modal-label">Portfolio</span>
						<div className="portfolio-container">
							<a className="link" href={userService.otherLink} target="_blank" rel="noreferrer">
								<p className="portfolio profile-modal-info">{userService.otherLink}</p>
								<i className="fa-solid fa-arrow-up-right-from-square"></i>
							</a>
						</div>
					</div>
					<div className="user-info-item">
						<span className="profile-modal-label">Email:</span>
						<p className="profile-modal-info">{currentUser.email}</p>
					</div>
					<div className="user-info-item bottom">
						<span className="profile-modal-label">Location</span>
						<p className="profile-modal-info">{currentUser.location}</p>
					</div>
				</div>
				<button className="edit-button" onClick={handleClick}>Edit</button>
			</div>
		</>
	) : null
}

export default Profile;
