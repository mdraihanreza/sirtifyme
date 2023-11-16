import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import UserService from '../../services/user.service';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import { userContext } from '../../store';
import Loader from '../Loder';
import { Button, Modal, Form } from 'react-bootstrap';
import moment from "moment";
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


console.log(TransactionData,'TransactionData')


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
                                <th>Transaction Amount</th>
                                <th>Transaction Status</th>
                                <th>Transaction Details</th>
                                <th>Transaction Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {TransactionData.map((item, index) => {
                                 return (
                                    <>
                                <tr key={index}>

                                    <td>{item.transaction_amount}</td>
                                    <td>{item.transaction_status==1?<p type="button" className="btn btn-accept" style={{color:"#09518C"}}>
                Active
            </p>:<p type="button" className="btn btn-accept" style={{color:"#09518C"}}>
                Inactive
            </p>}</td>
                                    <td>{item.transaction_details}</td>
                                    <td>{moment(item.transaction_date).format("DD/MM/yy")}</td>
                                </tr>
                                </>
                                 )
                            })}
                        </tbody>
                    </table>
            </div>


        </>
    )
}

export default TransactionDetails