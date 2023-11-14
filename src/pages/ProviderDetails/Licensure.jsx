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
import TokenHelper from '../TokenHelper';

import { licenseDataSchema } from '../Schemas';
import { licenseSchema } from '../Schemas'
import { useFieldArray, useForm } from "react-hook-form";
import iconpluscircle from '../../assets/images/icon-plus-circle.svg';





function Licensure() {



    const [Nldata, setNldata] = useState("");
    const [Sldata, setSldata] = useState("");
    const [Cdsdata, setCdsdata] = useState("");
    const [Deadata, setDeadata] = useState("");

    const location = useLocation();
    var user_id = location.state.user_id
    console.log(user_id, 'p_id')
    const [LicenseData, setLicenseData] = useState([]);
    const [AdditionalData, setAdditionalData] = useState([]);
    const [filename, setFilename] = useState("Select Your Document");
    const [filedata, setFiledata] = useState("");


    //    var token=user.tokendata
    var getLicenseData = async () => {


        //  alert(id)
        if (user_id !== '') {
            console.log("repeat");
            var response = await UserService.getProviderLicense(user_id)


            if (response.data.success) {
                var responsedata = response.data.additional_data.map((i, index) => ({
                    license_name: i.license_name,
                    additional_license_name: i.license_file,
                    license_issue_date: i.license_issue_date,
                    license_expiry_date: i.license_expiry_date,
                    save_status: true,
                }))

                setNldata(response.data.data.national_license_file)
                setSldata(response.data.data.state_license_file)
                setCdsdata(response.data.data.cds_license_file)
                setDeadata(response.data.data.dea_license_file)
                setLicenseData(response.data.data)
                setAdditionalData(responsedata)

                console.log(response.data)
            }
        }
        else {
            console.log("not get token")
        }
    }
    console.log(Nldata, 'Nldata')
    console.log(Sldata, 'Sldata')
    console.log(Cdsdata, 'Cdsdata')
    console.log(Deadata, 'Deadata')


    useEffect(() => {



        getLicenseData();

    }, []);

    console.log(LicenseData, 'LicenseData')
    console.log(AdditionalData, 'AdditionalData')


    return (
        <>
            {/* =================== Profile Start================================ */}



            <div className="tab-pane fade common-table" id="pills-profile" role="tabpanel">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">Licensure</h2>
                    </div>
                </div>
                <div className="row">
                    <table style={{ border: '1px solid #000' }}>
                        <thead>
                            <tr>
                                <th>License Name</th>
                                <th>License View</th>
                                <th>Issue Date</th>
                                <th>Expiry Date</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>National License</td>
                                {LicenseData.national_license_status == "Yes" ? <td>{LicenseData.national_license_file ? <a href={Nldata} target='_blank'><img src={view} className='viewicon' /></a> : <p>No File Uploaded</p>}</td> : "National License Not Available"}
                                {LicenseData.national_license_status == "Yes" &&<td>{LicenseData ? LicenseData.national_license_issue_date : ''}</td>}
                                {LicenseData.national_license_status == "Yes" && <td>{LicenseData ? LicenseData.national_license_expiry_date : ''}</td>}
                            </tr>
                            <tr>
                                <td>State License</td>
                                {LicenseData.state_license_status == "Yes" ?  <td> {LicenseData.state_license_file ? <a href={Sldata} target='_blank'><img src={view} className='viewicon' /></a> : <p>No File Uploaded</p>}</td>: "State License Not Available"}
                                {LicenseData.state_license_status == "Yes" && <td>{LicenseData ? LicenseData.state_license_issue_date : ''}</td>}
                                {LicenseData.state_license_status == "Yes" &&<td>{LicenseData ? LicenseData.state_license_expiry_date : ''}</td>}
                            </tr>
                            <tr>
                                <td>CDS License</td>
                                {LicenseData.cds_license_status == "Yes" ?<td> {LicenseData.cds_license_file ? <a href={Cdsdata} target='_blank'><img src={view} className='viewicon' /></a> : <p>No File Uploaded</p>}</td>: "CDS License Not Available"}
                                {LicenseData.cds_license_status == "Yes" && <td>{LicenseData ? LicenseData.cds_license_issue_date : ''}</td>}
                                {LicenseData.cds_license_status == "Yes" &&<td>{LicenseData ? LicenseData.cds_license_expiry_date : ''}</td>}
                            </tr>
                            <tr>
                                <td>DEA License</td>
                                {LicenseData.dea_license_status == "Yes" ? <td>  {LicenseData.dea_license_file ? <a href={Deadata} target='_blank'><img src={view} className='viewicon' /></a> : <p>No File Uploaded</p>}</td> : " DEA License Not Available"}
                                {LicenseData.dea_license_status == "Yes" && <td>{LicenseData ? LicenseData.dea_license_issue_date : ''}</td>}
                                {LicenseData.dea_license_status == "Yes" &&  <td>{LicenseData ? LicenseData.dea_license_expiry_date : ''}</td>}
                            </tr>
                            {AdditionalData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.license_name}</td>
                                    <td> {item.license_file && <a href={item.license_file} target='_blank'><img src={view} className='viewicon' /></a>}</td>
                                    <td>{LicenseData ? item.license_issue_date : ''}</td>
                                    <td>{LicenseData ? item.license_expiry_date : ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>


        </>
    )
}

export default Licensure