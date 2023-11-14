import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AdminService from '../../services/admin.service';
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

const licenseInfo = {
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
    const {user,dispatch} = useContext(userContext);
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

    var getLicenseData = async () => {

        var token = TokenHelper.getToken();


    //  alert(id)
    if (token !== null) {
            console.log("repeat");
            var response = await AdminService.getLicense(user.tokendata)
            console.log("license ", response.data)
            // alert(response.data.additional_data.length)
            //  alert(response.data)
            if (response.data.success) {
                var responsedata = response.data.additional_data.map((i, index) => ({
                    license_name: i.license_name,
                    additional_license_name: i.license_file,
                    license_issue_date: i.license_issue_date,
                    license_expiry_date: i.license_expiry_date,
                    save_status:true
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
                    national_license_file: response.data.data.national_license_file[0],
                    state_license_issue_date: response.data.data.state_license_issue_date,
                    state_license_expiry_date: response.data.data.state_license_expiry_date,
                    state_license_file: response.data.data.state_license_file[0],
                    cds_license_issue_date: response.data.data.cds_license_issue_date,
                    cds_license_expiry_date: response.data.data.cds_license_expiry_date,
                    cds_license_file: response.data.data.cds_license_file[0],
                    dea_license_issue_date: response.data.data.dea_license_issue_date,
                    dea_license_expiry_date: response.data.data.dea_license_expiry_date,
                    dea_license_file: response.data.data.dea_license_file[0],
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

    const SaveLicenseInfo = async(select_index) => {

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
                var licensefiledata = getValues(`licenseInfo[${index}].license_file`)
                fdata.append("license_file", licensefiledata[0]);
                var response = await AdminService.updatelicensedata(fdata)
                console.log(response.data, 'response')

                if (response.data.success) {
                    // fields[index].save_status = true;
                    update(index, { save_status: true })
                    toast.success("file upload")
                } else {
                    toast.error("Select All Fields")
                }
            }
        })


        await  getLicenseData();
    }

    const dataSubmit = async (data) => {
        setLoader(true);
        // alert(data.profile_image)
        // console.log("fdata  ", data.cv[0]);
        console.log(data)

        var fdata = new FormData();
        fdata.append("national_license_issue_date", data.national_license_issue_date);
        fdata.append("national_license_expiry_date", data.national_license_expiry_date);
        fdata.append("national_license_file", data.national_license_file[0]);
        fdata.append("state_license_issue_date", data.state_license_issue_date);
        fdata.append("state_license_expiry_date", data.state_license_expiry_date);
        fdata.append("state_license_file", data.state_license_file[0]);
        fdata.append("cds_license_issue_date", data.cds_license_issue_date);
        fdata.append("cds_license_expiry_date", data.cds_license_expiry_date);
        fdata.append("cds_license_file", data.cds_license_file[0]);
        fdata.append("dea_license_issue_date", data.dea_license_issue_date);
        fdata.append("dea_license_expiry_date", data.dea_license_expiry_date);
        fdata.append("dea_license_file", data.dea_license_file[0]);

        // console.log(data.licenseInfo.length, 'data.licenseInfo')

        var temp_licenseInfo = data.licenseInfo;

        // for (var item = 0; item < temp_licenseInfo.length; item++) {

        //     // fdata.append("additional_license_arr", )
        //     fdata.append(`additional_license_arr[${item}][license_name]`, temp_licenseInfo[item].license_name);
        //     fdata.append(`additional_license_arr[${item}][license_issue_date]`, temp_licenseInfo[item].license_issue_date);
        //     fdata.append(`additional_license_arr[${item}][license_expiry_date]`, temp_licenseInfo[item].license_expiry_date);
        //     fdata.append(`additional_license_arr[${item}][additional_license]`, temp_licenseInfo[item].additional_license[0]);
        // }

        // Append array of objects to FormData
        // for (let i = 0; i < temp_licenseInfo.length; i++) {
        //     const obj = temp_licenseInfo[i];
        //     Object.keys(obj).forEach((key) => {

        //         if(obj[key]=="additional_license")
        //         {
        //             // fdata.append(`additional_license_arr[${i}][${key}]`, obj[key][0]);
        //             console.log("dfd");
        //         }else{
        //             fdata.append(`additional_license_arr[${i}][${key}]`, obj[key]);
        //         }

        //     });
        // }


        // for (var item of temp_licenseInfo) {
        //     var base64string = await new Promise(async (resolve, reject) => {
        //         if (item.additional_license) {
        //             const reader = new FileReader();
        //             reader.onloadend = () => {
        //                 const base64String = reader.result.split(',')[1]; // Extract base64 data
        //                 // Send the base64String to the server using fetch or other methods
        //                 resolve(base64String)
        //             };
        //             reader.readAsDataURL(item.additional_license[0]);
        //         }
        //     })

        //     item.additional_license_base64 = base64string;

        //     console.log(JSON.stringify(item), "  items");

        //     fdata.append(`additional_license_arr`, JSON.stringify(item));
        // }

        // console.log(fdata.getAll('additional_license_arr'), 'fdata')

        // return;

     
        var response = await AdminService.updatelicense(fdata);
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


        reset()
        await  getLicenseData();

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
                                    {/* <p className='form-field-error'>{errors.national_license_file?.message}</p> */}
                                    {LicenseData.national_license_file ? <a href={Nldata} target='_blank'><img src={view} className='viewicon' /></a> : <span className="filename">{Nlname}</span>}

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
                                            onClick={() => remove(index)}
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
                        {/* {fields.map((item, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-md-1">
                    <Form.Group className="mb-3">
                      <label className="lable_style">license_name</label>
                      <Form.Control
                        {...register(`licenseInfo.${index}.license_name`)}
                        type="text"
                        
                        isInvalid={!!errors.licenseInfo?.[index]?.license_name}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-2">
                    <Form.Group className="mb-3">
                      <label className="lable_style">additional_license</label>
                      <Form.Control
                        {...register(`licenseInfo.${index}.additional_license`)}
                        type="file"
                        
                        isInvalid={!!errors.licenseInfo?.[index]?.additional_license}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-2">
                    <Form.Group className="mb-3">
                      <label className="lable_style">license_date_issue</label>
                      <Form.Control
                        {...register(`licenseInfo.${index}.license_date_issue`)}
                        type="file"
                        
                        isInvalid={!!errors.licenseInfo?.[index]?.license_date_issue}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-2">
                    <Form.Group className="mb-3">
                      <label className="lable_style">license_date_expiry</label>
                      <Form.Control
                        {...register(`licenseInfo.${index}.license_date_expiry`)}
                        type="file"
                        
                        isInvalid={!!errors.licenseInfo?.[index]?.license_date_expiry}
                      />
                    </Form.Group>
                  </div>

                 

                
                  {index > 0 && (
                    <div className="col-md-1">
                      <button
                        className="border-0 remove-package mt-5"
                        type="button"
                        variant="danger"
                        onClick={() => remove(index)}
                      >
                        <span>
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </span>{" "}
                      </button>
                    </div>
                  )}
                </div>
              );
            })} */}

                        <div className="col-md-12">
                            <div className="submit-btn">
                                <button type="button" className="add-more" onClick={addMoreLicense}>
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

export default Licensure