import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
// import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AllService from '../AllService/AllService';

const Appointment = () => {
    // const [selectedDate, setSelectedDate] = useState(new Date);
    const {user} = useContext(AuthContext);
    
    return (
        <div>
            {/* <AppointmentBanner
            selectedDate = {selectedDate}
            setSelectedDate = {setSelectedDate}
            ></AppointmentBanner> */}
            <AllService
            // selectedDate = {selectedDate}
            user = {user}
            ></AllService>
        </div>
    );
};

export default Appointment;