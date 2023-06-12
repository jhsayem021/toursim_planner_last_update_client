// import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
// import Loading from '../../Shared/Loading/Loading';
// import  { AuthContext } from '../../Context/AuthProvider';
// import useToken from '../../Hooks/useToken';

const AddService = () => {
    const navigate = useNavigate()
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const { register, handleSubmit } = useForm();
    // const { data: specialities = [], isLoading } = useQuery({
    //     queryKey: ['speciality'],
    //     queryFn: async () => {
    //         const res = await fetch('https://tourism-planner-server-jhsayem021.vercel.app/appointmentSpeciality')
    //         const data = await res.json();
    //         return data;
    //     }
    // })

    const handleAddService = (data) => {
        const formData = new FormData();
        console.log(data.image[0])
        const image = data.image[0];
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                console.log(imageData);
                if (imageData.success) {
                    console.log(imageData.data.url);
                    const service = {
                        title: data.title,
                        duration: data.duration,
                        description: data.description,
                        price: data.price,
                        image: imageData.data.url
                    }
                    console.log(service)
                    // post doctor 

                    fetch('https://tourism-planner-server-jhsayem021.vercel.app/services', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(service)

                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            toast.success(`${data.title} added successful`);
                            navigate('/packeges')

                        })


                }
            })

    }

    // if (isLoading) {
    //     return <Loading></Loading>
    // }

    return (
        <div className=' w-4/5 lg:w-96 mx-auto '>
            <h1 className="text-3xl mb-5 justify-center">Add a Service</h1>

            <form className='' onSubmit={handleSubmit(handleAddService)}>
                <div className="form-control w-full max-w-xs lg:max-w-sm">
                    <label className="label"> <span className="label-text">Title</span></label>
                    <input type="text" {...register("title", {
                        required: "Name is Required"
                    })} className="input input-bordered w-full max-w-xs lg:max-w-sm" />
                    {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs lg:max-w-sm">
                    <label className="label"> <span className="label-text">Duration</span></label>
                    <input type="text" {...register("duration", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs lg:max-w-sm" />
                    {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs lg:max-w-sm">
                    <label className="label"> <span className="label-text">Description</span></label>
                    <input type="text" {...register("description", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs lg:max-w-sm" />
                    {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs lg:max-w-sm">
                    <label className="label"> <span className="label-text">Price</span></label>
                    <input type="text" {...register("price", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs lg:max-w-sm" />
                    {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
                </div>
                {/* <div className="form-control w-full max-w-xs lg:max-w-sm">
                    <label className="label"> <span className="label-text">Nid number</span></label>
                    <input type="nid" {...register("nid", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs lg:max-w-sm" />
                    
                </div> */}
                {/* <div className="form-control w-full max-w-xs lg:max-w-sm">
                    <label className="label"> <span className="label-text">Speciality</span></label>
                    <select
                        {...register('speciality')}
                        className="select select-bordered w-full max-w-xs lg:max-w-sm">

                        {
                            specialities.map(speciality => <option
                                key={speciality._id}
                                value={speciality.name}
                            >{speciality.name}</option>)
                        }


                    </select>
                </div> */}

                <div className="form-control w-full max-w-xs lg:max-w-sm">
                    <label className="label"> <span className="label-text">Image</span></label>
                    <input type="file" {...register("image", {
                        required: "Photo is Required"
                    })} className="input input-bordered w-full max-w-xs lg:max-w-sm" />
                    {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
                </div>


                <input className='btn btn-accent w-full mt-4 max-w-xs lg:max-w-sm' value="Add Services" type="submit" />

            </form>
        </div>              
    );
};

export default AddService;