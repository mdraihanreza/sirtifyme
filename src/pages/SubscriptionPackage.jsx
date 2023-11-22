import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const SubscriptionPackage = () => {

    var location=useLocation();
    var navigate=useNavigate();

  return (
    <>
    {/* ======== subscription package  location.state.subscription_pay ======== */}
        {/* {location.state.subscription_pay && <> */}
        
            <div>
                <p>Choose Subscription Package</p>

                <input type="radio" selected id='SubscriptionID'/>
                <label htmlFor="SubscriptionID">$399</label>
            </div>
        
        {/* </>} */}
    </>
  );
};

export default SubscriptionPackage;
