
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import AdminService from '../../services/admin.service';

import { useContext } from 'react';
import { userContext } from '../../../store';
import Loader from '../Loder';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import DataTable from 'react-data-table-component';
import view from '../../assets/images/view.png';
// import { licenseSchema } from '../Schemas';
import { licenseDataSchema } from '../Schemas';
import { LegalQuestionSchema } from '../Schemas'
import TokenHelper from '../TokenHelper';
import { useFieldArray, useForm } from "react-hook-form";
import deleteicon from '../../assets/images/delete.png';



function LegalQuestion() {

    const [text, setText] = useState("");
    const [Question, setQuestion] = useState([]);
    const [loader, setLoader] = useState(false);
    const data = []

    const columns = [

        {
            name: 'Questions',
            selector: row => row.question,
            sortable: true,
        },
        {
            name: 'Delete',
            cell: (row) => (
                <button style={{ border: 0 }} onClick={() => handleDelete(row.question_id)}><img src={deleteicon} className='viewicon' /></button>
            ),
            // selector: row => <Link to="/admin/faqsingle" state={{
            //     faq_id: row.faq_id
            // }}> <img src={view} className='viewicon' /></Link>,

        },


    ];

    var getQuestionData = async () => {

        var token = TokenHelper.getToken();


        //  alert(id)
        if (token !== null) {
            console.log("repeat");
            var response = await AdminService.getLegalQuestion(token)

            if (response.data.success) {
                // setText(response.data.data.content);
                setQuestion(response.data.data);
        
                console.log(response.data)
            }
        }
        else {
            console.log("not get token")
        }
    }
    var handleDelete = async (question_id) => {
        console.log(question_id,'question_id')
        setLoader(true)
        if (question_id) {
            var response = await AdminService.getDeleteLegalQuestion(question_id)
console.log(response.data)
            if (response.data.success) {

                setLoader(false)

                toast.success("Removed")

            }

        }
        await getQuestionData();
    }
    //  getProfileData();
    useEffect(() => {
        getQuestionData();

    }, []);
    const dataSubmit = async (data) => {
        setLoader(true);

        console.log(data)
        var fdata = new FormData();
        fdata.append("question", data.question);

        var response = await AdminService.PostLegalQuestion(fdata);
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
        await getQuestionData();



    }
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        resolver: yupResolver(LegalQuestionSchema),
        mode: "all"
    });
    return (
        <>
            <div className='about_title'>
                <h3>Legal Question</h3>
            </div>
            <form action="" className='testimonial_single_form' method="post" onSubmit={handleSubmit(dataSubmit)}>
            <input type="text" className="form-control" placeholder="" {...register("question")} />
            <p className='form-field-error'>{errors.question?.message}</p>
            <div className="col-md-12 text-center about_btn">
                <input type="submit" className="submit" value="Add Question" />
            </div>
            </form>
            <div className='provider_datatable'>
                <DataTable
                    // title="Question List"
                    columns={columns}
                    data={Question}
                    pagination
                    fixedHeader
                    paginationTotalRows={data.length}
                    paginationPerPage={10}
                />
            </div>
            {loader && <Loader />}
        </>

    );
}

export default LegalQuestion
