import React, { useState, useEffect } from "react";
import { Calendar, Day } from "react-modern-calendar-datepicker";
import axios from "./../../../utils/axios";
import { Spinner } from "../../../components/Spinner/Spinner";

interface EventInfo {
  forum: string;
  event: string;
  date: Day[];
  eventStatus: string;
  _id: string;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function EventCalendar() {
  const [loading, setLoading] = useState(true);
  const [todaysEvents, setTodaysEvents] = useState<EventInfo[]>();
  const [eventDays, setEventDays] = useState<Day[]>([]);
  const [selectedDate, setSelectedDate] = useState<Day>({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  function handleSelectedDate(days: Day[]) {
    let difference: Day[] = eventDays
      .filter((x) => !days.includes(x))
      .concat(days.filter((x) => !eventDays.includes(x)));
    setSelectedDate(difference[0]);
  }

  function filterWithDates(): EventInfo[] {
    let x: any;
    x = todaysEvents?.filter(function (element) {
      for (let i = 0; i < element.date.length; i++) {
        if (
          element.date[i].day === selectedDate?.day &&
          element.date[i].month === selectedDate?.month &&
          element.date[i].year === selectedDate?.year
        ) {
          return element;
        }
      }
      return undefined;
    });
    if (x !== undefined) {
      return x;
    } else {
      return [];
    }
  }

  const [error, setError] = useState<string | null>(null);
  async function fetchData() {
    console.log('ff');
    
    axios
      .get(process.env.REACT_APP_SERVER_URL + "public/eventCalendar")
      .then((response) => {
        console.log(response);
        // console.log("Success");
        if (response.data.status === 1) {
          console.log("got Events");
          console.log(response.data.response);
          const eventList = response.data.response;
          if (eventList.length !== 0) {
            let data = [];
            for (let i = 0; i < eventList.length; i++) {
              let event: EventInfo = {
                forum: "",
                event: "",
                date: [],
                eventStatus: "",
                _id: "",
              };
              event.forum = eventList[i].forumID.name;
              event._id = eventList[i]._id;
              event.event = eventList[i].name;
              event.eventStatus = eventList[i].eventStatus;
              //actual code
              let dates = eventList[i].eventDates;
              for (let i = 0; i < dates.length; i++) {
                let d = new Date(dates[i]);
                dates[i] = {
                  day: d.getDate(),
                  month: d.getMonth() + 1,
                  year: d.getFullYear(),
                };
              }
              event.date = dates;
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
              eD.push.apply(eD,dates)
              // eD = eD.concat(eventList[i].eventDates);
              data.push(event);
              setEventDays(eD);
            }
            // setCurrentRequests(data);
            setTodaysEvents(data);
            // setPendingRequests(eventList.length);
          } else {
            // console.log("No Events");
            setError("No Event Requests Found");
          }
          //data :set
        } else {
          console.log("Failure");
          setError(response.data.response);
        }
        setLoading(false);
        console.log("End Then");
      })
      .catch((error) => {
        console.log("Fetch Failed");
        setLoading(false);
        setError(null);
        // setError(error.toString());
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <nav className={`flex  flex-row bg-white z-[11] fixed w-full h-[60px]`}>
        <div className="flex-1 flex justify-between px-3 md:px-8 lg:px-16 shadow-md  items-center">
          <div
            id="ARMA-Logo"
            //onClick={()=>nav('/',{replace:true})}
            className="text-xl md:text-2xl  font-poppins pl-2 text-arma-dark-blue cursor-pointer"
          >
            A.R.M.A - Event Calendar
          </div>
        </div>
      </nav>
      {!loading ? (
        error == null ? (
          <div className="h-screen bg-teal-100 flex justify-center items-start pt-20 md:m-auto md:items-center">
            <div
              className="bg-arma-blue 
                        flex flex-col lg:flex-row rounded-3xl
                        lg:h-3/4 w-5/6 lg:w-5/6 xl:w-2/3 text-white mt-0"
            >
              <div
                className="h-auto px-8 py-8 md:py-10 justify-between 
                        lg:justify-center lg:px-2 lg:h-full lg:py-5 w-full lg:w-1/3 
                        flex flex-row lg:flex-col items-center gap-5 text-white "
              >
                <div className="text-left lg:text-center">
                  <p className="text-5xl lg:text-9xl ">{selectedDate.day}</p>
                  <p className="text-2xl lg:text-4xl">
                    {
                      weekDay[
                        new Date(
                          selectedDate.year,
                          selectedDate.month - 1,
                          selectedDate.day
                        ).getDay()
                      ]
                    }
                  </p>
                  <p className="text-3xl lg:text-4xl">
                    {months[selectedDate.month - 1] + " " + selectedDate.year}
                  </p>
                </div>

                {selectedDate != null && filterWithDates().length > 0 ? (
                  <ul className="mt-3 list-disc list-inside text-xl">
                    {filterWithDates().map((e) => {
                      return <li key={e._id}>{e.event}</li>;
                    })}
                  </ul>
                ) : (
                  <p className=" mt-4">No Events</p>
                )}
              </div>

              <div className="w-full lg:w-2/3">
                <Calendar
                  value={eventDays}
                  onChange={(e) => handleSelectedDate(e)}
                  // colorPrimary="#0B5B8A"
                  calendarClassName="publicCalendar"
                  calendarSelectedDayClassName="eventDays"
                  calendarRangeStartClassName="eventDays"
                  calendarRangeBetweenClassName="eventDays"
                  calendarRangeEndClassName="eventDays"
                  // customDaysClassName={"eventDays"}
                  shouldHighlightWeekends
                />
              </div>
            </div>
          </div>
        ) : (
          <div>ffh{error}</div>
        )
      ) : (
        <div className="flex h-screen justify-center items-center">
          <Spinner className="" />
        </div>
      )}
    </div>
  );
}

export default EventCalendar;
