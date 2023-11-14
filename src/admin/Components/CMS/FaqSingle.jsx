
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import AdminService from '../../services/admin.service';

import { useContext } from 'react';
import { userContext } from '../../../store';
import Loader from '../Loder';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { faqSchema } from '../Schemas'
import TokenHelper from '../TokenHelper';
import { useFieldArray, useForm } from "react-hook-form";




function FaqSinglePage() {


    const [FaqData, setFaqData] = useState([]);
    const [loader, setLoader] = useState(false);
    const { user, dispatch } = useContext(userContext);
    console.log(user.faq_id,'user.faq_id')
    var faq_id=user.faq_id
    var getFaqData = async () => {

        var token = TokenHelper.getToken();


        //  alert(id)
        if (faq_id !== null) {
            console.log("repeat");
            console.log(faq_id,'faq_id')
            var response = await AdminService.getFaqByid(faq_id)

            if (response.data.success) {
console.log(response.data.data)
                reset({
                    question: response.data.data.question,
                    answer: response.data.data.answer,
                })
                console.log(response.data.data)
            }
        }
        else {
            console.log("not get token")
        }
    }
    //  getProfileData();
    
    useEffect(() => {
        getFaqData();

    }, []);
    const dataSubmit = async (data) => {

        setLoader(true);


        var fdata = new FormData();
        fdata.append("question", data.question);
        fdata.append("answer", data.answer);
        fdata.append("faq_id", faq_id)
       


        var response = await AdminService.updateFaqDetails(fdata);
        // alert(response,'response')

        console.log(response.data.message)
        if (response.data.error) {
            setLoader(false);
            toast.error(response.data.error.usererror)
        }
        if (response.data.success) {
            setLoader(false);
            toast.success(response.data.message)
        }

        console.log(response.data)
        reset()
        await getFaqData();

    }
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        resolver: yupResolver(faqSchema),
        mode: "all"
    });

    return (
        <>
            <div className='testimonial_single_title'>
                <h3>Faq</h3>
            </div>
            <form action="" className='testimonial_single_form' method="post" onSubmit={handleSubmit(dataSubmit)}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="form-group">
                            <label>Question</label>
                            <input type="text" className="form-control" placeholder="" {...register("question")} />
                            <p className='form-field-error'>{errors.question?.message}</p>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="form-group">
                            <label>Answer</label>
                            <input type="text" className="form-control" placeholder="" {...register("answer")} />
                            <p className='form-field-error'>{errors.answer?.message}</p>
                        </div>
                    </div>
                 
              
                    <div className="col-md-12 about_btn">
                        <input type="submit" className='submit' name="submit" value="Save" />
                    </div>
                </div>
            </form>

            {loader && <Loader />}
        </>

    );
}

export default FaqSinglePage
