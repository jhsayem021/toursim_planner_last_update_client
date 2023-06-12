import React from 'react';
import Services from '../../Services/Services';
import Carousel from '../Carousel/Carousel';
// import { Carousel } from 'react-bootstrap';
// import InfoCards from '../InfoCards/InfoCards';
// import Banner from '../Banner/Banner';
// import Services from '../Services/Services';
// import MakeAppointment from '../MakeAppointment/MakeAppointment';
// import CareInfo from '../CareInfo/CareInfo';
// import Reviews from '../Tesimonial/Reviews';

const Home = () => {
    return (
        <div className=''>
            
            
            {/* services Ui */}
            <Carousel></Carousel>
            <Services></Services>

        </div>
    );
};

export default Home;