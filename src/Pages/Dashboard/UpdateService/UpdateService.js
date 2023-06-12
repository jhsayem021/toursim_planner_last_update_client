import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import deleteimg from '../../../assets/icons/delete.png'
const UpdateService = () => {
    
  const [deletingService, setDeletingService] = useState(null);
  const closeModal = ()=>{
    setDeletingService(null);
}


    const { data: services = [], refetch, isLoading } = useQuery({
        queryKey: ['services'],
        queryFn: () => fetch(`https://tourism-planner-server-jhsayem021.vercel.app/services`)
            .then(res => res.json())
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleServiceDelete = (service) =>{
      console.log(service)

        fetch(`https://tourism-planner-server-jhsayem021.vercel.app/service/${service._id}`,{
          method:'DELETE',
          headers: {
              authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
      })
      .then(res=>res.json())
      .then(data =>{
          console.log(data)
          if(data.deletedCount>0){
      
              console.log(service.title)
              
              toast.success(`${service.title} delete successfully`)
              refetch();
          }
          
      })
      
      
      }



    return (
        <div>
          <p className='text-primary text-center font-bold text-3xl' >Packeges </p>
            <div className='grid gap-6  grid-cols-1 lg:grid-cols-3  mt-10'>
                {
                    services.map(service => <div className="card w-4/5 md:w-4/5 lg:w-84 bg-base-100 shadow-xl mx-auto ">
                    <div className='  group hover:bg-white relative group '><figure><img className='min-h-fit group-hover:opacity-20 rounded-t-lg' src={service.image} alt="" /></figure>
                              <div className="card-body absolute top-10 left-10 group-hover:block hidden ">
                                  <div className=''>
                                  
                                  <p className='text-xl text-center' >{service.duration}</p>
                                  
                                  <p className='text-2xl my-5 font-semibold' ><span className='text-rose-500' >Price:</span> ${service.price}</p>
                                  </div>
                                  
                              </div>
                              <div htmlFor="Confirmation-modal" className=" absolute top-2 left-60 group-hover:block hidden w-8">
                              <label onClick={()=>setDeletingService(service)} htmlFor="Confirmation-modal" ><img  src={deleteimg} alt="" /></label>

                              </div>
                              {
    deletingService && <ConfirmationModal
    title={`Are you sure want to Delete`}
    message={`If you delete "${deletingService?.title}" service,  it also delete from your database`}
    successAction = {handleServiceDelete}
    modalData = {deletingService}
    closeModal = {closeModal}
    ></ConfirmationModal>
}
                              </div>
                              <h3 className="card-title justify-center mt-5 ">
                                  {service.title}
                                  </h3>
                      <div className="card-actions flex justify-evenly my-5 ">
                       
                        <Link to={`/dashboard/updateservice1/${service._id}`}  className="btn btn-primary bg-gradient-to-r from-indigo-600 to-indigo-800 text-white  ">Update</Link>
                        
                      </div>
                    </div>)
                }
            </div>
   

        </div>
    );
};

export default UpdateService;