import React, { useEffect, useState } from "react";
import { Spinner } from "../../../components/Spinner/Spinner";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, Day } from "react-modern-calendar-datepicker";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./../../../utils/axios";
import { useUser } from "../../../providers/user/UserProvider";

interface EventInfo {
  forum: string;
  event: string;
  date: Day[];
  eventStatus:string;
  _id:string;
}

function FacultyDashBoard() {
  //console.log("jkhgbiujh");
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pendingRequests, setPendingRequests] = useState<number>();
  // const [newRequests, setNewRequests] = useState<number>();
  const [currentRequests, setCurrentRequests] = useState<EventInfo[]>();
  const [todaysEvents, setTodaysEvents] = useState<EventInfo[]>();
  
  const [eventDays, setEventDays] = useState<Day[]>([]);
  const [selectedDate, setSelectedDate] = useState<Day>({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  function handleSelectedDate(days: Day[]) {     
    let difference: Day[] = eventDays.filter((x) => !days.includes(x))
      .concat(days.filter((x) => !eventDays.includes(x)));
    // console.log(difference[0]);
    setSelectedDate(difference[0]);
  }

  function filterWithDates(): EventInfo[] {
    let x:any;
    x = todaysEvents?.filter(
      function(element){
        for (let i = 0; i < element.date.length; i++) {
          if(element.date[i].day === selectedDate?.day && 
             element.date[i].month === selectedDate?.month &&
             element.date[i].year === selectedDate?.year){
               return element;
            } 
        } 
          
      }
    );
    if (x !== undefined) {
      return x;
    } else {
      return [];
    }
  }

  const [error, setError] = useState<string|null>(null);
  const {faculty} = useUser()
  async function fetchData() {
    
    axiosInstance
      .get(process.env.REACT_APP_SERVER_URL + "faculty/dashboardInfo",{params:{isFO:faculty?.role.SAC ? false:faculty?.role.FO}})
      .then((response) => {
        // console.log("Success");
        
        if(response.data.status===1){
          // console.log("got Events");

          const eventList = response.data.response;
          if(eventList.length!==0){
            let data =[];
            for (let i = 0; i < eventList.length; i++) {
              let event:EventInfo={
                forum: "",
                event: "",
                date: [],
                eventStatus: "",
                _id: ""
              };
               event.forum = eventList[i].forumID.name;
               event._id = eventList[i]._id;
               event.event = eventList[i].name;
               event.eventStatus = eventList[i].eventStatus;
               //actual code
               event.date = eventList[i].eventDates;

               //testing
              //  event.date=[
              //    {
              //       day: 5,
              //       month: 1,
              //       year: 2022,
              //     },
              //     {
              //       day: 6,
              //       month: 1,
              //       year: 2022,
              //     },
              //  ]
               let eD = eventDays;
               eD=eD.concat(eventList[i].eventDates)
               data.push(event);
               setEventDays(eD);
            }          
            setCurrentRequests(data);
            setTodaysEvents(data);  
            setPendingRequests(eventList.length); 
          }else{
            // console.log("No Events");
            setError("No Event Requests Found");
          }
          //data :set
        }else{
          // console.log("Failure");
          setError(response.data.response);
        }
        setLoading(false);
        // console.log("End Then");
      })
      .catch((error) => {
        console.log("Fetch Failed");
        setLoading(false);
        setError(error.message);
      });    
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  return !loading ? (
    <div>
        <div className="mx-auto w-full px-4  md:px-8 lg:px-0 lg:w-10/12 flex flex-col justify-center items-center mt-6 gap-10 py-8 pb-14">
          {/* First Row */}
          { error==null &&
            (faculty?.role.ADMIN || faculty?.role.SAC || faculty?.role.FO ) &&(
              <div className="flex flex-row gap-y-10 flex-wrap  lg:flex-nowrap justify-around w-full md:w-5/6 lg:w-11/12  xl:w-9/12 gap-4 xl:gap-6">
            {/* Current Requests */}

            <div
              className="w-max sm:w-2/3 lg:w-1/2 mx-4 px-10 py-12
                      arma-card-gradient text-white text-2xl
                      shadow-2xl rounded-2xl h-72 overflow-y-scroll currentRequest cursor-pointer"
              onClick={()=>{
                if(faculty?.role.SAC){
                  navigate("/faculty/requests")
                }
                else if(faculty?.role.FO){

                  navigate("/faculty/foRequests")
                }
              }}
            >
              <p>Current Requests</p>
              <ul className="list-disc list-inside text-xl ">
                {currentRequests?.map((element) => {
                  return <li key={element._id} >{element.forum + " - " + element.event}</li>;
                })}
              </ul>
            </div>
            <div className="w-full sm:w-2/3 lg:w-1/2 mx-4 flex justify-center gap-4 lg:gap6 xl:gap-10 items-center h-72">
              {/* New Requests */}
              {/* <div
                className="w-1/2 h-full shadow-2xl rounded-2xl text-center 
                              flex flex-col justify-center  cursor-pointer"
              >
                <p className="text-lg">New Requests</p>
                <div className="pr-3 arma-text-gradient text-transparent bg-clip-text text-9xl  md:text-7xl lg:text-8xl">
                  {newRequests}
                </div>
              </div> */}
              {/* Pending */}
              <div
                className="w-full md:w-2/3 h-full shadow-2xl rounded-2xl text-center 
                              flex flex-col justify-center  cursor-pointer"
              >
                <p className="text-xl">Pending Requests</p>
                <div className="pr-3 arma-text-gradient text-transparent bg-clip-text text-9xl md:text-7xl lg:text-8xl">
                  {pendingRequests}
                </div>
              </div>
            </div>
          </div>
            )
          }

          <div className="flex flex-row gap-y-10 flex-wrap  lg:flex-nowrap  justify-center lg:justify-start w-full md:w-5/6 lg:w-11/12  xl:w-9/12 gap-4 xl:gap-6">
            <div className="w-full sm:w-2/3 lg:w-1/2 xl:w-5/12 mx-4 text-2xl border-2 border-grey-600 shadow-2xl rounded-2xl overflow-y-scroll currentRequest white">
              <Calendar
                value={eventDays}
                onChange={(e) => handleSelectedDate(e)}
                colorPrimary="#0B5B8A"
                calendarClassName="responsiveCalendar"
                shouldHighlightWeekends
              />
            </div>

            <div
              className="w-full sm:w-2/3 lg:w-1/2 mx-4 px-10 py-12
                          text-2xl shadow-2xl rounded-2xl h-72 overflow-y-scroll currentRequest white"
            >
              <p className="arma-text-gradient text-transparent bg-clip-text">
                Events on -{" "}
                {selectedDate.day +
                  "/" +
                  selectedDate.month +
                  "/" +
                  selectedDate.year}
              </p>
              {selectedDate != null && filterWithDates().length > 0 ? (
                <ul className="mt-3 list-disc list-inside text-xl">
                  {filterWithDates().map((e) => {
                    return <li key={e._id}>{e.event}</li>;
                  })}
                </ul>
              ) : (
                <p className="text-xl text-teal-600 mt-4  my-auto h-full">
                  No Events
                </p>
              )}
            </div>
          </div>
        </div>:
        <div className="flex justify-center items-center">
          {error}
        </div>
      
    </div>
  ) : (
    <div className="flex h-screen justify-center items-center">
      <Spinner className="" />
    </div>
  );
}

export default FacultyDashBoard;
