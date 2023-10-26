import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './Profile.css';
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
    }, [services.length]);

    
    
    const handleClick = e => {
        e.preventDefault();
        setShowEdit(true);
    }
    
    
    
    return (showEdit && userService) ? (
        <>
            <ProfileEdit userService={userService}/>
        </>
    ) : (
        <>
        <div className="service-info-container">
            <div className="welcome">
                <h1>Hello, firstName. Here's a little bit about you:</h1>
            </div>
            <div className="user-info-container">
                <div className="user-info-item">
                    <p>The service you're providing:</p>
                    <p>{userService.category}</p>   
                </div>
                <div className="user-info-item">
                    <p>Your preferred compensation:</p>
                    <p>{userService.compensation}</p>
                </div>
                <div className="user-info-item">
                    <p>Your portfolio link:</p>
                    <div className="portfolio-container">
                        <a href={userService.otherLink} target="_blank" rel="noreferrer">
                            <span className="portfolio">{userService.otherLink}</span>
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </div>
                <div className="user-info-item bottom">
                    <p>Your email:</p>
                    <p>{currentUser.email}</p>
                </div>
            </div>
            <button onClick={handleClick}>Edit</button>
        </div>
        </>
    )
}

export default Profile;