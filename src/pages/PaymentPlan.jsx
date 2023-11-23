import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const PaymentPlan = () => {

    var location = useLocation();
    var navigate = useNavigate();


    useEffect(() => {

        if (location.state == null || location.state.subscription_pay == undefined || location.state.subscription_pay == null) {
            navigate("/")
        }

    }, [])

    return (
        <>
            {/* ======== subscription package  ======== */}
            {location.state?.subscription_pay && <>

                <div className="payment-plan-wrap">
                    <p>Choose Subscription Package</p>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="subscription1" checked />
                        <label class="form-check-label" for="subscription1">
                            $399
                        </label>
                    </div>

                    <br />
                    <button type='button' className='btn btn-primary' onClick={e => navigate('/payment', { state: { subscription_pay: location.state?.subscription_pay } })}>Proceed</button>
                </div>

            </>}

            {/* ========= adduser pacakage ========= */}
            {!location.state?.subscription_pay && <>

                <div>
                    <p>Choose Payment Package</p>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="adduserPackage1" checked />
                        <label class="form-check-label" for="adduserPackage1">
                            $50
                        </label>
                    </div>

                    <br />

                    <button type='button' className='btn btn-primary' onClick={e => navigate('/payment', { state: { subscription_pay: location.state?.subscription_pay, sub_user_data: location.state?.sub_user_data } })}>Proceed</button>
                </div>

            </>}

            <br />



        </>
    );
};

export default PaymentPlan;
