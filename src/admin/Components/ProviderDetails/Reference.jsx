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
// import { licenseSchema } from '../Schemas';
import { licenseDataSchema } from '../Schemas';
import { referencesSchema } from '../Schemas'
import TokenHelper from '../TokenHelper';
import { useFieldArray, useForm } from "react-hook-form";
import iconpluscircle from '../../assets/images/icon-plus-circle.svg';



function References() {
    const location = useLocation();
    // const { user } = useContext(AuthContext);
    const {user,dispatch} = useContext(userContext);
    console.log(user.tokendata, 'userinfotoken')
    const [loader, setLoader] = useState(false);
    var user_id=location.state.user_id
    var getReferenceData = async () => {

        var token = TokenHelper.getToken();
   
   
        //  alert(id)
        if (token !== null) {
            console.log("repeat");
            var response = await AdminService.getReference(user_id)
          
            if (response.data.success) {
                reset({
                    first_reference: response.data.data.first_reference,
                    second_reference: response.data.data.second_reference,
                    third_reference: response.data.data.third_reference
                })
          
             
                
                console.log(response.data)
            }
        }
        else {
            console.log("not get token")
        }
    }
    //  getProfileData();
    useEffect(() => {
        getReferenceData();

    }, []);
    const dataSubmit = async (data) => {
        setLoader(true);
        // alert(data.profile_image)
        // console.log("fdata  ", data.cv[0]);
        console.log(data)
        var fdata = new FormData();
        fdata.append("first_reference", data.first_reference);
        fdata.append("second_reference", data.second_reference);
        fdata.append("third_reference", data.third_reference);
        fdata.append("user_id", user_id);

        var response = await AdminService.PostReference(fdata);
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
        await getReferenceData();


        
    }
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        resolver: yupResolver(referencesSchema),
        mode: "all"
    });
    return (
        <>

            <div className="tab-pane fade" id="references" role="tabpanel">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">References</h2>
                    </div>
                </div>
                <form action="" method="post"  onSubmit={handleSubmit(dataSubmit)}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>First Reference</label>
                                <input type="text" className="form-control" placeholder="Enter Name,Email , Phone Number" {...register("first_reference")}/>
                                <p className='form-field-error'>{errors.first_reference?.message}</p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Second Reference</label>
                                <input type="text" className="form-control" placeholder="Enter Name,Email , Phone Number" {...register("second_reference")} />
                                <p className='form-field-error'>{errors.second_reference?.message}</p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Third Reference</label>
                                <input type="text" className="form-control" placeholder="Enter Name,Email , Phone Number" {...register("third_reference")}/>
                                <p className='form-field-error'>{errors.third_reference?.message}</p>
                            </div>
                        </div>
                        <div className="col-md-12 text-center">
                            <input type="submit" name="submit" value="Update" />
                        </div>
                    </div>
                </form>
                {loader && <Loader />}
            </div>




        </>
    )
}

export default References