import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchServices } from "../../store/services";
import { fetchJobs } from "../../store/jobs";
import { serviceCategories } from "../../constants";
import ServiceItem from './ServiceItem'
import './Home.scss'

const Home = () => {
  const dispatch = useDispatch()
  const services = useSelector(store => store.services)
  const jobs = useSelector(store => store.jobs)
  const servicesArr = Object.values(services)
  const jobsArr = Object.values(jobs)
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    dispatch(fetchServices())
    dispatch(fetchJobs())
  }, [dispatch])

  // <div className="navbar-service-tile-container">
  //             <input type="radio"
  //               name={`radio-${index}`}
  //               key={index}
  //               onChange={() => setCategoryFilter(category)}
  //               className="navbar-service-category-tile-radio"
  //               value={category}
  //             />
  //             <div className="navbar-service-category-tile-label">{category}</div>
  //           </div>

  return servicesArr.length > 0 ? (
    <>
      <form className="navbar-service-categories">
        <div className="navbar-service-tile-container">
          <input value='all'
            className="navbar-service-category-tile-radio"
            type="radio"
            name="radio-cat"
            onChange={() => setCategoryFilter('all')}/>
            <div className="navbar-service-category-tile-label">all</div>
        </div>
        {serviceCategories.map((category, index) => {
          return (
            <div key={index} className="navbar-service-tile-container">
              <input value={category}
                className="navbar-service-category-tile-radio"
                type="radio"
                name="radio-cat"
                onChange={() => setCategoryFilter(category)}/>
                <div className="navbar-service-category-tile-label">{category}</div>
            </div>
          )
        })}
      </form>
      <div className="home-services-container">
      { servicesArr.map((service, index) => {
        let job = jobsArr.filter(job => job.provider._id === service.provider._id)
        return (
          <div className="service-item-tile-wrapper" key={index}>
            <ServiceItem service={service} job={job}/>
          </div>
        )
      })}
      </div>
    </>
  ) : null;
}

export default Home;
