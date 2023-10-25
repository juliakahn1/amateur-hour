import './ServiceItem.scss'
import { openModal } from '../../store/modals';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ServiceItem = ({service, job}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const history = useHistory();

  const handleClick = e => {
    e.preventDefault();
    if (currentUser) {
      dispatch(openModal("book", service))
    } else {
      history.push('/login');
    }
  }

  const jobLength = job.length
  return (
    <>
      <div className="service-item-shape">
        <div className="service-item-inner-container">
          <div className="service-item-metadata">
            <div>
              <header className="service-item-header">
                <h3 className="service-item-category">{service.category}</h3>
                <h2 className="service-item-name">{service.provider.firstName}</h2>
              </header>
              <section className="service-item-details">
                <div className="service-tile-portfolio-container">
                  <a href={service.otherLink} target="_blank">
                    <span className="service-tile-portfolio">visit portfolio</span>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                </div>
                <span className="service-tile-job-count"><span className="job-count">{jobLength}</span> {jobLength > 1 || jobLength === 0 ? "jobs" : "job"} completed</span>
                <span className="service-tile-compensation-label">Compensation</span>
                <span className="service-tile-compensation-data">{service.compensation}</span>
              </section>
              <button className="service-item-button" onClick={handleClick}>Book</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceItem
