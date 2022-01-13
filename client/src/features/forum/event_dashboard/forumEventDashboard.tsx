import React,{useEffect,useState} from 'react'
import Navbar from '../../../components/CustomNavbar';
import { Spinner } from '../../../components/Spinner/Spinner';

function ForumEventDashboard() {
    const [loading, setLoading] = useState<boolean>(true);

    const [username, setUsername] = useState<string>("");
    const [event, setEvent] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setUsername("codingStudio();");
            setEvent("SoC");
            setStatus("APPROVED");           
        }, 2000);        
    }, [])
    return !loading?(
        (
            <div id="forumEventPage">
                <Navbar navItems={[]}/>

                <div id='forumEventPageContent' className='w-screen mx-auto my-5'>

                    <div className='mx-auto w-11/12 md:w-5/6 mt-16 '>
            
                        <div className='flex flex-row justify-start items-center'>
                            <span className="material-icons md:scale-150 mr-4 ">chevron_left</span>
                            <span className='font-normal sm:font-medium  md:font-semibold text-arma-dark-blue text-xl md:text-4xl '>{username+" "+event}</span>
                            <span className='ml-4 btn-green'>{status}</span>
                        </div>
                        
                        <div className='mt-6 mb-10 border-t-2 w-full mx-auto border-slate-500'></div>

                        <div className='flex flex-row flex-wrap 
                            sm:flex-wrap md:flex-nowrap justify-center items-center gap-5 xl:w-5/6 my-5 mx-auto w-5/6 md:w-full'>
                            
                            <div className='w-full sm:w-3/4 md:1/3 p-6 py-8 lg:p-10 m-0 
                                arma-card-gradient text-white  text-xl lg:text-2xl
                                shadow-2xl rounded-2xl min-h-max h-60'>
                                <div className=' flex flex-wrap justify-between items-center'>
                                    <span>Event Details</span>
                                    <span className="material-icons text-right  lg:scale-125">
                                    info
                                    </span>
                                </div>
                            </div> 

                            <div className='w-full sm:w-3/4 md:1/3 p-6 py-8 lg:p-10 m-0 
                                arma-card-gradient text-white  text-xl lg:text-2xl
                                shadow-2xl rounded-2xl min-h-max h-60'>
                                <div className=' flex flex-wrap justify-between items-center'>
                                    <span>Budget</span>
                                    <span className="material-icons text-right  lg:scale-125">
                                    info
                                    </span>
                                </div>
                            </div> 

                            <div className='w-full sm:w-3/4 md:1/3 p-6 py-8 lg:p-10 m-0 
                                arma-card-gradient text-white  text-xl lg:text-2xl
                                shadow-2xl rounded-2xl min-h-max h-60'>
                                <div className=' flex flex-wrap justify-between items-center'>
                                    <span>Event Venue</span>
                                    <span className="material-icons text-right  lg:scale-125">
                                    info
                                    </span>
                                </div>
                            </div>                             
                        </div>


                        <div className='flex flex-row flex-wrap 
                            sm:flex-wrap md:flex-nowrap justify-center items-center gap-5 xl:w-5/6 my-5 mx-auto w-5/6 md:w-full'>
                            
                            <div className='w-full sm:w-3/4 md:1/3 p-6 py-8 lg:p-10 m-0 
                                arma-card-gradient text-white  text-xl lg:text-2xl
                                shadow-2xl rounded-2xl min-h-max h-60'>
                                <div className=' flex flex-wrap justify-between items-center'>
                                    <span>Attendance</span>
                                    <span className="material-icons text-right  lg:scale-125">
                                    info
                                    </span>
                                </div>
                            </div>  

                            <div className='w-full sm:w-3/4 md:1/3 p-6 py-8 lg:p-10 m-0 
                                arma-card-gradient text-white  text-xl lg:text-2xl
                                shadow-2xl rounded-2xl min-h-max h-60'>
                                <div className=' flex flex-wrap justify-between items-center'>
                                    <span>Equipment</span>
                                    <span className="material-icons text-right  lg:scale-125">
                                    info
                                    </span>
                                </div>
                            </div> 

                            <div className='w-full sm:w-3/4 md:1/3 p-6 py-8 lg:p-10 m-0 
                                arma-card-gradient text-white  text-xl lg:text-2xl
                                shadow-2xl rounded-2xl min-h-max h-60'>
                                <div className=' flex flex-wrap justify-between items-center'>
                                    <span>Report & Media</span>
                                    <span className="material-icons text-right  lg:scale-125">
                                    info
                                    </span>
                                </div>
                            </div>                             
                        </div>
                
                    </div>
                                
                </div>                
                
            </div>
        )
    ):
    <div className='flex h-screen justify-center items-center'>
        <Spinner className=''/>
    </div>
}

export default ForumEventDashboard;