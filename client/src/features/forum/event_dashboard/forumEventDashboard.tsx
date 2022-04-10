import {useEffect,useState} from 'react'
import { Spinner } from '../../../components/Spinner/Spinner';
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from '../../../utils/axios';

 interface EventInfo{
    name:string,
    route:string,
}

const eventInfoList:EventInfo[] = [
    {name:'Event Details',route:'eventInfo'},
    {name:'Budget',route:'budget'},
    {name:'Event Venue',route:'venueInfo'},
    {name:'Equipment',route:'eventEquipment'},
    {name:'Attendance',route:'eventAttendance'},
    {name:'Report & Media',route:'reportAndMedia'},
]

function ForumEventDashboard(props) {
    const navigate = useNavigate()
    const {state} = useLocation()
    const [loading, setLoading] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const [event, setEvent] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    const [error, setError] = useState(null);

    async function getEventDetails(){
        if(state){
            setUsername("codingStudio();");
            // setEvent(state.name);
            // setStatus(state.eventStatus);  
            setEvent("");
            setStatus("");
            try {
                const res = await axiosInstance.post(process.env.REACT_APP_SERVER_URL +"faculty/fetchFaculty", );
                //get forum Name            
            } catch (error) {
                setError(error.toString())               
            }
            setLoading(false);        
        }
        else{
            setLoading(false);        
        }
    }

    useEffect(() => {
        getEventDetails();
    }, [])


    return !loading?(
        (
            !error?
            <div id="forumEventPage">
                <div id='forumEventPageContent' className='mx-auto my-5'>
                    <div className='mx-auto w-11/12 md:w-5/6 mt-8 md:mt-16 mb-12'>
            
                        <div className='flex flex-col justify-start items-start sm:flex-row sm:justify-start sm:items-center'>
                            {/* <span className="material-icons md:scale-150 mr-4 ">chevron_left</span> */}
                            <span className='ml-4 sm:ml-0 font-normal sm:font-medium  md:font-semibold text-arma-dark-blue text-xl md:text-4xl '>{username+" "+event}</span>
                            <span className='sm:mt-0 mt-4 ml-auto mr-4 sm:mr-0 sm:ml-4 btn-green'>{status}</span>
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
                                            onClick={()=>navigate(`../${eventInfo.route}`,{replace:true})}
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
            :
            <div>{error}</div>
        )
    ):
    <div className='flex h-screen justify-center items-center'>
        <Spinner className=''/>
    </div>
}

export default ForumEventDashboard;