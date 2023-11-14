import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import UserService from '../../services/user.service';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import FileBase64 from 'react-file-base64';
import avtar from '../../assets/images/avatar.png';
import view from '../../assets/images/view.png';
import { userContext } from '../../store';
import TokenHelper from '../TokenHelper';
import { CurrentEmployeSchema } from '../Schemas';

import { useFieldArray, useForm } from "react-hook-form";
import iconpluscircle from '../../assets/images/icon-plus-circle.svg';



function CurrentEmployement() {

    const location = useLocation();
    var user_id=location.state.user_id
    console.log(user_id,'p_id')
    const [EmployementData, setEmployementData] = useState([]);
    const [formData, setFormData] = useState([]);


    //    var token=user.tokendata
    var getEmployementData = async () => {


        //  alert(id)
        if (user_id !== '') {
            console.log("repeat");
            var response = await UserService.getProviderEmployement(user_id)
          
   
            if (response.data.success) {
              
                setEmployementData(response.data.data)
                console.log(response.data)
            }
        }
        else {
            console.log("not get token")
        }
    }
  

 console.log(EmployementData.length,'EmployementData.length')
 console.log(EmployementData,'EmployementData')

    useEffect(() => {
        getEmployementData();

    }, []);



    return (
        <>
            {/* =================== Profile Start================================ */}

            <div className="tab-pane common-table " id="current-employment" role="tabpanel">
                <form>
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center">Current Employment</h2>
                        </div>
                    </div>
                    <div className="row">
                    <table style={{ border: '1px solid #000' }}>
                            <thead>
                                <tr>
                                <th>Job name</th>
                                    <th>From Year</th>
                                    <th>To Year</th>
                                </tr>
                            </thead>
                            <tbody>
                            {EmployementData.map((item, index) => (
                        
                                <tr key={index}>
                               
                                    <td>{item.job_name}</td>
                                    <td>{item.employment_start_date}</td>
                                    <td> {item.employment_end_date}</td>
                                </tr>
                                    ))}
                                    {EmployementData.length==0 &&
                                    <tr>
                                        <td>Employement Not Available</td>
                                    </tr>}
                            </tbody>
                        </table>
                       
                       
                    </div>
                </form>
            </div>



        </>
    )
}

export default CurrentEmployement