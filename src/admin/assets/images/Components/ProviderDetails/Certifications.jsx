import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AdminService from '../../services/admin.service';
// import { AuthContext } from '../../App';
import { useContext } from 'react';

import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import FileBase64 from 'react-file-base64';

import view from '../../assets/images/view.png';
import { userContext } from '../../adminstore';
import Loader from '../Loder';
import TokenHelper from '../TokenHelper';
// import { licenseSchema } from '../Schemas';
import { CertificationSchema } from '../Schemas';
import { licenseSchema } from '../Schemas'
import { useFieldArray, useForm } from "react-hook-form";
import iconpluscircle from '../../assets/images/icon-plus-circle.svg';

const certificateInfo = {
    certificate_name: "",
    certificate_issue_date: "",
    certificate_expiry_date: "",
    certificate_file: "",
    save_status: false

};

function Certifications() {





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
        resolver: yupResolver(CertificationSchema),
    });

    // const { user } = useContext(AuthContext);
    const { user, dispatch } = useContext(userContext);
    const [CertificateData, setCertificateData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [Nlname, setNlname] = useState("Select Your Document");
    const [Slname, setSlname] = useState("Select Your Document");
    const [Cdsname, setCdsname] = useState("Select Your Document");


    const [Nldata, setNldata] = useState("");
    const [Sldata, setSldata] = useState("");
    const [Cdsdata, setCdsdata] = useState("");


    var getCertificateData = async () => {

        var token = TokenHelper.getToken();


    //  alert(id)
    if (token !== null) {
            console.log("repeat");
            var response = await AdminService.getCertificate(user.tokendata)
            console.log("license ", response.data)

            if (response.data.success) {
                var responsedata = response.data.additional_data.map((i, index) => ({
                    certificate_name: i.certificate_name,
                    additional_certificate_file: i.certificate_file,
                    certificate_issue_date: i.certificate_issue_date,
                    certificate_expiry_date: i.certificate_expiry_date,
                    save_status:true
                }))
                console.log(responsedata, 'responsedata')

                reset({
                    bls_issue_date: response.data.data.bls_issue_date,
                    bls_expiry_date: response.data.data.bls_expiry_date,
                    bls_file: response.data.data.bls_file,
                    acls_issue_date: response.data.data.acls_issue_date,
                    acls_expiry_date: response.data.data.acls_expiry_date,
                    acls_file: response.data.data.acls_file,
                    pls_issue_date: response.data.data.pls_issue_date,
                    pls_expiry_date: response.data.data.pls_expiry_date,
                    pls_file: response.data.data.pls_file,
                    certificateInfo: responsedata

                })

                setNldata(response.data.data.bls_file)
                setSldata(response.data.data.acls_file)
                setCdsdata(response.data.data.pls_file)

                setCertificateData(response.data.data)

                console.log(response.data)
            }
        }
        else {
            console.log("not get token")
        }
    }

    console.log(Nlname, 'Nlname')
    console.log(Slname, 'Slname')
    console.log(Cdsname, 'Cdsname')


    const { fields, update, append, remove } = useFieldArray({
        control,
        name: "certificateInfo",
    });
    console.log(certificateInfo, 'certificateInfo');


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

    const addMoreCertificate = () => {


        var status = true;

        for (var item of fields) {

            if (!item.save_status) {
                status = false;
                break;
            }


        }



        if (status) {
            append(certificateInfo)
        } else {
            toast.warning("please save previous value")
        }


    }

    const SaveCertificateInfo = async(select_index) => {

        fields.map(async (item, index) => {
            if (index === select_index) {


                var validateStatus = await trigger([`certificateInfo[${index}].certificate_name`, `certificateInfo[${index}].certificate_issue_date`, `certificateInfo[${index}].certificate_expiry_date`, `certificateInfo[${index}].certificate_file`])

                if (!validateStatus)
                    return;



                var fdata = new FormData();
                fdata.append("certificate_name", getValues(`certificateInfo[${index}].certificate_name`));
                fdata.append("certificate_issue_date", getValues(`certificateInfo[${index}].certificate_issue_date`));
                fdata.append("certificate_expiry_date", getValues(`certificateInfo[${index}].certificate_expiry_date`));
                var certificatefiledata = getValues(`certificateInfo[${index}].certificate_file`)
                fdata.append("certificate_file", certificatefiledata[0]);
                var response = await AdminService.updatecertificateAdditional(fdata)
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

        
        await getCertificateData()

    }

    const dataSubmit = async (data) => {
        setLoader(true);
        // alert(data.profile_image)
        // console.log("fdata  ", data.cv[0]);
        console.log(data)

        var fdata = new FormData();
        fdata.append("bls_issue_date", data.bls_issue_date);
        fdata.append("bls_expiry_date", data.bls_expiry_date);
        fdata.append("bls_file", data.bls_file[0]);
        fdata.append("acls_issue_date", data.acls_issue_date);
        fdata.append("acls_expiry_date", data.acls_expiry_date);
        fdata.append("acls_file", data.acls_file[0]);
        fdata.append("pls_issue_date", data.pls_issue_date);
        fdata.append("pls_expiry_date", data.pls_expiry_date);
        fdata.append("pls_file", data.pls_file[0]);




        var response = await AdminService.updatecertificate(fdata);
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
        
        await getCertificateData()



    }
    useEffect(() => {
        getCertificateData();

    }, []);

    return (
        <>
            {/* =================== Profile Start================================ */}



            <div className="tab-pane fade" id="pills-contact" role="tabpanel">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">Certifications</h2>
                    </div>
                </div>
                <form method="post" onSubmit={handleSubmit(dataSubmit)}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>BLS</label>
                                <div
                                    className="form-group custom-file-button bls"
                                    data-text="Select your file!"
                                >
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept=".pdf, .doc, .docx"
                                        id="file-upload-field"{...register("bls_file")} onChange={e => setNlname((e.target.files && e.target.files[0].name))}
                                    />
                                    <p className='form-field-error'>{errors.bls_file?.message}</p>
                                    {CertificateData.bls_file ? <a href={Nldata} target='_blank'><img src={view} className='viewicon' /></a> : <span className="filename">{Nlname}</span>}

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
                                        placeholder="DD/MM/YYYY" {...register("bls_issue_date")}
                                    />
                                    <p className='form-field-error'>{errors.bls_issue_date?.message}</p>
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
                                        {...register("bls_expiry_date")}
                                    />
                                    <p className='form-field-error'>{errors.bls_expiry_date?.message}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label>ACLS</label>
                            <div
                                className="form-group custom-file-button acls"
                                data-text="Select your file!"
                            >
                                <input type="file" className="form-control"
                                    accept=".pdf, .doc, .docx"
                                    {...register("acls_file")} onChange={e => setSlname((e.target.files && e.target.files[0].name))} id="file-upload-field" />
                                <p className='form-field-error'>{errors.acls_file?.message}</p>
                                {CertificateData.acls_file ? <a href={Sldata} target='_blank'><img src={view} className='viewicon' /></a> : <span className="filename">{Slname}</span>}
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
                                        {...register("acls_issue_date")}
                                    />
                                    <p className='form-field-error'>{errors.acls_issue_date?.message}</p>
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
                                        {...register("acls_expiry_date")}
                                    />
                                    <p className='form-field-error'>{errors.acls_expiry_date?.message}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label>PALS</label>
                            <div
                                className="form-group custom-file-button pais"
                                data-text="Select your file!"
                            >
                                <input type="file" className="form-control"
                                    accept=".pdf, .doc, .docx"
                                    {...register("pls_file")} onChange={e => setCdsname((e.target.files && e.target.files[0].name))} id="file-upload-field" />
                                <p className='form-field-error'>{errors.pls_file?.message}</p>
                                {CertificateData.pls_file ? <a href={Cdsdata} target='_blank'><img src={view} className='viewicon' /></a> : <span className="filename">{Cdsname}</span>}
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
                                        {...register("pls_issue_date")}
                                    />
                                    <p className='form-field-error'>{errors.pls_issue_date?.message}</p>
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
                                        {...register("pls_expiry_date")}
                                    />
                                    <p className='form-field-error'>{errors.pls_expiry_date?.message}</p>
                                </div>
                            </div>
                        </div>
                        {/* {fields.map((item, index) => (
                            <div className="row" key={index}>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="lable_style">certificate name</label>
                                        <input
                                            {...register(`certificateInfo.${index}.certificate_name`)}
                                            type="text"
                                            className={!!errors.certificateInfo?.[index]?.certificate_name ? 'is-invalid form-control' : 'form-control'}
                                        />
                                        {errors.certificateInfo?.[index]?.certificate_name && (
                                            <div className="invalid-feedback">
                                                {errors.certificateInfo[index].certificate_name.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <div className="mb-3">
                                        <label className="lable_style">certificate</label>
                                        <input
                                            {...register(`certificateInfo.${index}.certificate_file`)}
                                            type="file"
                                            className={!!errors.certificateInfo?.[index]?.certificate_file ? 'is-invalid' : 'form-control'} accept=".doc,.docx,.pdf"
                                        />
                                        {errors.certificateInfo?.[index]?.certificate_file && (
                                            <div className="invalid-feedback">
                                                {errors.certificateInfo[index].certificate_file.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <div className="mb-3">
                                        <label className="lable_style">Issue Date</label>
                                        <input
                                            {...register(`certificateInfo.${index}.certificate_issue_date`)}
                                            type="text"
                                            id="expiry-date1"

                                            placeholder="DD/MM/YYYY"
                                            className={!!errors.certificateInfo?.[index]?.certificate_issue_date ? 'is-invalid' : 'form-control'}
                                        />
                                        {errors.certificateInfo?.[index]?.certificate_issue_date && (
                                            <div className="invalid-feedback">
                                                {errors.certificateInfo[index].certificate_issue_date.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <div className="mb-3">
                                        <label className="lable_style">Expiry Date</label>
                                        <input
                                            {...register(`certificateInfo.${index}.certificate_expiry_date`)}
                                            type="text"
                                            id="expiry-date1"

                                            placeholder="DD/MM/YYYY"
                                            className={!!errors.certificateInfo?.[index]?.certificate_expiry_date ? 'is-invalid' : 'form-control'}
                                        />
                                        {errors.certificateInfo?.[index]?.certificate_expiry_date && (
                                            <div className="invalid-feedback">
                                                {errors.certificateInfo[index].certificate_expiry_date.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {console.log("rray index", index)}

                                <div className="col-md-1">

                                    {!item.save_status && <>
                                        <button
                                            className="border-0 remove-package mt-5"
                                            type="button"
                                            onClick={() => SaveCertificateInfo(index)}
                                        >
                                            save
                                            <span>
                                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                                            </span>
                                        </button>
                                    </>}

                                    <br />

                                    <button
                                        className="border-0 remove-package mt-5"
                                        type="button"
                                        onClick={() => remove(index)}
                                    >
                                        REMOVE
                                        <span>
                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))} */}
                         {fields.map((item, index) => (
                            <div className="row" key={index}>
                                <div className="col-md-2">
                                    {/* <div className="mb-3"> */}
                                    <label className="lable_style">certificate name</label>

                                    <input
                                        {...register(`certificateInfo.${index}.certificate_name`)}
                                        type="text"
                                        className={!!errors.certificateInfo?.[index]?.certificate_name ? 'is-invalid form-control' : 'form-control'}
                                    />
                                    {errors.certificateInfo?.[index]?.certificate_name && (
                                        <div className="invalid-feedback">
                                            {errors.certificateInfo[index].certificate_name.message}
                                        </div>
                                    )}
                                    {/* </div> */}
                                </div>

                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <label className="lable_style">certificate</label>
                                        <div className="form-group custom-file-button upload">


                                            <input
                                                {...register(`certificateInfo.${index}.certificate_file`)}
                                                type="file"
                                                className={!!errors.certificateInfo?.[index]?.certificate_file ? 'is-invalid' : 'form-control'} accept=".doc,.docx,.pdf"
                                            />
                                        </div>
                                        {item.additional_certificate_file && <a href={item.additional_certificate_file} target='_blank'><img src={view} className='viewicon' /></a>}
                                       
                                        {errors.certificateInfo?.[index]?.certificate_file && (
                                            <div className="invalid-feedback">
                                                {errors.certificateInfo[index].certificate_file.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="lable_style">Issue Date</label>
                                        <div className="input-date">
                                            <input
                                                {...register(`certificateInfo.${index}.certificate_issue_date`)}
                                                type="date"
                                                id="issue-date1"

                                                placeholder="DD/MM/YYYY"
                                                className={!!errors.certificateInfo?.[index]?.certificate_issue_date ? 'is-invalid' : 'form-control'}
                                            />
                                            {errors.certificateInfo?.[index]?.certificate_issue_date && (
                                                <div className="invalid-feedback">
                                                    {errors.certificateInfo[index].certificate_issue_date.message}
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
                                                {...register(`certificateInfo.${index}.certificate_expiry_date`)}
                                                type="date"
                                                id="expiry-date1"
                                                placeholder="DD/MM/YYYY"
                                                className={!!errors.certificateInfo?.[index]?.certificate_expiry_date ? 'is-invalid' : 'form-control'}
                                            />
                                            {errors.certificateInfo?.[index]?.certificate_expiry_date && (
                                                <div className="invalid-feedback">
                                                    {errors.certificateInfo[index].certificate_expiry_date.message}
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
                                                onClick={() => SaveCertificateInfo(index)}
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

                        <div className="col-md-12">
                            <div className="submit-btn">
                                <button type="button" className="add-more" onClick={addMoreCertificate}>
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

export default Certifications