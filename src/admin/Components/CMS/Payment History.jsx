import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import AdminService from '../../services/admin.service';
import moment from "moment";
import { useContext } from 'react';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { userContext } from '../../../store';
import { Container } from 'react-bootstrap';
import TokenHelper from '../TokenHelper';

function PaymentHistory() {
    const location = useLocation();
    
    const { user, dispatch } = useContext(userContext);
    const [loader, setLoader] = useState(false);
    console.log(user, 'userinfotoken')

  var non_provider_id=location.state.user_id
    var getPaymentHistory = async () => {
        setLoader(true);
        var token = TokenHelper.getToken();
 

console.log(token,'token')
        if (token !== null) {
            console.log("repeat");
            var response = await AdminService.getPaymentHistory(non_provider_id)
          
          console.log(response.data)
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
            name: 'Transaction Amount',
            selector: row => row.transaction_amount,
            sortable: true,
        },
        {
            name: 'Transaction Status',
            selector: row => {  
                if (row.transaction_status =='1') {
                return <p type="button" className="btn btn-accept" style={{color:"#09518C"}}>
                Succeeded
            </p>;
            }else{
                return <p type="button" style={{color:"green"}} className="">
                Inactive
            </p>;
            }
        },
            sortable: true,
        },
        {
            name: 'Transaction Details',
            selector: row => row.transaction_details,
            sortable: true,
          },
        {
            name: 'Transaction Date',
            selector: row => moment(row.transaction_date).format("DD/MM/YY"),
            sortable: true,
        },
        
      
      
        
    ];
    console.log(records,'records')
    //  getProfileData();
    useEffect(() => {

      

        getPaymentHistory();

    }, []);



    return (
        <>
            {/* =================== Profile Start================================ */}
            <section>
                    <Container>
                        <div className='provider_datatable'>
                            <DataTable
                                title="Payment History"
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

export default PaymentHistory