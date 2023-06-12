// import { format } from 'date-fns/esm';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ booking,  setBooking ,user , refetch }) => {
    const { title,price} = booking;
    // const date = format(selectedDate, 'PP')
    const navigate = useNavigate();
    const handleForm = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const date = form.date.value;
        const phone = form.phone.value;
        console.log(name, email, phone, price);

        const booked = {
            service: booking.title,
            booking_user: name,
            email,
            phone,
            price,
            date
            
        }

        fetch('https://tourism-planner-server-jhsayem021.vercel.app/bookings',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booked)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                console.log(data);
                toast('Booking Successfully Confirmed')
               if(refetch){
                refetch();
               }
               else{
                navigate("/dashboard");
               }
                setBooking(null);
        
            }
            else{
                toast(data.message)
            }
            
        })
        
    }
    var dtToday = new Date();
 
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    
    var minDate = year + '-' + month + '-' + day;

    return (
        <>
            <input type="checkbox" id="Booking-Modal" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box relative ">
                    <label htmlFor="Booking-Modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-10">{title} <span className='ml-8 '>Price: <span className='text-primary'>${price}</span></span> </h3>
                    
                    <form onSubmit={handleForm} className='grid gap-4 grid-cols-2' >
                        <input type="date" name='date' min={minDate} max="2050-12-31" required  className="input input-bordered w-full" />
                        {/* <select name= "slot" className="select select-bordered w-full max-w-xs">
                            {
                                slots.map((slot, i) =><option
                                key={i}
                                >{slot}</option> )
                            }
                            
                            
                        </select> */}
                        <input name="name"  value={user?.displayName} disabled type="text" placeholder="name" className="input input-bordered w-full" />
                        <input name="email" value={user?.email} disabled type="email" placeholder="email" className="input input-bordered w-full" />
                        <input name="phone" type="phone" placeholder="phone" required className="input input-bordered w-full" />
                        <input type="submit" value="Submit" className="btn btn-accent text-white w-full" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;