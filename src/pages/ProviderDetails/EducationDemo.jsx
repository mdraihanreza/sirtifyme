import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import UserService from '../../services/user.service';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { userContext } from '../../store';
import view from '../../assets/images/view.png';
import TokenHelper from '../TokenHelper';
// import { licenseSchema } from '../Schemas';
import { educationSchema } from '../Schemas';
import { licenseSchema } from '../Schemas'
import { useFieldArray, useForm } from "react-hook-form";
import iconpluscircle from '../../assets/images/icon-plus-circle.svg';

const educationInfo = {
    ug_institute_name: "",
    g_institute_name: "",
    med_institue_name: "",
    ug_from_year: "",
    ug_to_year: "",
    g_from_year: "",
    g_to_year: "",
    med_school_from_year: "",
    med_school_to_year: "",
    save_status: false
};


function Education() {

 

    const location = useLocation();
    var user_id=location.state.user_id
    console.log(user_id,'p_id')
    const [EducationData, setEducationData] = useState([]);
    const [AdditionalData, setAdditionalData] = useState([]);
    const [filename, setFilename] = useState("Select Your Document");
    const [filedata, setFiledata] = useState("");


    //    var token=user.tokendata
    var getEducationData = async () => {


        //  alert(id)
        if (user_id !== '') {
            console.log("repeat");
            var response = await UserService.getProviderEducation(user_id)
          
   
            if (response.data.success) {
                var responsedata = response.data.additional_data.map((i, index) => ({
                    edu_name: i.edu_name,
                    from_year: i.from_year,
                    to_year: i.to_year,
                 
                  
                }))
             
          
                setEducationData(response.data.data)
                setAdditionalData(responsedata)
           
                console.log(response.data)
            }
        }
        else {
            console.log("not get token")
        }
    }
 

 
    useEffect(() => {
        getEducationData();

    }, []);
    















    return (
        <>
            {/* =================== Profile Start================================ */}



            <div className="tab-pane fade" id="education" role="tabpanel">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">Education</h2>
                    </div>
                </div>
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Undergraduate</label>
                               <label>{EducationData?EducationData.ug_institute_name:''}</label>
                              
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>From Year</label>
                                <div className="input-date">
                                    <input
                                     type="date"
                                        id="issue-date1"
                                        className="form-control"
                                        placeholder="DD/MM/YYYY" readOnly
                                        value={EducationData?EducationData.ug_from_year:''}
                                    />
                                   
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>To Year</label>
                                <div className="input-date">
                                    <input
                                       type="date"
                                        id="expiry-date1"
                                        className="form-control"
                                        placeholder="DD/MM/YYYY" readOnly
                                        value={EducationData?EducationData.ug_to_year:''}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label>Graduate</label>
                            {EducationData.g_status=="Yes" ?
                            <label>{EducationData?EducationData.g_institute_name:''}</label>
                            :"No Data Uploaded"}
                        </div>
                        {EducationData.g_status=="Yes" && <div className="col-md-3">
                            <div className="form-group">
                                <label>From Year</label>
                                <div className="input-date">
                                    <input
                                        type="date"
                                        id="issue-date1"
                                        className="form-control"
                                        placeholder="DD/MM/YYYY" readOnly
                                        value={EducationData?EducationData.g_from_year:''}
                                    />
                                   
                                </div>
                            </div>
                        </div>}
                        {EducationData.g_status=="Yes" && <div className="col-md-3">
                            <div className="form-group">
                                <label>To Year</label>
                                <div className="input-date">
                                    <input
                                       type="date"
                                        id="expiry-date1"
                                        className="form-control"
                                        placeholder="DD/MM/YYYY" readOnly
                                        value={EducationData?EducationData.g_to_year:''}
                                    />
                                </div>
                            </div>
                        </div>}
                        <div className="col-md-6">
                            <label>Medical School</label>
                            {EducationData.med_status=="Yes" ?
                            <label>{EducationData?EducationData.med_institue_name:''}</label> :"No Data Uploaded"}
                          
                        </div>
                        {EducationData.med_status=="Yes" && <div className="col-md-3">
                            <div className="form-group">
                                <label>From Year</label>
                                <div className="input-date">
                                    <input
                                        type="date"
                                        id="issue-date1"
                                        className="form-control"
                                        placeholder="DD/MM/YYYY" readOnly
                                        value={EducationData?EducationData.med_school_from_year:''}
                                    />
                                     
                                </div>
                            </div>
                        </div>}
                        {EducationData.med_status=="Yes" &&<div className="col-md-3">
                            <div className="form-group">
                                <label>To Year</label>
                                <div className="input-date">
                                    <input
                                       type="date"
                                        id="expiry-date1"
                                        className="form-control"
                                        placeholder="DD/MM/YYYY" readOnly
                                        value={EducationData?EducationData.med_school_to_year:''}
                                    />
                                    
                                </div>
                            </div>
                        </div>}
                        {AdditionalData.map((item, index) => (
                            <div className="row" key={index}>
                                <div className="col-md-2">
                                  
                                    <label className="lable_style">education name</label>

                                    <input
                                       value={item.edu_name}
                                        type="text" readOnly
                                       className='form-control'
                                    />
                                   
                                  
                                </div>

                               

                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="lable_style">From Date</label>
                                        <div className="input-date">
                                            <input
                                                 value={item.from_year}
                                                type="date"
                                                id="issue-date1" readOnly
                                                className='form-control'
                                                placeholder="DD/MM/YYYY"
                                               
                                            />
                                           
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="lable_style">Expiry Date</label>
                                        <div className="input-date">
                                            <input
                                                 value={item.to_year}
                                                type="date"
                                                id="expiry-date1" readOnly
                                                placeholder="DD/MM/YYYY"
                                                className='form-control'
                                            />
                                           
                                        </div>
                                    </div>
                                </div>

                               
                            </div>
                        ))}

                        
                    </div>
                </form>
            </div>



        </>
    )
}

export default Education