import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import UserService from '../../services/user.service';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import { userContext } from '../../store';
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
import { First } from 'react-bootstrap/esm/PageItem';



function References() {
    const location = useLocation();
    var p_id = location.state.user_id
    // const { user } = useContext(AuthContext);
    const { user, dispatch } = useContext(userContext);
    console.log(user.tokendata, 'userinfotoken')
    const [RefferenceData, setRefferenceData] = useState([]);
    var getReferenceData = async () => {

        var token = TokenHelper.getToken();

        //  alert(id)
        if (p_id !== '') {
            console.log("repeat");
            var response = await UserService.ReferenceData(p_id)

            if (response.data.success) {

                setRefferenceData(response.data.data)


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

    return (
        <>

            <div className="tab-pane fade common-table" id="references" role="tabpanel">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">References</h2>
                    </div>
                </div>

                <table style={{ border: '1px solid #000' }}>
                    <thead>
                        <tr>
                            <th>FirstReference</th>
                            <th>Second Reference</th>
                            <th>Third Reference</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>{RefferenceData.first_reference ? RefferenceData.first_reference : 'First Reference Not Available'}</td>
                            <td>{RefferenceData.second_reference ? RefferenceData.second_reference : 'Second Reference Not Available'}</td>
                            <td>{RefferenceData.third_reference ? RefferenceData.third_reference : 'Third Reference Not Available'}</td>
                           
                        </tr>
                       
                    </tbody>
                </table>
               
            </div>




        </>
    )
}

export default References