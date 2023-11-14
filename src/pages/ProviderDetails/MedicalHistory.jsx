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
import { medicalSchema } from '../Schemas'
import { useFieldArray, useForm } from "react-hook-form";
import iconpluscircle from '../../assets/images/icon-plus-circle.svg';
import TokenHelper from '../TokenHelper';


function Medicalhistory() {
  const location = useLocation();
  var p_id = location.state.user_id
  // const { user } = useContext(AuthContext);
  const { user, dispatch } = useContext(userContext);
  const [MedicalData, setMedicalData] = useState([]);
  const [filename, setFilename] = useState("Select Your Document");
  const [filedataname, setFiledataname] = useState("Select Your Document");
  const [filedata, setCovidFile] = useState("");
  const [fluefiledata, setFluFile] = useState("");
  const [hepatitisdata, setHepatitisFile] = useState("");
  const [mmrfiledata, setMmrFile] = useState("");
  const [selectedButtonId, setSelectedButtonId] = useState('');
  console.log(user.tokendata, 'userinfotoken')

  //    var token=user.tokendata
  var getMedicalhistory = async () => {



    //  alert(id)
    if (p_id !== '') {
      console.log("repeat");
      var response = await UserService.MedicalHistoryData(p_id)
      console.log("legal ", response.data)

      if (response.data.success) {

        setCovidFile(response.data.data.covid_certificate)
        setFluFile(response.data.data.flu_certificate)
        setHepatitisFile(response.data.data.hepatitis_vaccine)
        setMmrFile(response.data.data.mmr_vaccine)
        setMedicalData(response.data.data)

        console.log(response.data)
      }
    }
    else {
      console.log("not get token")
    }
  }




  useEffect(() => {
    getMedicalhistory();

  }, []);


  return (
    <>
      <div className="tab-pane fade common-table" id="medical" role="tabpanel">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center">Medical History</h2>
          </div>
        </div>
        <form>
          <table>

            <tr>
              <th>Covid Certificate</th>
              <td>{MedicalData.covid_certificate ? <a href={filedata} target='_blank'><img src={view} className='viewicon' /></a> : <p>Certificate Not Available</p>}</td>
            </tr>
            <tr>
              <th>Covid 1st Vaccine Date</th>
              <td>{MedicalData.covid_date_1 ? MedicalData.covid_date_1 : ''}</td>
            </tr>
            <tr>
              <th>Covid 2nd Vaccine Date</th>
              <td>{MedicalData.covid_date_2 ? MedicalData.covid_date_2 : ''}</td>
            </tr>
            <tr>
              <th>Covid 3rd Vaccine Date</th>
              <td>{MedicalData.covid_date_3
                ? MedicalData.covid_date_3 : ''}</td>
            </tr>
            <tr>
              <th>Covid 4th Vaccine Date</th>
              <td>{MedicalData.covid_date_4
                ? MedicalData.covid_date_4 : ''}</td>
            </tr>
            <tr>
              <th>Flu Certificate</th>
              <td> {MedicalData.flu_certificate ? <a href={fluefiledata} target='_blank'><img src={view} className='viewicon' /></a> : <p>Certificate Not Available</p>}</td>
            </tr>
            <tr>
              <th>Flu Vaccine Date</th>
              <td>{MedicalData.flu_date ? MedicalData.flu_date
                : ''}
              </td>
            </tr>
            <tr>
              <th>Tetanus Certificate</th>
              <td> {MedicalData.flu_certificate ? <a href={fluefiledata} target='_blank'><img src={view} className='viewicon' /></a> : <p>Certificate Not Available</p>}</td>
            </tr>
            <tr>
              <th>Tetanus Vaccine Date</th>
              <td>{MedicalData.tetanus_date ? MedicalData.tetanus_date
                : ''}
              </td>
            </tr>
            <tr>
              <th>MMR</th>
              <td> {MedicalData.mmr_vaccine
                ? <a href={mmrfiledata} target='_blank'><img src={view} className='viewicon' /></a> : ''}</td>
            </tr>
            <tr>
              <th>MMR Immune </th>
              <td>{MedicalData.mmr_immune
                ? MedicalData.mmr_immune

                : ''}
              </td>
            </tr>
            <tr>
              <th>Hepatitis B</th>
              <td>{MedicalData.hepatitis_vaccine
                ? <a href={hepatitisdata} target='_blank'><img src={view} className='viewicon' /></a> : ''}</td>
            </tr>
            <tr>
              <th>Hepatitis B Immune </th>
              <td>{MedicalData.hepatitis_immune
                ? MedicalData.hepatitis_immune
                : ''}
              </td>
            </tr>
          </table>

        </form>
      </div>



    </>
  )
}

export default Medicalhistory