import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../App';
import Loader from '../pages/Loder';
import { userContext } from '../store';
import UserService from "../services/user.service";
// Replace 'your-publishable-key' with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51O9uKdHf7NHBBEzBrpgXeOPuoSXRSRLE0jJ3O8QJrofz31X7xZLrgbDrRANJO07jZAs0PIW8b9YIyUuaiXmdaKSO00KYRvezjj');

const CheckoutForm = () => {
  const [amount, setAmount] = useState(0);
  const { userState, dispatch } = useContext(userContext);
  const [loader, setLoader] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    var fdata = new FormData();
    if (!stripe || !elements) {
      return;
    }

    const { token, error } = await stripe.createToken(elements.getElement(CardElement), {
      name: 'Customer Name',
    });

    if (error) {
      console.error(error);
    }else{

    fdata.append("amount", 100000);
    fdata.append("token", token.id);
    fdata.append("email",'jaganrout33@gmail.com');
    var response = await UserService.postPayment(fdata);
    if (response.data.success) {
      setLoader(false);
      toast.success(response.data.message)

  } else {
      setLoader(false);
      toast.error(response.data.message)
  }
}

    // Use the amount value to make a payment using Stripe API
    // This is where you would make a request to your server to create a payment intent or use Checkout Session

    // For simplicity, let's just log the amount for now
    console.log('Amount:', amount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <br />
      <label>
        Card details:
        <CardElement />
      </label>
      <br />
      <button type="submit" disabled={!stripe}>
        Pay with Card
      </button>
    </form>
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
