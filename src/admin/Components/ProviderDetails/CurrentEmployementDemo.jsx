import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import AdminService from '../../services/admin.service';

import { useContext } from 'react';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';

import avtar from '../../assets/images/avatar.png';
import view from '../../assets/images/view.png';
import { userContext } from '../../../store';
import Loader from '../Loder';
import TokenHelper from '../TokenHelper';
import { CurrentEmployeSchema } from '../Schemas';

import { useFieldArray, useForm } from "react-hook-form";
import iconpluscircle from '../../assets/images/icon-plus-circle.svg';



function CurrentEmployement() {
    const employementInfo = {
        job_name: "",
        employment_start_date: "",
        employment_end_date: "",
        user_id:0
        // save_status: true
    
    };

    const location = useLocation();




    const {
        register: register,
        handleSubmit: handleSubmit,
        formState: { errors: errors },
        reset: reset,
        setValue,
        trigger,
        getValues,
        control
    } = useForm({
        // resolver: yupResolver(CurrentEmployeSchema),
        // defaultValues: {
        //     employementInfo: [
        //         employementInfo,
        //     ],
        // },
    });

    // const { user } = useContext(AuthContext);
    const { user, dispatch } = useContext(userContext);
    const [EmployementData, setEmployementData] = useState([]);
    const [formData, setFormData] = useState([]);
    const [loader, setLoader] = useState(false);



    var user_id=location.state.user_id
console.log(user_id,'user_id')
    var getEmployementData = async () => {

        var token = TokenHelper.getToken();


        //  alert(id)
        if (token !== null) {
            console.log("repeat");
            var response = await AdminService.getEmployement(user_id)
            console.log("empoyeement ", response.data)

            if (response.data.success) {
                var responsedata = response.data.data.map((i, index) => ({
                    job_name: i.job_name,
                    c_job_name: i.c_job_name,
                    c_job_from_year: i.c_job_from_year,
                    employment_start_date: i.employment_start_date,
                    employment_end_date: i.employment_end_date,
                    user_id:i.user_id,
                    // save_status: true
                    
                }))
                console.log(responsedata, 'responsedata')
                var currentjobname = ''
                var currentjobfrom = ''
                if (responsedata[0].c_job_name && responsedata[0].c_job_name.trim() !== '') {
                    currentjobname = responsedata[0].c_job_name
                }
                if (responsedata[0].c_job_from_year && responsedata[0].c_job_from_year.trim() !== '') {
                    currentjobfrom = responsedata[0].c_job_from_year
                }
                console.log(response.data.data, 'employment_start_date')
                reset({
                    job_name: response.data.data.job_name,
                    employment_start_date: response.data.data.employment_start_date,
                    employment_end_date: response.data.data.employment_end_date,
                    c_job_name: currentjobname,
                    c_job_from_year: currentjobfrom,
                    employementInfo: responsedata

                })



                setEmployementData(response.data.data[0])

                console.log(response.data)
            }
        }
        else {
            console.log("not get token")
        }
    }


    const { fields, update, append, remove } = useFieldArray({
        control,
        name: "employementInfo",
    });
    const addMoreEmployement = () => {

        employementInfo.user_id=EmployementData.user_id;

        console.log(" employementInfo ",employementInfo);

        append(employementInfo)


        // if (status) {
        //     append(employementInfo)
        // } else {
        //     toast.warning("please save previous value")
        // }


    }
    const removeaddmore = async (data) => {
        console.log(data.employment_id)
        if (data.employment_id) {
            var response = await AdminService.getRemoveemployee(data.employment_id)

            if (response.data.success) {
                
                toast.success("Removed")
            }

        }
    }
    // remove ===========
    const dataSubmit = async (data) => {
        setLoader(true);
        console.log(data);
        // return;

console.log(data.employementInfo,'data.employementInfo')

        // Convert form data to JSON string using JSON.stringify
       
            console.log(data.employementInfo.length,'lengthdata')
        
        var newdata = data.employementInfo
        console.log(newdata, 'newdata')
        // const jsonData = JSON.stringify(newdata);
        // alert(data.profile_image)
        console.log("fdata  ", data.employementInfo.length);
        var arr=[]
        if(data.employementInfo.length>0){
        for (var i=0; i<data.employementInfo.length;i++) {
            let job_name = data.employementInfo[i].job_name;
            let employment_start_date = data.employementInfo[i].employment_start_date;
            let employment_end_date = data.employementInfo[i].employment_end_date;
            let userId = data.employementInfo[i].user_id;
            let c_job_from_year= data.c_job_from_year;
            let c_job_name= data.c_job_name;
            var temp={job_name,employment_start_date,employment_end_date,user_id:userId,c_job_from_year:c_job_from_year,c_job_name:c_job_name};
            temp.user_id = userId==0?user_id:userId;
            console.log(temp ,'temp')
            arr.push(temp);
        }
    }else{
        var temp={user_id:'',c_job_from_year:data.c_job_from_year,c_job_name:data.c_job_name};
      
        console.log(temp ,'temp')
        arr.push(temp); 
    }
            console.log(arr,'arr')
            // save_status: true
            
            const jsonData = JSON.stringify(arr)


        // var fdata = new FormData();
        // fdata.append("job_name", data.job_name);
        // fdata.append("job_type", data.job_type);







   
        var response = await AdminService.PostEmployee(arr);
        // alert(response,'response')

        console.log(response.data.message)
       
        if (response.data.success) {
            setLoader(false);
            toast.success(response.data.message)
        }else{
            setLoader(false);
            toast.error(response.data.message)
        }

        console.log(response.data)
        reset()


await getEmployementData()

    }

    useEffect(() => {
        getEmployementData();

    }, []);



    return (
        <>
            {/* =================== Profile Start================================ */}

            <div className="tab-pane" id="current-employment" role="tabpanel">
                <form action="" method="post" id="form-image" onSubmit={handleSubmit(dataSubmit)}>
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center">Employment History</h2>
                        </div>
                    </div>
                    <p>Current Employement</p>
                    <div className="row">
                    <div className="col-md-6">
                            {/* <div className="form-group"> */}
                            <label>Job name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Job Name"
                                {...register("c_job_name")}
                            />
                            <p className='form-field-error'>{errors.c_job_name?.message}</p>
                            {/* </div> */}
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>From Year</label>
                                <div className="input-date">
                                    <input
                                        type="date"
                                        id="issue-date1"
                                        className="form-control"
                                        placeholder="DD/MM/YYYY"
                                        {...register("c_job_from_year")}
                                    />
                                    <p className='form-field-error'>{errors.c_job_from_year?.message}</p>
                                </div>
                            </div>
                        </div>
                       
                        {/* <div className="col-md-6">
                            <div className="form-group">
                                <label>Job Name</label>

                                <input type="text" className="form-control" value={formData.job_name}
                                     placeholder="Job Title"  {...register("job_name")} />
                                <p className='form-field-error'>{errors.job_name?.message}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Job Type</label>
                                <div className="select-box">
                                    <select className="form-select" value={formData.job_type} {...register("job_type")}  >
                                        <option value=''>Select</option>
                                        <option value='full-time'>Full-Time</option>
                                        <option value='part-time'>Part-Time</option>
                                    </select>
                                </div>

                            </div>
                        </div> */}
                        {fields.map((item, index) => (
                            <div className="row" key={index}>
                                     <p>Previous Employement</p>
                                <div className="col-md-6">
                                    {/* <div className="mb-3"> */}
                                    <label className="lable_style">Job name</label>

                                    <input
                                        {...register(`employementInfo.${index}.job_name`)}
                                        type="text"
                                        className={!!errors.employementInfo?.[index]?.job_name ? 'is-invalid form-control' : 'form-control'}
                                    />
                                    {errors.employementInfo?.[index]?.job_name && (
                                        <div className="invalid-feedback">
                                            {errors.employementInfo[index].job_name.message}
                                        </div>
                                    )}
                                    {/* </div> */}
                                </div>

                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="lable_style">Start Date</label>
                                        <div className="input-date">
                                            <input
                                                {...register(`employementInfo.${index}.employment_start_date`)}
                                                type="date"
                                                id="issue-date1"

                                                placeholder="DD/MM/YYYY"
                                                className={!!errors.employementInfo?.[index]?.employment_start_date ? 'is-invalid' : 'form-control'}
                                            />
                                            {errors.employementInfo?.[index]?.employment_start_date && (
                                                <div className="invalid-feedback">
                                                    {errors.employementInfo[index].employment_start_date.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="lable_style">End Date</label>
                                        <div className="input-date">
                                            <input
                                                {...register(`employementInfo.${index}.employment_end_date`)}
                                                type="date"
                                                id="expiry-date1"
                                                placeholder="DD/MM/YYYY"
                                                className={!!errors.employementInfo?.[index]?.employment_end_date ? 'is-invalid' : 'form-control'}
                                            />
                                            {errors.employementInfo?.[index]?.employment_end_date && (
                                                <div className="invalid-feedback">
                                                    {errors.employementInfo[index].employment_end_date.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="lable_style">Job Type</label>
                                        <div className="select-box">
                                            <select value={formData.job_type}  {...register(`employementInfo.${index}.job_type`)} className={!!errors.employementInfo?.[index]?.job_type ? 'is-invalid' : 'form-control'} >
                                                <option value=''>Select</option>
                                                <option value='1'>Full-Time</option>
                                                <option value='2'>Part-Time</option>
                                                <option value='3'>PRN</option>
                                            </select>
                                            {errors.employementInfo?.[index]?.job_type && (
                                                <div className="invalid-feedback">
                                                    {errors.employementInfo[index].job_type.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div> */}



                                {console.log("rray index", index)}

                             
                                    <div className="col-md-1">
                                        <div className="profile-tab-btn-wrap">
                                            <button
                                                className="border-0 remove-package"
                                                type="button"
                                                onClick={() => {
                                                    removeaddmore(getValues(`employementInfo[${index}]`))
                                                    remove(index)
                                                }}
                                            >
                                                Remove
                                                <span>
                                                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                               
                            </div>
                        ))}
                        <div className="col-md-12">
                            <div className="submit-btn">
                                <button type="button" className="add-more" onClick={addMoreEmployement}>
                                    <img src={iconpluscircle} />
                                    Add Employment
                                </button>
                                <button type="submit" className='submit_button' name="submit">Update</button>
                            </div>
                        </div>
                    </div>
                </form>
                {loader && <Loader />}
            </div>




        </>
    )
}

export default CurrentEmployement