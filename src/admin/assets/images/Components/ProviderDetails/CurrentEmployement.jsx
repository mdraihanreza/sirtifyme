import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AdminService from '../../services/admin.service';
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
    job_name: "",
    job_type: "",
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
        // resolver: yupResolver(CurrentEmployeSchema),
        defaultValues: {
            employementInfo: [
                employementInfo,
            ],
        },
    });

    // const { user } = useContext(AuthContext);
    const { user, dispatch } = useContext(userContext);
    const [EmployementData, setEmployementData] = useState([]);
    const [formData, setFormData] = useState([]);
    const [loader, setLoader] = useState(false);





    var getEmployementData = async () => {

        var token = TokenHelper.getToken();


        //  alert(id)
        if (token !== null) {
            console.log("repeat");
            var response = await AdminService.getEmployement(user.tokendata)
            console.log("empoyeement ", response.data)

            if (response.data.success) {
                var responsedata = response.data.data.map((i, index) => ({
                    job_name: i.job_name,
                    job_type: i.job_type,
                    // save_status: true
                }))
                console.log(responsedata, 'responsedata')

                reset({
                    job_name: response.data.data.job_name,
                    job_type: response.data.data.job_type,
                    employementInfo: responsedata

                })



                setEmployementData(response.data.data)

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

        append(employementInfo)


        // if (status) {
        //     append(employementInfo)
        // } else {
        //     toast.warning("please save previous value")
        // }


    }

    // remove ===========
    const dataSubmit = async (data) => {
        setLoader(true);
        console.log(data);
        // return;



        // Convert form data to JSON string using JSON.stringify
        var newdata = data.employementInfo
        const jsonData = JSON.stringify(newdata);
        // alert(data.profile_image)
        // console.log("fdata  ", data.cv[0]);


        // var fdata = new FormData();
        // fdata.append("job_name", data.job_name);
        // fdata.append("job_type", data.job_type);







        console.log(newdata, 'newdata')
        var response = await AdminService.updateEmployement(jsonData);
        // alert(response,'response')

        console.log(response.data.message)
        if (response.data.error) {
            setLoader(false);
            toast.error(response.data.error.usererror)
        }
        if (response.data.success) {
            setLoader(false);
            toast.success(response.data.message)
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
                            <h2 className="text-center">Current Employment</h2>
                        </div>
                    </div>
                    <div className="row">
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



                                <div className="col-md-6">
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
                                </div>



                                {console.log("rray index", index)}

                                {index > 0 && <>
                                    <div className="col-md-1">
                                        <div className="profile-tab-btn-wrap">
                                            <button
                                                className="border-0 remove-package"
                                                type="button"
                                                onClick={() => remove(index)}
                                            >
                                                Remove
                                                <span>
                                                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                </>}
                            </div>
                        ))}
                        <div className="col-md-12">
                            <div className="submit-btn">
                                <button type="button" className="add-more" onClick={addMoreEmployement}>
                                    <img src={iconpluscircle} />
                                    Add More
                                </button>
                                <input type="submit" name="submit" defaultValue="Submit" />
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