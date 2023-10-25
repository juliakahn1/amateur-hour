import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useEffect } from "react";
import { fetchServices } from "../../store/services";
import ServiceItem from './ServiceItem'
import './Home.scss'

const Home = () => {
  // get all services from the store/backend with useEffect and useSelector
  const dispatch = useDispatch()
  const services = useSelector(store => store.services)
  const servicesArr = Object.values(services)

  useEffect(() => {
    dispatch(fetchServices())
  }, [dispatch])

  return servicesArr.length > 0 ? (
    <>
      <div className="home-services-container">
      { servicesArr.map((service, index) => {
        return (
          <div className="service-item-tile-wrapper" key={index}>
            <ServiceItem service={service}/>
          </div>
        )
      })}
      </div>
    </>
  ) : null;
}

export default Home;
