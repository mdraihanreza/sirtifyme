import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import UserService from '../services/user.service';
import TokenHelper from './TokenHelper';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { userContext } from '../store';
import Loader from './Loder';
import profileimage from '../assets/images/profile.png';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';

function NotificationListPage() {
    const { user, dispatch } = useContext(userContext);
    const [Connectiondata, setConnectiondata] = useState([]);
    const data = []
    // const [records, setRecords] = useState([]);
    const [loader, setLoader] = useState(false);
    var getConnection = async () => {

        var token = localStorage.getItem("tokendata")

        // alert(token)

        if (token !== "") {
            var response = await UserService.getConnectionrequestlist(token)
            console.log("faqdata ", response.data)

            console.log(user)
            if (response.data.success) {
                setConnectiondata(response.data.data)
                console.log(response.data.data, 'responsedata')

            } else {
                setConnectiondata([])
            }
        }
        else {
            console.log("not get token")
        }
    }

    const columns = [

        {
            name: 'Name',
            selector: row => row.user_name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Image',
            // selector: 'image', // Replace 'image' with the actual field name in your data
            selector: row => <img src={row.profile_img} alt="Image" width={50} />,
        },
        {
            name: 'Status',
            selector: row => {
                if (row.connection_status === 1) {
                    return <p type="button" className="btn btn-accept" style={{color:"#09518C"}}>
                    Accepted
                </p>;
                } else {
                    return <p type="button" style={{color:"red"}} className="">
                    Rejected
                </p>;
                }
            },
            sortable: true,
        },
       


    ];
    useEffect(() => {
        getConnection();

    }, []);

    return (
        <>
            {/* =================== status-publish ================================ */}
            <section className="notification">
                <div className="container">
                    <div className="notification-table">
                    
                        <div className='provider_datatable'>
                        <DataTable
                            title="All Request List"
                            columns={columns}
                            data={Connectiondata}
                            pagination
                            fixedHeader
                            paginationTotalRows={data.length}
                            paginationPerPage={10}
                        />
                    </div>
                           
                        </div>
                        {loader && <Loader />}
                    </div>
            </section>


        </>
    )
}

export default NotificationListPage