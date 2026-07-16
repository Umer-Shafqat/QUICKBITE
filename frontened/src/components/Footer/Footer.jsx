import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo1} alt="Logo" className='logo'/>
            <p>Delivering fresh food to your doorstep</p>
            <div className="footer-social-icons">
          <div className="icon facebook">
            <div className="tooltip">Facebook</div>
            <img src={assets.facebook_icon} alt="Facebook" />
          </div>
          <div className="icon linkedin">
            <div className="tooltip">LinkedIn</div>
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
          <div className="icon twitter">
            <div className="tooltip">Twitter</div>
            <img src={assets.twitter_icon} alt="Twitter" />
          </div>
          </div>
                </div>
        <div className="footer-content-center">
           <h2>Company</h2>
           <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
           </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>+92-311-1234567</li>
            <li>info@quickbite.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2025 © QuickBite.com. All rights reserved.</p>
    </div>
  )
}

export default Footer
