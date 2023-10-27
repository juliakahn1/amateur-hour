import './ServiceItem.scss'
import { openModal } from '../../store/modals';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const ServiceItem = ({service, jobs}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const history = useHistory();
  const numJobs = jobs.length;
  let bookButton;

  const handleClick = e => {
    e.preventDefault();
    if (currentUser) {
      dispatch(openModal("book", service))
    } else {
      history.push('/login');
    }
  }

  jobs.some(job => job.client._id === currentUser?._id) ?
    bookButton = (<button className="service-item-button booked" disabled>job in progress</button>) :
    bookButton = (<button className="service-item-button" onClick={handleClick}>Book</button>)

  return (
    <>
      <div className="service-item-shape">
        <div className="service-item-inner-container">
          <div className="service-item-metadata">
            <header className="service-item-header">
              <h3 className="service-item-category">{service.category}
                <span className="service-item-loc"> | {service.provider.location}</span>
              </h3>
            </header>
            <div className="service-item-horiz-container">
              <div className='service-item-left'>
                <h2 className="service-item-name">{service.provider.firstName}</h2>
                <section className="service-item-details">
                  <div className="service-tile-portfolio-container">
                    <a href={service.otherLink} target="_blank" rel="noreferrer">
                      <span className="service-tile-portfolio">visit portfolio</span>
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                  <span className="service-tile-job-count">
                    <span className="job-count">{numJobs} </span>
                    {numJobs > 1 || numJobs === 0 ? "jobs" : "job"} completed
                  </span>
                  <span className="service-tile-compensation-label">Compensation</span>
                  <span className="service-tile-compensation-data">{service.compensation}</span>
                </section>
              </div>
              <div className='service-item-image-container'>
                {/* service.imageUrl */}
                {/* "https://media.blogto.com/articles/20210906-simu-liu-stock-photos.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70 */}
                <img id='service-item-image' className='service-item-image' src={service.imageUrl} alt='service-profile'></img>
              </div>
            </div>
            {bookButton}
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceItem
