import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState('')
  const [processing, setProcessing] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [cardError, setCardError] = useState('')
  const { price, email, name, service } = booking;
  const [clientSecret, setClientSecret] = useState("")


  useEffect(() => {
    fetch("https://tourism-planner-server-jhsayem021.vercel.app/create-payment-intent", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer  ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ price })
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret)
        console.log(data.clientSecret);
      })
  }, [price])



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement)
    console.log(CardElement)
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });
    if (error) {
      console.log(error);
      setCardError(error.message);
    }
    else {
      setCardError('');
    }
    setSuccess('');
    setProcessing(true);
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email
          },
        },
      },
    );

    if (confirmError) {

      setCardError(confirmError.message);
      return;
    }
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {

      const payment = {
        name,
        service,
        price,
        transactionId: paymentIntent.id,
        email,
        bookingId: booking._id,
      }
      fetch("https://tourism-planner-server-jhsayem021.vercel.app/payments", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(payment)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.insertedId) {
            setSuccess('Congrates! your payment completed')
            setTransactionId(paymentIntent.id);
          }
        })
      setProcessing(false);
    }
    console.log('paymentIntent', paymentIntent)


  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-sm mt-4 btn-primary'
          type="submit"
          disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>
      </form>
      <p className="text-red-500 mt-5">{cardError}</p>
      {
        success && <div>
          <p className='text-green-500' >{success}</p>
          <p> Your transactionId: <span className='font-bold'>{transactionId}</span></p> <br />
          <div>
            {/* button for download invoive */}
          </div>
        </div>

      }
    </>
  );
};

export default CheckoutForm;