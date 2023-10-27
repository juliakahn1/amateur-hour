import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './Profile.scss';
import ProfileEdit from "./ProfileEdit";
import { fetchServices } from "../../store/services";


function Profile () {
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
    }, []);

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
            <ProfileEdit setShowEdit={setShowEdit} userService={userService}/>
        </>
    ) : (
        <>
        <div className="service-info-container">
            <img id='service-image' src={userService.imageUrl} alt='service-profile'></img>
            <div className="welcome">
                <h1>Hello, {currentUser.firstName}. Here's a little bit about you:</h1>
            </div>
            <div className="user-info-container">
                <div className="user-info-item">
                    <span>Your service:</span>
                    <p className="service-category">{userService.category}</p>   
                </div>
                <div className="user-info-item">
                    <span>Preferred compensation:</span>
                    <p>{userService.compensation}</p>
                </div>
                <div className="user-info-item">
                    <span>Portfolio link:</span>
                    <div className="portfolio-container">
                        <a className="link" href={userService.otherLink} target="_blank" rel="noreferrer">
                            <span className="portfolio">{userService.otherLink}</span>
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </div>
                <div className="user-info-item">
                    <span>Email:</span>
                    <p>{currentUser.email}</p>
                </div>
                <div className="user-info-item bottom">
                    <span>Location:</span>
                    <p>{currentUser.location}</p>
                </div>
            </div>
            <button className="edit-button" onClick={handleClick}>Edit</button>
        </div>
        </>
    )
}

export default Profile;