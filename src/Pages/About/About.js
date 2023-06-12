import React from 'react';
import img1 from '../../assets/images/CF-570x312-Tourism-Preto-perola-Getty-Images-iStock-1011241694.png'
import img2 from '../../assets/images/photo-1575986767340-5d17ae767ab0.png'
import img3 from '../../assets/images/shutterstock-551576716_1_orig.png'
const About = () => {


  const imageHeight = {
    height: 300
  }

  return (
    <div className='mx-auto w-96 lg:w-4/5' >

      <div className="text-center py-3 px-5 mx-auto">
        <h3 className='text-3xl font-bold' > Tourism Planner</h3>
        <p className="py-3">
          In January of 2018 – almost 3 years to the day since Tourism Planner sold its first website – we made a decision. The company was growing so quickly that we wanted to make sure we had a team in place to help take it to the next level. Rebeca and I were moving back to Australia and now was the time to hand over the reins. We had to make sure we were leaving the company in the hands of people who truly understand Tourism Planner and shared our vision for the future.
        </p>
      </div>
      <div className=" lg:p-5">
        <div className=" mx-auto  ">
          <div className="mx-auto ">
            <div className=" w-96 lg:w-4/5 mx-auto  lg:flex items-center">
              <img style={imageHeight} src={img1} className=" w-96 lg:w-4/5" alt="..." />
              <div className="card-body">
                <h5 className="card-title">OUR MISSION</h5>
                <p className="card-text">"Tourism Planner will be the leading tourism company of the country within 2025 as manufacturer of high-tech, high quality services"</p>
              </div>
            </div>
          </div>


          <div className=" mx-auto">
            <div className="w-96 lg:w-4/5 mx-auto lg:flex items-center">
            <img style={imageHeight} src={img2} className="w-96 lg:w-4/5 lg:hidden block " alt="..." />
              <div className="card-body">
                
                <h5 className="card-title">OUR VISION</h5>
                <p className="card-text">To establish an greate opportunity around the tourism field through the highest level of innovative and trevelling support which will add value to our society and act as a driven force of our humanity.</p>
              </div>
              <img style={imageHeight} src={img2} className="w-96 lg:w-4/5 hidden lg:block " alt="..." />

            </div>
          </div>

          <div className=" mx-auto">
            <div className="w-96 lg:w-4/5 mx-auto lg:flex items-center">
              <img style={imageHeight} src={img3} className=" w-96 lg:w-4/5" alt="..." />
              <div className="card-body">
                <h5 className="card-title">WHY US</h5>
                <p className="card-text">The latest venture of SA Group is SA Toursim Ltd which will fulfill the Group's devoted commitment towards the tourism sector of Bangladesh providing the complete travelling services.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;