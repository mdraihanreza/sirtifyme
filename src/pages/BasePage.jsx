import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import TokenHelper from './TokenHelper'
import userService from '../services/user.service'
import { useContext } from 'react';
import { userContext } from '../store';

function BasePage() {
  const { user, dispatch } = useContext(userContext);

  var getProfileData = async () => {

    var token = TokenHelper.getToken();

    //  alert(id)
    // alert(1)
    if (token !== null) {
      // alert(token);
   
      console.log("repeat");
      var response = await userService.getProfile(token)
      console.log("profile ", response.data)
  
      //  alert(response.data.data.name)
      if (response.data.success) {
        console.log(token,'token')
        dispatch({ type: "tokendata", value: token });
        dispatch({ type: "id", value: response.data.data.user_id});
        dispatch({ type: "name", value: response.data.data.name });
        dispatch({ type: "email", value: response.data.data.email });
        dispatch({ type: "user_type", value: response.data.data.user_type });
      }
    }

  }

  useEffect(() => {
    getProfileData()
  }, [])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default BasePage