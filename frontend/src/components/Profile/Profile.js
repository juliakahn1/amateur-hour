import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../../store/services";
import ProfileEdit from "./ProfileEdit";
import './Profile.scss';

function Profile() {
	const dispatch = useDispatch();
	const [showEdit, setShowEdit] = useState(false);

	const currentUser = useSelector(state => state.session.user);
	const [userService, setUserService] = useState(false);
	const services = useSelector(state => Object.values(state.services));

	const makeServices = () => {
		services.forEach(service => {
			if (service.provider._id === currentUser._id) {
				setUserService(service);
			}
		})
	}

	useEffect(() => {
		dispatch(fetchServices());
	}, [dispatch]);

	useEffect(() => {
		if (services.length > 0) {
			makeServices();
		}
	}, [services.length, userService]);

	const handleClick = e => {
		e.preventDefault();
		setShowEdit(true);
	}

	return (showEdit && userService) || (showEdit && !userService) ? (
		<>
			<ProfileEdit setShowEdit={setShowEdit} userService={userService} />
		</>
	) : (
		<>
			<div className="service-info-container">
				{/* <img id='service-image' src={userService.imageUrl} alt='service-profile'></img> */}
				<div className="welcome-header">
					<h1>Hello, {currentUser.firstName}</h1>
				</div>
				<div className="user-info-container">
					<div className="user-info-item">
						<span className="profile-modal-label">Service</span>
						<p className="profile-modal-info">{userService.category}</p>
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
	)
}

export default Profile;
