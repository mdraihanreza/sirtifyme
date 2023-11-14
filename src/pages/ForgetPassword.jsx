import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import parse from 'html-react-parser';
import { Link, useLocation } from 'react-router-dom';
import TokenHelper from '../pages/TokenHelper';
import { useContext } from 'react';
import { AuthContext } from '../App';
import Loader from '../pages/Loder';
import { userContext } from '../store';
import UserService from "../services/user.service";
import { EmailCfSchama } from '../pages/Schemas';
import loginleftimage from '../assets/images/login-left-img.png';
import googeicon from '../assets/images/icon-google.svg'
import facebookicon from '../assets/images/icon-facebook.svg'
import { useNavigate } from "react-router-dom"
import GoogleLoginButton from './SocialLogin';

function ForgetPassword() {

    const { userState, dispatch } = useContext(userContext);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
  
    const dataSubmit = async (data) => {
        setLoader(true);
        var fdata = new FormData();
        fdata.append("email", data.email);
        var response = await UserService.emailconfirm(fdata);
       
        if (response.data.success) {
            setLoader(false);
            navigate("/otpmatch", { state: { email: data.email } });
            toast.success(response.data.message)

        } else {
            setLoader(false);
            toast.error(response.data.message)
        }

        console.log(response.data)

    }
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: yupResolver(EmailCfSchama),
        mode: "all"
    });
    return (

        <section className="registration-form">
            <div className="container">
                <div className="registration-form-inner">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="registration-form-img">
                                <img
                                    src={loginleftimage}
                                    alt=" "
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="registration-form-main">
                                 <h3>Email Confirmation</h3>
                                <form onSubmit={handleSubmit(dataSubmit)}>
                                    <div className="form-group">
                                        <label>Email ID</label>
                                        <input
                                            type="email"
                                            className="form-control"{...register("email")}
                                            placeholder="Enter Your Email-id"
                                        />
                                        <p style={{ color: 'red' }} className='form-field-error'>{errors.email?.message}</p>
                                    </div>
                                  
                                    <input
                                        type="submit"
                                        Value="Submit"
                                        className="search-btn"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {loader && <Loader />}
            </div>
        </section>



    )
}

export default ForgetPassword