import { useDispatch,useSelector } from "react-redux";
import React from "react";
import { useEffect } from "react";
import { fetchServices } from "../../store/services";
import ServiceItem from './ServiceItem'
import './Home.scss'

const Home = () => {
  // get all services from the store/backend with useEffect and useSelector
  const dispatch = useDispatch()
  const allServices = Object.values(useSelector(store => store.services))

  useEffect(() => {
    dispatch(fetchServices())
  }, [])

  return (
    <>
      <div className="home-services-container">
      {/* { allServices.map((service, index) => {
        return (
          <ServiceItem />
        )
      })} */}
      </div>
    </>
  );
}

export default Home;
