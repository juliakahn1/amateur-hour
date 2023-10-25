import './ServiceItem.scss'

const ServiceItem = ({service, job}) => {

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
                  <span className="service-tile-portfolio"><a href={service.otherLink}>Visit portfolio</a></span>
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
                <span className="service-tile-job-count">{job.length} jobs completed</span>
                <span className="service-tile-compensation-label">Compensation</span>
                <span className="service-tile-compensation-data">{service.compensation}</span>
              </section>
              <button className="service-item-button">Book</button>
            </div>
            {/* <div className="compensation-container">
              <span className="compensation-label">Compensation</span>
              <span>{service.compensation}</span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceItem
