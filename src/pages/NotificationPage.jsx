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


function NotificationPage() {
    const { user, dispatch } = useContext(userContext);
    const [Connectiondata, setConnectiondata] = useState([]);
    const [loader, setLoader] = useState(false);
    var getConnection = async () => {

        var token = localStorage.getItem("tokendata")

        // alert(token)

        if (token !== "") {
            var response = await UserService.getConnection(token)
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

    const onSubmit = async (connection_id, connection_status, index) => {
        setLoader(true);
        var fdata = new FormData();
        fdata.append("connection_id", connection_id);
        fdata.append("connection_status", connection_status);

        var response = await UserService.acceptRequest(fdata);
        //   alert(data.report_id,'response')

        if (response.data.success) {
            setLoader(false);
            toast.success("accepted")

            var data = Connectiondata[index];
            data.connection_status = 1;

            console.log("data ", data);

            var newData = Connectiondata.filter((item, Inindex) => Inindex == index ? newData : item)

            console.log("newData ", newData);

            setConnectiondata(newData)

            setTimeout(getConnection, 300000)

            console.log(response.data, 'response.data')
        }
    }
    const dataSubmit = async (connection_id,connection_status, index) => {
        setLoader(true);
        var fdata = new FormData();
        fdata.append("connection_id", connection_id);
        fdata.append("connection_status", connection_status);
        var response = await UserService.cancelRequest(fdata);
        //   alert(data.report_id,'response')

        if (response.data.success) {
            setLoader(false);
            toast.success("Rejected sucessfully")

            var data = Connectiondata[index];

            console.log("data ", data);

            var newData = Connectiondata.filter((item, Inindex) => Inindex == index ? newData : item)

            console.log("newData ", newData);

            setConnectiondata(newData)

            setTimeout(getConnection, 300000)

            console.log(response.data, 'response.data')
        }
    }
    useEffect(() => {
        getConnection();

    }, []);

    return (
        <>
            {/* =================== status-publish ================================ */}
            <section className="notification">
                <div className="container">
                    <div className="notification-table">
                        <div className="table-responsive">
                            <table className="table ">
                                <tbody>
                                    {Connectiondata.length > 0 &&
                                        Connectiondata.map((item, index) => {

                                            return (<>
                                                <tr>
                                                    <td className='notification-left-row'>
                                                        <div className="d-flex flex-row justify-content-center align-items-center">
                                                            <img src={item.profile_img} alt="" />
                                                            <div className="d-flex flex-column">
                                                                <span className="d-block">{item.user_name}</span>
                                                                <small>{item.email}</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {item.connection_status == 0 ? <td className="notification-buttons">
                                                        <button type="button" onClick={() => onSubmit(item.connection_id, "1", index)} className="btn btn-accept">
                                                            Accept
                                                        </button>
                                                        <button type="button" onClick={() => dataSubmit(item.connection_id,"2", index)} className="btn btn-reject">
                                                            Reject
                                                        </button>
                                                    </td> : "Accepted successfully"}
                                                </tr>
                                            </>)
                                        })}
                                    {Connectiondata.length == 0 && <>
                                        <tr>
                                            <td colSpan={"6"} className="text-center" >No Connection Request Found</td>
                                        </tr>
                                    </>}
                                </tbody>
                            </table>
                        </div>
                        {loader && <Loader />}
                    </div>
                </div>
            </section>


        </>
    )
}

export default NotificationPage