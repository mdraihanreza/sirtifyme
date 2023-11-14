import React, { useEffect, useState } from 'react'
// import OwlCarousel from 'react-owl-carousel';
import UserService from '../../services/user.service';
import OwlCarousel from 'react-owl-carousel';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
// import { OwlCarousel } from 'react-owl-carousel';
import { useNavigate } from "react-router-dom"

import Loader from '../Loder';
import About from './About';





function Index() {
    const [inputValue, setInputValue] = useState('');
    const [loader, setLoader] = useState(false);
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendClick = () => {
        if (inputValue) {
            console.log(inputValue, 'hhf')
            navigate(`/provider`, { state: { code: inputValue } })
        } else {
            toast.warning("this field required !!")
        }
        // Here you can simulate sending the value to an API or display it on the screen


    };
    const navigate = useNavigate();
    const [Dreamjobdata, setDreamjobdata] = useState([]);
    var getDreamjob = async () => {
        setLoader(true)
        var response = await UserService.getDreamjob()
        console.log("faqdata ", response.data.data)

        if (response.data.success) {
          
            setLoader(false)
            setDreamjobdata(response.data.data)
            console.log(response.data, 'responsedata')

        }
    }
  
console.log(Dreamjobdata,'Dreamjobdata')
    useEffect(() => {
      
        getDreamjob();

    }, []);
    return (
        <>
            {/* =================== Home search box start  ================================ */}
            <section className="home-search">

                <Container>
                    <h1>Search For Provider</h1>
                    <div className="search">
                        <input type="text" value={inputValue} onChange={handleInputChange} />
                        <button className="search-btn" onClick={handleSendClick}>Search</button>
                    </div>
                </Container>

            </section>

            {/* ===================About us start  ================================ */}
            <About />
            {/* ===================About us end  ================================ */}

            {/* ===================Drem job start  ================================ */}
            <section className="drem-job">
                <Container>
                    <h2>Find Your Dream Job Now</h2>
                    {/* <div className="owl-carousel owl-theme"> */}
                 {Dreamjobdata.length > 0 &&   <OwlCarousel
                        loop={true}
                        margin={10}
                        nav={true}
                        dots={false}
                        autoplay={true}
                        autoplayTimeout={3000}

                        responsive={{
                            0: {
                                items: 1.5
                            },
                            1000: {
                                items: 3.5
                            }
                        }}
                        className="owl-carousel owl-theme"
                    >
                        {Dreamjobdata.map((item, index) => {
                            return (<>
                                <div className="item">
                                    <div className="drem-j-details">
                                        <h6>{item.name}</h6>
                                        <p>{item.designation}</p>
                                        <ul>
                                            <li>
                                                <img
                                                    className="flex-shrink-0"
                                                    src={item.image}
                                                    alt="" />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </>)
                        })}
                        {/* <div className="item">
                            <div className="drem-j-details">
                                <h6>Find Your Dream Job Now</h6>
                                <p>1.4K+ Are Actively Hiring</p>
                                <ul>
                                    <li>
                                        <img src={companyone} alt="com-name" />
                                    </li>
                                    <li>
                                        <img src={companytwo} alt="com-name" />
                                    </li>
                                    <li>
                                        <img
                                            src={companythree}
                                            alt="com-name"
                                        />
                                    </li>
                                    <li>
                                        <img src={companyfour} alt="com-name" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="item">
                            <div className="drem-j-details">
                                <h6>Find Your Dream Job Now</h6>
                                <p>1.4K+ Are Actively Hiring</p>
                                <ul>
                                    <li>
                                        <img src={companyone} alt="com-name" />
                                    </li>
                                    <li>
                                        <img src={companytwo} alt="com-name" />
                                    </li>
                                    <li>
                                        <img
                                            src={companythree}
                                            alt="com-name"
                                        />
                                    </li>
                                    <li>
                                        <img src={companyfour} alt="com-name" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="item">
                            <div className="drem-j-details">
                                <h6>Find Your Dream Job Now</h6>
                                <p>1.4K+ Are Actively Hiring</p>
                                <ul>
                                    <li>
                                        <img src={companyone} alt="com-name" />
                                    </li>
                                    <li>
                                        <img src={companytwo} alt="com-name" />
                                    </li>
                                    <li>
                                        <img
                                            src={companythree}
                                            alt="com-name"
                                        />
                                    </li>
                                    <li>
                                        <img src={companyfour} alt="com-name" />
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </OwlCarousel>}
                    {/* </div> */}
                </Container>
            </section>

            {/* ===================Drem job  end  ================================ */}
            {/* ===================sponcer companies start  ================================ */}
            {/*  
            <section className="sponcer-companies">
                <Container>
                    <h2>Sponsored Companies</h2>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 mb-2 mb-lg-0">
                            <div className="com-details">
                                <img src={companyfive} alt="com-name" />
                                <h6>Servicenow</h6>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-2 mb-lg-0 ">
                            <div className="com-details">
                                <img src={companysix} alt="com-name" />
                                <h6>Servicenow</h6>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-2 mb-lg-0">
                            <div className="com-details">
                                <img src={companyseven} alt="com-name" />
                                <h6>Servicenow</h6>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-2 mb-lg-0">
                            <div className="com-details">
                                <img src={companyeight} alt="com-name" />
                                <h6>Servicenow</h6>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-0 mt-lg-4">
                        <div className="col-lg-3 col-md-6 mb-2 mb-lg-0">
                            <div className="com-details">
                                <img src={companyfive} alt="com-name" />
                                <h6>Servicenow</h6>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-2 mb-lg-0">
                            <div className="com-details">
                                <img src={companysix} alt="com-name" />
                                <h6>Servicenow</h6>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-2 mb-lg-0">
                            <div className="com-details">
                                <img src={companyseven} alt="com-name" />
                                <h6>Servicenow</h6>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-2 mb-lg-0">
                            <div className="com-details">
                                <img src={companyeight} alt="com-name" />
                                <h6>Servicenow</h6>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section> */}

            {/* ===================sponcer companies end ================================ */}

        </>
    )
}

export default Index