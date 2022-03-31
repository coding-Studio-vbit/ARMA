import {useEffect,useState} from 'react'
import { Spinner } from '../../../components/Spinner/Spinner';
import { useNavigate } from "react-router-dom";

 interface EventInfo{
    name:string,
    route:string,
}

const eventInfoList:EventInfo[] = [
    {name:'Event Details',route:'/venueInfo'},
    {name:'Budget',route:'/budget'},
    {name:'Event Venue',route:'/venueInfo'},
    {name:'Equipment',route:'/eventEquipment'},
    {name:'Attendance',route:'/eventAttendance'},
    {name:'Report & Media',route:'/reportAndMedia'},
]

function ForumEventDashboard() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const [event, setEvent] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    useEffect(() => {
        setTimeout(() => {
            //change event info based on dat fetched
            setLoading(false);
            setUsername("codingStudio();");
            setEvent("SoC");
            setStatus("APPROVD");           
        }, 2000);        
    }, [])


    return !loading?(
        (
            <div id="forumEventPage">
                <div id='forumEventPageContent' className='mx-auto my-5'>
                    <div className='mx-auto w-11/12 md:w-5/6 mt-8 md:mt-16 mb-12'>
            
                        <div className='flex flex-row justify-start items-center'>
                            {/* <span className="material-icons md:scale-150 mr-4 ">chevron_left</span> */}
                            <span className='font-normal sm:font-medium  md:font-semibold text-arma-dark-blue text-xl md:text-4xl '>{username+" "+event}</span>
                            <span className='ml-4 btn-green'>{status}</span>
                        </div>
                        
                        <div className='mt-6 mb-10 border-t-2 w-full mx-auto border-slate-500'></div>

                        <div className='flex flex-row flex-wrap 
                            sm:flex-wrap md:flex-nowrap justify-center items-center gap-5 xl:w-5/6 my-5 mx-auto w-5/6 md:w-full'>
                            {
                                eventInfoList.slice(0,3).map((eventInfo,index)=>{
                                    return(
                                        <div className='w-full sm:w-3/4 md:w-1/3 px-6 py-8 lg:p-10 m-0 
                                            arma-card-gradient text-white  text-xl lg:text-2xl
                                            shadow-2xl rounded-2xl min-h-max h-48 md:h-60'
                                            onClick={()=>navigate(eventInfo.route,{ replace: true })}
                                            >
                                            <div className=' flex flex-wrap justify-between items-center' 
                                                >
                                                <span>{eventInfo.name}</span>
                                                {
                                                    (index ===0 || index === 1) &&
                                                    <span className="material-icons text-right  lg:scale-125">
                                                        info
                                                    </span>
                                                } 
                                            </div>
                                        </div> 
                                    );

                                })
                            }                            
                        </div>

                        <div className='flex flex-row flex-wrap 
                            sm:flex-wrap md:flex-nowrap justify-center md:justify-start items-center gap-5 xl:w-5/6 my-5 mx-auto w-5/6 md:w-full'>
                            {
                                eventInfoList
                                .slice(3,status==="APPROVED"?6:4)
                                .map((eventInfo,index)=>{
                                    return(
                                        <div className='w-full sm:w-3/4 md:w-1/3 p-6 py-8 lg:p-10 m-0 
                                        arma-card-gradient text-white  text-xl lg:text-2xl
                                        shadow-2xl rounded-2xl min-h-max h-48 md:h-60'
                                        onClick={()=>navigate(eventInfo.route,{ replace: true })}
                                        >
                                            <div className=' flex flex-wrap justify-between items-center' 
                                                >
                                                <span>{eventInfo.name}</span>
                                                {/* <span className="material-icons text-right  lg:scale-125">
                                                info
                                                </span> */}
                                            </div>
                                        </div> 
                                    );

                                })
                            }        
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