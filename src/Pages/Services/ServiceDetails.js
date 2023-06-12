import React, { useContext, useState } from 'react';
import { Link, useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';
import { AuthContext } from '../../Context/AuthProvider';
import BookingModal from '../Packeges/BookingModal/BookingModal';
import { useQuery } from '@tanstack/react-query';
const ServiceDetails = () => {
    const service = useLoaderData();
    const navigation = useNavigation();

    const {user} = useContext(AuthContext);
    const [booking, setBooking] = useState(null);
    const { title, duration, description, price, image } = service;
    
    if (navigation.state === 'loading') {
        return <Loading></Loading>;
    }
    return (
        <div>
            
            <div className="hero h-fit lg:min-h-screen bg-base-100">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={image} className="lg:max-w-lg rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-4xl font-bold">{title}</h1>

      <p className="py-6 w-4/5">{description}</p>
      <p className="py-6">{duration}</p>
      <p className='text-2xl my-3 font-semibold' ><span className='text-rose-500' >Price:</span> ${price}</p>
      {/* <button className="btn btn-primary">Get Started</button> */}
      <div className="card-actions grid justify-items-start my-5 ">
          {
            (user === null) ? <Link to = "/login" className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white  ">Book now</Link> : <label
            onClick={() => setBooking(service)}
            htmlFor="Booking-Modal"
            className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white  ">Book now</label>
          }
          
        </div>
    </div>
  </div>
</div>

{
                booking && <BookingModal
                    booking={service}
                    setBooking={setBooking}
                    // selectedDate = {selectedDate}
                    user={user}
                    
                ></BookingModal>
            }
        </div>
    );
};

export default ServiceDetails;