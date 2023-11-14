import React, { useEffect, useState } from 'react'
import UserService from '../services/user.service';
import { userContext } from '../store';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import testimonialimage from '../assets/images/testimonial-img.png';


function MyConnection() {
    const {user,dispatch} = useContext(userContext);
    const [Connectiondata, setConnectiondata] = useState([]);
    var getConnection = async () => {
   
        var token=localStorage.getItem("tokendata")

        // alert(token)
     
        if (token !== "") {
        var response = await UserService.getNonProviderConnection(token)
        console.log("faqdata ", response.data)
            
        console.log(user)
        if (response.data.success) {
            setConnectiondata(response.data.data)
            console.log(response.data.data, 'responsedata')

        }else{
            setConnectiondata([])
        }
    }
    else {
        console.log("not get token")
    }
    }
    useEffect(() => {
        getConnection();

    }, []);


    return (
        <>
            {/* =================== status-publish ================================ */}
            <section className="my-connection">
                <div className="container">
                    <div className="my-connection-inner">
                        <h2>My Connection</h2>
                        <div className="row">
                        {Connectiondata.map((item, index) => {
                                        return (<>
                            <div className="col-lg-3 col-md-6 col-gap">
                                <div className="testimonial-grid">
                                    <div className="d-flex align-items-center profile-info-box">
                                        <img
                                            className="flex-shrink-0"
                                            src={item.profile_img}
                                            alt=""
                                        />
                                        <div className="testimonial-info">
                                            <h5>{item.user_name}</h5>
                                            <span>{item.designation}</span>
                                        </div>
                                    </div>
                                    <p>
                                    {item.email}
                                    </p>
                                    <p>
                                    {item.mobile_no}
                                    </p>
                                    <Link  className="view-details" to="/profileview" state={{ user_id: item.provider_id
 }} >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                            </>)
                                    })}
                                  
                                  {Connectiondata.length == 0 && <>
                                        <tr>
                                            <td colSpan={"6"} className="text-center" >No Connection  Found</td>
                                        </tr>
                                    </>}
                        </div>
                    </div>
                </div>
            </section>



        </>
    )
}

export default MyConnection