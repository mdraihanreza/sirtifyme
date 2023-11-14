
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.js'; 

import '../admin/assets/css/style.css'; 
import '../admin/assets/css/responsive.css'; 
import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

function AdminBasePage() {

  // const {userState,dispatch} = useContext(userContext);
  const navigate = useNavigate();


  return (
    <>
        <Sidebar />
        <div id="main">
            <Header />
          <Outlet />
        </div>
    </>
  )
}

export default AdminBasePage
