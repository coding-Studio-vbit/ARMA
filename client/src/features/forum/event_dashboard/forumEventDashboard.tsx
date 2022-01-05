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

                <Navbar navItems={[]} userName={username}/>

                <div id='forumEventPageContent' className='w-screen mx-auto my-5'>

                    <div className='my-8 w-1/12 text-center scale-125'>
                        <span className="material-icons md:scale-150 ">chevron_left</span>
                    </div>

                    <div className='mx-auto w-11/12 md:w-5/6'>
                        <div className='flex flex-row justify-start items-center'>
                            <span className=' font-normal md:font-semibold text-arma-dark-blue text-xl md:text-4xl '>{username+" "+event}</span>
                            <span className='ml-4 btn-green'>{status}</span>
                        </div>
                        
                        <div className='mt-6 mb-10 border-t-2 w-full mx-auto border-slate-500'></div>

                        <div className='flex flex-row  flex-wrap sm:flex-wrap md:flex-nowrap justify-center items-center gap-5  my-5 mx-auto w-11/12'>
                            <div className='w-full sm:w-3/4 md:1/3 p-10 m-0 
                                arma-card-gradient text-white text-2xl
                                shadow-2xl rounded-2xl min-h-max h-60'>
                                <div className=' flex flex-wrap justify-between items-center'>
                                    <span>Event Details</span>
                                    <span className="material-icons text-right scale-125">
                                    info
                                    </span>
                                </div>
                            </div> 
                            <div className='w-full sm:w-3/4 md:1/3 p-10 m-0 
                                arma-card-gradient text-white text-2xl
                                shadow-2xl rounded-2xl min-h-max h-60'>
                                <div className='flex flex-wrap justify-between items-center'>
                                    <span>Budget</span>
                                    <span className="material-icons text-right scale-125">
                                    info
                                    </span>
                                </div>
                            </div>
                            <div className='w-full sm:w-3/4 md:1/3 p-10 m-0 
                                arma-card-gradient text-white text-2xl
                                shadow-2xl rounded-2xl min-h-max h-60'>
                                <div className='flex flex-wrap justify-between items-center'>
                                    <span>Event Venue</span>
                                    <span className="material-icons text-right scale-125">
                                    info
                                    </span>
                                </div>
                            </div>                            
                        </div>

                        <div className='flex flex-row flex-wrap sm:flex-wrap md:flex-nowrap justify-center items-center gap-5  my-5 mx-auto w-11/12'>
                            <div className='grow-0 w-full sm:w-3/4 md:1/3 p-10 m-0 
                                arma-card-gradient text-white text-2xl
                                shadow-2xl rounded-2xl min-h-max h-60'>
                                <div className='flex flex-wrap justify-between items-center'>
                                    <span>Attendance</span>
                                    <span className="material-icons text-right scale-125">
                                    info
                                    </span>
                                </div>
                            </div> 
                            <div className='grow-0 w-full sm:w-3/4 md:1/3 p-10 m-0 
                                arma-card-gradient text-white text-2xl
                                shadow-2xl rounded-2xl min-h-max h-60'>
                                <div className='flex flex-wrap justify-between items-center'>
                                    <span>Equipment</span>
                                    <span className="material-icons text-right scale-125">
                                    info
                                    </span>
                                </div>
                            </div>
                            <div className='grow-0 w-full sm:w-3/4 md:1/3 p-10 m-0 
                                arma-card-gradient text-white text-2xl
                                shadow-2xl rounded-2xl min-h-max h-60'>
                                <div className='flex flex-wrap justify-between items-center'>
                                    <span>Report & Media</span>
                                    <span className="material-icons text-right scale-125">
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
