
import React, { useEffect, useState } from 'react'
import logo from '../assets/images/logo.svg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchama } from "../schema";

import adminService from '../services/admin.service';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import view from '../assets/images/view.png';

function ProviderList() {
    const [inputValue, setInputValue] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [Searchword, setSearchword] = useState([]);

   
    
    const data=[]
    const [records, setRecords] = useState([]);
    const columns = [

        {
            name: 'Name',
            selector: row => row.name,
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
            selector: row => {if (row.user_type === 2) {
                return 'Nurse Practitioners';
            } else if (row.user_type === 3) {
                return 'Physicians';
            } else {
                return 'Physician Assistants';
            }},
            sortable: true,
        },
        {
            name: 'View',
            selector: row => <Link to="/admin/providerdetails" state={{ user_id: row._id
            }}> <img src={view} className='viewicon'/></Link>,
           
        },
       
      
        
    ];
    const { register, handleSubmit,reset, formState:{ errors } } = useForm({
        // resolver: yupResolver(L),
      });

      var submit=async(data)=>{
        console.log(data)
    
        const form = new FormData();
        form.append("search_word",data.search_word);
        form.append("user_type",data.user_type);
   
    
        var responce=await adminService.providerlist(form);
    
        console.log(responce.data);
        
        if(responce.data.success)
        {
            setRecords(responce.data.data)
          
        }else{
          toast.error(responce.data.message)
          setRecords([])
        }
    
      }
    // const searchFnc = () => {

    //     const newData = data.filter((row) => {
    //         if (row.name.toLowerCase().match(inputValue.toLowerCase()))
    //             return row.name.toLowerCase().match(inputValue.toLowerCase())

    //         else if (row.role_id.match(emailFilter))
    //             return (row.role_id.match(emailFilter))
    //     });
    //     console.log(newData)
    //     setRecords(newData)
    // };

    useEffect(()=>{
        submit({search_word:"",user_type:""})
    },[])




    return (
        <>
            <section className="home-search">
            <Container>
            <Form onSubmit={handleSubmit(submit)}>
                <div className='row'>
                    <div className='col-md-5'>
                    
                    <input
                    type="text" className='form-control' {...register('search_word')}
                    placeholder="Search by name"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                    </div>

                    <div className='col-md-4'>
                        <select className='form-control' {...register('user_type')}
                        onChange={(e) => setEmailFilter(e.target.value)}
                        value={emailFilter}
                    >
                            <option value="">Filter by Role</option>
                            <option value={1} >Physician Assistants</option>
                            <option value={2} >Nurse Practitioners</option>
                            <option value={3} >Physicians</option>
                        </select>
                    </div>
                    <div className='col-md-3'>
                        <button className='btn btn-primary btn-search'>search</button>
                    </div>
                    
                </div>
                </Form>

                </Container>
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

export default ProviderList
