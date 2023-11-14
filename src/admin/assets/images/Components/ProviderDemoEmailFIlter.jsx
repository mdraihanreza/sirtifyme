
import React, { useState, useEffect } from 'react';
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
function ProviderList() {
    const [inputValue, setInputValue] = useState('');
    const [Searchword, setSearchword] = useState([]);
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

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
    const data = [
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        { id: 2, name: 'Jane Smith', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'jane@example.com' },
        { id: 2, name: 'Jane Smith', email: 'smith@example.com' },
        // Add more data here
    ];

  const [filteredData, setFilteredData] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    useEffect(() => {
        // Filter data based on name and email filters
        let filteredResults = data;

        if (nameFilter) {
            filteredResults = filteredResults.filter(item =>
                item.name.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }

        if (emailFilter) {
            filteredResults = filteredResults.filter(item =>
                item.email.toLowerCase().includes(emailFilter.toLowerCase())
            );
        }

        setFilteredData(filteredResults);
    }, [data, nameFilter, emailFilter]);

    // const filteredData = data.filter((item) =>
    //     item.name.toLowerCase().includes(filterText.toLowerCase())
    // );

    const columns = [
        {
            name: 'ID',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
    ];

    return (
        <>
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Search by Name"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                    <select
                        onChange={(e) => setEmailFilter(e.target.value)}
                        value={emailFilter}
                    >
                        <option value="">Filter by Email</option>
                        <option value="john@example.com">john@example.com</option>
                        <option value="jane@example.com">jane@example.com</option>
                        <option value="bob@example.com">bob@example.com</option>
                    </select>
                    <button onClick={() => setEmailFilter('')}>Clear Email Filter</button>
                </div>
                <DataTable
                    title="User Data"
                    columns={columns}
                    data={filteredData}
                />
            </div>
        </>
    )
}

export default ProviderList
