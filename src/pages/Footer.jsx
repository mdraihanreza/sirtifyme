import React from 'react'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

function Footer() {
  return (
    <>

      <footer>
        <div className="container">
          <div className="footer-content">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="logo" className="footer-logo" />
            </Link>
            <ul className="f-menu-list">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/testimonial">Testimonial</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/privacypolicy" className="pp" >Privacy Policy</Link>
              </li>
              <li>
                <Link to="/" className="pp" >Payment</Link>
              </li>
            </ul>
            {/* <ul className='bottom-links'>
            <li>
                <Link to="/privacypolicy" className="pp" >Privacy Policy</Link>
              </li>
            </ul> */}
            <ul className="f-social-icon">
              <li>
                <Link to="#">
                  <i className="fa-brands fa-facebook-f" />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fa-brands fa-google-plus-g" />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fa-brands fa-instagram" />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fa-brands fa-youtube" />
                </Link>
              </li>
            </ul>
          </div>
          <hr />
          <p className="copyright">© Copyright 2023. All Right Reserved</p>
        </div>
      </footer>

    </>
  )
}

export default Footer