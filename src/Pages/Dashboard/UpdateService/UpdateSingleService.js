import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
const UpdateSingleService = () => {
    const service = useLoaderData();
    const { title, duration, description, price, image , _id } = service;
    console.log(service)
    

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
        if(data.image[0]=== undefined){
            const service = {
                id: _id,
                title: data.title,
                duration: data.duration,
                description: data.description,
                price: data.price,
                image: image
            }
            console.log(service)
            // post doctor 

            fetch('https://tourism-planner-server-jhsayem021.vercel.app/updateservice', {
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
                    toast.success(`${data.title} Update successful`);
                    navigate('/dashboard/updateservice')

                })
        }
        else{
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
                        id: _id,
                        title: data.title,
                        duration: data.duration,
                        description: data.description,
                        price: data.price,
                        image: imageData.data.url
                    }
                    console.log(service)
                    // post doctor 

                    fetch('https://tourism-planner-server-jhsayem021.vercel.app/updateservice', {
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
                            toast.success(`${data.title} Update successful`);
                            navigate('/dashboard/updateservice')

                        })


                }
            })
        }

    }

    return (
        <div className=' w-4/5 lg:w-96 mx-auto '>
        <h1 className="text-3xl mb-5 justify-center">Update a service</h1>

        <form className='' onSubmit={handleSubmit(handleAddService)}>
        <figure><img className='w-34 group-hover:opacity-20 rounded-t-lg' src={image} alt="" /></figure>
            <div className="form-control w-full max-w-xs lg:max-w-3xl mt-3">
                <label className="label"> <span className="label-text">Title</span></label>
                <input type="text"    {...register("title",{
                    required: "Name is Required",
                    value:title
                })}    className="input input-bordered w-full max-w-xs lg:max-w-3xl" />
                {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
            </div>
            <div className="form-control w-full max-w-xs lg:max-w-3xl mt-3">
                <label className="label"> <span className="label-text">Duration</span></label>
                <input type="text"  {...register("duration", {
                    required: true,
                    value: duration
                })} className="input input-bordered w-full max-w-xs lg:max-w-3xl" />
                {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
            </div>
            <div className="form-control w-full max-w-xs lg:max-w-3xl mt-3">
                <label className="label"> <span className="label-text">Description</span></label>
                <textarea type="text"  {...register("description", {
                    required: true,
                    value:description
                })} className="input input-bordered w-full max-w-xs lg:max-w-3xl" />
                {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
            </div>
            <div className="form-control w-full max-w-xs lg:max-w-3xl mt-3">
                <label className="label"> <span className="label-text">Price</span></label>
                <input type="text"  {...register("price", {
                    required: true,
                    value:price
                })} className="input input-bordered w-full max-w-xs lg:max-w-3xl" />
                {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
            </div>
            {/* <div className="form-control w-full max-w-xs lg:max-w-3xl">
                <label className="label"> <span className="label-text">Nid number</span></label>
                <input type="nid" {...register("nid", {
                    required: true
                })} className="input input-bordered w-full max-w-xs lg:max-w-3xl" />
                
            </div> */}
            {/* <div className="form-control w-full max-w-xs lg:max-w-3xl">
                <label className="label"> <span className="label-text">Speciality</span></label>
                <select
                    {...register('speciality')}
                    className="select select-bordered w-full max-w-xs lg:max-w-3xl">

                    {
                        specialities.map(speciality => <option
                            key={speciality._id}
                            value={speciality.name}
                        >{speciality.name}</option>)
                    }


                </select>
            </div> */}

            <div className="form-control w-full max-w-xs lg:max-w-3xl mt-3">
                <label className="label"> <span className="label-text">Image</span></label>
                
                <input type="file" {...register("image", {
                    required: false
                })} className="input input-bordered w-full max-w-xs lg:max-w-3xl" />
                {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
            </div>


            <input className='btn btn-accent w-full mt-4 max-w-xs lg:max-w-3xl mt-3' value="Update" type="submit" />

        </form>
    </div>   
    );
};

export default UpdateSingleService;