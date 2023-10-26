import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { compOptions, serviceCategories } from "../../constants"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { createService } from "../../store/services"
import './ServicesForm.scss'

const ServicesForm = () => {
  const [serviceCategory, setServiceCategory] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [compensation, setCompensation] = useState('')
  const history = useHistory()
  const currentUserId = useSelector(store => store.session?.user._id)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const service = {
      provider: currentUserId,
      category: serviceCategory,
      otherLink: portfolio,
      compensation: compensation
    }
    dispatch(createService(service))
    history.push('/')
  }

  const skipServices = e => {
    e.preventDefault()
    history.push('/')
  }

  return (
    <>
      <div className="session-page-background">
        <div className="session-page-container signup-services-page">
          <div className="session-page-inner-container signup-service-page">
            <h2 className="session-form-title signup-service-page">Looking to gain cred for your skills?</h2>
            <h3 className="signup-services-byline">
              Add a service to offer, a link to your portfolio of work, and how you'd like to be
              compensated by your clients for jobs you complete. You can change all of these details info on your profile at anytime.
            </h3>
            <form className="session-form signup-service-form" onSubmit={handleSubmit}>
              <div className="session-input-container signup-services-form">
                <span className="session-input-label">Add a service</span>
                <p className="session-input-sublabel">Select what best describes your skills.</p>
                <div className="services-tiles">
                  {serviceCategories.map((service, index) => {
                    return (
                      <div key={index} className="service-input-container">
                        <input value={service}
                          className="service-radio-button"
                          type="radio"
                          name="radio-service"
                          onChange={() => setServiceCategory(service)} />
                        <div className="radio-tile">{service}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="session-input-container signup-services-form">
                <span className="session-input-label">Portfolio</span>
                <input type="text"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.currentTarget.value)}
                  className="session-input-text-field"
                  placeholder="Add a link to your work">
                </input>
              </div>
              <div className="session-input-container signup-services-form">
                <span className="session-input-label">Choose your compensation</span>
                <p className="session-input-sublabel">Select how you'd like to be recognized for your work.</p>
                <div className="services-tiles">
                  {compOptions.map((comp, index) => {
                    return (
                      <div key={index} className="service-input-container">
                        <input value={comp}
                          className="service-radio-button"
                          type="radio"
                          name="radio-comp"
                          onChange={() => setCompensation(comp)} />
                        <div className="radio-tile">{comp}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="session-form-button-container signup-service-page">
                <input
                  type="submit"
                  value="Add services"
                  className="session-form-button"
                  disabled={!serviceCategory || !portfolio || !compensation}
                />
                <button
                  className="session-form-button service-skip"
                  onClick={(e) => skipServices(e)}>Skip
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServicesForm
