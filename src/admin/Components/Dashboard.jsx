import React, { useEffect, useState } from 'react'
import logo from '../assets/images/logo.svg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { userContext } from '../../store';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchama } from "../schema";
import TokenHelper from './TokenHelper';
import { Container } from 'react-bootstrap';
import AdminService from '../services/admin.service';
import { toast } from 'react-toastify';
import { Link, useNavigate, useLocation } from 'react-router-dom';


function Dashboard() {
  

    // const { user } = useContext(AuthContext);
    const {user,dispatch} = useContext(userContext);
    console.log(user, 'userinfotoken')
    const [loader, setLoader] = useState(false);
    const [dashboadData, setDashboaddata] = useState([]);
    var getDashboardData = async () => {

        var token = TokenHelper.getToken();
   
       var user_id=user.id
        //  alert(id)
        if (token !== null) {
            console.log("repeat");
            var response = await AdminService.getDashboard(user_id)
          
            if (response.data.success) {
                console.log(response.data)
                setDashboaddata(response.data)
            }
        }
        else {
            console.log("not get token")
        }
    }
    //  getProfileData();
    useEffect(() => {
        getDashboardData();

    }, []);
     

    return (
        <>
            <section className="home-search">

                <Container>
     
                    <div className='row dashboard-card'>
                        <div className='col-md-3'>
                            <div className="counter-no">
                                <h2 className="count">{dashboadData.physican_assistant_count}</h2>
                                <h5>Physician Assistants</h5>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="counter-no">
                                <h2 className="count">{dashboadData.nurse_count}</h2>
                                <h5>Nurse Practitioners</h5>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="counter-no">
                                <h2 className="count">{dashboadData.physican_count}</h2>
                                <h5>Physicians</h5>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="counter-no">
                                <h2 className="count">{dashboadData.private_recruiter_count}</h2>
                                <h5>Private Recruiters</h5>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="counter-no">
                                <h2 className="count">{dashboadData.hospital_counts}</h2>
                                <h5>Hospital</h5>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="counter-no">
                                <h2 className="count">{dashboadData.third_party_count
}</h2>
                                <h5>Third Party Credentialing Companies</h5>
                            </div>
                        </div>
                        
                    </div>

                </Container>

            </section>
        </>
    )
}

export default Dashboard
