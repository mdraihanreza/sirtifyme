import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import UserService from '../services/user.service';
import testimonalbanner from '../assets/images/testimonial-banner.jpg';
import { Link, useLocation } from 'react-router-dom';
import testimonialimage from '../assets/images/testimonial-img.png'

function Testimonal() {

    const [Testimonialdata, setTestimonialdata] = useState([]);
    var getTestimonial = async () => {

        var response = await UserService.getTestimonial()
        console.log("faqdata ", response.data.data)

        if (response.data.success) {
            setTestimonialdata(response.data.data)
            console.log(response.data, 'responsedata')

        }
    }


    useEffect(() => {
        getTestimonial();

    }, []);

    return (
        <>


            {/* =================== Inner banner start ================================ */}
            <section className="inner-page" style={{ backgroundImage: `url(${testimonalbanner})` }}>
                <div className="container">
                    <div className="inner-content">
                        <h1>Testimonial</h1>

                    </div>
                </div>
            </section>
            {/* ===== Inner banner end ====== */}
            {/* ===== Contact section start ====== */}
            <section className="client-testimonial">
                <div className="container">
                    <div className="client-testimonial-inner">
                        <h2 className="text-center">What Our Clients Say About Us</h2>
                        <div className="row">
                            {Testimonialdata.map((item, index) => {
                                return (<>
                                    <div className="col-md-6 col-gap">
                                        <div className="testimonial-grid h-100">
                                            <div className="d-flex align-items-center">
                                                <div className='testimonial-profile-img'>
                                                    <img
                                                    className="flex-shrink-0"
                                                    src={item.image}
                                                    alt=""/>
                                                </div>
                                                
                                                <div className="testimonial-info">
                                                    <h5>{item.name}</h5>
                                                    <span>{item.designation}</span>
                                                </div>
                                            </div>
                                            <p>
                                                {item.testimonial}<Link to={'/testimonialDetails'} state={{ t_id: item.testimonial_id }} className='view-more-link'>View More</Link>
                                            </p>

                                        </div>
                                    </div>
                                </>)
                            })}
                        </div>
                    </div>
                </div>
            </section>


            {/* ===== Contact section end ====== */}
        </>
    )
}

export default Testimonal