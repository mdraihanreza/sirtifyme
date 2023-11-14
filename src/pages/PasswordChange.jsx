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
import { ChangePassword } from '../pages/Schemas';
import loginleftimage from '../assets/images/login-left-img.png';
import googeicon from '../assets/images/icon-google.svg'
import facebookicon from '../assets/images/icon-facebook.svg'
import { useNavigate } from "react-router-dom"
import GoogleLoginButton from './SocialLogin';;
const PasswordChange = () => {
    var navigate = useNavigate();
    const location = useLocation();
    const [loader, setLoader] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: yupResolver(ChangePassword),
        mode: "all"
    });
    const onSubmit = async (data) => {
        setLoader(true);
        var fdata = new FormData();
        fdata.append("email", location.state.email);
        fdata.append("new_password", data.new_password);
        fdata.append("conpassword", data.conpassword);

        console.log(data);
        var response = await UserService.Changepassword(fdata);
        console.log(response.data)

        if (response.data.success) {
            setLoader(false);
            toast.success(response.data.message)
            // navigate("/login")
            navigate("/login");

        } else {
            setLoader(false);
            toast.error(response.data.message)
        }
    };
    useEffect(() => {
        
        if(location.state==null || location.state.email==null){
        navigate("/otpmatch")
        }
            }, []);

    return (

        <>
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
                                    <h3>Change Password</h3>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                            <label>New Password</label>
                                            <input type="password" className="form-control" {...register("new_password")} />
                                            <p className='form-field-error'>{errors.new_password?.message}</p>
                                        </div>
                                        <div className="form-group">
                                            <label>Confirm Password</label>
                                            <input type="password" className="form-control" {...register("conpassword")} />
                                            <p className='form-field-error'>{errors.conpassword?.message}</p>
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
        </>

    );
};

export default PasswordChange;
