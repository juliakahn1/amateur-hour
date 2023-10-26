import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchServices } from "../../store/services";
import { fetchJobs } from "../../store/jobs";
import { serviceCategories } from "../../constants";
import ServiceItem from "./ServiceItem";
import "./Home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const services = useSelector((store) => store.services);
  const jobs = useSelector((store) => store.jobs);
  const servicesArr = Object.values(services);
  const jobsArr = Object.values(jobs);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
  let filteredServices;

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchJobs());
  }, [dispatch]);

  categoryFilter === "all"
    ? (filteredServices = servicesArr)
    : (filteredServices = servicesArr.filter(
        (service) => service.category === categoryFilter
      ));

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

  return servicesArr.length > 0 && jobsArr.length > 0 ? (
    <div className="navbar-service">
      <form className="navbar-service-search">
        <div className="navbar-service-search-container">
          <input
            className="search-input-box"
            type="text"
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search"
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
        {/* <button id='hidden-submit' type='submit' className='hide'></button> */}
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
            all
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
