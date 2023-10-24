import { useDispatch } from "react-redux"
import { useState } from "react"

const ServicesForm = () => {
  const [serviceCategory, setServiceCategory] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const services = ['Photography', 'Bartending', 'Gardening']

  console.log(serviceCategory)

  const handleSubmit = (e) => {
    e.preventDefault()
    const service = {
      serviceCategory,
      portfolio
    }
    // dispatch
  }

return (
  <>
    <div className="profile-services-form">
      <h2>Profile details</h2>
      <h3>Services</h3>
      <p>If you're looking to offer services, select what best describes your skills and a link to your portfolio, if you have one.</p>
      <form onSubmit={handleSubmit}>
        <div className="services-tiles">
          { services.map((service, index) => {
            return (
              <div key={index} className="service-input-container">
                <input value={service}
                  className="service-radio-button"
                  type="radio"
                  name="radio"
                  onChange={() => setServiceCategory({service})}/>
                  <div className="radio-tile">{service}</div>
              </div>
            )
          })}
        </div>
        <label>
          <span>Portfolio link</span>
          <input type="text"
            value={portfolio}
            onChange={(e) => setPortfolio(e.currentTarget.value)}>
          </input>
        </label>
        <input
          type="submit"
          value="Add services"
          disabled={!serviceCategory || !portfolio}
        />
      </form>
      <button>Skip</button>
    </div>

  </>
)
}

export default ServicesForm
