import React from 'react'
import logo from '../assets/images/logo.svg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {LoginSchama} from "../schema";

import adminService from '../services/admin.service';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
  const { register, handleSubmit,reset, formState:{ errors } } = useForm({
    resolver: yupResolver(LoginSchama),
  });

  var navigate=useNavigate();


  var submit=async(data)=>{
    console.log(data)

    const form = new FormData();
    form.append("email",data.email);
    form.append("password",data.password);

    var responce=await adminService.login(form);

    console.log(responce.data);
    
    if(responce.data.success)
    {
      reset();
      
        toast.success("login successfull")
        localStorage.setItem("admintoken",responce.data.token);
        navigate("/admin")
      
    }else{
      toast.error(responce.data.message)
    }

  }


  return (
    <>
        <div className='bg-all-page'>
          <div className='container'>
            <div className='common-area'>
              <div className='borderd-area width1070 align-items-center justify-content-center'>
                {/* <div className='left-image'> </div> */}
                <div className='login-form'>
                  <div className='under-form'>
                    <div className='form-logo'>
                      <img src={logo} className="white-logo" alt="white logo" />
                    </div>
                    <h4 className='login-heading'> Login </h4>
                    <div className='form-section'>
                      <Form onSubmit={handleSubmit(submit)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control  type="text" placeholder="User Name" 
                          {...register('email')}  isInvalid={!!errors.email}  />
                          <Form.Control.Feedback type="invalid">
                          {errors.email?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Control  type="password" placeholder="Password" {...register('password')}  isInvalid={!!errors.password} />
                          <Form.Control.Feedback type="invalid">
                          {errors.password?.message}
                          </Form.Control.Feedback>

                        </Form.Group>
                        {/* <Form.Text>
                            <p className="mb-4 mt-4 forgot-pw" onClick={ForgotPage}> Forgot Password? </p>
                        </Form.Text> */}
                        <div className='col-12'>
                          <Button className='all-button' variant="primary" type="submit"> Login </Button>
                        </div>
                      </Form>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default Login
