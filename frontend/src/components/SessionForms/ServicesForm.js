import { useDispatch } from "react-redux"
import { useState } from "react"

const ServicesForm = () => {
  const [service, setService] = useState('')
  const services = ['Photography', 'Bartending', 'Gardening']

return (
  <>
    <div className="profile-services-form">
      <h2>Profile details</h2>
      <h3>Services</h3>
      <div className="services-tiles">
        <form>
          { services.map(service => {
            return (
              <div className="service-input-container">
                <input value={service} className="service-radio-button" type="radio" name="radio"/>
                  <div className="radio-tile">{service}</div>
              </div>
            )
          })}
        </form>
      </div>
    </div>
      {/* <button onClick={() => updateProfile(e)}>Create Account</button>
    <button>Skip</button> */}
  </>
)
}

export default ServicesForm
