
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import UserService from '../services/user.service';
import TokenHelper from './TokenHelper';
import moment from 'moment';

function Footer() {
  var navigate = useNavigate();
  const [SubcriptionAlert, setSubcriptionAlert] = useState("");
  var getSubscriptionData = async () => {
    var token = TokenHelper.getToken();
    if (token !== null) {
        console.log("repeat");
        var response = await UserService.getSubscriptionData(user.tokendata)


        if (response.data.success) {


            var subcrip_data = response.data.data;

            // subscription end date
            const subscription_end_date = subcrip_data[0].subscription_end_date;

            // Get the current date
            const currentDate = moment();

            // Convert the timestamp to a moment object
            const targetDate = moment(subscription_end_date);

            // Calculate the difference in days
            const remainingDays = targetDate.diff(currentDate, 'days');

            // alert(remainingDays);

            // ====== msg status ====
            // 1: subcription packahe not select
            // 2: subcription expire soon
            // 3: subcription end

            if (remainingDays <= 3 && remainingDays >= 0) {
                if (remainingDays != 0) {
                    setSubcriptionAlert("Subscription Package Expire within " + remainingDays + "days");
                } else {
                    setSubcriptionAlert("Subscription Package Expire Today");
                }
            } else if (remainingDays < 0) {
                setSubcriptionAlert("Subscription Package End");
            }

            console.log(response.data)
        } else {
            setSubcriptionAlert("Buy a Subscription Package");
        }
    }
    else {
        console.log("not get token")
    }
}
useEffect(() => {
  getSubscriptionData();

}, []);
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
                {/* <Link
                  to={{
                    pathname: '/payment-plan',
                    state: { subscription_pay: true }
                  }} className="pp" 
                >Payment</Link> */}
                {/* <Link to="/payment-plan" state={{subscription_pay:true}} >Payment</Link> */}
                {user.user_type == 4 || user.user_type == 5 || user.user_type == 6 ? (
                        <>
                            {SubcriptionAlert && <Link to="/payment-plan" state={{subscription_pay:true}} >Payment</Link>}
                        </>
                    ) : ''}
                  {/* <Link onClick={e => navigate('/payment-plan', { state: { subscription_pay: true } })} className="pp" >Payment</Link> */}
                  {/* <Link onClick={(e) => { console.log('Link clicked'); navigate('/payment-plan', { state: { subscription_pay: true } }); }} className="pp">Payment</Link> */}
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