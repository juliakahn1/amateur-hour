import './ServiceItem.scss'
import { openModal } from '../../store/modals';
import { useDispatch } from 'react-redux';

const ServiceItem = ({service, job}) => {
  const dispatch = useDispatch();

  const handleClick = e => {
    e.preventDefault();
    dispatch(openModal("book", service))
  }

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
                <span className="service-tile-job-count"><span className="job-count">{job.length}</span> jobs completed</span>
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
