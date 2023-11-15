import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import UserService from '../../services/user.service';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import { userContext } from '../../store';
import Loader from '../Loder';
import { Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import FileBase64 from 'react-file-base64';
import deleteicon from '../../assets/images/delete.png';
// import { licenseSchema } from '../Schemas';
import { licenseDataSchema } from '../Schemas';
import { SubuserSchema } from '../Schemas'
import TokenHelper from '../TokenHelper';
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DataTable from 'react-data-table-component';
import iconpluscircle from '../../assets/images/icon-plus-circle.svg';




function TransactionDetails() {

    const { user, dispatch } = useContext(userContext);
    const [TransactionData, setTransactionData] = useState([]);

    var getTransactionData = async () => {
        var token = TokenHelper.getToken();
        if (token !== null) {
            console.log("repeat");
            var response = await UserService.getTransactionData(user.tokendata)
          
   
            if (response.data.success) {
                
                setTransactionData(response.data.data)
               
                console.log(response.data)
            }
        }
        else {
            console.log("not get token")
        }
    }





    useEffect(() => {
        getTransactionData();

    }, []);

    return (
        <>
            {/* =================== Profile Start================================ */}



            <div className="tab-pane fade common-table" id="transactiondetails" role="tabpanel">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">Transaction History</h2>
                    </div>
                </div>
                <table style={{ border: '1px solid #000' }}>
                        <thead>
                            <tr>
                                <th>Certificate Name</th>
                                <th>Certificate View</th>
                                <th>Issue Date</th>
                                <th>Expiry Date</th>
                            </tr>
                        </thead>
                        <tbody>

                            {/* <tr>
                                <td>BLS</td>
                                {CertificateData.bls_status=="Yes" ?<td>{CertificateData.bls_file ? <a href={Nldata} target='_blank'><img src={view}  className='viewicon' /></a> : <p>No File Uploaded</p>}</td>:"Certificate Not Available"}
                                {CertificateData.bls_status=="Yes" &&<td>{CertificateData?CertificateData.bls_issue_date:''}</td>}
                                {CertificateData.bls_status=="Yes" && <td>{CertificateData?CertificateData.bls_expiry_date:''}</td>}
                            </tr>
                            <tr>
                                <td>ACLS</td>
                                {CertificateData.acls_status=="Yes" ? <td> {CertificateData.acls_file ? <a href={Sldata} target='_blank'><img src={view}  className='viewicon' /></a> : <p>No File Uploaded</p>}</td>:"Certificate Not Available"}
                                {CertificateData.acls_status=="Yes" &&  <td>{CertificateData?CertificateData.acls_issue_date:''}</td>}
                                {CertificateData.acls_status=="Yes" && <td>{CertificateData?CertificateData.acls_expiry_date:''}</td>}
                            </tr>
                            <tr>
                                <td>PALS</td>
                                {CertificateData.pls_status=="Yes" ?<td>   {CertificateData.pls_file ? <a href={Cdsdata} target='_blank'><img src={view}  className='viewicon' /></a> : <p>No File Uploaded</p>}</td>:"Certificate Not Available"}
                                {CertificateData.pls_status=="Yes" && <td>{CertificateData?CertificateData.pls_issue_date:''}</td>}
                                {CertificateData.pls_status=="Yes" && <td>{CertificateData?CertificateData.pls_expiry_date:''}</td>}
                            </tr>
                           
                            {AdditionalData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.certificate_name}</td>
                                    <td> {item.certificate_file && <a href={item.certificate_file} target='_blank'><img src={view} className='viewicon' /></a>}</td>
                                    <td>{item.certificate_issue_date}</td>
                                    <td>{item.certificate_expiry_date}</td>
                                </tr>
                            ))} */}
                        </tbody>
                    </table>
            </div>


        </>
    )
}

export default TransactionDetails