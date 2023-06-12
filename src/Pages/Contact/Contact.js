import React from 'react';

const Contact = () => {
    return (
        <div className='mx-auto lg:w-4/5'>
            
            <div className='lg:flex block align-middle justify-items-center lg:m-32'>
                <div className='lg:w-1/2 sm:w-full p-5'>
                    <h1 className="text-4xl font-bold text-black">GET IN TOUCH</h1>
                    <p className="text-black-200 mt-8">Want to contact Doctors Lab? Feel free to send us a message. Just be sure to not include any sensitive information or PHI. Your message will be returned as soon as possible.</p>
                </div>
                <div className='p-5'>
                    <h2 className="text-3xl">DROP US A LINE</h2>
                    <form className=' pt-5'>
                    <div className='grid sm:grid-cols-1 lg:grid-cols-2'><input type="text" placeholder="name" className="input input-bordered input-info   mt-3 mr-3 " />
                    <input type="email" placeholder="Email" className="input input-bordered input-info mt-3 " /></div> 
                    <div className='grid sm:grid-cols-1 lg:grid-cols-2' ><input type="phone" placeholder="Phone" className="input input-bordered input-info mt-3 mr-3" />
                    <input type="text" placeholder="Subject" className="input input-bordered input-info mt-3 " /></div> 
                    <textarea className="textarea textarea-info textarea-bordered textarea-lg w-full max-w-xs mt-3" placeholder="Message"></textarea> <br />
                    <input type="submit" className='btn btn-primary  bg-gradient-to-r from-primary to-secondary' value="Send Message" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;