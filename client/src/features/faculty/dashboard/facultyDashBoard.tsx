import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/CustomNavbar';
import { Spinner } from '../../../components/Spinner/Spinner';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
interface EventInfo {
    forum:string;
    event:string;
}


function FacultyDashBoard() {
    const navItems=[
        {  label:'Dashboard',icon:"home",path:'/'},
        {  label:'Forums',icon:"group",path:'/' },
        {  label:'Students',icon:"person",path:'/' },        
    ];

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [pendingRequests, setPendingRequests] = useState<number>();
    const [newRequests, setNewRequests] = useState<number>();
    const [currentRequests, setCurrentRequests] = useState<EventInfo[]>();
    const [todaysEvents, setTodaysEvents] = useState<EventInfo[]>();
    const defaultValue = {
        year: 2019,
        month: 10,
        day: 5,
      };
    
    const [selectedDay, setSelectedDay] = useState(defaultValue);

    async function fetchData(){
        setTimeout(() => {
            setLoading(false);
            setUsername("Prashanith");
            let li=[
                {forum:"codeStream",event:"codeStream_1"},
                {forum:"IEEE",event:"IEEE Xtreme"},
                {forum:"codingStudio();",event:"CodeCraft"},
                {forum:"Stumagz",event:"Talks"},     
            ];
            setPendingRequests(7);
            setNewRequests(4);
            setCurrentRequests(li);
            setTodaysEvents(li);
            
        }, 2000);    
    }

    useEffect(() => {
        fetchData();        
    }, [])

    return !loading?(
        <div>
            {/* Navbar */}
            <Navbar navItems={navItems} userName={username}/>
            <div style={loading?{cursor:'pointer'}:{cursor:'no-drop'}}></div>

            {/* Page Content */}           
            <div className='flex flex-col items-center display:hidden py-8'>  

                <div className='md:w-10/12 flex flex-col justify-start items-center mt-10 gap-10'>

                    {/* First Row */}
                    <div className='flex flex-row justify-around w-9/12 gap-10'>
                        {/* Current Requests */}
                        <div className='w-1/2 min-h-min px-12 py-14
                        arma-card-gradient text-white text-2xl
                        shadow-2xl rounded-2xl h-72 overflow-y-scroll currentRequest' >
                            <p>Current Requests</p>
                            <ul className='list-disc list-inside text-xl '>
                                {
                                    currentRequests?.map((element)=>{
                                        return <li>{element.forum+" - "+element.event}</li>
                                    })
                                }
                            </ul>                          
                        </div>
                        {/* New Requests */}
                        <div className='w-1/4 min-h-min shadow-2xl rounded-2xl text-center 
                            flex flex-col justify-center'>
                            <p className='text-lg'>New Requests</p>
                            <div className="pr-3 arma-text-gradient text-transparent bg-clip-text text-9xl">{newRequests}</div>
                        </div>
                        {/* Pending */}
                        <div className='w-1/4 min-h-min shadow-2xl rounded-2xl text-center 
                            flex flex-col justify-center'>
                            <p className='text-xl'>Pending</p>
                            <div className="pr-3 arma-text-gradient text-transparent bg-clip-text text-9xl">{pendingRequests}</div>
                        </div>
                    </div>

                    <div className='flex flex-row justify-start w-9/12 gap-10'>
                        <div className='w-1/2 px-12 py-14
                            white text-2xl h-80
                            shadow-2xl rounded-2xl overflow-y-scroll currentRequest' >
                            <p className='arma-text-gradient text-transparent bg-clip-text'>Today's Events</p>
                            <ul className='list-disc list-inside text-xl'>
                                {
                                    todaysEvents?.map((element)=>{
                                        return <li>{element.event}</li>
                                    })
                                }
                            </ul>                          
                        </div>
                        <div className='min-h-min p-0 shadow-2xl rounded-2xl'>
                            <Calendar
                                value={selectedDay}
                                // onChange={setSelectedDay}
                                shouldHighlightWeekends
                            />
                        </div>
                       
                    </div>
                </div>
            </div>            
        </div>
        ):
        <div className='flex h-screen justify-center items-center'>
            <Spinner className=''/>
        </div>
}

export default FacultyDashBoard;