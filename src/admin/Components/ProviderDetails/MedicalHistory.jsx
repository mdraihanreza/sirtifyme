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
import { medicalSchema } from '../Schemas'
import { useFieldArray, useForm } from "react-hook-form";
import iconpluscircle from '../../assets/images/icon-plus-circle.svg';
import TokenHelper from '../TokenHelper';


function Medicalhistory() {
  const location = useLocation();
  // const { user } = useContext(AuthContext);
  const {user,dispatch} = useContext(userContext);
  const [MedicalData, setMedicalData] = useState([]);
  const [filename, setFilename] = useState("Select Your Document");
  const [filedataname, setFiledataname] = useState("Select Your Document");
  const [TetanusFilename, setTetanusFilename] = useState("Select Your Document");
  const [MMRFilename, setMMRFilename] = useState("Select Your Document");
  const [Hepaname, setHepaname] = useState("Select Your Document");
  const [filedata, setCovidFile] = useState("");
  const [fluefiledata, setFluFile] = useState("");
  const [tetnusfiledata, setTetnusFile] = useState("");
  const [mmrfiledata, setMMRFile] = useState("");
  const [hepatitisfiledata, sethepaFile] = useState("");
  const [selectedButtonId, setSelectedButtonId] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [loader, setLoader] = useState(false);
  console.log(user.tokendata, 'userinfotoken')
  var user_id=location.state.user_id
  //    var token=user.tokendata

  const [CV4Toggledata, setCV4Toggledata] = useState(true);
  const [CV3Toggledata, setCV3Toggledata] = useState(true);
  const [CV2Toggledata, setCV2Toggledata] = useState(true);

  const handleCV4Toggledata = () => {
    setCV4Toggledata(!CV4Toggledata); // Toggle the state
};
const handleCV3Toggledata = () => {
  setCV3Toggledata(!CV3Toggledata); // Toggle the state
};
const handleCV2Toggledata = () => {
  setCV2Toggledata(!CV2Toggledata); // Toggle the state
};

  var getMedicalhistory = async () => {
    var token = TokenHelper.getToken();


    //  alert(id)

   
    if (token !== null) {
      console.log("repeat");
      var response = await AdminService.getMedicalhistory(user_id)
      console.log("legal ", response.data)

      if (response.data.success) {
        reset({
          mmr_vaccine: response.data.data.mmr_vaccine,
          hepatitis_vaccine: response.data.data.hepatitis_vaccine,

          flu_certificate: response.data.data.flu_certificate,
          covid_certificate: response.data.data.covid_certificate,
          covid_date_1:response.data.data.covid_date_1,
          covid_date_2:response.data.data.covid_date_2,
          covid_date_3:response.data.data.covid_date_3,
          covid_date_4:response.data.data.covid_date_4,
          flu_date:response.data.data.flu_date,
          tetanus_date:response.data.data.tetanus_date,
        
          
        })
        setSelectedValue(response.data.data.mmr_immune)
        setSelectValue(response.data.data.hepatitis_immune)
        setCovidFile(response.data.data.covid_certificate)
        setFluFile(response.data.data.flu_certificate)
        setTetnusFile(response.data.data.tetanus)
        setMMRFile(response.data.data.mmr_vaccine)
        sethepaFile(response.data.data.hepatitis_vaccine)
        setMedicalData(response.data.data)

        console.log(response.data)
        if (response.data.data.covid_date_4_status == "No") {
          // alert('second')
          setCV4Toggledata(false);
      }
      if (response.data.data.covid_date_3_status == "No") {
        // alert('second')
        setCV3Toggledata(false);
    }
    if (response.data.data.covid_date_2_status == "No") {
      // alert('second')
      setCV2Toggledata(false);
  }
      }
    }
    else {
      console.log("not get token")
    }
  }




  useEffect(() => {
    getMedicalhistory();

  }, []);
  const handleRadioChange = async(event) => {
    var checkdata=event.target.value
    console.log(checkdata,'checkdata')
    setSelectedValue(checkdata);
    console.log(event.target.value)
  }
  const handleChange = async(event) => {
    var checkdata=event.target.value
    console.log(checkdata,'checkdata')
    setSelectValue(checkdata);
    console.log(event.target.value)
  }
  
  const dataSubmit = async (data) => {
    setLoader(true);
    // alert(data.profile_image)
    // console.log("fdata  ", data.cv[0]);
    console.log(data)
    console.log(selectedValue)
    console.log(selectValue)
    //return false;
    var fdata = new FormData();
    fdata.append("mmr_vaccine", data.mmr_vaccine[0]);
    fdata.append("hepatitis_vaccine", data.hepatitis_vaccine[0]);
    fdata.append("flu_certificate", data.flu_certificate[0]);
    fdata.append("covid_certificate", data.covid_certificate[0]);
    fdata.append("tetanus", data.tetanus[0]);
    fdata.append("covid_date_1", data.covid_date_1);
    fdata.append("covid_date_2", data.covid_date_2);
    fdata.append("covid_date_2_status", CV2Toggledata);
    fdata.append("covid_date_3", data.covid_date_3);
    fdata.append("covid_date_3_status", CV3Toggledata);
    fdata.append("covid_date_4", data.covid_date_4);
    fdata.append("covid_date_4_status", CV4Toggledata);
    fdata.append("flu_date", data.flu_date);
    fdata.append("tetanus_date", data.tetanus_date);
    // fdata.append("tetanus", data.tetanus[0]);
    fdata.append("mmr_immune", selectedValue);
    fdata.append("user_id", user_id);
    fdata.append("hepatitis_immune", selectValue);
    

    var response = await AdminService.updateMedicalHistory(fdata);
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
    await getMedicalhistory();



}
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    resolver: yupResolver(medicalSchema),
    mode: "all"
});
  return (
    <>
      <div className="tab-pane fade" id="medical" role="tabpanel">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center">Medical History</h2>
          </div>
        </div>
        <form action="" method="post" id="form-image" onSubmit={handleSubmit(dataSubmit)}>
        <div className="row">
        <div className="col-md-6">
              <label>Covid</label>
              <div
                className="form-group custom-file-button upload"
                data-text="Select your file!"
              >
                <input type="file" className="form-control" id="file-upload-field"  {...register("covid_certificate")} onChange={e => setFilename((e.target.files && e.target.files[0].name))} accept=".doc,.docx,.pdf" />
                {MedicalData.covid_certificate ? <a href={filedata} target='_blank'><img src={view} className='viewicon' /></a> : <span className="filename">{filename}</span>}
                <p className='form-field-error'>{errors.covid_certificate?.message}</p>
              </div>
            </div>

            <div className="col-md-6">
              <label>Covid 1st Vaccine Date</label>
              <div className="input-date">
                  <input
                    type="date"
                    id="expiry-date1"
                    {...register("covid_date_1")}
                    className="form-control"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
            </div>

            <div className="col-md-4">
              <label>Covid 2nd Vaccine Date</label>
              <label class="switch">
                  <input type="checkbox" id="togBtn" checked={CV2Toggledata}
                    onChange={handleCV2Toggledata} />
                  <div class="slider round"></div>
                </label>
              {CV2Toggledata &&
              <div className="input-date">
                  <input
                    type="date"
                    id="expiry-date1"
                    {...register("covid_date_2")}
                    className="form-control"
                    placeholder="DD/MM/YYYY"
                  />
                </div>}
            </div>

            <div className="col-md-4">
              <label>Covid 3rd Vaccine Date</label>
              <label class="switch">
                  <input type="checkbox" id="togBtn" checked={CV3Toggledata}
                    onChange={handleCV3Toggledata} />
                  <div class="slider round"></div>
                </label>
              {CV3Toggledata &&
              <div className="input-date">
                  <input
                    type="date"
                    id="expiry-date1"
                    {...register("covid_date_3")}
                    className="form-control"
                    placeholder="DD/MM/YYYY"
                  />
                </div>}
            </div>

            <div className="col-md-4">
              <label>Covid 4th Vaccine Date</label>
              <label class="switch">
                  <input type="checkbox" id="togBtn" checked={CV4Toggledata}
                    onChange={handleCV4Toggledata} />
                  <div class="slider round"></div>
                </label>
                {CV4Toggledata &&
              <div className="input-date">
                  <input
                    type="date"
                    id="expiry-date1"
                    {...register("covid_date_4")}
                    className="form-control"
                    placeholder="DD/MM/YYYY"
                  />
                </div>}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
                <label>Flu</label>
                <div
                  className="form-group custom-file-button upload"
                  data-text="Select your file!"
                >
                  <input type="file" className="form-control" id="file-upload-field"  {...register("flu_certificate")} onChange={e => setFiledataname((e.target.files && e.target.files[0].name))} accept=".doc,.docx,.pdf" />
                  {MedicalData.flu_certificate ? <a href={fluefiledata} target='_blank'><img src={view} className='viewicon' /></a> : <span className="filename">{filedataname}</span>}
                  <p className='form-field-error'>{errors.flu_certificate?.message}</p>
                </div>
              </div>

              <div className="col-md-4">
                <label>Flu Vaccine Date</label>
                <div className="input-date">
                    <input
                      type="date"
                      id="expiry-date1"
                      {...register("flu_date")}
                      className="form-control"
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
              </div>
          </div>


          <div className="row">
            <div className="col-md-6">
                <label>Tetanus</label>
                <div
                  className="form-group custom-file-button upload"
                  data-text="Select your file!"
                >
                  <input type="file" className="form-control" id="file-upload-field"  {...register("tetanus")} onChange={e => setTetanusFilename((e.target.files && e.target.files[0].name))} accept=".doc,.docx,.pdf" />
                  {MedicalData.tetanus ? <a href={tetnusfiledata} target='_blank'><img src={view} className='viewicon' /></a> : <span className="filename">{TetanusFilename}</span>}
                  <p className='form-field-error'>{errors.tetanus?.message}</p>
                </div>
              </div>

              <div className="col-md-4">
                <label>Tetanus Vaccine Date</label>
                <div className="input-date">
                    <input
                      type="date"
                      id="expiry-date1"
                      {...register("tetanus_date")}
                      className="form-control"
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
              </div>
          </div>


          <div className="row">
            <div className="col-md-6">
                  <label>MMR</label>
                  <div
                    className="form-group custom-file-button upload"
                    data-text="Select your file!"
                  >
                    <input type="file" className="form-control" id="file-upload-field"  {...register("mmr_vaccine")} onChange={e => setMMRFilename((e.target.files && e.target.files[0].name))} accept=".doc,.docx,.pdf" />
                    {MedicalData.mmr_vaccine ? <a href={mmrfiledata} target='_blank'><img src={view} className='viewicon' /></a> : <span className="filename">{MMRFilename}</span>}
                    <p className='form-field-error'>{errors.mmr_vaccine?.message}</p>
                  </div>
                </div>

                <div className="col-md-4">
                <div className="form-group">
                    <label> MMR Immune </label>
                    <div className="checkbox-grid">
                        <label className="checkbox-label">
                            Yes
                            <input type="radio" value="Yes" checked={selectedValue=='Yes'}   onClick={handleRadioChange}  id="mmr_immune_id" name="mmr"/>
                            <span className="checkmark" />
                        </label>
                        <label className="checkbox-label">
                            No
                            <input type="radio" value="No" checked={selectedValue=='No'}  onClick={handleRadioChange} id="mmr_immune_id" name="mmr" />
                            <span className="checkmark" />
                        </label>
                    </div>
                </div>
            </div>
          </div>


          <div className="row">
            <div className="col-md-6">
                  <label>Hepatitis B</label>
                  <div
                    className="form-group custom-file-button upload"
                    data-text="Select your file!"
                  >
                    <input type="file" className="form-control" id="file-upload-field"  {...register("hepatitis_vaccine")} onChange={e => setHepaname((e.target.files && e.target.files[0].name))} accept=".doc,.docx,.pdf" />
                    {MedicalData.hepatitis_vaccine ? <a href={hepatitisfiledata} target='_blank'><img src={view} className='viewicon' /></a> : <span className="filename">{Hepaname}</span>}
                    <p className='form-field-error'>{errors.hepatitis_vaccine?.message}</p>
                  </div>
                </div>

                <div className="col-md-4">
                <div className="form-group">
                    <label> Hepatitis B Immune </label>
                    <div className="checkbox-grid">
                        <label className="checkbox-label">
                            Yes
                            <input type="radio" value="Yes" checked={selectValue=='Yes'} id="heppatitis_immune_id"  onClick={handleChange}  name="myRadio"/>
                            <span className="checkmark" />
                        </label>
                        <label className="checkbox-label">
                            No
                            <input type="radio" value="No" checked={selectValue=='No'} id="heppatitis_immune_id"  onClick={handleChange}  name="myRadio" />
                            <span className="checkmark" />
                        </label>
                    </div>
                </div>
            </div>
          </div>

          
          <div className="row">
            <div className="col-md-12 text-center">
            <button type="submit" className='submit_button' name="submit">Update</button>
            </div>
           
          </div>
        </form>
        {loader && <Loader />}
      </div>



    </>
  )
}

export default Medicalhistory