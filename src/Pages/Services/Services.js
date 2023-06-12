import React from 'react';
import Service from './Service';
import Loading from '../Shared/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';



const Services = () => {
    
    // Services to be rendered on the UI
    // const [displayServices, setDisplayServices] = useState([]);
    // useEffect(() => {
    //     fetch(`https://tourism-demo-server-site-main-update.vercel.app/services`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setDisplayServices(data.services);

    //         });
    // }, []);

    


    const { data: services = [],  isLoading } = useQuery({
        queryKey: ['services'],
        queryFn: () => fetch(`https://tourism-planner-server-jhsayem021.vercel.app/services`)
            .then(res => res.json())
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    
    
    return (
        <div className='max-w-[1440px] mx-auto'>
            

            {(services.length === 0) ?
                <div className="d-flex justify-content-center">
                    <div></div>
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <>
                    <div className="grid gap-6  grid-cols-1 lg:grid-cols-3  my-10 justify-items-center">


                        {services.slice(0, 6).map(service => <Service

                            key={service._id}
                            service={service}
                    
                        >
                        </Service>)}



                    </div>
                    <div className="grid justify-items-center my-5 ">
                        <Link to="/packeges" className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white px-24">View All</Link>
                    </div>
                </>
            }


        </div>
    );
};

export default Services;