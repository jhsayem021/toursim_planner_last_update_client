import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import Navber from '../Pages/Shared/Navber/Navber';
import bgimage from '../assets/images/Dashboard-BG.png'
const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email)
  const backgroundImg = {
    backgroundImage: `url(${bgimage})`,
    backgroundRepeat: 'no-repeat'
  }
  console.log(isAdmin);

  return (
    <div className='' >
      <Navber></Navber>
      <div className="drawer drawer-mobile max-w-[1440px]  mx-auto">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content " style={backgroundImg} >
          <Outlet></Outlet>


        </div>
        <div className="drawer-side" >
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 lg:w-80 w-60   text-base-content bg-base-200 lg:bg-slate-50">

            <li> <Link to="/dashboard/orders">Bookings</Link> </li>
            {
              isAdmin && <>
                <li> <Link to="/dashboard/users">All users</Link> </li>
              </>
            }


            {
              isAdmin && <>
                <li> <Link to="/dashboard/addservice">Add Service</Link> </li>
              </>
            }

            {
              isAdmin && <>
                <li> <Link to="/dashboard/updateservice">Update Service</Link> </li>
              </>
            }

        

          </ul>

        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;