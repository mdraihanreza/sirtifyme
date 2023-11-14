import React, { useEffect, useState } from 'react'
import othersService from '../../services/others.service';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import aboutussidebg from '../../assets/images/about-us-side-bg.png';
import aboutinner from '../../assets/images/about-inner.png';
function Index() {

    const [Content, setContent] = useState("");
    const [Countdata, setcountdata] = useState("");
    const About = async () => {
        var responce = await othersService.about();
        console.log(responce.data)

        if (responce.data.success) {
            setContent(responce.data.data.content);
        }
    }
   
    const Aboutcount = async () => {
        var responce = await othersService.aboutcountuser();
        console.log(responce.data)

        if (responce.data.success) {
            setcountdata(responce.data.data);
        }
    }
    console.log(Countdata,'Countdata')
    useEffect(() => {
        About();
        Aboutcount();
    }, [])

    return (
        // ===========Inner banner start ============//

        <>

            {/* ====== Inner banner start ======== */}
            <section
                className="inner-page"
                style={{ backgroundImage: `url('${aboutinner}')` }}
            >
                <div className="container">
                    <div className="inner-content">
                        <h1>About Us</h1>
                    </div>
                </div>
            </section>
            {/* ===========Inner banner end ============*/}
            {/*=========About start ======*/}
            <section className="about-sec">
                <div className="container">
                    <div className="about-inner">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="about-left">
                                    <img src={aboutussidebg} alt="" />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="about-right">
                                    <h3>About Us</h3>
                                    {parse(Content)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*=========About end ======*/}
            {/*========= Counter Start ======*/}
            <section className="counter">
                <div className="container">
                    <div className="counter-inner">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="counter-no">
                                    <h2 className="count" data-count={150}>
                                        {Countdata.hospital_count}
                                    </h2>
                                    <h5>Hospital</h5>
                                   
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="counter-no">
                                    <h2 className="count" data-count={800}>
                                    {Countdata.Private_Recruiters_count}
                                    </h2>
                                    <h5>Private Recruiters</h5>
                                    
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="counter-no">
                                    <h2 className="count" data-count={1120}>
                                    {Countdata.Physicians_count}
                                    </h2>
                                    <h5>Physicians</h5>
                               
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*========= Counter End ======*/}
        </>

    )
}

export default Index