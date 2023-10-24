import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './Profile.css';

function Profile () {
    const dispatch = useDispatch();
    const [links, setLinks] = useState();
    const [service, setService] = useState();
    let userService;
    const services = Object.values(useSelector(state => state.services));
    services.forEach(service => {
        if (service.providerId === userId) {
            userService = service;
        }
    });
    const fName = userService.provider.firstName;
    const lName = userService.provider.lastName;
    const location = userService.provider.location;
    const compensation = userService.provider.compensation;
    const instagramLink = userService.provider.instagramLink;
    const categories = ['Photography', 'Bartending', 'Gardening'];
    const comp = ['Yelp review', 'Social media tagged post', 'Google review'];
    
    //names are from current user
    //location is form current user
    //service is from services slice of state @ currentuser id
    //links from service @ currentUser 

    
    let component = (
        <>
            <h1>Service Display</h1>
            <button  onClick={handleEdit}>Edit service</button>
        </>
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        const service = {

        }

        component = (
            <>
                <h1>Edited service display</h1>
            </>
        )
    }

    const handleEdit = (e) => {
        e.preventDefault();
        const editedService = {
            id: userService.id,
            category: userService.category,
            provider: currentUser.id,
            compensation: userService.compensation,
            instagramLink: userService.instagramLink,
            yelpLink: userService.yelpLink,
            otherLink: userService.otherLink
        }

        component = (
            <>
                <div className="service-edit-form">
                    <h2>Edit service</h2>
                    <form onSubmit={handleSubmit}>
                        <h4>Change skill</h4>
                        <div className="services-tiles">
                            {
                                categories.map((category, index) => {
                                    return (
                                        <div key={index} className="service-input-container">
                                            <input 
                                                value={category}
                                                className="service-radio-button"
                                                type="radio"
                                                name="radio"
                                                onChange={() => setServiceCategory({category})}
                                                
                                            />
                                            <div className="radio-tile">{category}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <h4>Change compensation</h4>
                        <div className="services-tiles">
                            {
                                comp.map((compType, index) => {
                                    return (
                                        <div key={index} className="service-input-container">
                                            <input 
                                                value={compType}
                                                className="service-radio-button"
                                                type="radio"
                                                name="radio"
                                                onChange={() => setCompensation({compType})}
                                            />
                                            <div className="radio-tile">{comp}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <h4>Change your links</h4>
                        <div className="links-container">
                            <label>
                                <span>Instagram Link</span>
                                <input 
                                    type="text"
                                    value={instagramLink}
                                    onChange={() => setInstagramLink(e.target.value)}
                                />
                            </label>
                            <label>
                                <span>Yelp Link</span>
                                <input 
                                    type="text"
                                    value={yelpLink}
                                    onChange={() => setYelpLink(e.target.value)}
                                />
                            </label>
                            <label>
                                <span>Other link you'd like to share</span>
                                <input 
                                    type="text"
                                    value={otherLink}
                                    onChange={() => setOtherLink(e.target.value)}
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

    return (
        <>
            {component}
        </>
    )
}

export default Profile;