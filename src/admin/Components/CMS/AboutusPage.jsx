
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
import RichTextEditor from 'react-rte';



function AboutusPage() {






  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  // this.setState({ value: RichTextEditor.createValueFromString(text, 'html') });

  const [text, setText] = useState("");
  const [Idvalue, setIdvalue] = useState("");
  const [loader, setLoader] = useState(false);
  const handleEditorChange = (newValue) => {

    setValue(newValue);
    setText(newValue.toString('html'));
   
  };
  var getAboutusData = async () => {

    var token = TokenHelper.getToken();


    //  alert(id)
    if (token !== null) {
      console.log("repeat");
      var response = await AdminService.getAboutus(token)

      if (response.data.success) {
        // setText(response.data.data.content);
        setIdvalue(response.data.data.about_us_id);
        setValue(RichTextEditor.createValueFromString(response.data.data.content,'html'));
      //   reset({
         
      //     content: response.data.data.content
      // })


        console.log(response.data)
      }
    }
    else {
      console.log("not get token")
    }
  }
  //  getProfileData();
  useEffect(() => {
    getAboutusData();

  }, []);
  const dataSubmit = async () => {
    setLoader(true);
    // alert(data.profile_image)
    // console.log("fdata  ", data.cv[0]);

    var fdata = new FormData();
    fdata.append("content", text);
    fdata.append("about_us_id",Idvalue)


    var response = await AdminService.PostAboutus(fdata);
    // alert(response,'response')

    console.log(response.data.message)
    // if (response.data.error) {
    //   setLoader(false);
    //   toast.error(response.data.error.usererror)
    // }
    if (response.data.success) {
      setLoader(false);
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }

    console.log(response.data)
    reset()
    await getAboutusData();



  }
  const { register, formState: { errors }, watch, reset } = useForm({
   
    mode: "all"
  });
  console.log(text, ' text')
  console.log(value, ' value')
  return (
    <>
      <div className='about_title'>
        <h3>About Us</h3>
      </div>
      <RichTextEditor className='about_text' value={value} onChange={handleEditorChange} />
      <div className="col-md-12 text-center about_btn">
        <input type="submit" className="submit" onClick={dataSubmit} value="Save" />
      </div>
      {loader && <Loader />}
    </>

  );
}

export default AboutusPage
