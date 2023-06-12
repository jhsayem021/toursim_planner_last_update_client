import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Loading from '../../Shared/Loading/Loading';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  

const MyBooking = () => {

  const { user } = useContext(AuthContext);
  // const [checkUser,setCheckUser] = useState();


  const { data: backendUser = [] } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const res = await fetch(`https://tourism-planner-server-jhsayem021.vercel.app/users/${user.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      })
      const data = await res.json()
      return data;

    }
  })
console.log(backendUser)

  const url = `https://tourism-planner-server-jhsayem021.vercel.app/userbookings?email=${user.email}`;

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['userbookings', user.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      })
      const data = await res.json()
      return data;

    }
  })
  const url2 = `https://tourism-planner-server-jhsayem021.vercel.app/alluserbookings`;

  const { data: allbookings = [] } = useQuery({
    queryKey: ['alluserbookings'],
    queryFn: async () => {
      const res = await fetch(url2, {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      })
      const data = await res.json()
      return data;

    }
  })

console.log(allbookings)


  if (isLoading) {
    return <Loading></Loading>;
  }



  console.log(backendUser?.email);
  
  return (
    <div>
      {
        backendUser?.email ? <h1 className="text-3xl">All Bookings</h1> : <h1 className="text-3xl">My Bookings</h1>
      }


      <div className="overflow-x-auto my-6">
        <table  className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Package</th>
              <th>Booking date</th>
              <th>Payment</th>
            </tr>
          </thead>
          {
            (backendUser?.role === 'admin') ? <tbody>

            {allbookings &&
              allbookings.map((booking, i) => <tr
                key={booking._id}
              >
                <th>{i + 1}</th>
                <td>{booking.booking_user}</td>
                <td>{booking.service}</td>
                <td>{booking?.date}</td>
                <td>
                  {
                    booking.price && !booking.paid && <Link
                      to={`/dashboard/payment/${booking._id}`}
                    >
                      <button className='btn btn-xs btn-primary px-4 '> pay</button>
                    </Link>
                  }
                  {
                    booking.price && booking.paid && <span className=' text-green-500 '> Paid</span>

                  }
                </td>
              </tr>)
            }


          </tbody> :
          <tbody>

          {bookings &&
            bookings.map((booking, i) => <tr
              key={booking._id}
            >
              <th>{i + 1}</th>
              <td>{booking.booking_user}</td>
              <td>{booking.service}</td>
              <td>{booking?.date}</td>
              <td>
                {
                  booking.price && !booking.paid && <Link
                    to={`/dashboard/payment/${booking._id}`}
                  >
                    <button className='btn btn-xs btn-primary px-4 '> pay</button>
                  </Link>
                }
                {
                  booking.price && booking.paid && <span className=' text-green-500 '> Paid</span>

                }
              </td>
            </tr>)
          }


        </tbody>
          }
        </table>
        <table id="emp1" className="hidden">
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Package</th>
              <th>Booking date</th>
           
            </tr>
          </thead>
          {
            (backendUser?.role === 'admin') ? <tbody>

            {allbookings &&
              allbookings.map((booking, i) => <tr
                key={booking._id}
              >
                <th>{i + 1}</th>
                <td>{booking.booking_user}</td>
                <td>{booking.service}</td>
                <td>{booking?.date}</td>
          
              </tr>)
            }


          </tbody> :
          <tbody>

          {bookings &&
            bookings.map((booking, i) => <tr
              key={booking._id}
            >
              <th>{i + 1}</th>
              <td>{booking.booking_user}</td>
              <td>{booking.service}</td>
              <td>{booking?.date}</td>
            </tr>)
          }


        </tbody>
          }
        </table>
        
       { backendUser.role && <div>  
                                        <ReactHTMLTableToExcel  
                                                className="btn btn-primary mt-6"  
                                                table="emp1"  
                                                filename="All Booking Report"  
                                                sheet="Sheet"  
                                                buttonText="Export excel" />  
                                </div> }
      </div>

    </div>
  );
};

export default MyBooking;