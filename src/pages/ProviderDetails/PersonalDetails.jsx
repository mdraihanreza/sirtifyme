import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import UserService from '../../services/user.service';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import view from '../../assets/images/view.png';
import avtar from '../../assets/images/iconlogo.png';
import imgupload from '../../assets/images/img-upload.png';
import { useForm } from 'react-hook-form';
import Licensure from './Licensure';
import Certificate from './Certifications';
import { userContext } from '../../store';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle';
import CurrentEmployement from './CurrentEmployement';
import Education from './Education';
import Legalhistory from './Legalhistory';
import Medicalhistory from './MedicalHistory';
import References from './Reference';
import jQuery from "jquery";
import TokenHelper from '../TokenHelper';

function PersonalDetails() {
    const location = useLocation();
    var p_id = location.state.user_id
    console.log(p_id, 'p_id')
    const [UserProfileData, setUserProfileData] = useState([]);

    const [filename, setFilename] = useState("Select Your Document");
    const [filedata, setFiledata] = useState("");


    //    var token=user.tokendata
    var getProfileData = async () => {


        //  alert(id)
        if (p_id !== '') {
            console.log("repeat");
            var response = await UserService.getProviderProfile(p_id)


            if (response.data.success) {
                // setFilename(response.data.data.cv)
                setFiledata(response.data.data.cv)
                setUserProfileData(response.data.data)

                console.log(response.data)
            }
        }
        else {
            console.log("not get token")
        }
    }

    //  getProfileData();
    useEffect(() => {



        getProfileData();

    }, []);

    console.log(UserProfileData, 'UserProfileData')


    return (
        <>
            {/* =================== Profile Start================================ */}
            <section className="profile">
                <div className="container">
                    {/* =================== Profile Start================================ */}
                    <div className="out-wrap">
                        <div className="tab-nav-wrapper">
                            <ul className="nav-pills" id="tabs" role="tablist">


                                <li className="nav-item" role="presentation">
                                    <a
                                        href="#pills-home"
                                        className="nav-link active"
                                        role="tab"
                                        data-bs-toggle="tab"
                                    >
                                        Personal Details
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a
                                        href="#pills-profile"
                                        role="tab"
                                        className="nav-link"
                                        data-bs-toggle="tab"
                                    >
                                        Licensure
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a
                                        href="#pills-contact"
                                        role="tab"
                                        className="nav-link"
                                        data-bs-toggle="tab"
                                    >
                                        Certifications
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a
                                        href="#current-employment"
                                        role="tab"
                                        className="nav-link"
                                        data-bs-toggle="tab"
                                    >
                                        Current Employment
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a href="#education" role="tab" className="nav-link" data-bs-toggle="tab">
                                        Education
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a href="#history" role="tab" className="nav-link" data-bs-toggle="tab">
                                        Legal History
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a href="#medical" role="tab" className="nav-link" data-bs-toggle="tab">
                                        Medical History
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a
                                        href="#references"
                                        role="tab"
                                        className="nav-link"
                                        data-bs-toggle="tab"
                                    >
                                        References
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="tab-content tab-content-wrapper registration-form-main" id="pills-tabContent">
                            <div className="tab-pane active" id="pills-home" role="tabpanel">
                                <form id="form-image" >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="avatar-upload">
                                                <div className="avatar-edit">
                                                    <label htmlFor="imageUpload">
                                                        <img
                                                            className="img-responsive rounded-circle"
                                                            src={imgupload}
                                                            alt=""
                                                        />
                                                    </label>

                                                </div>
                                                <div className="avatar-preview">
                                                    {UserProfileData.profile_picture ? <img
                                                        className="profile-user-img img-responsive rounded-circle"
                                                        id="imagePreview"
                                                        src={UserProfileData.profile_picture}
                                                        alt=""
                                                    /> : <img
                                                        className="profile-user-img img-responsive rounded-circle"
                                                        id="imagePreview"
                                                        src={avtar}
                                                        alt=""
                                                        value={UserProfileData ? UserProfileData.profile_picture : ''}
                                                    />}


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" className="form-control" value={UserProfileData ? UserProfileData.name : ''} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Email ID</label>
                                                <input type="email" className="form-control" value={UserProfileData ? UserProfileData.email : ''} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input

                                                    className="form-select countrydropdown"
                                                    value={UserProfileData ? UserProfileData.country_code : ''} readOnly
                                                />

                                                <input
                                                    type="number"
                                                    className="form-control phoneinput"
                                                    placeholder="Mobile Number"
                                                    value={UserProfileData ? UserProfileData.only_mobile_no : ''} readOnly
                                                />

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label> CV </label>
                                            <div
                                                className="form-group"

                                            >
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    disabled

                                                />
                                                {UserProfileData.cv ? <a href={filedata} target='_blank'><img src={view} className='viewicon' /></a> : <p>No File uploaded</p>}

                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <Licensure />
                            <Certificate />
                            <CurrentEmployement />
                            <Education />
                            <Legalhistory />
                            <Medicalhistory />
                            <References />
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}

export default PersonalDetails