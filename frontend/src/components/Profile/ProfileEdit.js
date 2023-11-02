import React from "react";
import { compOptions, serviceCategories } from "../../constants";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateService } from "../../store/services";
import { createService } from "../../store/services";
import { openModal, closeModal } from "../../store/modals";
import { useEffect } from "react";
import { fetchServices } from "../../store/services";
import "./ProfileEdit.scss";
import "./Profile.scss"

function ProfileEdit() {
	const dispatch = useDispatch();
	const [userService, setUserService] = useState(false);
	const servicesObj = useSelector(state => Object.values(state.services));
	const services = Object.values(servicesObj);
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

	const [serviceCategory, setServiceCategory] = useState();
	const [compensation, setCompensation] = useState();
	const [portfolio, setPortfolio] = useState(userService.otherLink);
	const currentUser = useSelector(state => state.session.user);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const service = {
			category: serviceCategory,
			otherLink: portfolio,
			compensation: compensation
		}
		await dispatch(updateService(service, userService._id));
		dispatch(openModal("profile"));
	}

	const handlePost = e => {
		e.preventDefault();
		const service = {
			category: serviceCategory,
			otherLink: portfolio,
			compensation: compensation,
			provider: currentUser._id
		}
		dispatch(createService(service));
		dispatch(openModal("profile"))
	}

	return userService ? (
		<>
			<div className="edit-form-container">
				<h1 className="welcome-header">Update your profile</h1>
				<form className="service-edit-form" onSubmit={handleSubmit}>
					<h4 className="profile-modal-label">Swtich services</h4>
					<div className="services-edit-tiles">
						{
							serviceCategories.map((categoryType, index) => {
								return (
									<div key={index} className="service-input-container">
										<input
											value={categoryType}
											className="service-radio-button"
											type="radio"
											name="radio-service-category"
											onChange={() => setServiceCategory(categoryType)}
										/>
										<div className="radio-tile">{categoryType}</div>
									</div>
								)
							})
						}
					</div>
					<div className="links-container">
						<span className="profile-modal-label">Edit portfolio link</span>
						<input
							type="text"
							value={portfolio}
							onChange={(e) => setPortfolio(e.target.value)}
							className="services-input-text-field"
							placeholder={userService.otherLink}
						/>
					</div>
					<h4 className="profile-modal-label">Switch compensation</h4>
					<div className="services-edit-tiles">
						{
							compOptions.map((compType, index) => {
								return (
									<div key={index} className="service-input-container">
										<input
											value={compType}
											className="service-radio-button"
											type="radio"
											name="radio-compType"
											onChange={() => setCompensation(compType)}
										/>
										<div className="radio-tile">{compType}</div>
									</div>
								)
							})
						}
					</div>
					<div className="profile-edit-button-container profile-edit-page">
						<input
							type="submit"
							value="Update"
							className="edit-button"
							disabled={!compensation || !serviceCategory}
						/>
					</div>
				</form>
			</div>
		</>
	) : (
		<>
			<div className="edit-form-container">
				<h2 className="edit-header">Create your service</h2>
				<form className="service-edit-form" onSubmit={handlePost}>
					<h4 className="skill-title">Change skill</h4>
					<div className="services-edit-tiles">
						{
							serviceCategories.map((categoryType, index) => {
								return (
									<div key={index} className="service-input-container">
										<input
											value={categoryType}
											className="service-radio-button"
											type="radio"
											name="radio-service-category"
											onChange={() => setServiceCategory(categoryType)}
										/>
										<div className="radio-tile">{categoryType}</div>
									</div>
								)
							})
						}
					</div>
					<div className="links-container">
						<span className="portfolio-title">Portfolio Link</span>
						<input
							type="text"
							value={userService.otherLink}
							onChange={(e) => setPortfolio(e.target.value)}
							className="services-input-text-field"
						/>
					</div>
					<h4 className="compensation-title">Compensation</h4>
					<div className="services-edit-tiles">
						{
							compOptions.map((compType, index) => {
								return (
									<div key={index} className="service-input-container">
										<input
											value={compType}
											className="service-radio-button"
											type="radio"
											name="radio-compType"
											onChange={() => setCompensation(compType)}
										/>
										<div className="radio-tile">{compType}</div>
									</div>
								)
							})
						}
					</div>
					<div className="profile-edit-button-container profile-edit-page">
						<input
							type="submit"
							value="Create service"
							className="edit-button"
							disabled={!compensation || !serviceCategory}
						/>
					</div>
				</form>
			</div>
		</>
	)
}

export default ProfileEdit;
