import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import contactbanner from '../assets/images/contact-bg.jpg';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContactSchema } from './Schemas'
import Loader from './Loder';
import UserService from '../services/user.service';
import { useFieldArray, useForm } from "react-hook-form";

function Contact() {
    const [loader, setLoader] = useState(false);
    const dataSubmit = async (data) => {
        setLoader(true);
        // alert(data.profile_image)
        // console.log("fdata  ", data.cv[0]);
        console.log(data)
        var fdata = new FormData();
        fdata.append("name", data.name);
        fdata.append("email", data.email);
        fdata.append("phone_no", data.phone_no);
        fdata.append("comment", data.comment);

        var response = await UserService.postContact(fdata);
        // alert(response,'response')

        console.log(response.data.message)
        if (response.data.error) {
            setLoader(false);
            toast.error(response.data.message)
        }
        if (response.data.success) {
            setLoader(false);
            toast.success(response.data.message)
        }

        console.log(response.data)
        reset()
       


        
    }
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        resolver: yupResolver(ContactSchema),
        mode: "all"
    });

    return (
        <>


            {/* =================== Inner banner start ================================ */}
        <section className="inner-page" style={{ backgroundImage: `url(${contactbanner})` }}>
                
            </section>
            {/* ===== Inner banner end ====== */}
            {/* ===== Contact section start ====== */}
            <section className="contact">
                <div className="container">
                    <div className="contact-inner">
                        <h2>Contact Us</h2>
                        <form action="" method="post"  onSubmit={handleSubmit(dataSubmit)}>
                            <div className="row">
                                <div className="col-lg-4 col-gap">
                                    <label>Your Name</label>
                                    <input type="text" className="form-control" {...register("name")} />
                                    <p style={{ color: 'red' }} className='form-field-error'>{errors.name?.message}</p>
                                </div>
                                <div className="col-lg-4 col-gap">
                                    <label>Email Id</label>
                                    <input type="email" className="form-control" {...register("email")} />
                                    <p style={{ color: 'red' }} className='form-field-error'>{errors.email?.message}</p>
                                </div>
                                <div className="col-lg-4 col-gap">
                                    <label>Phone Number</label>
                                    <input type="number" className="form-control" {...register("phone_no")} />
                                    <p style={{ color: 'red' }} className='form-field-error'>{errors.phone_no?.message}</p>
                                </div>
                                <div className="col-lg-12 col-gap">
                                    <label>Your Comment</label>
                                    <textarea className="form-control" {...register("comment")}></textarea>
                                    <p style={{ color: 'red' }} className='form-field-error'>{errors.comment?.message}</p>
                                </div>
                                <div className="col-lg-12">
                                    <button type="submit" className="btn btn-submit">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {loader && <Loader />}
                </div>
            </section>
            {/* ===== Contact section end ====== */}
        </>
    )
}

export default Contact