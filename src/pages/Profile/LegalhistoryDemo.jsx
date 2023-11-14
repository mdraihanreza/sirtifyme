import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
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
    const [isOpen, setIsOpen] = useState(false);

    //    var token=user.tokendata
    var getLegalhistory = async () => {

        var token = TokenHelper.getToken();


        //  alert(id)
        if (token !== null) {
            console.log("repeat");
            var response = await UserService.getLegalhistory(user.tokendata)
            console.log("legal ", response.data)

            //  alert(response.data)
            if (response.data.success) {


                setLegalData(response.data.data)

                console.log(response.data)
                var responsedata = response.data.data.map((i, index) => ({
                    question_id: i._id,
                    question: i.question,
                    answer: i.answer,
                    save_status: false
                }))
                console.log(responsedata,'responsedata')
                setLegalData(responsedata)
            }
        }
        else {
            console.log("not get token")
        }
    }



    console.log(LegalAnswerData, 'LegalAnswerData')

    const handleRadioChange = async (event) => {
        console.log(event.target.value)
        console.log(event.target.id)
        // const handleRadioButtonClick = (event) => {
        var checkdata = { answer: event.target.value, question_id: event.target.id }
        console.log(checkdata, 'checkdata')
        setSelectedValue(checkdata);
        // setSelectedButtonId(event.target.id);
        //   };

        var response = await UserService.postAnswer(checkdata);


        console.log(response.data.message)
        if (response.data.error) {
            toast.error(response.data.error.usererror)
        }
        if (response.data.success) {
            toast.success(response.data.message)
        }
        console.log(LegalData,'LegalData')
        if(checkdata.answer=='Yes'){
            const matchingObject = LegalData.find((item) => {
                return item.id === selectedValue.id && item.answer === selectedValue.answer;
              });
             console.log(matchingObject,'matchingObject')
             console.log(LegalData,'LegalData')
            var matchdata = LegalData.map((i, index) => ({
                question_id: i.question_id,
                question: i.question,
                answer: i.answer,
                save_status: true
            }))
            console.log(matchdata,'matchdata')
            setLegalData(matchdata)
        }
      
        await getLegalhistory();


    };

    console.log(selectedValue, 'selectedValue')
    console.log(LegalData, 'LegalData')

    // const isMatch = LegalData.some(item => item.id === selectedValue.id && item.name === selectedValue.name);
    // if (isMatch) {
    //     setIsOpen(true)
    //   } else {
    //     console.log('No match found');
    //   }
    console.log(LegalData.length, 'LegalDatalegth')

    useEffect(() => {
        getLegalhistory();
        // getLegalAnswer();

    }, []);
   
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
                                                <input type="radio" name='options' value="Yes" id={item._id}
                                                    checked={item.answer == 'Yes'}
                                                    onClick={handleRadioChange}
                                                />
                                                <span className="checkmark" />
                                            </label>
                                            {/* {isOpen && (
                                                <div>
                                                    <input type="text" placeholder="Enter text" />
                                                </div>)} */}
                                            <label className="checkbox-label">
                                                No
                                                <input type="radio" name='options' value="No"
                                                    id={item._id}
                                                    checked={item.answer == 'No'}
                                                    onClick={handleRadioChange} />
                                                <span className="checkmark" />
                                            </label>
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