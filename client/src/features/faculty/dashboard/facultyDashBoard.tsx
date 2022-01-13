import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/CustomNavbar';
import { Spinner } from '../../../components/Spinner/Spinner';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar,DayValue,Day } from "react-modern-calendar-datepicker";


interface EventInfo {
    forum:string;
    event:string;
}

function FacultyDashBoard() {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [pendingRequests, setPendingRequests] = useState<number>();
    const [newRequests, setNewRequests] = useState<number>();
    const [currentRequests, setCurrentRequests] = useState<EventInfo[]>();
    const [todaysEvents, setTodaysEvents] = useState<EventInfo[]>();
    const defaultValue= [
        {
            year: 2022,
            month: 1,
            day: 5,
        },
        {
            year: 2022,
            month: 1,
            day: 6,
        },
        {
            year: 2022,
            month: 1,
            day: 7,
        },
        {
            year: 2022,
            month: 1,
            day: 8,
        }
    ];
    
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
            {/* <Navbar navItems={[]} /> */}
            {/* Navbar */}
            
            {/* Page Content */}           
            <div className='mx-auto w-full px-4  md:px-8 lg:px-0 lg:w-10/12 flex flex-col justify-center items-center mt-10 gap-10 py-8 '>

                {/* First Row */}
                <div className='flex flex-row gap-y-10 flex-wrap  lg:flex-nowrap justify-around w-full md:w-5/6 lg:w-11/12  xl:w-9/12 gap-4 xl:gap-6'>
                    {/* Current Requests */}
                    <div className='w-full sm:w-2/3 lg:w-1/2 mx-4 px-10 py-12
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
                    <div className='w-full sm:w-2/3 lg:w-1/2 mx-4 flex justify-center gap-4 lg:gap6 xl:gap-10 items-center h-72'>
                        {/* New Requests */}
                        <div className='w-1/2 h-full shadow-2xl rounded-2xl text-center 
                            flex flex-col justify-center'>
                            <p className='text-lg'>New Requests</p>
                            <div className="pr-3 arma-text-gradient text-transparent bg-clip-text text-9xl  md:text-7xl lg:text-8xl">{newRequests}</div>
                        </div>
                        {/* Pending */}
                        <div className='w-1/2 h-full shadow-2xl rounded-2xl text-center 
                            flex flex-col justify-center'>
                            <p className='text-xl'>Pending</p>
                            <div className="pr-3 arma-text-gradient text-transparent bg-clip-text text-9xl md:text-7xl lg:text-8xl">{pendingRequests}</div>
                        </div>
                    </div>
                    
                </div>

                <div className='flex flex-row gap-y-10 flex-wrap  lg:flex-nowrap  justify-center lg:justify-start w-full md:w-5/6 lg:w-11/12  xl:w-9/12 gap-4 xl:gap-6'>
                    <div className='
                    w-full sm:w-2/3 lg:w-1/2 mx-4 px-10 py-12
                    text-2xl shadow-2xl rounded-2xl h-72 overflow-y-scroll currentRequest white' >
                        <p className='arma-text-gradient text-transparent bg-clip-text'>Today's Events</p>
                        <ul className='list-disc list-inside text-xl'>
                            {
                                todaysEvents?.map((element)=>{
                                    return <li>{element.event}</li>
                                })
                            }
                        </ul>                          
                    </div>
                    <div className='w-full sm:w-2/3 lg:w-1/2 mx-4 text-2xl shadow-2xl rounded-2xl overflow-y-scroll currentRequest white'>
                        <Calendar
                            value={selectedDay}
                            // onChange={setSelectedDay}
                            colorPrimary="#0B5B8A"
                            calendarClassName="responsiveCalendar"
                            shouldHighlightWeekends
                        />
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