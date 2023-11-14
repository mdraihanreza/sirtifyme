import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import UserService from '../../services/user.service';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import { userContext } from '../../store';
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

const nationallicenseInfo = {
    additiona_license_id: "",
    license_name: "",
    license_issue_date: "",
    license_expiry_date: "",
    additional_license: "",
    save_status: false

};
const statelicenseInfo = {
    additiona_license_id: "",
    license_name: "",
    license_issue_date: "",
    license_expiry_date: "",
    additional_license: "",
    save_status: false

};
const cdslicenseInfo = {
    additiona_license_id: "",
    license_name: "",
    license_issue_date: "",
    license_expiry_date: "",
    additional_license: "",
    save_status: false

};
const dealicenseInfo = {
    additiona_license_id: "",
    license_name: "",
    license_issue_date: "",
    license_expiry_date: "",
    additional_license: "",
    save_status: false

};

function Licensure() {





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

    var getLicenseData = async () => {

        var token = TokenHelper.getToken();


        //  alert(id)
        if (token !== null) {
            console.log("repeat");
            var response = await UserService.getLicense(user.tokendata)
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

                // alert(response.data.data.national_license_file)
                reset({
                    national_license_issue_date: response.data.data.national_license_issue_date,
                    national_license_expiry_date: response.data.data.national_license_expiry_date,

                    // national_license_file: response.data.data.national_license_file[0],

                    state_license_issue_date: response.data.data.state_license_issue_date,
                    state_license_expiry_date: response.data.data.state_license_expiry_date,
                    // state_license_file: response.data.data.state_license_file[0],
                    cds_license_issue_date: response.data.data.cds_license_issue_date,
                    cds_license_expiry_date: response.data.data.cds_license_expiry_date,
                    // cds_license_file: response.data.data.cds_license_file[0],
                    dea_license_issue_date: response.data.data.dea_license_issue_date,
                    dea_license_expiry_date: response.data.data.dea_license_expiry_date,
                    // dea_license_file: response.data.data.dea_license_file[0],
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
                console.log(responsedata)
                console.log(LicenseData, 'LicenseData')
                if(response.data.data.national_license_status=="No"){
                    setNlToggledata(false);
                }
                if(response.data.data.state_license_status=="No"){
                    setSlToggledata(false)
                }
                if(response.data.data.cds_license_status=="No"){
                    setCdsToggledata(false)
                }
                if(response.data.data.dea_license_status=="No"){
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
    console.log(NlToggledata, 'NlToggledata')
    console.log(SlToggledata, 'SlToggledata')
    console.log(CdsToggledata, 'CdsToggledata')
    console.log(DeaToggledata, 'DeaToggledata')
    //    var token=user.tokendata

    //  getProfileData();
    const { fields, update, append , remove } = useFieldArray({
        control,
        // name: "licenseInfo",
    });

    const fieldObj=useFieldArray({
        control,
        name: "nationallicenseInfo",
    })
    const fieldObj1=useFieldArray({
        control,
        name: "statelicenseInfo",
    })
    const fieldObj2=useFieldArray({
        control,
        name: "cdslicenseInfo",
    })
    const fieldObj3=useFieldArray({
        control,
        name: "dealicenseInfo",
    })
    // console.log(nationallicenseInfo, 'nationallicenseInfo');


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

    const addNationalLicense = () => {
        var status = true;

        for (var item of fields) {

            if (!item.save_status) {
                status = false;
                break;
            }
        }

        if (status) {
            fieldObj.append(nationallicenseInfo)
        } else {
            toast.warning("please save previous value")
        }


    }
    const addStateLicense = () => {
        var status = true;

        for (var item of fields) {

            if (!item.save_status) {
                status = false;
                break;
            }
        }

        if (status) {
            fieldObj1.append(statelicenseInfo)
        } else {
            toast.warning("please save previous value")
        }


    }
    const addCdsLicense = () => {
        var status = true;

        for (var item of fields) {

            if (!item.save_status) {
                status = false;
                break;
            }
        }

        if (status) {
            fieldObj2.append(cdslicenseInfo)
        } else {
            toast.warning("please save previous value")
        }


    }
    const addDeaLicense = () => {
        var status = true;

        for (var item of fields) {

            if (!item.save_status) {
                status = false;
                break;
            }
        }

        if (status) {
            fieldObj3.append(dealicenseInfo)
        } else {
            toast.warning("please save previous value")
        }


    }
    // const SaveCertificateInfo = async (select_index) => {

    //     fields.map(async (item, index) => {
    //         if (index === select_index) {


    //             var validateStatus = await trigger([`certificateInfo[${index}].certificate_name`, `certificateInfo[${index}].certificate_issue_date`, `certificateInfo[${index}].certificate_expiry_date`, `certificateInfo[${index}].certificate_file`])

    //             if (!validateStatus)
    //                 return;



    //             var fdata = new FormData();
    //             fdata.append("certificate_name", getValues(`certificateInfo[${index}].certificate_name`));
    //             fdata.append("certificate_issue_date", getValues(`certificateInfo[${index}].certificate_issue_date`));
    //             fdata.append("certificate_expiry_date", getValues(`certificateInfo[${index}].certificate_expiry_date`));
    //             var certificatefiledata = getValues(`certificateInfo[${index}].certificate_file`)
    //             fdata.append("certificate_file", certificatefiledata[0]);
    //             var response = await UserService.updatecertificateAdditional(fdata)
    //             console.log(response.data, 'response')

    //             if (response.data.success) {
    //                 // fields[index].save_status = true;
    //                 update(index, { save_status: true })
    //                 toast.success("file upload")
    //             } else {
    //                 toast.error("Select All Fields")
    //             }
    //         }
    //     })


    //     await getCertificateData()

    // }
    const SaveNationalLicenseInfo = async (select_index) => {

        fieldObj.fields.map(async (item, index) => {
            if (index === select_index) {


                var validateStatus = await trigger([`nationallicenseInfo[${index}].license_name`, `nationallicenseInfo[${index}].license_issue_date`, `nationallicenseInfo[${index}].license_expiry_date`, `nationallicenseInfo[${index}].license_file`])

                if (!validateStatus)
                    return;
                var fdata = new FormData();
                fdata.append("license_name", getValues(`nationallicenseInfo[${index}].license_name`));
                fdata.append("license_issue_date", getValues(`nationallicenseInfo[${index}].license_issue_date`));
                fdata.append("license_expiry_date", getValues(`nationallicenseInfo[${index}].license_expiry_date`));
                var licensefiledata = getValues(`nationallicenseInfo[${index}].license_file`)
                fdata.append("license_file", licensefiledata[0]);
                console.log(licensefiledata, 'licensefiledata')
                console.log(licensefiledata[0], 'licensefiledata')
                var response = await UserService.updatelicensedata(fdata)
                console.log(response.data, 'response')

                if (response.data.success) {
                    fieldObj.update(index, { save_status: true })
                    toast.success("file upload")
                } else {
                    toast.error("Select All Fields")
                }
            }
            await getLicenseData();
        })
    }
    const SaveStateLicenseInfo = async (select_index) => {

        fieldObj1.fields.map(async (item, index) => {
            if (index === select_index) {


                var validateStatus = await trigger([`statelicenseInfo[${index}].license_name`, `statelicenseInfo[${index}].license_issue_date`, `statelicenseInfo[${index}].license_expiry_date`, `statelicenseInfo[${index}].license_file`])

                if (!validateStatus)
                    return;
                var fdata = new FormData();
                fdata.append("license_name", getValues(`statelicenseInfo[${index}].license_name`));
                fdata.append("license_issue_date", getValues(`statelicenseInfo[${index}].license_issue_date`));
                fdata.append("license_expiry_date", getValues(`statelicenseInfo[${index}].license_expiry_date`));
                var licensefiledata = getValues(`statelicenseInfo[${index}].license_file`)
                fdata.append("license_file", licensefiledata[0]);
                console.log(licensefiledata, 'licensefiledata')
                console.log(licensefiledata[0], 'licensefiledata')
                var response = await UserService.updatelicensedata(fdata)
                console.log(response.data, 'response')

                if (response.data.success) {
                    update(index, { save_status: true })
                    toast.success("file upload")
                } else {
                    toast.error("Select All Fields")
                }
            }
            await getLicenseData();
        })
    }
    const SaveCdsLicenseInfo = async (select_index) => {

        fieldObj2.fields.map(async (item, index) => {
            if (index === select_index) {


                var validateStatus = await trigger([`cdslicenseInfo[${index}].license_name`, `cdslicenseInfo[${index}].license_issue_date`, `cdslicenseInfo[${index}].license_expiry_date`, `cdslicenseInfo[${index}].license_file`])

                if (!validateStatus)
                    return;
                var fdata = new FormData();
                fdata.append("license_name", getValues(`cdslicenseInfo[${index}].license_name`));
                fdata.append("license_issue_date", getValues(`cdslicenseInfo[${index}].license_issue_date`));
                fdata.append("license_expiry_date", getValues(`cdslicenseInfo[${index}].license_expiry_date`));
                var licensefiledata = getValues(`cdslicenseInfo[${index}].license_file`)
                fdata.append("license_file", licensefiledata[0]);
                console.log(licensefiledata, 'licensefiledata')
                console.log(licensefiledata[0], 'licensefiledata')
                var response = await UserService.updatelicensedata(fdata)
                console.log(response.data, 'response')

                if (response.data.success) {
                    update(index, { save_status: true })
                    toast.success("file upload")
                } else {
                    toast.error("Select All Fields")
                }
            }
            await getLicenseData();
        })
    }
    const SaveDeaLicenseInfo = async (select_index) => {

        fieldObj3.fields.map(async (item, index) => {
            if (index === select_index) {


                var validateStatus = await trigger([`dealicenseInfo[${index}].license_name`, `dealicenseInfo[${index}].license_issue_date`, `dealicenseInfo[${index}].license_expiry_date`, `dealicenseInfo[${index}].license_file`])

                if (!validateStatus)
                    return;
                var fdata = new FormData();
                fdata.append("license_name", getValues(`dealicenseInfo[${index}].license_name`));
                fdata.append("license_issue_date", getValues(`dealicenseInfo[${index}].license_issue_date`));
                fdata.append("license_expiry_date", getValues(`dealicenseInfo[${index}].license_expiry_date`));
                var licensefiledata = getValues(`dealicenseInfo[${index}].license_file`)
                fdata.append("license_file", licensefiledata[0]);
                console.log(licensefiledata, 'licensefiledata')
                console.log(licensefiledata[0], 'licensefiledata')
                var response = await UserService.updatelicensedata(fdata)
                console.log(response.data, 'response')

                if (response.data.success) {
                    update(index, { save_status: true })
                    toast.success("file upload")
                } else {
                    toast.error("Select All Fields")
                }
            }
            await getLicenseData();
        })
    }

    const removeaddmorelicense = async (data) => {
        console.log(data.additiona_license_id)
        if (data.additiona_license_id) {
            var response = await UserService.getRemoveLicense(data.additiona_license_id)

            if (response.data.success) {

                toast.success("Removed")
            }

        }
    }
    const removeaddmorestate = async (data) => {
        console.log(data.additiona_license_id)
        if (data.additiona_license_id) {
            var response = await UserService.getRemoveLicense(data.additiona_license_id)

            if (response.data.success) {

                toast.success("Removed")
            }

        }
    }
    const removeaddmorecds = async (data) => {
        console.log(data.additiona_license_id)
        if (data.additiona_license_id) {
            var response = await UserService.getRemoveLicense(data.additiona_license_id)

            if (response.data.success) {

                toast.success("Removed")
            }

        }
    }
    const removeaddmoredea = async (data) => {
        console.log(data.additiona_license_id)
        if (data.additiona_license_id) {
            var response = await UserService.getRemoveLicense(data.additiona_license_id)

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
        // console.log(data.licenseInfo.length, 'data.licenseInfo')

        // var temp_licenseInfo = data.licenseInfo;



        var response = await UserService.updatelicense(fdata);
        // alert(response,'response')

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
                            <p>Have you National License ?</p>
                            <label class="switch">
                                <input type="checkbox" id="togBtn" checked={NlToggledata}
                                    onChange={handleNlToggledata} />
                                <div class="slider round"></div>
                            </label>
                        </div>
                        {NlToggledata && <div className='row'>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>National License</label>
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
                                        <p className='form-field-error'>{errors.national_license_file?.message}</p>
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
                            <div className="col-md-12">
                            {fieldObj.fields.map((item, index) => (
                            <div className="row" key={index}>
                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <label className="lable_style">license</label>
                                        <div className="form-group custom-file-button license">
                                            <input
                                                {...register(`nationallicenseInfo.${index}.license_file`)}
                                                type="file"
                                                className={!!errors.nationallicenseInfo?.[index]?.license_file ? 'is-invalid' : 'form-control'} accept=".doc,.docx,.pdf"
                                            />
                                        </div>
                                        {item.additional_license_name && <a href={item.additional_license_name} target='_blank'><img src={view} className='viewicon' /></a>}

                                        {errors.nationallicenseInfo?.[index]?.license_file && (
                                            <div className="invalid-feedback">
                                                {errors.nationallicenseInfo[index].license_file.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="lable_style">Issue Date</label>
                                        <div className="input-date">
                                            <input
                                                {...register(`nationallicenseInfo.${index}.license_issue_date`)}
                                                type="date"
                                                id="issue-date1"

                                                placeholder="DD/MM/YYYY"
                                                className={!!errors.nationallicenseInfo?.[index]?.license_issue_date ? 'is-invalid' : 'form-control'}
                                            />
                                            {errors.nationallicenseInfo?.[index]?.license_issue_date && (
                                                <div className="invalid-feedback">
                                                    {errors.nationallicenseInfo[index].license_issue_date.message}
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
                                                {...register(`nationallicenseInfo.${index}.license_expiry_date`)}
                                                type="date"
                                                id="expiry-date1"
                                                placeholder="DD/MM/YYYY"
                                                className={!!errors.nationallicenseInfo?.[index]?.license_expiry_date ? 'is-invalid' : 'form-control'}
                                            />
                                            {errors.nationallicenseInfo?.[index]?.license_expiry_date && (
                                                <div className="invalid-feedback">
                                                    {errors.nationallicenseInfo[index].license_expiry_date.message}
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
                                                onClick={() => SaveNationalLicenseInfo(index)}
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
                                                removeaddmorelicense(getValues(`nationallicenseInfo[${index}]`))
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

                            <div className="submit-btn">
                                <button type="button" className="add-more" onClick={addNationalLicense}>
                                    <img src={iconpluscircle} />
                                    Add National Licensure
                                </button>
                            </div>
                        </div>
                        </div>}
                        <div>
                            <p>Have you State License ?</p>
                            <label class="switch">
                                <input type="checkbox" id="togBtn" checked={SlToggledata}
                                    onChange={handleSlToggledata} />
                                <div class="slider round"></div>
                            </label>
                        </div>
                        {SlToggledata && <div className='row'>
                            <div className="col-md-6">
                                <label>State License</label>
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
                            <div className="col-md-12">
                            {fieldObj1.fields.map((item, index) => (
                            <div className="row" key={index}>
                                <div className="col-md-2">
                                    {/* <div className="mb-3"> */}
                                    <label className="lable_style">license name</label>

                                    <input
                                        {...register(`statelicenseInfo.${index}.license_name`)}
                                        type="hidden" value={"State License"}
                                        className={!!errors.statelicenseInfo?.[index]?.license_name ? 'is-invalid form-control' : 'form-control'}
                                    />
                                    {errors.statelicenseInfo?.[index]?.license_name && (
                                        <div className="invalid-feedback">
                                            {errors.statelicenseInfo[index].license_name.message}
                                        </div>
                                    )}
                                    {/* </div> */}
                                </div>

                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <label className="lable_style">license</label>
                                        <div className="form-group custom-file-button license">


                                            <input
                                                {...register(`statelicenseInfo.${index}.license_file`)}
                                                type="file"
                                                className={!!errors.statelicenseInfo?.[index]?.license_file ? 'is-invalid' : 'form-control'} accept=".doc,.docx,.pdf"
                                            />
                                        </div>
                                        {item.additional_license_name && <a href={item.additional_license_name} target='_blank'><img src={view} className='viewicon' /></a>}

                                        {errors.statelicenseInfo?.[index]?.license_file && (
                                            <div className="invalid-feedback">
                                                {errors.statelicenseInfo[index].license_file.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="lable_style">Issue Date</label>
                                        <div className="input-date">
                                            <input
                                                {...register(`statelicenseInfo.${index}.license_issue_date`)}
                                                type="date"
                                                id="issue-date1"

                                                placeholder="DD/MM/YYYY"
                                                className={!!errors.statelicenseInfo?.[index]?.license_issue_date ? 'is-invalid' : 'form-control'}
                                            />
                                            {errors.statelicenseInfo?.[index]?.license_issue_date && (
                                                <div className="invalid-feedback">
                                                    {errors.statelicenseInfo[index].license_issue_date.message}
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
                                                {...register(`statelicenseInfo.${index}.license_expiry_date`)}
                                                type="date"
                                                id="expiry-date1"
                                                placeholder="DD/MM/YYYY"
                                                className={!!errors.statelicenseInfo?.[index]?.license_expiry_date ? 'is-invalid' : 'form-control'}
                                            />
                                            {errors.statelicenseInfo?.[index]?.license_expiry_date && (
                                                <div className="invalid-feedback">
                                                    {errors.statelicenseInfo[index].license_expiry_date.message}
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
                                                onClick={() => SaveStateLicenseInfo(index)}
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
                                                removeaddmorestate(getValues(`statelicenseInfo[${index}]`))
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

                            <div className="submit-btn">
                                <button type="button" className="add-more" onClick={addStateLicense}>
                                    <img src={iconpluscircle} />
                                    Add State Licensure
                                </button>
                            </div>
                        </div>
                        </div>}
                        <div>
                            <p>Have you CDS License ?</p>
                            <label class="switch">
                                <input type="checkbox" id="togBtn" checked={CdsToggledata}
                                    onChange={handleCdsToggledata} />
                                <div class="slider round"></div>
                            </label>
                        </div>
                        {CdsToggledata && <div className='row'>
                            <div className="col-md-6">
                                <label>CDS License</label>
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
                            <div className="col-md-12">
                            {fieldObj2.fields.map((item, index) => (
                            <div className="row" key={index}>
                                <div className="col-md-2">
                                    {/* <div className="mb-3"> */}
                                    <label className="lable_style">license name</label>

                                    <input
                                        {...register(`cdslicenseInfo.${index}.license_name`)}
                                        type="hidden" value={"CDS License"}
                                        className={!!errors.cdslicenseInfo?.[index]?.license_name ? 'is-invalid form-control' : 'form-control'}
                                    />
                                    {errors.cdslicenseInfo?.[index]?.license_name && (
                                        <div className="invalid-feedback">
                                            {errors.cdslicenseInfo[index].license_name.message}
                                        </div>
                                    )}
                                    {/* </div> */}
                                </div>

                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <label className="lable_style">license</label>
                                        <div className="form-group custom-file-button license">


                                            <input
                                                {...register(`cdslicenseInfo.${index}.license_file`)}
                                                type="file"
                                                className={!!errors.cdslicenseInfo?.[index]?.license_file ? 'is-invalid' : 'form-control'} accept=".doc,.docx,.pdf"
                                            />
                                        </div>
                                        {item.additional_license_name && <a href={item.additional_license_name} target='_blank'><img src={view} className='viewicon' /></a>}

                                        {errors.cdslicenseInfo?.[index]?.license_file && (
                                            <div className="invalid-feedback">
                                                {errors.cdslicenseInfo[index].license_file.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="lable_style">Issue Date</label>
                                        <div className="input-date">
                                            <input
                                                {...register(`cdslicenseInfo.${index}.license_issue_date`)}
                                                type="date"
                                                id="issue-date1"

                                                placeholder="DD/MM/YYYY"
                                                className={!!errors.cdslicenseInfo?.[index]?.license_issue_date ? 'is-invalid' : 'form-control'}
                                            />
                                            {errors.cdslicenseInfo?.[index]?.license_issue_date && (
                                                <div className="invalid-feedback">
                                                    {errors.cdslicenseInfo[index].license_issue_date.message}
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
                                                {...register(`cdslicenseInfo.${index}.license_expiry_date`)}
                                                type="date"
                                                id="expiry-date1"
                                                placeholder="DD/MM/YYYY"
                                                className={!!errors.cdslicenseInfo?.[index]?.license_expiry_date ? 'is-invalid' : 'form-control'}
                                            />
                                            {errors.cdslicenseInfo?.[index]?.license_expiry_date && (
                                                <div className="invalid-feedback">
                                                    {errors.cdslicenseInfo[index].license_expiry_date.message}
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
                                                onClick={() => SaveCdsLicenseInfo(index)}
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
                                                removeaddmorecds(getValues(`licenseInfo[${index}]`))
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

                            <div className="submit-btn">
                                <button type="button" className="add-more" onClick={addCdsLicense}>
                                    <img src={iconpluscircle} />
                                    Add CDS License
                                </button>
                            </div>
                        </div>
                        </div>}
                        <div>
                            <p>Have you DEA License ?</p>
                            <label class="switch">
                                <input type="checkbox" id="togBtn" checked={DeaToggledata}
                                    onChange={handleDeaToggledata} />
                                <div class="slider round"></div>
                            </label>
                        </div>
                        {DeaToggledata && <div className='row'>
                            <div className="col-md-6">
                                <label>DEA License</label>
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
                            <div className="col-md-12">
                            {fields.map((item, index) => (
                            <div className="row" key={index}>
                                <div className="col-md-2">
                                    {/* <div className="mb-3"> */}
                                    <label className="lable_style">license name</label>

                                    <input
                                        {...register(`licenseInfo.${index}.license_name`)}
                                        type="hidden" value={"DEA License"}
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
                                                onClick={() => SaveDeaLicenseInfo(index)}
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
                                                removeaddmoredea(getValues(`licenseInfo[${index}]`))
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

                            <div className="submit-btn">
                                <button type="button" className="add-more" onClick={addDeaLicense}>
                                    <img src={iconpluscircle} />
                                    Add DEA License
                                </button>
                            </div>
                        </div>
                        </div>}
                        <div className="submit-btn">
                                <button type="submit" className='submit_button' name="submit">Submit</button>
                            </div>
                    </div>
                </form>
                {loader && <Loader />}
            </div>


        </>
    )
}

export default Licensure