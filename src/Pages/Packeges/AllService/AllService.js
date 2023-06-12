import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import SingleService from './SingleService';
import BookingModal from '../BookingModal/BookingModal';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';


const AllService = ({ user }) => {

    const [booking, setBooking] = useState(null);


    const { data: services = [], refetch, isLoading } = useQuery({
        queryKey: ['services'],
        queryFn: () => fetch(`https://tourism-planner-server-jhsayem021.vercel.app/services`)
            .then(res => res.json())
    })

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className='mt-16  mb-10 max-w-[1440px] mx-auto'>
            <p className='text-primary text-center font-bold text-3xl' >Our Trendy packeges only for you!  </p>
            <div className='grid gap-6  grid-cols-1 lg:grid-cols-3  mt-10'>
                {
                    services.map(service => <SingleService
                        key={service._id}
                        service={service}
                        user = {user}
                        setBooking={setBooking}
                    ></SingleService>)
                }
            </div>
            {
                booking && <BookingModal
                    booking={booking}
                    setBooking={setBooking}
                    // selectedDate = {selectedDate}
                    user={user}
                    refetch={refetch}
                ></BookingModal>
            }
        </div>
    );
};

export default AllService;