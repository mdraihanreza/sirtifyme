import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import UserService from '../../services/user.service';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { userContext } from '../../store';
import view from '../../assets/images/view.png';
import TokenHelper from '../TokenHelper';
// import { licenseSchema } from '../Schemas';
import { educationSchema } from '../Schemas';
import { licenseSchema } from '../Schemas'
import { useFieldArray, useForm } from "react-hook-form";
import iconpluscircle from '../../assets/images/icon-plus-circle.svg';

const educationInfo = {
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
    var user_id = location.state.user_id
    console.log(user_id, 'p_id')
    const [EducationData, setEducationData] = useState([]);
    const [AdditionalData, setAdditionalData] = useState([]);
    const [filename, setFilename] = useState("Select Your Document");
    const [filedata, setFiledata] = useState("");


    //    var token=user.tokendata
    var getEducationData = async () => {


        //  alert(id)
        if (user_id !== '') {
            console.log("repeat");
            var response = await UserService.getProviderEducation(user_id)


            if (response.data.success) {
                var responsedata = response.data.additional_data.map((i, index) => ({
                    education_name:i.education_name,
                    edu_name: i.edu_name,
                    from_year: i.from_year,
                    to_year: i.to_year,


                }))


                setEducationData(response.data.data)
                setAdditionalData(responsedata)

                console.log(response.data)
            }
        }
        else {
            console.log("not get token")
        }
    }

console.log(AdditionalData,'AdditionalData')

    useEffect(() => {
        getEducationData();

    }, []);

    return (
        <>
            {/* =================== Profile Start================================ */}



            <div className="tab-pane fade common-table" id="education" role="tabpanel">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">Education</h2>
                    </div>
                </div>
                <form>
                    <div className="row">
                        <table style={{ border: '1px solid #000' }}>
                            <thead>
                                <tr>
                                <th>Education</th>
                                    <th>Institute Name</th>
                                    <th>From Year</th>
                                    <th>To Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr>
                                <td>Undergraduate</td>
                                    <td>{EducationData ? EducationData.ug_institute_name : ''}</td>
                                    <td>{EducationData ? EducationData.ug_from_year : ''}</td>
                                    <td>{EducationData ? EducationData.ug_to_year : ''}</td>
                                </tr>
                                <tr>
                                <td>Graduate</td>
                                {EducationData.g_status=="Yes" ? <td>{EducationData ? EducationData.g_institute_name : ''}</td>:"Graduation  Not Available"}
                                {EducationData.g_status=="Yes" && <td>{EducationData ? EducationData.g_from_year : ''}</td>}
                                {EducationData.g_status=="Yes" && <td>{EducationData ? EducationData.g_to_year : ''}</td>}
                                </tr>
                                <tr>
                                <td>Medical School</td>
                                {EducationData.med_status=="Yes" ?<td>{EducationData ? EducationData.med_institue_name : ''}</td>:"Medical Education Not Available"}
                                {EducationData.med_status=="Yes" &&  <td>{EducationData ? EducationData.med_school_from_year : ''}</td>}
                                {EducationData.med_status=="Yes" &&  <td>{EducationData ? EducationData.med_school_to_year : ''}</td>}
                                </tr>
                                {AdditionalData.map((item, index) => (
                                <tr key={index}>
                                     <td>{item.education_name}</td>
                                    <td>{item.edu_name}</td>
                                    <td>{item.from_year}</td>
                                    <td>{item.to_year}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>
                </form>
            </div>



        </>
    )
}

export default Education