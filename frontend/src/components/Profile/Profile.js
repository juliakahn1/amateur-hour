import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './Profile.css';
import ProfileEdit from "./ProfileEdit";

function Profile () {
    const dispatch = useDispatch();
    const [showEdit, setShowEdit] = useState(false);

    const handleClick = e => {
        e.preventDefault();
        setShowEdit(true);
    }

    return (showEdit) ? (
        <>
            <ProfileEdit />
        </>
    ) : (
        <>
            <h1>Profile Show</h1>
            <p>Service Links</p>
            <p>Service Skill</p>
            <p>Compensation</p>
            <button onClick={handleClick}>Edit</button>
        </>
    )
}

export default Profile;