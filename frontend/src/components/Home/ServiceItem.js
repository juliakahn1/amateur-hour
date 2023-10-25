import './ServiceItem.scss'

const ServiceItem = ({service}) => {
  console.log(service)
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
                <span className="service-tile-portfolio">View portfolio</span>
                <span className="service-tile-job-count">12 jobs completed</span>
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
