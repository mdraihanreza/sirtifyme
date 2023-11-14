import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import UserService from '../services/user.service';
import { Link, useLocation } from 'react-router-dom';
import testimonalbanner from '../assets/images/testimonial-banner.jpg';
import client from '../assets/images/client.png'

function TestimonalDetails() {
    const location = useLocation();
    console.log(location.state.t_id)
    var testimonial_id = location.state.t_id
    const [Testimonialdata, setTestimonialdata] = useState([]);
    var getTestimonialDetails= async (testimonial_id)=>{
         
        if(testimonial_id)
  
  
        {
            console.log("repeat");
        var response=await UserService.getTestimonialDetails(testimonial_id)
        console.log(response.data)
        if(response.data.success)
        {
            setTestimonialdata(response.data.data)
          
            
        }}
        else{
            console.log("not get id")
        }
      }
console.log(Testimonialdata,'Testimonialdata')

    useEffect(() => {
        getTestimonialDetails(testimonial_id);

    }, []);


    return (
        <>


            {/* =================== Inner banner start ================================ */}
            <section className="inner-page" style={{ backgroundImage: `url(${testimonalbanner})` }}>
                <div className="container">
                    <div className="inner-content">
                    <h1>Testimonial Deatails</h1>
                    </div>
                </div>
            </section>
            {/* ===== Inner banner end ====== */}
            {/* ===== Client Testimonial Details start  ====== */}
            <section className="client-testimonial">
                <div className="container">
                    <div className="client-testimonial-details text-center">
                        <div className="row">
                            <div className="col-md-12">
                                <div className='client-testimonial-details-img'>
                                    <img src={Testimonialdata.image} alt="" />
                                </div>
                                <div className="testimonial-info">
                                    <h5>{Testimonialdata.name}</h5>
                                    <span>{Testimonialdata.designation}</span>
                                </div>
                                <p>
                                {Testimonialdata.testimonial}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* ===== Client Testimonial Details  end ====== */}
        </>
    )
}

export default TestimonalDetails