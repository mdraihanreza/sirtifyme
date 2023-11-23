import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useStripe, useElements, CardElement, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../App';
import Loader from '../pages/Loder';
import { userContext } from '../store';
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from 'react-router-dom';
import UserService from "../services/user.service";
// Replace 'your-publishable-key' with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51O9uKdHf7NHBBEzBrpgXeOPuoSXRSRLE0jJ3O8QJrofz31X7xZLrgbDrRANJO07jZAs0PIW8b9YIyUuaiXmdaKSO00KYRvezjj');

const CheckoutForm = () => {
  const { user, dispatch } = useContext(userContext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  // console.log(location.state.subscription_pay,'location.state.subscription_pay')
  const handleSubmit = async (event) => {
    event.preventDefault();
    var fdata = new FormData();
    if (!stripe || !elements) {
      return;
    }

    const { token, error } = await stripe.createToken(elements.getElement(CardNumberElement, CardCvcElement, CardExpiryElement), {
      name: 'Customer Name',
    });

    if (error) {
      console.error(error);
    } else {
      console.log(token, 'tokendata')

      var amount = location.state.subscription_pay ? 399 : 50;
      var transaction_details = location.state.subscription_pay ? 'buying subscription' : 'Subuser Payment';
      fdata.append("amount", amount);
      fdata.append("token1", token.id);
      fdata.append("transaction_amount", amount);
      fdata.append("transaction_details", transaction_details);
      fdata.append("subscription_amount", amount);
      fdata.append("subscription_duration", '30 days');
      fdata.append("transaction_user_id", user.id);
      fdata.append("subscription_user_id", user.id);
      fdata.append("user_type", user.user_type);

      fdata.append("sub_user_add_status", !location.state.subscription_pay);

      if (!location.state.subscription_pay) {
        var sub_user_data = location.state.sub_user_data;
        sub_user_data.user_type = "5";
        fdata.append("sub_user_data", JSON.stringify(sub_user_data));
      }

      fdata.append("email", user.email);

      var response = await UserService.postPayment(fdata);
      if (response.data.success) {
        setLoader(false);
        toast.success(response.data.message)
        navigate(`/profile`)
      } else {
        setLoader(false);
        toast.error(response.data.message)
      }
    }


  };

  useEffect(() => {

    if (location.state == null || location.state.subscription_pay == undefined || location.state.subscription_pay == null) {
      navigate("/")
    }
  }, []);


  return (
    <div className="container">
      <div className="payment card-details">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <label>
                Card details:

              </label>

              <div className="card-fiel">
                {/* <CardElement /> */}

                <label>
                  Card number
                  <CardNumberElement className='stripCardNumber' />
                </label>

                <label>
                  Expiry date
                  <CardExpiryElement className='stripCardExpire' />
                </label>

                <label>
                  CVC
                  <CardCvcElement  className='stripCardCvc'/>
                </label>

              </div>
            </div>
            <div className="col-md-12">
              <button type="submit" disabled={!stripe}>Pay</button>
            </div>
          </div>





        </form>
      </div>
    </div>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
