import React from 'react';
import { Link } from 'react-router-dom';
const Service = ({ service, setBooking }) => {


    const { title, duration, description, price, image } = service;

    return (
        <div className=" ">
            <div className="card bg-base-100 shadow-xl w-4/5 md:w-4/5 lg:w-96 mx-auto ">
               
                <div className="card-actions justify-center my-5">
                    <Link to={`/servicedetails/${service._id}`} >
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

                    </Link>
                    </div>

                  

            </div>

            
        </div>

    );
};

export default Service;