import { compOptions, serviceCategories } from "../../constants";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateService } from "../../store/services";

function ProfileEdit({userService}) {
    const dispatch = useDispatch();
    const [serviceCategory, setServiceCategory] = useState();
    const [compensation, setCompensation] = useState();
    const [portfolio, setPortfolio] = useState(userService.otherLink);

    const handleSubmit = e => {

        const service = {

            category: serviceCategory,
            otherLink: portfolio,
            compensation: compensation
        }
        dispatch(updateService(service, userService._id));

    }

    return (
        <>
        <div className="service-edit-form">
            <h2>Edit service</h2>
            <form onSubmit={handleSubmit}>
                <h4>Change skill</h4>
                <div className="services-tiles">
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
                <h4>Change compensation</h4>
                <div className="services-tiles">
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
                <h4>Change your portfolio link</h4>
                <div className="links-container">
                    <label>
                        <span>Portfolio Link</span>
                        <input
                            type="text"
                            value={portfolio}
                            onChange={(e) => setPortfolio(e.target.value)}
                        />
                    </label>
                </div>
                <input
                    type="submit"
                    value="Finish editing"
                />
            </form>
        </div>
    </>
    )
}

export default ProfileEdit;
