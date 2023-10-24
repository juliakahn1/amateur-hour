import { useDispatch } from "react-redux"
import { useState } from "react"

const ServicesForm = () => {
  const [service, setService] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const services = ['Photography', 'Bartending', 'Gardening']

return (
  <>
    <div className="profile-services-form">
      <h2>Profile details</h2>
      <h3>Services</h3>
      <form>
        <div className="services-tiles">
          { services.map(service => {
            return (
              <div className="service-input-container">
                <input value={service} className="service-radio-button" type="radio" name="radio"/>
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
      </form>
    </div>
      {/* <button onClick={() => updateProfile(e)}>Create Account</button>
    <button>Skip</button> */}
  </>
)
}

export default ServicesForm
