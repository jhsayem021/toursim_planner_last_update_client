import React from 'react';
import { Link } from 'react-router-dom';

const SingleService = ({ service, setBooking , user }) => {
  console.log(setBooking)
  const { title, duration, description, price, image } = service;
  return (
    
      <div className="card w-4/5 md:w-4/5 lg:w-96 bg-base-100 shadow-xl mx-auto ">
      <div className='  group hover:bg-white relative group '><figure><img className='min-h-fit group-hover:opacity-20 rounded-t-lg' src={image} alt="" /></figure>
                <div className="card-body absolute top-10 left-20 group-hover:block hidden ">
                    <div className=''>
                    
                    <p className='text-xl text-center' >{duration}</p>
                    
                    <p className='text-2xl my-5 font-semibold' ><span className='text-rose-500' >Price:</span> ${price}</p>
                    </div>
                    
                </div>
                </div>
                <h3 className="card-title justify-center mt-5 ">
                    {title}
                    </h3>
        <div className="card-actions flex justify-evenly my-5 ">
          {
            (user === null) ? <Link to = "/login" className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white  ">Book now</Link> : <label
            onClick={() => setBooking(service)}
            htmlFor="Booking-Modal"
            className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white  ">Book now</label>
          }
          
          {
            (user === null) ? <Link to = "/login" className="btn btn-primary bg-gradient-to-r from-indigo-600 to-indigo-800 text-white  ">View more</Link> : <Link to={`/servicedetails/${service._id}`} className="btn btn-primary bg-gradient-to-r from-indigo-600 to-indigo-800 text-white  " >
              View more
            </Link>
          }
          
        </div>
      </div>
    
  );
};

export default SingleService;