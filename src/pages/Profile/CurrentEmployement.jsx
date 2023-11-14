import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import UserService from '../../services/user.service';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import FileBase64 from 'react-file-base64';
import avtar from '../../assets/images/avatar.png';
import view from '../../assets/images/view.png';
import { userContext } from '../../store';
import Loader from '../Loder';
import TokenHelper from '../TokenHelper';
import { CurrentEmployeSchema } from '../Schemas';

import { useFieldArray, useForm } from "react-hook-form";
import iconpluscircle from '../../assets/images/icon-plus-circle.svg';


const employementInfo = {
    additiona_employement_id: "",
    job_name: "",
    c_job_name:"",
    c_job_from_year:"",
    employment_start_date: "",
    employment_end_date: "",
    save_status: false
    // save_status: true

};

function CurrentEmployement() {
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
        resolver: yupResolver(CurrentEmployeSchema),
       
    });
    // const { user } = useContext(AuthContext);
    const { user, dispatch } = useContext(userContext);
    const [EmployementData, setEmployementData] = useState([]);
    const [AdditionalData, setAdditionalData] = useState([]);
    const [loader, setLoader] = useState(false);
    
   
    var getEmployementData = async () => {

        var token = TokenHelper.getToken();


        //  alert(id)
        if (token !== null) {
            console.log("repeat");
            var response = await UserService.getEmployement(user.tokendata)
            console.log("employment ", response.data)

            if (response.data.success) {
                var responsedata = response.data.additional_data.map((i, index) => ({
                    additiona_employement_id: i.additiona_employement_id,
                    job_name: i.job_name,
                    employment_start_date: i.employment_start_date,
                    employment_end_date: i.employment_end_date,
                    save_status: true
                }))
                console.log(responsedata, 'responsedata')
                console.log(response.data.additional_data, 'response.data.additional_data')



                reset({
                    c_job_name: response.data.data.c_job_name,
                    c_job_from_year: response.data.data.c_job_from_year,
                    employementInfo:responsedata
                })

        }
            else {
                setLoader(false);
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
    console.log(employementInfo, 'employementInfo');


    // remove ===========


    const addMoreEmployement = () => {


        var status = true;

        for (var item of fields) {

            if (!item.save_status) {
                status = false;
                break;
            }


        }


        if (status) {
            append(employementInfo)
        } else {
            toast.warning("please save previous value")
        }


    }

    const SaveEmployementInfo = async (select_index) => {

        fields.map(async (item, index) => {
            if (index === select_index) {


                var validateStatus = await trigger([`employementInfo[${index}].job_name`, `employementInfo[${index}].employment_start_date`, `employementInfo[${index}].employment_end_date`])

                if (!validateStatus)
                    return;



                var fdata = new FormData();
                fdata.append("job_name", getValues(`employementInfo[${index}].job_name`));
                fdata.append("employment_start_date", getValues(`employementInfo[${index}].employment_start_date`));
                fdata.append("employment_end_date", getValues(`employementInfo[${index}].employment_end_date`));

                var response = await UserService.updateemployementAdditional(fdata)
                console.log(response.data, 'response')

                if (response.data.success) {

                    update(index, { save_status: true })
                    toast.success("data added")
                } else {
                    toast.error("Select All Fields")
                }
            }
            await getEmployementData()
        })




    }
    const removeaddmore = async (data) => {
        console.log(data.additiona_employement_id)
        if (data.additiona_employement_id) {
            var response = await UserService.getRemoveEmployement(data.additiona_employement_id)

            if (response.data.success) {

                toast.success("Removed")
            }

        }
    }
    const dataSubmit = async (data) => {
        setLoader(true);

        console.log(data)

        var fdata = new FormData();
        fdata.append("c_job_name", data.c_job_name);
        fdata.append("c_job_from_year", data.c_job_from_year);
       
        var response = await UserService.updateEmployement(fdata);


        console.log(response.data.message)
        if (response.data.error) {
            setLoader(false);
            toast.error(response.data.error.usererror)
        }
        if (response.data.success) {
            setLoader(false);
           
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
            setLoader(false);
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
                <div className="row">
                    <div className="col-md-12">
                    <h2 className="text-center">Employment History</h2>
                    </div>
                </div>
                <form method="post" onSubmit={handleSubmit(dataSubmit)}>
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
                        {fields.map((item, index) => (
                            <div className="row" key={index}>
                                  <label>Other Employement</label>
                                  <div className="col-md-2">
                                    {/* <div className="mb-3"> */}
                                    <label className="lable_style"> Job name</label>

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
                                        <label className="lable_style">From Date</label>
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

                                {console.log("getValues(`employementInfo[${index}]`)", getValues(`employementInfo[${index}]`))}
                                <div className="col-md-1">
                                    <div className="profile-tab-btn-wrap">
                                        {!item.save_status && <>
                                            <button
                                                className="border-0 remove-package "
                                                type="button"
                                                onClick={() => SaveEmployementInfo(index)}
                                            >
                                                Save
                                                <span>
                                                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                        </>}

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
                                    Add Employement
                                </button>
                                <button type="submit" className='submit_button' name="submit">Submit</button>
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