import TokenHelper from "../pages/TokenHelper";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import UserService from '../services/user.service';

export const SubscriptionAuth = ({ children }) => {
//   const token = TokenHelper.getToken();
  const location = useLocation();
  const navigate= useNavigate();
//   UserService.getPaymentDetails(token).then((data)=>{
//     if (response.data.subscription_status=="0") {
//         return <Navigate to="/payment" state={{ path: location.pathname }} />;
//       }
//       else{
//         return children;
//       }
//   });
        //   console.log(response.data.data.subscription_status,'response.data.data.subscription_status')
//         console.log(response,'response.data.data.subscription_status')
//   if (response.data.subscription_status=="0") {
//     return <Navigate to="/payment" state={{ path: location.pathname }} />;
//   }

//   return children;

console.log("children");
console.log(children);

checkSub((data)=>{
    if(data.status){
        // alert(1)
        // <Navigate to="/payment" state={{ path: location.pathname }} />;
        navigate('/payment',{state:{ path: location.pathname,subscription_pay:true }});
    }
})


return children;

};


async function checkSub(callback){
    const token = TokenHelper.getToken();
    const res= await UserService.getPaymentDetails(token);
    // console.log("res ",res.data);
    if(res.data.success==true){
    if(res.data.data.subscription_status=="0"){
        callback({status:true});
    }else{
        callback({status:false});
    }}
    else{
        callback({status:true});
    }
}

