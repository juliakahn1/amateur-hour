import { compOptions, serviceCategories } from "../../constants";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateService } from "../../store/services";
import "./ProfileEdit.scss";
import { openModal } from "../../store/modals";
import { createService } from "../../store/services";
import { closeModal } from "../../store/modals";

function ProfileEdit({userService}) {
    const dispatch = useDispatch();
    const [serviceCategory, setServiceCategory] = useState();
    const [compensation, setCompensation] = useState();
    const [portfolio, setPortfolio] = useState(userService.otherLink);
    const currentUser = useSelector(state => state.session.user);

    const handleSubmit = e => {
        e.preventDefault();
        const service = {
            category: serviceCategory,
            otherLink: portfolio,
            compensation: compensation
        }
        dispatch(updateService(service, userService._id));
        // dispatch(closeModal("profile"))
        // dispatch(openModal("profile"));
    }

    const handlePost = e => {
        const service = {
            category: serviceCategory,
            otherLink: portfolio,
            compensation: compensation,
            provider: currentUser._id
        }
        dispatch(createService(service));
        // dispatch(closeModal("profile"))
        // dispatch(openModal("profile"));
    }

    return userService ? (
        <>
        <div className="edit-form-container">
            <h2 className="edit-header">Edit your service info</h2>
            <form className="service-edit-form" onSubmit={handleSubmit}>
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
                                        // defaultChecked={}
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
                        value={portfolio}
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
                        value="Finish editing"
                        className="edit-button"
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
                                        // defaultChecked={}
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
                        value={portfolio}
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
                    />
                </div>
            </form>
        </div>
    </>
    )
}

export default ProfileEdit;
