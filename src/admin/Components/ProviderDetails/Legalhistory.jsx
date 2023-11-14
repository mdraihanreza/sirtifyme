import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import AdminService from '../../services/admin.service';

import { useContext } from 'react';
import { toast } from 'react-toastify';
import { userContext } from '../../../store';
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
    
    const location = useLocation();
    // const { user } = useContext(AuthContext);
    const {user,dispatch} = useContext(userContext);
    const [LegalData, setLegalData] = useState([]);
    const [selectedValue, setSelectedValue] = useState({});
    const [LegalAnswerData, setLegalAnswerData] = useState([]);
    const [isOpen, setIsOpen] = useState({});
    console.log(user.tokendata, 'userinfotoken')
    var user_id=location.state.user_id
    //    var token=user.tokendata
    var getLegalhistory = async () => {

        var token = TokenHelper.getToken();

      

    
    //  alert(id)
    if (token !== null) {
            console.log("repeat");
            var response = await AdminService.getLegalhistory(user_id)
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
    const  handleAdditionChange = async (value) => {
        setIsOpen({explain: value })
        //  explaindata = {explain: value }
       }
    
    console.log(isOpen,'isOpen')
        console.log(LegalAnswerData, 'LegalAnswerData')
        const handleAdditionalInfoChange = async (id,answer) => {
        
            var explanationdata = { question_id: id,answer:answer,explain:isOpen.explain,user_id:user_id  }
            var response = await AdminService.postExplain(explanationdata);
    console.log(explanationdata,'explanationdata')
    if (response.data.success) {
        toast.success(response.data.message)
    }else{
        toast.error(response.data.message)
    }
    
    // setIsOpen(true);
    await getLegalhistory();
        }
   

console.log(LegalAnswerData,'LegalAnswerData')

  const handleRadioChange = async(event) => {
console.log(event.target.value)
console.log(event.target.id)
    // const handleRadioButtonClick = (event) => {
        var checkdata={answer:event.target.value,question_id:event.target.id,user_id:user_id}
        console.log(checkdata,'checkdata')
        setSelectedValue(checkdata);
        // setSelectedButtonId(event.target.id);
    //   };
  
    var response = await AdminService.LegalQuestionAnswer(checkdata);
    

    console.log(response.data.message)
    if (response.data.error) {
        toast.error(response.data.error.usererror)
    }
    if (response.data.success) {
        toast.success(response.data.message)
    }


    await getLegalhistory();

  
  };

  console.log(selectedValue,'selectedValue')

    useEffect(() => {
        getLegalhistory();
        // getLegalAnswer();

    }, []);
    console.log(LegalData, 'LegalData')
    console.log(LegalData.length, 'LegalDatalegth')
    return (
        <>





            <div className="tab-pane fade" id="history" role="tabpanel">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">Legal History</h2>
                    </div>
                </div>

                {LegalData.map((item, index) => {
                    return (<>
                        <form>
                            <div className="row">
                                <div className="col-md-12">
                                   
                                    <div className="form-group">
                                        <label>
                                            {item.question}
                                        </label>
                                        <div className="checkbox-grid">
                                            <label className="checkbox-label">
                                                Yes
                                                <input type="radio" name='options' value="Yes" id= {item._id}
                                                    checked={ item.answer=='Yes'}
                                                    onClick={handleRadioChange}
                                                     />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="checkbox-label">
                                                No
                                                <input type="radio" name='options' value="No"
                                                id= {item._id}
                                                checked={ item.answer=='No'}
                                                    onClick={handleRadioChange} />
                                                <span className="checkmark" />
                                            </label>
                                            {item.answer === 'Yes' && (
                                                <>
                                                    <input
                                                        type="text" value={item.explain}
                                                        placeholder="Add Your Explanation"
                                                        onChange={(e) => handleAdditionChange(e.target.value)} />
                                                    <input type='button' value="Save" onClick={(e) => handleAdditionalInfoChange(item._id, item.answer)} />
                                                    {/* <input type='button' value="Reset" onClick={() => handleResetExplanation(item._id)} /> */}
                                                </>
                                            )}
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </form>
                    </>)
                })}
            </div>



        </>
    )
}

export default Legalhistory