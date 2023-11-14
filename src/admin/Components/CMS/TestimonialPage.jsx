
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import AdminService from '../../services/admin.service';

import { useContext } from 'react';
import { userContext } from '../../../store';
import Loader from '../Loder';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import FileBase64 from 'react-file-base64';
import view from '../../assets/images/pen.png';
import DataTable from 'react-data-table-component';
import { licenseDataSchema } from '../Schemas';
import { referencesSchema } from '../Schemas'
import TokenHelper from '../TokenHelper';
import { useNavigate } from "react-router-dom"
import deleteicon from '../../assets/images/delete.png';
import { useFieldArray, useForm } from "react-hook-form";
import RichTextEditor from 'react-rte';



function TestimonialPage() {


    var navigate=useNavigate();
    const [loader, setLoader] = useState(false);
    const data = []
    const [records, setRecords] = useState([]);
    const { userState, dispatch } = useContext(userContext);
    const columns = [

        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Designation',
            selector: row => row.designation,
            sortable: true,
        },

        {
            name: 'Image',
            // selector: 'image', // Replace 'image' with the actual field name in your data
            selector: row => <img src={row.image} alt="Image" width={50} />,
        },
        {
            name:'Testimonial',
            selector:row=> row.testimonial,
        },
        {
            name: 'View',
            selector: row => <button  onClick={() => handleEdit(row.testimonial_id)}> <img src={view} className='viewicon' /></button>,

        },
        {
            name: 'Delete',
            cell: (row) => (
                <button style={{ border: 0 }} onClick={() => handleDelete(row.testimonial_id)}><img src={deleteicon} className='viewicon' /></button>
            ),
            // selector: row => <Link to="/admin/faqsingle" state={{
            //     faq_id: row.faq_id
            // }}> <img src={view} className='viewicon' /></Link>,

        },


    ];
    var getTestimonialData = async () => {

        var token = TokenHelper.getToken();


        //  alert(id)
        if (token !== null) {
            console.log("repeat");
            var response = await AdminService.getTestimonial(token)

            if (response.data.success) {


                setRecords(response.data.data)


                console.log(response.data.data)
            }
        }
        else {
            console.log("not get token")
        }
    }
    var handleDelete = async (testimonial_id) => {
        setLoader(true)
        if (testimonial_id) {
            var response = await AdminService.getDeleteTestimonial(testimonial_id)

            if (response.data.success) {

                setLoader(false)

                toast.success("Removed")

            }

        }
        await getTestimonialData();
    }
    var handleEdit = async (testimonial_id) => {
     
        setLoader(true)
        if (testimonial_id) {
            setLoader(false)
            dispatch({ type: "testimonial_id", value: testimonial_id });
            navigate("/admin/testimonialsingle")
        }
    }
    //  getProfileData();
    useEffect(() => {
        getTestimonialData();

    }, []);
    const dataSubmit = async () => {



    }
    const { register, formState: { errors }, watch, reset } = useForm({

        mode: "all"
    });

    return (
        <>
            <div className='testimonial_add_btn'>
               <Link to={"/admin/testimonialsave"}><button style={{marginLeft:'90%'}}>Add</button></Link> 
            </div>

            <div className='provider_datatable testimonial_datatable'>
                <DataTable
                    title="Testimonial List"
                    columns={columns}
                    data={records}
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

export default TestimonialPage
