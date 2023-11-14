import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import parse from 'html-react-parser';
import { Link, useLocation } from 'react-router-dom';
import TokenHelper from '../pages/TokenHelper';
import { useContext } from 'react';
import { AuthContext } from '../App';
import UserService from "../services/user.service";
import { ProviderSchama } from '../pages/Schemas';
import { userContext } from '../store';
import Loader from './Loder';
import providerimage from '../assets/images/provider.png';
import defaultimage from '../assets/images/th.jpg';
import { useNavigate } from "react-router-dom"
import GoogleLoginButton from './SocialLogin';

function Provider() {
    const [othersOption, setOthersOption] = useState({
        activePage: 1,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        pageRangeDisplayed: 0
      })
    
    const location = useLocation();
    // console.log(location.state.code)

    const { user, dispatch } = useContext(userContext);
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState(location.state !== null ? location.state.code : "");
    const [loader, setLoader] = useState(false);
    const [Searchword, setSearchword] = useState([]);
    const [idstate, idsetState] = useState();
    const [buttonVisible, setButtonVisible] = useState(false);
    // if(location.state.code!=''){
    //     setInputValue(location.state.code);
    // }
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendClick = async () => {
        
      
        if (inputValue) {
            setLoader(true);
            var search_word = inputValue;
            var user_id = user.id;
            console.log(user)
            var response = await UserService.getSearchProvider({ search_word, user_id })
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

        } else {
            // toast.warning("this field required !!")
        }


    };
    console.log(inputValue, 'check')
    // var search_word = inputValue
    // var getSearchProvider = async () => {

    //     if (inputValue != "") {
    //         console.log("repeat");
    //         var response = await UserService.getSearchProvider(inputValue)
    //         console.log(response.data.data)
    //         if (response.data) {
    //             setSearchword(response.data.data)

    //         } else {
    //             console.log("data not found")
    //         }
    //     }
    //     else {
    //         console.log("not get search word")
    //         setSearchword([])
    //     }
    // }
   const provideConnect= async (provider_id) => {


    // ========= check subscription ========
    const token = TokenHelper.getToken();
    const res= await UserService.getPaymentDetails(token);
    if(res.data.data.subscription_status=="0"){
       return navigate('/payment',{state:{subscription_pay:true}});
    }


        var fdata = new FormData();
        fdata.append("non_provider_id",user.id);
        fdata.append("provider_id",provider_id );




        var response = await UserService.sendConnection(fdata)
        console.log(response.data)

        if (response.data.success) {
            handleSendClick()
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }

        console.log(response.data)



    }
    console.log(Searchword, 'Searchword')
 



    useEffect(() => {
        // getSearchProvider()

        handleSendClick()


    }, []);

    console.log(Searchword)
    return (
        <>
            {/* =================== Home search box start  ================================ */}
            <section className="home-search">

                <div className='container'>
                    <h1>Search For Provider</h1>
                    <div className="search">
                        <input type="text" value={inputValue} onChange={handleInputChange} />

                        <button className="search-btn" onClick={() => {
                            if (inputValue === "")
                                toast.warning("this field required !!");
                            handleSendClick()
                        }}>Search</button>
                    </div>
                </div>

            </section>
            {/* =================== provider section Start  ================================ */}
            <section className="provider-sec">
                <div className="container">
                    <div className="provider-sec-div">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="provider-title">
                                    <h4> User Experience Job Provider</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {Searchword.map((item, index) => {
                                return (<>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="provider-box h-100">
                                            <div className="provider-box-head">
                                                <div className="employee-img">
                                                  {item.profile_img?<img src={item.profile_img} alt="provider" />:<img src={defaultimage} alt="provider" />}  
                                                </div>
                                                <div className="employee-details">
                                                    <h5>{item.name}</h5>
                                                    <span>{item.designation}</span>
                                                </div>
                                            </div>
                                            <div class="provider-content">
                                                <p>Email: {item.email}</p>
                                                <p>Ph: {item.phone_no}</p>
                                                <h6>{item.company_name}</h6>
                                              
                                                {user.tokendata && item.connection_status === 3 && (user.user_type == "4" || user.user_type == "5" || user.user_type == "6") && <Link class="connect-btn" onClick={() => provideConnect(item._id)} state={{ code: inputValue }}  >Connect Now</Link>}
                                               {item.connection_status === 0 && <Link class="connect-btn" to="" state={{ provider_status: false }} >Request Sent</Link>}
                                                {user.user_type === "" && <Link class="connect-btn" to="/login" state={{ provider_status: false }} >Login</Link>}
                                            </div>
                                        </div>
                                    </div>
                                </>)
                            })}
                            {Searchword.length === 0 && <>
                                <p style={{ alignContent: 'center' }}>Provider Not Found</p>
                            </>}
                        </div>
                        {loader && <Loader />}
                    </div>
                </div>
            </section>


        </>
    )
}

export default Provider