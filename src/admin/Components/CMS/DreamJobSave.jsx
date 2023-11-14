
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import AdminService from '../../services/admin.service';

import { useContext } from 'react';
import { userContext } from '../../../store';
import Loader from '../Loder';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { dreamjobSchema } from '../Schemas';
import avtar from '../../assets/images/iconlogo.png';
import TokenHelper from '../TokenHelper';
import { useFieldArray, useForm } from "react-hook-form";




function DreamJobSave() {


    const [DreamjobData, setDreamjobData] = useState([]);
    const [filename, setFilename] = useState("Select Your Image");
    const [filedata, setFiledata] = useState("");
    const [loader, setLoader] = useState(false);

  
    //  getProfileData();
  
    const dataSubmit = async (data) => {

        setLoader(true);


        var fdata = new FormData();
        fdata.append("name", data.name);
        fdata.append("designation", data.designation);
        if (data.image !== null) {
            fdata.append("image", data.image[0]);
        }


        var response = await AdminService.saveDreamjob(fdata);
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


    }
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        resolver: yupResolver(dreamjobSchema),
        mode: "all"
    });

    return (
        <>
            <div className='testimonial_single_title'>
                <h3>Dream Job</h3>
            </div>
            <form action="" className='testimonial_single_form' method="post" onSubmit={handleSubmit(dataSubmit)}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="" {...register("name")} />
                            <p className='form-field-error'>{errors.name?.message}</p>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" className="form-control" placeholder="" {...register("designation")} maxlength="60" />
                            <p className='form-field-error'>{errors.designation?.message}</p>
                        </div>
                    </div>
                 

                    <div className="col-md-8">
                        <label>Upload Image</label>
                        <div
                            className="form-group custom-file-button"
                            data-text="Select your file!"
                        >
                            <input type="file" className="form-control" id="file-upload-field" {...register("image")} onChange={e => setFilename((e.target.files && e.target.files[0].name))} accept=".png" />
                            <span className="filename">{filename}</span>
                            {/* {image ? <img
                                className="img-responsive rounded-circle"
                                src={TestimonialData.image}
                                alt=""
                            /> : <span className="filename">{filename}</span>} */}
                            <p className='form-field-error'>{errors.image?.message}</p>
                        </div>
                    </div>
                    <div className="col-md-12 about_btn">
                    <button type="submit" className='submitdata_button' name="submit">Submit</button>
                    </div>
                </div>
            </form>

            {loader && <Loader />}
        </>

    );
}

export default DreamJobSave
