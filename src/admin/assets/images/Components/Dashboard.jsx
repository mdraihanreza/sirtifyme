
import React, { useState } from 'react'
import logo from '../assets/images/logo.svg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchama } from "../schema";
import { Container } from 'react-bootstrap';
import adminService from '../services/admin.service';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


function Dashboard() {
  
      
     

    return (
        <>
            <section className="home-search">

                <Container>
     
                    <div className='row dashboard-card'>
                        <div className='col-md-3'>
                            <div className="counter-no">
                                <h2 className="count">0</h2>
                                <h5>Physician Assistants</h5>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="counter-no">
                                <h2 className="count">1</h2>
                                <h5>Nurse Practitioners</h5>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="counter-no">
                                <h2 className="count">0</h2>
                                <h5>Physicians</h5>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="counter-no">
                                <h2 className="count">0</h2>
                                <h5>Private Recruiters</h5>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="counter-no">
                                <h2 className="count">1</h2>
                                <h5>Hospital</h5>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="counter-no">
                                <h2 className="count">0</h2>
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
