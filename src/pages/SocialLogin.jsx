import React, { useCallback, useState } from 'react';
// import './app.css';
// import  User  from './User';
import UserService from "../services/user.service";
import { AuthContext } from '../App';
import { useNavigate } from "react-router-dom"
import { useContext } from 'react';
import { userContext } from '../store';
import { Link, useLocation } from 'react-router-dom';
import TokenHelper from '../pages/TokenHelper';
import { toast } from 'react-toastify';
import googeicon from '../assets/images/icon-google.svg'
import facebookicon from '../assets/images/icon-facebook.svg'
import instagramicon from '../assets/images/Insta.svg'
import {
  LoginSocialGoogle,

  LoginSocialFacebook,
  LoginSocialInstagram,
} from 'reactjs-social-login';

import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { Button } from 'react-bootstrap';



// import { ReactComponent as PinterestLogo } from './assets/pinterest.svg';

// const REDIRECT_URI = 'https://plenty-planets-beam-42-118-51-2.loca.lt/account/login';
// const REDIRECT_URI = 'http://localhost:3001/'
const REDIRECT_URI = 'https://sirtifyme.elvirainfotech.org/'

const SocialLoginButtons2 = () => {
  const [fb, setfb] = useState(false);
  // const [gl, setgl] = useState(false);
  const { userState, dispatch } = useContext(userContext);
  const navigate = useNavigate();
  let location = useLocation();
  location = location.state ? location : { state: { provider_status: true } }
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState({ status: false, data: {} });
  const [usertype, setusertype] = useState('');

  const onLoginStart = useCallback(() => {
    // alert('login start');

    // return;
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider('');
    // alert('logout success');
  }, []);
  const handleChange = (event) => {
    const selectedOptionValue = event.target.value;
    setusertype(selectedOptionValue);
    setfb(true)
  };
  console.log(usertype, 'usertype')
  const onLogout = useCallback(() => { }, []);
  console.log(profile, 'profile')

  const apiCall = useCallback(async (data,user_type) => {

    // alert("name ", user_type)
    var form = new FormData();
    form.append("email", data.email);
    form.append("name", data.name)
    form.append("social_id", data.userID)
    // form.append("profile_image",data.picture[0])
    form.append("registered_from", "3")
    form.append("user_type",user_type)
    var response = await UserService.socialLogin(form);
    // alert(response,'response')
    if (response.data.success == false) {
      toast.error(response.data.msg)
    }
    if (response.data.success) {

      console.log(response.data, 'token')
      TokenHelper.setToken(response.data.token)
      // dispatch({ type: "tokendata", value: response.data.token });
      // dispatch({ type: "id", value: response.data.data.id });
      // dispatch({ type: "name", value: response.data.data.name });
      // dispatch({ type: "email", value: response.data.data.email });
      // dispatch({ type: "only_mobile_no", value: response.data.data.only_mobile_no });
      // dispatch({ type: "user_type", value: response.data.data.user_type });
      // TokenHelper.setToken(response.data.token)
      // TokenHelper.setUserInfo(response.data.data)
      // user.setToken(response.data.token)
      // user.setUserInfo(response.data.data[0])
      // TokenHelper.setToken(response.data.token)
      // TokenHelper.setUserInfo(response.data.data[0])
      navigate(`/`)
      toast.success(response.data.message)
      console.log(response.data)
      window.location.reload();
    }

    console.log(response.data)

  }, [])

  const googleapiCall = useCallback(async (data,user_type) => {

    console.log("name ", user_type)
    var form = new FormData();
    form.append("email", data.email);
    form.append("name", data.name)
    form.append("social_id", data.sub)
    form.append("profile_image", data.picture)
    form.append("registered_from", "2")
    form.append("user_type", user_type)
    var response = await UserService.socialLogin(form);
    // alert(response,'response')
    if (response.data.success == false) {
      toast.error(response.data.msg)
    }
    if (response.data.success) {

      console.log(response.data, 'token')
      TokenHelper.setToken(response.data.token)
      navigate(`/`)
      toast.success(response.data.message)
      console.log(response.data)
      window.location.reload();
    }

    console.log(response.data)

  }, [])
  return (
    <>
      {/* {provider && profile && (
        <User provider={provider} profile={profile} onLogout={onLogout} />
      )} */}
      <div className={`App ${provider && profile ? 'hide' : ''}`}>

        <div className="form-group">
          <label>User Type</label>
          <select className="form-select" onChange={handleChange}>
            <option value={""}>Select User Type</option>
            {/* ====== non provider ======== */}
            {location.state.provider_status && <>
              <option value={1} >Physician Assistants</option>
              <option value={2} >Nurse Practitioners</option>
              <option value={3} >Physicians</option>
            </>}

            {/* ====== provider ======= */}
            {!location.state.provider_status && <>
              <option value={4} >Private Recruiters</option>
              <option value={5} >Hospital</option>
              <option value={6} >Third Party Credentialing Companies</option>
            </>}
          </select>

        </div>
        {fb && <LoginSocialFacebook
            appId='1474410586671010'
          // appId='666917635311326'
          fieldsProfile={
            'first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
          }
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          redirect_uri={REDIRECT_URI}



          onResolve={({ provider, data }) => {
            console.log(data)
            setProvider(provider);
            setProfile(data);
            apiCall(data,usertype)
          }}
          onReject={err => {
            console.log(err);
          }}
        >
          < Button className="round-btn">
            <img
              src={facebookicon}
              alt=""
            />
            Facebook
          </Button>
        </LoginSocialFacebook>}
        {/* {!fb &&

          // <FacebookLoginButton onClick={() => setfb(true)} />}
          <FacebookLoginButton onClick={() => {
            if (!fb) {
              alert("choose user type!");
            }
          }} />} */}

        {!fb && <Button className="round-btn" onClick={() => {
          if (!fb) {
            toast.warning("choose user type!")
          }
        }}>
          <img
            src={facebookicon}
            alt=""
          />
          Facebook
        </Button>}


        {fb && <LoginSocialGoogle
        client_id={process.env.REACT_APP_GG_APP_ID || '9315142834066784-lbhgocfm23qv0trrrytryyt6gp5qfj019hnp2gp.apps.googleusercontent.com'}
          // client_id={process.env.REACT_APP_GG_APP_ID || '931514283404-lbhgocfm23qv0trr6gp5qfj019hnp2gp.apps.googleusercontent.com'}
          onLoginStart={onLoginStart}
          redirect_uri={REDIRECT_URI}
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={async ({ provider, data }) => {
            console.log(data)
            // var aa={status:true,data:data}
            // setProfile({...profile,aa});
            googleapiCall(data,usertype)
            // const dataSubmit = async (data) => {
            // var fdata = new FormData();
            // fdata.append("email", data.email);
            // fdata.append("password", data.password);


            // }
            // setProvider(provider);
            // setProfile(data);
          }}
          onReject={err => {
            console.log(err);
          }}
        >
         <Button className="round-btn" >

          <img
            src={googeicon}
            alt=""

          />
          Google
        </Button>
        </LoginSocialGoogle>}

        {!fb && <Button className="round-btn" onClick={() => {
          if (!fb) {
            // alert("choose user type!");
            toast.warning("choose user type!")
          }
        }}>

          <img
            src={googeicon}
            alt=""

          />
          Google
        </Button>}

        {fb && <LoginSocialInstagram
          client_id={process.env.REACT_APP_GG_APP_ID || '322733630181975'}
          onLoginStart={onLoginStart}
          redirect_uri={REDIRECT_URI}
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={async ({ provider, data }) => {
            console.log(data)
            // var aa={status:true,data:data}
            // setProfile({...profile,aa});
            googleapiCall(data,usertype)
           
          }}
          onReject={err => {
            console.log(err);
          }}
        >
         <Button className="round-btn" >

          <img
            src={instagramicon}
            alt=""

          />
          Instagram
        </Button>
        </LoginSocialInstagram>}

        {!fb && <Button className="round-btn" onClick={() => {
          if (!fb) {
            // alert("choose user type!");
            toast.warning("choose user type!")
          }
        }}>

          <img
            src={instagramicon}
            alt=""

          />
          Instagram
        </Button>}

      </div>
    </>
  );
};

export default SocialLoginButtons2;