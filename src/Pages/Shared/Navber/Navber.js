import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import logo from '../../../assets/images/Group 1000003852.png'
import './Navber.css';
const Navber = () => {

  const {user ,logOut} = useContext(AuthContext);
    const menuItems = <React.Fragment>
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/packeges">Packages</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        
        <li><NavLink to="/contact">Contact Us</NavLink></li>
        {
          user?.uid ? 
          <>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <button onClick={logOut} >Sign Out</button >
          </> :
          <li><NavLink to="/login">Sign in</NavLink></li>
          
        }
           {
          user?.displayName ? 
          <li className=' ml-4 p-3 bg-accent text-white rounded-full uppercase font-bold' >{user?.displayName}</li> : <></>
            
          
        }
       
        
        
        
    </React.Fragment>

    return (
        <div className=''>
            <div className="navbar bg-base-100 flex justify-between max-w-[1640px]  mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        {menuItems}
        
      </ul>
    </div>
    <img src={logo} alt="" />
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {menuItems}
      
    </ul>
 
  </div>
  {
    user && <label tabIndex={2} htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
  </label>
  }
 
</div>
        </div>
    );
};

export default Navber;