
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

    // const handleInputChange = (event) => {
    //     setInputValue(event.target.value);
    //   };

    const handleSendClick = async () => {
        // if(inputValue){
        setLoader(true);
        var search_word = inputValue;
        var user_id = user.id;
        console.log(user)
        var response = await adminService.getSearchProvider({ search_word, user_id })
        console.log(response.data.data)
        if (response.data.success) {
            var pageObj = {
                activePage: 1,
                itemsCountPerPage: 8,
                // totalItemsCount: responce.data.total_count,
                // pageRangeDisplayed: responce.data.total_page
            }

            setOthersOption(pageObj);
            setLoader(false);
            setSearchword(response.data.data)


        } else {
            setLoader(false);
            console.log("data not found")
            setSearchword([])
        }

        // }else{
        //     toast.warning("this field required !!")
        // }
        // Here you can simulate sending the value to an API or display it on the screen


    };
    
    // const data = [
    //     { id: 1, name: 'John Doe', role_id: '1',user_type: "Physician Assistants", email: "john@gmail.com",image:'https://picsum.photos/200' },
    //     { id: 2, name: 'Jane Smith', role_id: '2', user_type: "Nurse Practitioners", email: "jane@gmail.com" ,image:'https://picsum.photos/200'},
    //     { id: 3, name: 'John Doe', role_id: '3', user_type: "Physicians", email: "john@gmail.com",image: 'https://picsum.photos/200'},

    //     // Add more data here
    // ];
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
            selector: row => row.user_type,
            sortable: true,
        },
        {
            name: 'View',
            selector: row => <Link to="/providerdetails" > <img src={view} className='viewicon'/></Link>,
           
        },
        // {
        //     name: 'Age',
        //     selector: row => row.age,
        //     sortable: true,
        // },
        // {
        //     name: 'View',
        // },
        
    ];
    const { register, handleSubmit,reset, formState:{ errors } } = useForm({
        // resolver: yupResolver(L),
      });

      var submit=async(data)=>{
        console.log(data)
    
        const form = new FormData();
        form.append("search_word",data.search_word);
        form.append("user_type",data.user_type);
        form.append("page",'1');
        form.append("limit",'10');
    
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
                                paginationPerPage={1}
                            />
                        </div>
                        
                    </Container>

            </section>
        </>
    )
}

export default ProviderList
