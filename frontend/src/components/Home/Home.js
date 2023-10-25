import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useEffect } from "react";
import { fetchServices } from "../../store/services";
import { fetchJobs } from "../../store/jobs";
import ServiceItem from './ServiceItem'
import './Home.scss'

const Home = () => {
  // get all services from the store/backend with useEffect and useSelector
  const dispatch = useDispatch()
  const services = useSelector(store => store.services)
  const servicesArr = Object.values(services)
  const jobs = useSelector(store => store.jobs)
  const jobsArr = Object.values(jobs)

  useEffect(() => {
    dispatch(fetchServices())
    dispatch(fetchJobs())
  }, [dispatch])

  return servicesArr.length > 0 ? (
    <>
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
