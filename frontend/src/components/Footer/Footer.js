import './Footer.scss'
import React from 'react'
import linkedIn from "./linkedin-logo.png"
import github from "./github-logo.png"
const Footer = () => {

  return (
    <>
      <footer className="footer-wrapper">
        <div className="footer-inner-wrapper">
          <div className="footer-disclaimer">
            <a href="https://github.com/juliakahn1/amateur-hour" target="_blank" rel="noreferrer">
              <img className="github-img main" src={github} alt="linkedin logo" />
            </a>
            <p className="footer-body">
              AmateurHour provides nascent and rising skilled providers with opportunities to gain credibility and build their portfolios beyond traditional review-based websites.
              Clients can book directly with providers and compensate them in ways that augment their credibility.
            </p>
          </div>
        <div className="footer-info">
          <div className="footer-info-left-column">
            <div className="footer-link-grouping">
              <h3 className="footer-header">Dev Team</h3>
              <div className="dev-name-links-container">
                <a className="footer-body footer-link" href="https://www.juliakahn.me/" target="_blank" rel="noreferrer">
                  Julia Kahn
                </a>
                <a href="https://www.linkedin.com/in/juliakahn1/" target="_blank" rel="noreferrer">
                  <img className="linkedin-img" src={linkedIn} alt="linkedin logo" />
                </a>
                <a href="https://github.com/juliakahn1" target="_blank" rel="noreferrer">
                  <img className="github-img" src={github} alt="linkedin logo" />
                </a>
              </div>
              <div className="dev-name-links-container">
                <a className="footer-body footer-link" href="#" target="_blank" rel="noreferrer">
                  Shannon Millar
                </a>
                <a href="https://www.linkedin.com/in/shannonnmillar/" target="_blank" rel="noreferrer">
                  <img className="linkedin-img" src={linkedIn} alt="linkedin logo" />
                </a>
                <a href="https://github.com/shanenak" target="_blank" rel="noreferrer">
                  <img className="github-img" src={github} alt="linkedin logo" />
                </a>
              </div>
              <div className="dev-name-links-container">
                <a className="footer-body footer-link" href="#" target="_blank" rel="noreferrer">
                  Mitchell Chan
                </a>
                <a href="https://www.linkedin.com/in/mitchellkchan/" target="_blank" rel="noreferrer">
                  <img className="linkedin-img" src={linkedIn} alt="linkedin logo" />
                </a>
                <a href="https://github.com/MitchellKChan" target="_blank" rel="noreferrer">
                  <img className="github-img" src={github} alt="linkedin logo" />
                </a>
              </div>
              <div className="dev-name-links-container">
                <a className="footer-body footer-link" href="#" target="_blank" rel="noreferrer">
                  Davis Lucky
                </a>
                <a href="https://www.linkedin.com/in/davis-lucky/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noreferrer">
                  <img className="linkedin-img" src={linkedIn} alt="linkedin logo" />
                </a>
                <a href="https://github.com/davislucky" target="_blank" rel="noreferrer">
                  <img className="github-img" src={github} alt="linkedin logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
