import React from "react";
import { createBrowserRouter  } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import About from "../../Pages/About/About";
import Packeges from "../../Pages/Packeges/Packeges/Packeges";
import Contact from "../../Pages/Contact/Contact";

import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
// import ManageCustomer from "../../Pages/Dashboard/ManageCustomers/ManageCustomers";

import Payment from "../../Pages/Dashboard/Payment/Payment";
// import UpdateCustomerPayment from "../../Pages/Dashboard/UpdateCustomerPayment/UpdateCustomerPayment";
import Users from "../../Pages/Dashboard/Users/Users";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyBooking from "../../Pages/Dashboard/MyBooking/MyBooking";
import AddService from "../../Pages/Dashboard/AddService/AddService";
import ServiceDetails from "../../Pages/Services/ServiceDetails";
import UpdateService from "../../Pages/Dashboard/UpdateService/UpdateService";
import UpdateSingleService from "../../Pages/Dashboard/UpdateService/UpdateSingleService";

// import Revenuestatictis from "../../Pages/Dashboard/Revenuestatictis/Revenuestatictis";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                 path: '/home',
                element: <Home></Home>
            },
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
            ,
            {
                path: '/about',
                element: <About></About>
            }
            ,
            {
                path: '/contact',
                element: <Contact></Contact>
            }
            ,
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
            ,
            {
                path: '/packeges',
                element: <Packeges></Packeges>
            },
            {
                path: '/servicedetails/:id',
                element: <ServiceDetails></ServiceDetails>,
                loader: ({params}) => fetch(`https://tourism-planner-server-jhsayem021.vercel.app/servicedetails/${params.id}`)
                
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout> </PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
                {
                    path: '/dashboard',
                    element: <Dashboard></Dashboard>
                },
                {
                    path: '/dashboard/orders',
                    element:  <MyBooking></MyBooking>
                },
                {
                    path: '/dashboard/users',
                    element: <AdminRoute><Users></Users></AdminRoute>
                },
              
                {
                    path: '/dashboard/addservice',
                    element: <AdminRoute> <AddService></AddService> </AdminRoute>
                },
              
                {
                    path: '/dashboard/updateservice',
                    element: <AdminRoute> <UpdateService></UpdateService> </AdminRoute>
                },
              
                {
                    path: '/dashboard/orders',
                    element: <AdminRoute> <MyBooking></MyBooking> </AdminRoute>
                },
                // {
                //     path: '/dashboard/managecustomer',
                //     element: <AdminRoute> <ManageCustomer></ManageCustomer> </AdminRoute>
                // },
                // {
                //     path: '/dashboard/updatecustomerpayment',
                //     element: <AdminRoute> <UpdateCustomerPayment></UpdateCustomerPayment> </AdminRoute>
                // },
                
                // {
                //     path: '/dashboard/revenuestatictis',
                //     element: <AdminRoute> <Revenuestatictis></Revenuestatictis> </AdminRoute>
                // },
                {
                    path: '/dashboard/payment/:id',
                    element: <Payment></Payment>,
                    loader: ({params}) => fetch(`https://tourism-planner-server-jhsayem021.vercel.app/booking/${params.id}`)
                    
                },
                {
                    path: '/dashboard/updateservice1/:id',
                    element: <UpdateSingleService></UpdateSingleService>,
                    loader: ({params}) => fetch(`https://tourism-planner-server-jhsayem021.vercel.app/servicedetails/${params.id}`)
                    
                }
        ]
    }
])

export default router;