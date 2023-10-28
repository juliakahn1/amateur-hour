import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchServices } from "../../store/services";
import { fetchJobs } from "../../store/jobs";
import { serviceCategories } from "../../constants";
import ServiceItem from "./ServiceItem";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.session?.user);
  const services = useSelector((store) => store.services);
  const servicesArrAll = Object.values(services);
  const servicesArr = servicesArrAll.filter(service => currentUser ? service.provider._id !== currentUser._id : service)
  const jobs = useSelector((store) => store.jobs);
  const jobsArr = Object.values(jobs);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [locFilter, setLocFilter] = useState(false)
  const history = useHistory()
  let filteredServices;

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchJobs());
  }, [dispatch]);

  if (!locFilter) {
    if (categoryFilter === 'all') {
      filteredServices = servicesArr
    } else {
      filteredServices = servicesArr.filter(service => service.category === categoryFilter)
    }
  } else { // if filtering by location
    if (categoryFilter === 'all') {
      filteredServices = servicesArr.filter(service => service.provider.location === currentUser.location)
    } else {
      filteredServices = servicesArr.filter(service => service.category === categoryFilter && service.provider.location === currentUser.location)
    }
  }

  if (searchFilter !== "") {
    const loweredSearchFilter = searchFilter.toLowerCase();
    filteredServices = filteredServices.filter((service) => {
      const firstNameCheck = service.provider.firstName
        .toLowerCase()
        .includes(loweredSearchFilter);
      const lastNameCheck = service.provider.lastName
        .toLowerCase()
        .includes(loweredSearchFilter);
      const categoryCheck = service.category
        .toLowerCase()
        .includes(loweredSearchFilter);
      const compensationCheck = service.compensation
        .toLowerCase()
        .includes(loweredSearchFilter);
      const otherLinkCheck = service.otherLink
        .toLowerCase()
        .includes(loweredSearchFilter);
      const locationCheck = service.provider.location
        .toLowerCase()
        .includes(loweredSearchFilter);
      return (
        firstNameCheck ||
        lastNameCheck ||
        categoryCheck ||
        compensationCheck ||
        otherLinkCheck ||
        locationCheck
      );
    });
  }

  // boolean passed to ServiceItem props to denature "Book" button if user
  // has any requested jobs they have not provided compensation for yet
  const pendingCompensation = jobsArr.some(job => {
    return job.statusDescription === "clientCompleted" &&
      job.client._id === currentUser._id
  });

  return servicesArr.length > 0 && jobsArr.length > 0 ? (
    <div className="navbar-service">
      <form className="navbar-service-search">
        <div className="navbar-loc-tile-container">
          <input
            className="navbar-loc-tile-radio"
            type="checkbox"
            name="radio-loc"
            onChange={() => currentUser ? setLocFilter(!locFilter) : history.push('/login')} />
          <div className="navbar-loc-tile-label">
            Providers near me
          </div>
        </div>
          <div className="navbar-service-search-container">
          <input
            className="search-input-box"
            type="text"
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search providers by location, service, name, or compensation"
            value={searchFilter}
          ></input>
          <div className="search-icon">
            {searchFilter ? (
              <i
                onClick={() => setSearchFilter("")}
                className="fa-solid fa-x"
              ></i>
            ) : (
              <i className="fas fa-search"></i>
            )}
          </div>
        </div>
      </form>
      <form className="navbar-service-categories">
        <div className="navbar-service-tile-container">
          <input
            value="all"
            className="navbar-service-category-tile-radio"
            type="radio"
            name="radio-cat"
            onChange={() => setCategoryFilter("all")}
          />
          <div className="navbar-service-category-tile-label all-filter">
            all services
          </div>
        </div>
        {serviceCategories.map((category, index) => {
          return (
            <div key={index} className="navbar-service-tile-container">
              <input
                value={category}
                className="navbar-service-category-tile-radio"
                type="radio"
                name="radio-cat"
                onChange={() => setCategoryFilter(category)}
              />
              <div className="navbar-service-category-tile-label">
                {category}
              </div>
            </div>
          );
        })}
      </form>
      <div className="home-services-container">
        {filteredServices.map((service, index) => {
          let jobs = jobsArr.filter(
            (job) => job.provider._id === service.provider._id
          );
          return (
            <div className="service-item-tile-wrapper" key={index}>
              <ServiceItem service={service} jobs={jobs} />
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default Home;
