
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
import { useNavigate } from "react-router-dom"
import TokenHelper from '../TokenHelper';
import deleteicon from '../../assets/images/delete.png';
import { useFieldArray, useForm } from "react-hook-form";
import RichTextEditor from 'react-rte';



function FaqPage() {


    var navigate=useNavigate();
    const { userState, dispatch } = useContext(userContext);
    const [loader, setLoader] = useState(false);
    const data = []
    const [records, setRecords] = useState([]);
    const columns = [

        {
            name: 'Question',
            selector: row => row.question,
            sortable: true,
        },
        {
            name: 'Answer',
            selector: row => row.answer,
            sortable: true,
        },
        {
            name: 'View',
            selector: row =>  <button style={{ border: 0 }}  onClick={() => handleEdit(row.faq_id)}> <img src={view} className='viewicon' /></button>,
           
        },
        {
            name: 'Delete',
            cell: (row) => (
                <button style={{ border: 0 }} onClick={() => handleDelete(row.faq_id)}><img src={deleteicon} className='viewicon' /></button>
            ),
            // selector: row => <Link to="/admin/faqsingle" state={{
            //     faq_id: row.faq_id
            // }}> <img src={view} className='viewicon' /></Link>,

        },


    ];
    var getFaqData = async () => {

        var token = TokenHelper.getToken();


        //  alert(id)
        if (token !== null) {
            console.log("repeat");
            var response = await AdminService.getFaq(token)

            if (response.data.success) {


                setRecords(response.data.data)


                console.log(response.data.data)
            }
        }
        else {
            console.log("not get token")
        }
    }
    var handleEdit = async (faq_id) => {
     
        setLoader(true)
        if (faq_id) {
            setLoader(false)
            dispatch({ type: "faq_id", value: faq_id });
            navigate("/admin/faqsingle")
        }
    }
    var handleDelete = async (faq_id) => {
        setLoader(true)
        if (faq_id) {
            var response = await AdminService.getDeleteFaq(faq_id)

            if (response.data.success) {

                setLoader(false)

                toast.success("Removed")

            }

        }
        await getFaqData();
    }
    //  getProfileData();
    useEffect(() => {
      getFaqData();

    }, []);
   

    return (
        <>
            <div className='testimonial_add_btn'>
               {/* <Link to={"/admin/faqsave"}> */}
               <button onClick={()=>navigate("/admin/faqsave")} >Add</button> 
               {/* </Link> */}
               
            </div>

            <div className='provider_datatable'>
                <DataTable
                    title="Faq List"
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

export default FaqPage
