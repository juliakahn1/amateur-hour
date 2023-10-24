import { useDispatch,useSelector } from "react-redux";
import React from "react";
import { useEffect } from "react";
import { fetchServices } from "../../store/services";

const Home = () => {
  // get all services from the store/backend with useEffect and useSelector
  const dispatch = useDispatch()
  const allServices = useSelector(store => store.services)

  useEffect(() => {
    dispatch(fetchServices())
  }, [])

  return (
    <>
      <p>Amateur Hour homepage</p>
      <footer>
        Copyright &copy; 2023 Web Amateurs
      </footer>
    </>
  );
}

export default Home;
