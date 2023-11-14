
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import AdminService from '../../services/admin.service';

import { useContext } from 'react';
import { userContext } from '../../../store';
import Loader from '../Loder';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { faqSchema } from '../Schemas';
import avtar from '../../assets/images/iconlogo.png';
import DataTable from 'react-data-table-component';
import TokenHelper from '../TokenHelper';
import deleteicon from '../../assets/images/delete.png';
import { useFieldArray, useForm } from "react-hook-form";




function ContactusPage() {

    const [loader, setLoader] = useState(false);
    const data = []
    const [records, setRecords] = useState([]);
    const columns = [

        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone No',
            selector: row => row.phone_no,
            sortable: true,
        },
        {
            name: 'Comment',
            selector: row => row.comment,
            sortable: true,
        },
        {
            name: 'Delete',
            cell: (row) => (
                <button style={{ border: 0 }} onClick={() => handleDelete(row.contact_id)}><img src={deleteicon} className='viewicon' /></button>
            ),
            // selector: row => <Link to="/admin/faqsingle" state={{
            //     faq_id: row.faq_id
            // }}> <img src={view} className='viewicon' /></Link>,

        },


    ];
    var getContactData = async () => {


        var token = TokenHelper.getToken();
        //  alert(id)
        if (token !== null) {

            console.log("repeat");
            var response = await AdminService.getContactdata(token)
            console.log(response.data)
            if (response.data.success) {

                if (response.data.data) {
                    setRecords(response.data.data)
                } else {
                    setRecords([])
                }



                console.log(response.data.data)
            }else{
                setRecords([])
            }
        }
        else {
            console.log("not get token")
            
        }
    }
    var handleDelete = async (contact_id) => {
        setLoader(true)
        if (contact_id) {
            var response = await AdminService.getDeleteContact(contact_id)

            if (response.data.success) {

                setLoader(false)

                toast.success("Removed")

            }

        }
        await getContactData();
    }

    useEffect(() => {
        getContactData();

    }, []);


    return (
        <>
            <div className=''>
                <DataTable
                    title="Contact List"
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

export default ContactusPage
