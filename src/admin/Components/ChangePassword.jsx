// src/components/ChangePassword.js
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangePasswordSchama } from "./Schemas";
import { useContext } from 'react';

import { userContext } from '../../store';

import adminService from '../services/admin.service';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
const ChangePassword = () => {
    var navigate=useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: yupResolver(ChangePasswordSchama),
        mode: "all"
    });
    const onSubmit = async (data) => {
        var fdata = new FormData();
       
        fdata.append("old_password", data.old_password);
        fdata.append("new_password", data.new_password);
        fdata.append("conpassword", data.conpassword);

        console.log(data);
        var response = await adminService.Changepassword(fdata);
        console.log(response.data)
        
        if (response.data.success) {
            toast.success(response.data.message)
            navigate("/admin")

        }else{
                toast.error(response.data.message)
        }
    };

    return (

        <>

        <div className='testimonial_single_title'>
            <h2>Change Password</h2>
        </div>

<form className='testimonial_single_form' onSubmit={handleSubmit(onSubmit)}>
<div className="col-lg-8 col-md-8">
<div className="form-group">
    <input type="password" className="form-control" {...register("old_password")} placeholder='Password' />
    <p className='form-field-error'>{errors.old_password?.message}</p>
    </div>
</div>
<div className="col-lg-8 col-md-8">
<div className="form-group">
    <input type="password" className="form-control" {...register("new_password")} placeholder='Password' />
    <p className='form-field-error'>{errors.new_password?.message}</p>
</div>
</div>
<div className="col-lg-8 col-md-8">
<div className="form-group">
    <input type="password" className="form-control" {...register("conpassword")} placeholder='confirm Password' />
    <p className='form-field-error'>{errors.conpassword?.message}</p>
    </div>
</div>
<button type="submit" className='change_pwd'>Change Password</button>
</form>

</>
        
    );
};

export default ChangePassword;
