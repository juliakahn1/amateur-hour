import './ServiceItem.scss'

const ServiceItem = ({service}) => {
  console.log(service)
  return (
    <>
      <div className="service-item-shape">
        <div className="service-item-inner-container">
          <div className="service-item-metadata">
            <h2 className="service-item-name">{service.provider.firstName}</h2>
            <h3 className="service-item-category">{service.category}</h3>
            <div className="compensation-container">
              <span className="compensation-label">Compensation</span>
              <span>{service.compensation}</span>
            </div>
          </div>
          <button className="service-item-button">Book</button>
        </div>
      </div>
    </>
  )
}

export default ServiceItem
