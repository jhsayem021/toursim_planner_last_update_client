import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'
import Loading from '../../Shared/Loading/Loading';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise)

const Payment = () => {
    const booking = useLoaderData();
    const navigation = useNavigation();
    const { service, price } = booking;
    console.log(booking)
    if (navigation.state === 'loading') {
        return <Loading></Loading>;
    }
    return (
        <div>
            <h1 className="text-3xl">Payment for {service} </h1>
            <p className='my-5'>Please pay <strong>${price}</strong> for your {service} packege . </p>
            <p>Note: this payment method only for test purpose, so provide test card info from google</p>
            <div className='w-96 my-24 p-5 rounded-lg bg-sky-200'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements>
            </div>

        </div>
    );
};

export default Payment;