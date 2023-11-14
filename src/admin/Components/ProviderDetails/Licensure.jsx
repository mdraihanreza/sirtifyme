import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import AdminService from '../../services/admin.service';

import { useContext } from 'react';
import { userContext } from '../../../store';
import Loader from '../Loder';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import FileBase64 from 'react-file-base64';
import view from '../../assets/images/view.png';
import TokenHelper from '../TokenHelper';
// import { licenseSchema } from '../Schemas';
import { licenseDataSchema } from '../Schemas';
import { licenseSchema } from '../Schemas'
import { useFieldArray, useForm } from "react-hook-form";
import iconpluscircle from '../../assets/images/icon-plus-circle.svg';

const licenseInfo = {
    additiona_license_id: "",
    license_name: "",
    license_issue_date: "",
    license_expiry_date: "",
    additional_license: "",
    save_status: false

};

function Licensure() {


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
        resolver: yupResolver(licenseDataSchema),
    });
    // const {
    //     register,
    //     control,
    //     getValues,
    //     setValue,
    //     handleSubmit,
    //     formState: { errors },
    //     reset,
    // } = useForm({
    //     resolver: yupResolver(licenseSchema),
    //     defaultValues: {
    //         licenseInfo: [],
    //     },
    //     mode: "all",
    // });
    // const { user } = useContext(AuthContext);
    const { user, dispatch } = useContext(userContext);
    const [modalStateShow, setModalStateShow] = useState(false);
    const [LicenseData, setLicenseData] = useState([]);
    const [AdditionalData, setAdditionalData] = useState([]);
    const [loader, setLoader] = useState(false);
    // const [LicensefileData, setLicensefileData] = useState("");
    const [Nlname, setNlname] = useState("Select Your Document");
    const [Slname, setSlname] = useState("Select Your Document");
    const [Cdsname, setCdsname] = useState("Select Your Document");
    const [Deaname, setDeaname] = useState("Select Your Document");

    const [Nldata, setNldata] = useState("");
    const [Sldata, setSldata] = useState("");
    const [Cdsdata, setCdsdata] = useState("");
    const [Deadata, setDeadata] = useState("");
    const [NlToggledata, setNlToggledata] = useState(true);
    const [SlToggledata, setSlToggledata] = useState(true);
    const [CdsToggledata, setCdsToggledata] = useState(true);
    const [DeaToggledata, setDeaToggledata] = useState(true);
    const handleNlToggledata = () => {
        setNlToggledata(!NlToggledata); // Toggle the state
    };
    const handleSlToggledata = () => {
        setSlToggledata(!SlToggledata); // Toggle the state
    };
    const handleCdsToggledata = () => {
        setCdsToggledata(!CdsToggledata); // Toggle the state
    };
    const handleDeaToggledata = () => {
        setDeaToggledata(!DeaToggledata); // Toggle the state
    };
    var user_id = location.state.user_id
    var getLicenseData = async () => {



        var token = TokenHelper.getToken();



        //  alert(id)
        if (token !== null) {

            console.log("repeat");
            var response = await AdminService.getLicense(user_id)
            console.log("license ", response.data)
            // alert(response.data.additional_data.length)
            //  alert(response.data)
            if (response.data.success) {
                var responsedata = response.data.additional_data.map((i, index) => ({
                    additiona_license_id: i.additiona_license_id,
                    license_name: i.license_name,
                    additional_license_name: i.license_file,
                    license_issue_date: i.license_issue_date,
                    license_expiry_date: i.license_expiry_date,
                    save_status: true
                }))
                console.log(responsedata, 'responsedata')

                // alert(response.data.additional_data.length)

                // var temp_licenseInfo = response.data.additional_data.map((i, index) => ({
                //     license_name: i.license_name,
                //     license_date_issue: i.license_issue_date,
                //     license_date_expiry: i.license_expiry_date,
                //     // additional_license: i.license_name
                // }))

                reset({
                    national_license_issue_date: response.data.data.national_license_issue_date,
                    national_license_expiry_date: response.data.data.national_license_expiry_date,

                    state_license_issue_date: response.data.data.state_license_issue_date,
                    state_license_expiry_date: response.data.data.state_license_expiry_date,

                    cds_license_issue_date: response.data.data.cds_license_issue_date,
                    cds_license_expiry_date: response.data.data.cds_license_expiry_date,

                    dea_license_issue_date: response.data.data.dea_license_issue_date,
                    dea_license_expiry_date: response.data.data.dea_license_expiry_date,

                    // cv: response.data.data.cv,
                    licenseInfo: responsedata
                })
                // setFilename(response.data.data.cv)
                setNldata(response.data.data.national_license_file)
                setSldata(response.data.data.state_license_file)
                setCdsdata(response.data.data.cds_license_file)
                setDeadata(response.data.data.dea_license_file)
                setLicenseData(response.data.data)
                setAdditionalData(responsedata)
                // console.log(AdditionalData,'AdditionalData')
                // console.log(response.data)
                if (response.data.data.national_license_status == "No") {
                    setNlToggledata(false);
                }
                if (response.data.data.state_license_status == "No") {
                    setSlToggledata(false)
                }
                if (response.data.data.cds_license_status == "No") {
                    setCdsToggledata(false)
                }
                if (response.data.data.dea_license_status == "No") {
                    setDeaToggledata(false)
                }
            }
            else {
                setLoader(false);
            }
        }
        else {
            console.log("not get token")
        }
    }

    console.log(Nlname, 'Nlname')
    console.log(Slname, 'Slname')
    console.log(Cdsname, 'Cdsname')
    console.log(Deaname, 'Deaname')
    //    var token=user.tokendata

    //  getProfileData();
    const { fields, update, append, remove } = useFieldArray({
        control,
        name: "licenseInfo",
    });
    console.log(licenseInfo, 'licenseInfo');


    // remove ===========
    const FileToBase64String = async (file, cb) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Extract base64 data
                // Send the base64String to the server using fetch or other methods
                cb(base64String)
            };
            reader.readAsDataURL(file);
        }
    }

    const addMoreLicense = () => {


        var status = true;

        for (var item of fields) {

            if (!item.save_status) {
                status = false;
                break;
            }

            // if (item.save_status) {
            //     toast.warning("please save previous value")
            //     return;
            // } else {
            //     append(licenseInfo)
            // }
        }

        // if (fields.length === 0) {
        //     append(licenseInfo)
        // }

        if (status) {
            append(licenseInfo)
        } else {
            toast.warning("please save previous value")
        }


    }

    const SaveLicenseInfo = async (select_index) => {

        fields.map(async (item, index) => {
            if (index === select_index) {


                var validateStatus = await trigger([`licenseInfo[${index}].license_name`, `licenseInfo[${index}].license_issue_date`, `licenseInfo[${index}].license_expiry_date`, `licenseInfo[${index}].license_file`])

                if (!validateStatus)
                    return;



                // console.log(item, 'item')


                // setValue(`licenseInfo.${index}.save_status`,true)
                // console.log(item);
                // const dataSubmit = async (data) => {
                var fdata = new FormData();
                fdata.append("license_name", getValues(`licenseInfo[${index}].license_name`));
                fdata.append("license_issue_date", getValues(`licenseInfo[${index}].license_issue_date`));
                fdata.append("license_expiry_date", getValues(`licenseInfo[${index}].license_expiry_date`));
                fdata.append("user_id", user_id);
                var licensefiledata = getValues(`licenseInfo[${index}].license_file`)
                fdata.append("license_file", licensefiledata[0]);
                var response = await AdminService.updateAdditionallicense(fdata)
                console.log(response.data, 'response')

                if (response.data.success) {
                    // fields[index].save_status = true;
                    update(index, { save_status: true })
                    toast.success("file upload")

                } else {
                    toast.error("Select All Fields")
                }
            }
            await getLicenseData();
        })



    }
    const removeaddmore = async (data) => {

        if (data.additiona_license_id) {
           
            var response = await AdminService.getRemovelicence(data.additiona_license_id)
console.log(response.data,'response.data')
            if (response.data.success) {

                toast.success("Removed")
            }

        }
    }
    const dataSubmit = async (data) => {
        setLoader(true);
        // alert(data.profile_image)
        // console.log("fdata  ", data.cv[0]);
        console.log(data)
        console.log(user)
        var fdata = new FormData();
        fdata.append("national_license_issue_date", data.national_license_issue_date);
        fdata.append("national_license_expiry_date", data.national_license_expiry_date);
        if (data.national_license_file && data.national_license_file[0]) {
            fdata.append("national_license_file", data.national_license_file[0]);
        } else {
            fdata.append("national_license_file", Nldata);
        }
        fdata.append("national_license_status", NlToggledata);
        fdata.append("state_license_issue_date", data.state_license_issue_date);
        fdata.append("state_license_expiry_date", data.state_license_expiry_date);
        if (data.state_license_file && data.state_license_file[0]) {
            fdata.append("state_license_file", data.state_license_file[0]);
        } else {
            fdata.append("state_license_file", Sldata);
        }
        fdata.append("state_license_status", SlToggledata);
        fdata.append("cds_license_issue_date", data.cds_license_issue_date);
        fdata.append("cds_license_expiry_date", data.cds_license_expiry_date);
        if (data.cds_license_file && data.cds_license_file[0]) {
            fdata.append("cds_license_file", data.cds_license_file[0]);
        } else {
            fdata.append("cds_license_file", Cdsdata);
        }
        fdata.append("cds_license_status", CdsToggledata);
        fdata.append("dea_license_issue_date", data.dea_license_issue_date);
        fdata.append("dea_license_expiry_date", data.dea_license_expiry_date);
        if (data.dea_license_file && data.dea_license_file[0]) {
            fdata.append("dea_license_file", data.dea_license_file[0]);
        } else {
            fdata.append("dea_license_file", Deadata);
        }
        fdata.append("dea_license_status", DeaToggledata);
        fdata.append("user_id", user_id);
        // console.log(data.licenseInfo.length, 'data.licenseInfo')

        var temp_licenseInfo = data.licenseInfo;



        var response = await AdminService.updatelicense(fdata);
        // alert(response,'response')

        console.log(response.data)
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


        reset()
        await getLicenseData();

    }

    useEffect(() => {
        getLicenseData();

    }, []);

    return (
        <>
            {/* =================== Profile Start================================ */}



            <div className="tab-pane fade" id="pills-profile" role="tabpanel">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">Licensure</h2>
                    </div>
                </div>
                <form method="post" onSubmit={handleSubmit(dataSubmit)}>
                    <div className="row">
                        <div>
                        <label>National License</label>
                            <label class="switch">
                                <input type="checkbox" id="togBtn" checked={NlToggledata}
                                    onChange={handleNlToggledata} />
                                <div class="slider round"></div>
                            </label>
                        </div>
                        {NlToggledata && <div className='row'>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label style={{"opacity":0}}>National License</label>
                                    <div
                                        className="form-group custom-file-button license"
                                        data-text="Select your file!"
                                    >
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept=".pdf, .doc, .docx"
                                            id="file-upload-field"{...register("national_license_file")} onChange={e => setNlname((e.target.files && e.target.files[0].name))}
                                        />
                                        {/* <p className='form-field-error'>{errors.national_license_file?.message}</p> */}
                                        {LicenseData.national_license_file && <a href={Nldata} target='_blank'><img src={view} className='viewicon' /></a>}

                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Issue Date</label>
                                    <div className="input-date">
                                        <input
                                            type="date"
                                            id="issue-date1"
                                            className="form-control"
                                            placeholder="DD/MM/YYYY" {...register("national_license_issue_date")}
                                        />
                                        <p className='form-field-error'>{errors.national_license_issue_date?.message}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <div className="input-date">
                                        <input
                                            type="date"
                                            id="expiry-date1"
                                            className="form-control"
                                            placeholder="DD/MM/YYYY"
                                            {...register("national_license_expiry_date")}
                                        />
                                        <p className='form-field-error'>{errors.national_license_expiry_date?.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div>
                        <label>State License</label>
                            <label class="switch">
                                <input type="checkbox" id="togBtn" checked={SlToggledata}
                                    onChange={handleSlToggledata} />
                                <div class="slider round"></div>
                            </label>
                        </div>
                        {SlToggledata && <div className='row'>
                            <div className="col-md-6">
                            <label style={{"opacity":0}}>State License</label>
                                <div
                                    className="form-group custom-file-button license"
                                    data-text="Select your file!"
                                >
                                    <input type="file" className="form-control"
                                        accept=".pdf, .doc, .docx"
                                        {...register("state_license_file")} onChange={e => setSlname((e.target.files && e.target.files[0].name))} id="file-upload-field" />
                                    <p className='form-field-error'>{errors.state_license_file?.message}</p>
                                    {LicenseData.state_license_file ? <a href={Sldata} target='_blank'><img src={view} className='viewicon' /></a> : <span className="filename">{Slname}</span>}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Issue Date</label>
                                    <div className="input-date">
                                        <input
                                            type="date"
                                            id="issue-date1"
                                            className="form-control"
                                            placeholder="DD/MM/YYYY"
                                            {...register("state_license_issue_date")}
                                        />
                                        <p className='form-field-error'>{errors.state_license_issue_date?.message}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <div className="input-date">
                                        <input
                                            type="date"
                                            id="expiry-date1"
                                            className="form-control"
                                            placeholder="DD/MM/YYYY"
                                            {...register("state_license_expiry_date")}
                                        />
                                        <p className='form-field-error'>{errors.state_license_expiry_date?.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div>
                            <label>CDS License</label>
                            <label class="switch">
                                <input type="checkbox" id="togBtn" checked={CdsToggledata}
                                    onChange={handleCdsToggledata} />
                                <div class="slider round"></div>
                            </label>
                        </div>
                        {CdsToggledata && <div className='row'>
                            <div className="col-md-6">
                                <label style={{"opacity":0}}>CDS License</label>
                                <div
                                    className="form-group custom-file-button license"
                                    data-text="Select your file!"
                                >
                                    <input type="file" className="form-control"
                                        accept=".pdf, .doc, .docx"
                                        {...register("cds_license_file")} onChange={e => setCdsname((e.target.files && e.target.files[0].name))} id="file-upload-field" />
                                    <p className='form-field-error'>{errors.cds_license_file?.message}</p>
                                    {LicenseData.cds_license_file ? <a href={Cdsdata} target='_blank'><img src={view} className='viewicon' /></a> : <span className="filename">{Cdsname}</span>}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Issue Date</label>
                                    <div className="input-date">
                                        <input
                                            type="date"
                                            id="issue-date1"
                                            className="form-control"
                                            placeholder="DD/MM/YYYY"
                                            {...register("cds_license_issue_date")}
                                        />
                                        <p className='form-field-error'>{errors.cds_license_issue_date?.message}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <div className="input-date">
                                        <input
                                            type="date"
                                            id="expiry-date1"
                                            className="form-control"
                                            placeholder="DD/MM/YYYY"
                                            {...register("cds_license_expiry_date")}
                                        />
                                        <p className='form-field-error'>{errors.cds_license_expiry_date?.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div>
                        <label>DEA License</label>
                            <label class="switch">
                                <input type="checkbox" id="togBtn" checked={DeaToggledata}
                                    onChange={handleDeaToggledata} />
                                <div class="slider round"></div>
                            </label>
                        </div>
                        {DeaToggledata && <div className='row'>
                            <div className="col-md-6">
                            <label style={{"opacity":0}}>DEA License</label>
                                <div
                                    className="form-group custom-file-button license"
                                    data-text="Select your file!"
                                >
                                    <input type="file" className="form-control"
                                        accept=".pdf, .doc, .docx"
                                        {...register("dea_license_file")} onChange={e => setDeaname((e.target.files && e.target.files[0].name))} id="file-upload-field" />
                                    <p className='form-field-error'>{errors.dea_license_file?.message}</p>
                                    {LicenseData.dea_license_file ? <a href={Deadata} target='_blank'><img src={view} className='viewicon' /></a> : <span className="filename">{Deaname}</span>}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Issue Date</label>
                                    <div className="input-date">
                                        <input
                                            type="date"
                                            id="issue-date1"
                                            className="form-control"
                                            placeholder="DD/MM/YYYY"
                                            {...register("dea_license_issue_date")}
                                        />
                                        <p className='form-field-error'>{errors.dea_license_issue_date?.message}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <div className="input-date">
                                        <input
                                            type="date"
                                            id="expiry-date1"
                                            className="form-control"
                                            placeholder="DD/MM/YYYY"
                                            {...register("dea_license_expiry_date")}
                                        />
                                        <p className='form-field-error'>{errors.dea_license_expiry_date?.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {fields.map((item, index) => (
                            <div className="row" key={index}>
                                <div className="col-md-2">
                                    {/* <div className="mb-3"> */}
                                    <label className="lable_style">license name</label>

                                    <input
                                        {...register(`licenseInfo.${index}.license_name`)}
                                        type="text"
                                        className={!!errors.licenseInfo?.[index]?.license_name ? 'is-invalid form-control' : 'form-control'}
                                    />
                                    {errors.licenseInfo?.[index]?.license_name && (
                                        <div className="invalid-feedback">
                                            {errors.licenseInfo[index].license_name.message}
                                        </div>
                                    )}
                                    {/* </div> */}
                                </div>

                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <label className="lable_style">license</label>
                                        <div className="form-group custom-file-button license">


                                            <input
                                                {...register(`licenseInfo.${index}.license_file`)}
                                                type="file"
                                                className={!!errors.licenseInfo?.[index]?.license_file ? 'is-invalid' : 'form-control'} accept=".doc,.docx,.pdf"
                                            />
                                        </div>
                                        {item.additional_license_name && <a href={item.additional_license_name} target='_blank'><img src={view} className='viewicon' /></a>}

                                        {errors.licenseInfo?.[index]?.license_file && (
                                            <div className="invalid-feedback">
                                                {errors.licenseInfo[index].license_file.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="lable_style">Issue Date</label>
                                        <div className="input-date">
                                            <input
                                                {...register(`licenseInfo.${index}.license_issue_date`)}
                                                type="date"
                                                id="issue-date1"

                                                placeholder="DD/MM/YYYY"
                                                className={!!errors.licenseInfo?.[index]?.license_issue_date ? 'is-invalid' : 'form-control'}
                                            />
                                            {errors.licenseInfo?.[index]?.license_issue_date && (
                                                <div className="invalid-feedback">
                                                    {errors.licenseInfo[index].license_issue_date.message}
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
                                                {...register(`licenseInfo.${index}.license_expiry_date`)}
                                                type="date"
                                                id="expiry-date1"
                                                placeholder="DD/MM/YYYY"
                                                className={!!errors.licenseInfo?.[index]?.license_expiry_date ? 'is-invalid' : 'form-control'}
                                            />
                                            {errors.licenseInfo?.[index]?.license_expiry_date && (
                                                <div className="invalid-feedback">
                                                    {errors.licenseInfo[index].license_expiry_date.message}
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
                                                onClick={() => SaveLicenseInfo(index)}
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
                                                removeaddmore(getValues(`licenseInfo[${index}]`))
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
                                <button type="button" className="add-more" onClick={addMoreLicense}>
                                    <img src={iconpluscircle} />
                                    Add Licensure
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

export default Licensure