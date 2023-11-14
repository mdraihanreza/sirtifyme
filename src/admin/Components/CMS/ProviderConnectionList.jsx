import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import AdminService from '../../services/admin.service';

import { useContext } from 'react';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { userContext } from '../../../store';
import { Container } from 'react-bootstrap';
import TokenHelper from '../TokenHelper';

function ProviderConnectionist() {
    const location = useLocation();
    
    const { user, dispatch } = useContext(userContext);
    const [loader, setLoader] = useState(false);
    console.log(user, 'userinfotoken')

  var non_provider_id=location.state.user_id
    var getProviderconndata = async () => {
        setLoader(true);
        var token = TokenHelper.getToken();
 

console.log(token,'token')
        if (token !== null) {
            console.log("repeat");
            var response = await AdminService.getProviderconndata(non_provider_id)
          
          
            if (response.data.success) {
                setLoader(false);
               
                setRecords(response.data.data)

                console.log(response.data)
             }else{
                
                setRecords([])
              }
        }
        else {
            setLoader(false);
            console.log("not get token")
        }
    }
    const data=[]
    const [records, setRecords] = useState([]);
    const columns = [

        {
            name: 'Name',
            selector: row => row.user_name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Image',
            // selector: 'image', // Replace 'image' with the actual field name in your data
            selector: row => <img src={row.profile_img} alt="Image" width={50} />,
          },
        {
            name: 'User Type',
            selector: row => row.designation,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => {  
                if (row.connection_status === 1) {
                return <p type="button" className="btn btn-accept" style={{color:"#09518C"}}>
                Accepted
            </p>;
            } else if(row.connection_status === 2) {
                return <p type="button" style={{color:"red"}} className="">
                Rejected
            </p>;
            } else{
                return <p type="button" style={{color:"green"}} className="">
                Pending
            </p>;
            }
        },
            sortable: true,
        },
      
      
        
    ];
    console.log(records,'records')
    //  getProfileData();
    useEffect(() => {

      

        getProviderconndata();

    }, []);



    return (
        <>
            {/* =================== Profile Start================================ */}
            <section>
                    <Container>
                        <div className='provider_datatable'>
                            <DataTable
                                title="Provider List"
                                columns={columns}
                                data={records}
                                pagination
                                fixedHeader
                                paginationTotalRows={data.length}
                                paginationPerPage={10}
                            />
                        </div>
                        
                    </Container>
            </section>

        </>
    )
}

export default ProviderConnectionist