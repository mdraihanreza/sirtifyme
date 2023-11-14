import React, { useEffect, useState } from 'react'
import othersService from '../../services/others.service';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { useContext } from 'react';
import { userContext } from '../../store';
import aboutussidebg from '../../assets/images/about-us-side-bg.png';
import { AuthContext } from '../../App';
function About() {
    const {user,dispatch} = useContext(userContext);
    const [Content, setContent] = useState("");

    const About = async () => {
        var responce = await othersService.about();
        console.log(responce.data)

        if (responce.data.success) {
            setContent(responce.data.data.content);
        }
    }

    useEffect(() => {
        About();
    }, [])

    return (

        <section className="about-us">
            <div className="container">
                <div className="about-brdr">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="about-us-left">
                                <img
                                    src={aboutussidebg}
                                    alt="aboutus"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="about-us-right">
                                <h2>About Us</h2>

                                {parse(Content)}
                                {!user.tokendata && (
                                <div className="about-right-btn-wrap">
                                    <Link to="/login" state={{provider_status:true}} className="log-in-provider">
                                        Login As A Provider
                                    </Link>
                                    <Link to="/login" state={{provider_status:false}} className="log-in-non-register">
                                        Login As A Non Provider
                                    </Link>
                                </div>
                                  )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



    )
}

export default About