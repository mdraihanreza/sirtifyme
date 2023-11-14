import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import UserService from '../../services/user.service';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { userContext } from '../../store';
import { yupResolver } from '@hookform/resolvers/yup';
import FileBase64 from 'react-file-base64';
import view from '../../assets/images/view.png';
import TokenHelper from '../TokenHelper';
// import { licenseSchema } from '../Schemas';
import { licenseDataSchema } from '../Schemas';
import { licenseSchema } from '../Schemas'
import { useFieldArray, useForm } from "react-hook-form";
import iconpluscircle from '../../assets/images/icon-plus-circle.svg';



function Legalhistory() {
    // const { user } = useContext(AuthContext);
    const { user, dispatch } = useContext(userContext);
    const [LegalData, setLegalData] = useState([]);
    const [selectedValue, setSelectedValue] = useState({});
    const [LegalAnswerData, setLegalAnswerData] = useState([]);
    console.log(user.tokendata, 'userinfotoken')
    const location = useLocation();
    var p_id = location.state.user_id
    console.log(p_id, 'p_id')
    //    var token=user.tokendata
    var getLegalhistory = async () => {




        //  alert(id)
        if (p_id !== '') {
            console.log("repeat");
            var response = await UserService.LegalHistoryData(p_id)
            console.log("legal ", response.data)

            //  alert(response.data)
            if (response.data.success) {


                setLegalData(response.data.data)

                console.log(response.data)
            }
        }
        else {
            console.log("not get token")
        }
    }




    useEffect(() => {
        getLegalhistory();
        // getLegalAnswer();

    }, []);
    console.log(LegalData, 'LegalData')
    console.log(LegalData.length, 'LegalDatalegth')
    return (
        <>

            <div className="tab-pane fade common-table" id="history" role="tabpanel">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">Legal History</h2>
                    </div>
                </div>


                <div className="row">
                    <table>
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Answer</th>

                            </tr>
                        </thead>
                        <tbody>

                            {LegalData.map((item, index) => {
                                 return (
                                    <>
                                <tr key={index}>

                                    <td>{item.question}</td>
                                    <td>{item.answer}</td>
                                </tr>
                                </>
                                 )
                            })}
                        </tbody>
                    </table>
                </div>


            </div>



        </>
    )
}

export default Legalhistory