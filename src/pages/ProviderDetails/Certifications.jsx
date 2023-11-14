import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import UserService from '../../services/user.service';
// import { AuthContext } from '../../App';
import { useContext } from 'react';

import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import FileBase64 from 'react-file-base64';
import avtar from '../../assets/images/avatar.png';
import view from '../../assets/images/view.png';
import { userContext } from '../../store';
import TokenHelper from '../TokenHelper';
// import { licenseSchema } from '../Schemas';
import { CertificationSchema } from '../Schemas';
import { licenseSchema } from '../Schemas'
import { useFieldArray, useForm } from "react-hook-form";
import iconpluscircle from '../../assets/images/icon-plus-circle.svg';



function Certifications() {

    const [Nldata, setNldata] = useState("");
    const [Sldata, setSldata] = useState("");
    const [Cdsdata, setCdsdata] = useState("");
    const location = useLocation();
    var user_id=location.state.user_id
    console.log(user_id,'p_id')
    const [CertificateData, setCertificateData] = useState([]);
    const [AdditionalData, setAdditionalData] = useState([]);
    const [filename, setFilename] = useState("Select Your Document");
    const [filedata, setFiledata] = useState("");

    var getCertificateData = async () => {


        //  alert(id)
        if (user_id !== '') {
            console.log("repeat");
            var response = await UserService.getProviderCertificate(user_id)
          
   
            if (response.data.success) {
                
             
                setNldata(response.data.data.bls_file)
                setSldata(response.data.data.acls_file)
                setCdsdata(response.data.data.pls_file)
                setCertificateData(response.data.data)
                setAdditionalData(response.data.additional_data)
               
                console.log(response.data)
            }
        }
        else {
            console.log("not get token")
        }
    }





    useEffect(() => {
        getCertificateData();

    }, []);

    return (
        <>
            {/* =================== Profile Start================================ */}



            <div className="tab-pane fade common-table" id="pills-contact" role="tabpanel">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">Certifications</h2>
                    </div>
                </div>
                <table style={{ border: '1px solid #000' }}>
                        <thead>
                            <tr>
                                <th>Certificate Name</th>
                                <th>Certificate View</th>
                                <th>Issue Date</th>
                                <th>Expiry Date</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>BLS</td>
                                {CertificateData.bls_status=="Yes" ?<td>{CertificateData.bls_file ? <a href={Nldata} target='_blank'><img src={view}  className='viewicon' /></a> : <p>No File Uploaded</p>}</td>:"Certificate Not Available"}
                                {CertificateData.bls_status=="Yes" &&<td>{CertificateData?CertificateData.bls_issue_date:''}</td>}
                                {CertificateData.bls_status=="Yes" && <td>{CertificateData?CertificateData.bls_expiry_date:''}</td>}
                            </tr>
                            <tr>
                                <td>ACLS</td>
                                {CertificateData.acls_status=="Yes" ? <td> {CertificateData.acls_file ? <a href={Sldata} target='_blank'><img src={view}  className='viewicon' /></a> : <p>No File Uploaded</p>}</td>:"Certificate Not Available"}
                                {CertificateData.acls_status=="Yes" &&  <td>{CertificateData?CertificateData.acls_issue_date:''}</td>}
                                {CertificateData.acls_status=="Yes" && <td>{CertificateData?CertificateData.acls_expiry_date:''}</td>}
                            </tr>
                            <tr>
                                <td>PALS</td>
                                {CertificateData.pls_status=="Yes" ?<td>   {CertificateData.pls_file ? <a href={Cdsdata} target='_blank'><img src={view}  className='viewicon' /></a> : <p>No File Uploaded</p>}</td>:"Certificate Not Available"}
                                {CertificateData.pls_status=="Yes" && <td>{CertificateData?CertificateData.pls_issue_date:''}</td>}
                                {CertificateData.pls_status=="Yes" && <td>{CertificateData?CertificateData.pls_expiry_date:''}</td>}
                            </tr>
                           
                            {AdditionalData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.certificate_name}</td>
                                    <td> {item.certificate_file && <a href={item.certificate_file} target='_blank'><img src={view} className='viewicon' /></a>}</td>
                                    <td>{item.certificate_issue_date}</td>
                                    <td>{item.certificate_expiry_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>


        </>
    )
}

export default Certifications