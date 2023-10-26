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
            <h1>Hello, {currentUser.firstName}</h1>
            <p>{userService.category}</p>
            <p>{userService.compensation}</p>
            <p>{userService.otherLink}</p>
            <p>{currentUser.email}</p>
            <button onClick={handleClick}>Edit</button>
        </div>
        </>
    )
}

export default Profile;