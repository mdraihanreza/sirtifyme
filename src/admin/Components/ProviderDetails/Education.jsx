import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import AdminService from '../../services/admin.service';

import { useContext } from 'react';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { userContext } from '../../../store';
import Loader from '../Loder';
import view from '../../assets/images/view.png';
import TokenHelper from '../TokenHelper';
// import { licenseSchema } from '../Schemas';
import { educationSchema } from '../Schemas';
import { licenseSchema } from '../Schemas'
import { useFieldArray, useForm } from "react-hook-form";
import iconpluscircle from '../../assets/images/icon-plus-circle.svg';

const educationInfo = {
    additional_education_id: "",
    edu_name: "",
    education_name: "",
    to_year: "",
    from_year: "",
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
        resolver: yupResolver(educationSchema),
    });

    // const { user } = useContext(AuthContext);
    const { user, dispatch } = useContext(userContext);
    const [EducationData, setEducationData] = useState([]);
    const [AdditionalData, setAdditionalData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [graduatetoggledata, setGraduateToggleData] = useState(true);
    const [medicaltoggledata, setMedicalToggleData] = useState(true);
    const handlegraduateToggleChange = () => {
        setGraduateToggleData(!graduatetoggledata); // Toggle the state
    };
    const handlemedicalToggleChange = () => {
        setMedicalToggleData(!medicaltoggledata); // Toggle the state
    };
    var user_id = location.state.user_id
    console.log(user_id,'user_id')
    var getEducation = async () => {

        var token = TokenHelper.getToken();



        //  alert(id)
        if (token !== null) {
            console.log("repeat");
            var response = await AdminService.getEducation(user_id)
            console.log("education ", response.data)

            if (response.data.success) {
                var responsedata = response.data.additional_data.map((i, index) => ({
                    additional_education_id: i.additional_education_id,
                    education_name: i.education_name,
                    edu_name: i.edu_name,
                    from_year: i.from_year,
                    to_year: i.to_year,
                    save_status: true
                }))
                console.log(responsedata, 'responsedata')



                reset({
                    ug_institute_name: response.data.data.ug_institute_name,
                    g_institute_name: response.data.data.g_institute_name,
                    med_institue_name: response.data.data.med_institue_name,
                    ug_from_year: response.data.data.ug_from_year,
                    ug_to_year: response.data.data.ug_to_year,
                    g_from_year: response.data.data.g_from_year,
                    g_to_year: response.data.data.g_to_year,
                    med_school_from_year: response.data.data.med_school_from_year,
                    med_school_to_year: response.data.data.med_school_to_year,
                    educationInfo: responsedata
                })
                if (response.data.data.g_status == "No") {
                    // alert('second')
                    setGraduateToggleData(false);
                }
                if (response.data.data.med_status == "No") {
                    setMedicalToggleData(false);
                }

            }
        }
        else {
            console.log("not get token")
        }
    }



    const { fields, update, append, remove } = useFieldArray({
        control,
        name: "educationInfo",
    });
    console.log(educationInfo, 'educationInfo');


    // remove ===========


    const addMoreEducation = () => {


        var status = true;

        for (var item of fields) {

            if (!item.save_status) {
                status = false;
                break;
            }


        }


        if (status) {
            append(educationInfo)
        } else {
            toast.warning("please save previous value")
        }


    }

    const SaveEducationInfo = async (select_index) => {

        fields.map(async (item, index) => {
            if (index === select_index) {


                var validateStatus = await trigger([`educationInfo[${index}].edu_name`, `educationInfo[${index}].from_year`, `educationInfo[${index}].to_year`, `educationInfo[${index}].education_name`])

                if (!validateStatus)
                    return;



                var fdata = new FormData();
                fdata.append("education_name", getValues(`educationInfo[${index}].education_name`));
                fdata.append("edu_name", getValues(`educationInfo[${index}].edu_name`));
                fdata.append("from_year", getValues(`educationInfo[${index}].from_year`));
                fdata.append("to_year", getValues(`educationInfo[${index}].to_year`));
                fdata.append("user_id", user_id);
                var response = await AdminService.updateAdditionalEducationDetails(fdata)
                console.log(response.data, 'response')

                if (response.data.success) {

                    update(index, { save_status: true })
                    toast.success("data added")
                } else {
                    toast.error("Select All Fields")
                }
            }
            await getEducation()
        })




    }
    const removeaddmore = async (data) => {
        console.log(data.additional_education_id)
        if (data.additional_education_id) {
            var response = await AdminService.getRemoveeducation(data.additional_education_id)

            if (response.data.success) {

                toast.success("Removed")
            }

        }
    }
    const dataSubmit = async (data) => {
        setLoader(true);

        console.log(data)

        var fdata = new FormData();
        fdata.append("ug_institute_name", data.ug_institute_name);
        fdata.append("g_institute_name", data.g_institute_name);
        fdata.append("med_institue_name", data.med_institue_name);
        fdata.append("ug_from_year", data.ug_from_year);
        fdata.append("ug_to_year", data.ug_to_year);
        fdata.append("g_from_year", data.g_from_year);
        fdata.append("g_to_year", data.g_to_year);
        fdata.append("user_id", user_id);
        fdata.append("med_school_from_year", data.med_school_from_year);
        fdata.append("med_school_to_year", data.med_school_to_year)
        fdata.append("g_status", graduatetoggledata)
        fdata.append("med_status", medicaltoggledata)
        var response = await AdminService.updateEducationDetails(fdata);


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
        await getEducation()


    }
    useEffect(() => {
        getEducation();

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
                <form method="post" onSubmit={handleSubmit(dataSubmit)}>
                    <div className="row">
                        <p>Undergraduate</p>
                        <div className="col-md-6">
                            {/* <div className="form-group"> */}
                            <label>Institute Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Institute Name"
                                {...register("ug_institute_name")}
                            />
                            <p className='form-field-error'>{errors.ug_institute_name?.message}</p>
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
                                        {...register("ug_from_year")}
                                    />
                                    <p className='form-field-error'>{errors.ug_from_year?.message}</p>
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
                                        placeholder="DD/MM/YYYY"
                                        {...register("ug_to_year")}
                                    />
                                    <p className='form-field-error'>{errors.ug_to_year?.message}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Graduate</p>
                            <label class="switch">
                                <input type="checkbox" checked={graduatetoggledata}
                                    onChange={handlegraduateToggleChange} />
                                <div class="slider round"></div>
                            </label>
                        </div>
                        {graduatetoggledata && <div className='row'>
                            <div className="col-md-6">
                                <label>Institute Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Institute Name"
                                    {...register("g_institute_name")}
                                />
                                <p className='form-field-error'>{errors.g_institute_name?.message}</p>
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
                                            {...register("g_from_year")}
                                        />
                                        <p className='form-field-error'>{errors.g_from_year?.message}</p>
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
                                            placeholder="DD/MM/YYYY"
                                            {...register("g_to_year")}
                                        />
                                        <p className='form-field-error'>{errors.g_to_year?.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                        <div>
                            <p>Medical School</p>
                            <label class="switch">
                                <input type="checkbox" checked={medicaltoggledata}
                                    onChange={handlemedicalToggleChange} />
                                <div class="slider round"></div>
                            </label>
                        </div>
                        {medicaltoggledata && <div className='row'>
                            <div className="col-md-6">
                                <label>Institute Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Institute Name"
                                    {...register("med_institue_name")}
                                />
                                <p className='form-field-error'>{errors.med_institue_name?.message}</p>
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
                                            {...register("med_school_from_year")}
                                        />
                                        <p className='form-field-error'>{errors.med_school_from_year?.message}</p>
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
                                            placeholder="DD/MM/YYYY"
                                            {...register("med_school_to_year")}
                                        />
                                        <p className='form-field-error'>{errors.med_school_to_year?.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {fields.map((item, index) => (
                            <div className="row" key={index}>
                                <label>Other Education</label>
                                <div className="col-md-2">
                                    {/* <div className="mb-3"> */}
                                    <label className="lable_style"> Education name</label>

                                    <input
                                        {...register(`educationInfo.${index}.education_name`)}
                                        type="text"
                                        className={!!errors.educationInfo?.[index]?.education_name ? 'is-invalid form-control' : 'form-control'}
                                    />
                                    {errors.educationInfo?.[index]?.education_name && (
                                        <div className="invalid-feedback">
                                            {errors.educationInfo[index].education_name.message}
                                        </div>
                                    )}
                                    {/* </div> */}
                                </div>
                                <div className="col-md-2">

                                    <label className="lable_style">institute name</label>

                                    <input
                                        {...register(`educationInfo.${index}.edu_name`)}
                                        type="text"
                                        className={!!errors.educationInfo?.[index]?.edu_name ? 'is-invalid form-control' : 'form-control'}
                                    />
                                    {errors.educationInfo?.[index]?.edu_name && (
                                        <div className="invalid-feedback">
                                            {errors.educationInfo[index].edu_name.message}
                                        </div>
                                    )}

                                </div>



                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="lable_style">From Date</label>
                                        <div className="input-date">
                                            <input
                                                {...register(`educationInfo.${index}.from_year`)}
                                                type="date"
                                                id="issue-date1"

                                                placeholder="DD/MM/YYYY"
                                                className={!!errors.educationInfo?.[index]?.from_year ? 'is-invalid' : 'form-control'}
                                            />
                                            {errors.educationInfo?.[index]?.from_year && (
                                                <div className="invalid-feedback">
                                                    {errors.educationInfo[index].from_year.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="lable_style">Expiry Date</label>
                                        <div className="input-date">
                                            <input
                                                {...register(`educationInfo.${index}.to_year`)}
                                                type="date"
                                                id="expiry-date1"
                                                placeholder="DD/MM/YYYY"
                                                className={!!errors.educationInfo?.[index]?.to_year ? 'is-invalid' : 'form-control'}
                                            />
                                            {errors.educationInfo?.[index]?.to_year && (
                                                <div className="invalid-feedback">
                                                    {errors.educationInfo[index].to_year.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {console.log("rray index", index)}

                                <div className="col-md-1">
                                    <div className="profile-tab-btn-wrap">
                                        {!item.save_status && <>
                                            <button
                                                className="border-0 remove-package "
                                                type="button"
                                                onClick={() => SaveEducationInfo(index)}
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
                                                removeaddmore(getValues(`educationInfo[${index}]`))
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
                                <button type="button" className="add-more" onClick={addMoreEducation}>
                                    <img src={iconpluscircle} />
                                    Add Educations
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

export default Education