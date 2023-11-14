import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import faqlogo from '../assets/images/Faq.png';
import dashboardlogo from '../assets/images/Dashboard.png';
import dreamjoblogo from '../assets/images/dream job.png';
import legalquestionlogo from '../assets/images/legal Question.png';
import providerlistlogo from '../assets/images/Provider List.png';
import nonproviderlistlogo from '../assets/images/non provider list.png';
import testimoniallogo from '../assets/images/non provider list.png';
import privacypolicylogo from '../assets/images/Privacy policy.png';
import aboutuslogo from '../assets/images/about us.png';
import contactuslogo from '../assets/images/Contact Us.png';

function Sidebar() {



  var closeNav=() =>{
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  var Logout=()=>{
    localStorage.clear();


  }

  return (
    <>
       <div id="mySidebar" className="sidebar">
          <div className="logo-area d-flex align-items-center justify-content-between">
            <img src={logo} className="white-logo" alt="white logo" />
            <button className="closebtn border-0" onClick={closeNav}>&times;</button>
          </div>
          <div className='button-listing p-3'>
         
          <Link to={'/admin'}><button> <span className='rate-icon0'></span> Dashboard </button></Link>
            <NavLink to={'/admin/providerlist'}><button className='active-page'> <span className='rate-icon'></span> Provider List </button></NavLink>
            <NavLink to={'/admin/nonproviderlist'}><button className='active-page'> <span className='rate-icon1'></span> NonProvider List </button></NavLink>
            <NavLink to={'/admin/about'}> <button> <span className='about-icon'></span> AboutUs</button></NavLink>
            <NavLink to={'/admin/testimonial'}> <button> <span className='testimonial-icon'></span> Testimonial</button></NavLink>
            <NavLink to={'/admin/dreamjob'}> <button> <span className='dreamjob-icon'></span> Dream Job</button></NavLink>
            <NavLink to={'/admin/faq'}> <button> <span className='faq-icon'></span>FAQ</button></NavLink>
            <NavLink to={'/admin/contactus'}> <button> <span className='contactus-icon'></span>ContactUS</button></NavLink>
            <NavLink to={'/admin/addquestion'}> <button> <span className='legalquestion-icon'></span>LegalQuestion</button></NavLink>
            <NavLink to={'/admin/privacy'}> <button> <span className='privacy-icon'></span>PrivacyPolicy</button></NavLink>
          </div>
        </div>
    </>
  )
}

export default Sidebar
