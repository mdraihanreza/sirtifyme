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
import { LoginSchama } from '../pages/Schemas';
import loginleftimage from '../assets/images/login-left-img.png';
import googeicon from '../assets/images/icon-google.svg'
import facebookicon from '../assets/images/icon-facebook.svg'
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from './SocialLogin';

function Login() {

    const { userState, dispatch } = useContext(userContext);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    let location = useLocation();
    location = location.state ? location : { state: { provider_status: true } }
    const dataSubmit = async (data) => {
        setLoader(true);
        var fdata = new FormData();
        fdata.append("user_type", data.user_type);
        fdata.append("email", data.email);
        fdata.append("password", data.password);
        var response = await UserService.login(fdata);
        // alert(response.data.message,' response')
        // if (response.data.success==false) {
        //     setLoader(false);
        //     toast.success(response.data.message)
        // }
        if (response.data.success) {
            setLoader(false);
            // alert('success')
            console.log(response.data.data.user_type,'response.data.data.user_type')
            console.log(response.data.data._id ,'otherdata')
            console.log(response.data.token,'token')
            TokenHelper.setToken(response.data.token)
            dispatch({ type: "tokendata", value: response.data.token });
            dispatch({ type: "id", value: response.data.data._id });
            dispatch({ type: "name", value: response.data.data.name });
            dispatch({ type: "email", value: response.data.data.email });
            dispatch({ type: "only_mobile_no", value: response.data.data.only_mobile_no });
            dispatch({ type: "user_type", value: response.data.data.user_type });
            dispatch({ type: "sub_user_type", value: response.data.data.sub_user_type });

            if(data.user_type=='1'|| data.user_type=='2' || data.user_type=='3'){
                navigate(`/profile`)
            }else{
                navigate(`/payment`)
            }
           
            
            toast.success(response.data.message)

        } else {
            setLoader(false);
            toast.error(response.data.message)
        }

        console.log(response.data)

    }
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: yupResolver(LoginSchama),
        mode: "all"
    });
    return (

        <section className="registration-form">
            <div className="container">
                <div className="registration-form-inner">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <div className="registration-form-img">
                                <img
                                    src={loginleftimage}
                                    alt=" "
                                />
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="registration-form-main">
                                {!location.state.provider_status ? <h3>Login As Non-Providers </h3> : <h3>Login As Provider</h3>}
                                <form onSubmit={handleSubmit(dataSubmit)}>
                                    <div className="form-group">
                                        <label>User Type</label>
                                        <select className="form-select" {...register("user_type")}>
                                            <option value={""}>Select User Type</option>
                                            {/* ====== non provider ======== */}
                                            {location.state.provider_status && <>
                                                <option value={1} >Physician Assistants</option>
                                                <option value={2} >Nurse Practitioners</option>
                                                <option value={3} >Physicians</option>
                                            </>}

                                            {/* ====== provider ======= */}
                                            {!location.state.provider_status && <>
                                                <option value={4} >Private Recruiters</option>
                                                <option value={5} >Hospital</option>
                                                <option value={6} >Third Party Credentialing Companies</option>
                                            </>}
                                        </select>
                                        <p style={{ color: 'red' }} className='form-field-error'>{errors.user_type?.message}</p>
                                    </div>
                                    <div className="form-group">
                                        <label>Email ID</label>
                                        <input
                                            type="email"
                                            className="form-control"{...register("email")}
                                            placeholder="User Name / User ID"
                                        />
                                        <p style={{ color: 'red' }} className='form-field-error'>{errors.email?.message}</p>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password" {...register("password")}
                                            className="form-control"
                                            placeholder="********"
                                        />
                                        <p style={{ color: 'red' }} className='form-field-error'>{errors.password?.message}</p>
                                    </div>
                                    <input
                                        type="submit"
                                        Value="Login"
                                        className="search-btn"
                                    />
                                     <Link to={"/forgetpassword"} className='forgot-password'>Forgot Password</Link>
                                       
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="optional-register">
                                <span className="or">Or</span>
                                <div className="options">
                                    <h4>Continue With</h4>
                                    <GoogleLoginButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {loader && <Loader />}
            </div>
        </section>



    )
}

export default Login