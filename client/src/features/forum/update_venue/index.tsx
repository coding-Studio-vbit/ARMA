import { useState, useEffect } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, Day } from "react-modern-calendar-datepicker";
import { useLocation, useNavigate } from "react-router-dom";

import { SelectHalls } from "./selectHalls";
import axios from "../../../utils/axios";

//redux imports
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import {
  createDatesState,
  selectDate,
  createReservations,
} from "../../../redux/actions";

const EventVenue = () => {
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);
  const [showCalender, setShowCalender] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const [hallList, setHallList] = useState([]);
  const eventDetails = useSelector((state: RootState) => state.eventDetails);
  const eventDates = useSelector((state: RootState) => state.eventDates);
  const [oldEventDates, setOldEventDates] = useState({});
  const { state }: { state: any } = useLocation();
  const [eventObject, setEventObject] = useState<any>({});

  const getEventObject = async () => {
    const response = await axios.get(`events/getEvent/${state.eventId}`);
    if (response.data.response.status == -1) {
      console.log(response.data, "hi");
    } else {
      console.log(response);
      setEventObject(response.data.response);
    }
  };

  const updateReservations = async (newReservations) => {
    let result = await axios.post("events/updateEventReservations", {
      eventHalls: newReservations,
      id: state.eventId,
    });
    navigate(-1);
    console.log(result);
  };
  useEffect(() => {
    getEventObject();
  }, [state]);
  useEffect(() => {
    if (Object.keys(eventDates).length === 0) navigate(-1);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}halls`)
      .then((response) => {
        setHallList(response.data.response.data);
        var temp = [];
        response.data.response.data.map((data) => temp.push(data.name));
        setHallList(temp);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}events/getEventReservations/${state.eventId}`
      )
      .then((response) => {
        var res = response.data.response;
        var obj = {};
        Object.keys(response.data.response).map((d) => {
          var x = d.split("-");
          const dateString = new Date(
            parseInt(x[2]),
            parseInt(x[1]) - 1,
            parseInt(x[0])
          );
          obj[dateString.toDateString()] = {
            dateObject: {
              day: parseInt(x[0]),
              month: parseInt(x[1]),
              year: parseInt(x[2]),
            },
            eventDate: dateString,
            halls: res[d].halls,
          };
        });
        setOldEventDates(obj);
      });
  }, []);

  //redux
  const [blockedSlots, setBlockedSlots] = useState({});
  const key = useSelector((state: RootState) => state.selectedDate);
  const dispatch = useDispatch();
  useEffect(() => {
    var dates = [];
    Object.keys(eventDates).map((key) => {
      dates.push(eventDates[key].dateObject);
    });
    setSelectedDays(dates);
  }, []);
  useEffect(() => {
    selectedDays.forEach((date) => {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}halls/getSlots`, {
          date: `${date.day}-${date.month}-${date.year}`,
        })
        .then((response) => {
          const temp = { ...blockedSlots };
          temp[`${date.day}-${date.month}-${date.year}`] =
            response.data.response;
          setBlockedSlots(temp);
        });
    });
  }, [selectedDays]);
  const setReservations = (date) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}halls/getSlots`, {
        date: date,
      })
      .then(async (response) => {
        dispatch(createReservations(response.data.response));
      });
  };
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
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const minimumDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  const defaultValue = {
    from: minimumDate,
    to: minimumDate,
  };
  const [selectedDayRange, setSelectedDayRange] = useState(defaultValue);
  const [eventHalls, setEventHalls] = useState(eventDates);
  const [showHallSelection, setShowHallSelection] = useState(false);
  interface date {
    day: number;
    month: number;
    year: number;
  }
  const HallsList = (halls: string[], event: string, date: date) => {
    var temp = halls.map((hall) => hall.split(".")[1]);
    var filteredHalls = temp.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });
    return filteredHalls.map((hall: string, i: number) => {
      return (
        <button
          key={hall + i++}
          onClick={async () => {
            await dispatch(selectDate(event));
            await setReservations(`${date.day}-${date.month}-${date.year}`);
            await setShowHallSelection(true);
          }}
          className="flex text-gray-500 flex-row justify-around px-8 mr-4 mb-2 rounded border border-[#139beb] hover:bg-[#139beb] hover:text-white cursor-pointer"
        >
          <div className="">{hall}</div>
        </button>
      );
    });
  };

  const DatesList = () =>
    Object.keys(eventDates).map((event) => {
      const dateString = new Date(
        eventDates[event].dateObject.year,
        eventDates[event].dateObject.month - 1,
        eventDates[event].dateObject.day
      );

      return (
        <div
          key={dateString.toDateString()}
          className="flex flex-col bg-white w-8/12 my-3 p-5 justify-between items-center rounded-[25px]"
        >
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <button
              onClick={() => setShowCalender(true)}
              className="md:w-4/12 text-center font-medium mb-2 text-black md:mb-0"
            >
              {days[dateString.getDay()]}, {dateString.getDate()}{" "}
              {months[dateString.getMonth()]} {dateString.getFullYear()}
            </button>
            <div className="md:w-8/12 flex flex-col md:flex-wrap md:flex-row md:px-16 md:border-l-2">
              {eventDates[event].halls.length === 0 ? (
                <button
                  className="flex items-center text-[#88b3cc]"
                  onClick={async () => {
                    await dispatch(selectDate(event));
                    await setReservations(
                      `${eventDates[event].dateObject.day}-${eventDates[event].dateObject.month}-${eventDates[event].dateObject.year}`
                    );
                    await setShowHallSelection(true);
                  }}
                >
                  add halls
                  {!["COMPLETED", "REJECTED", "APPROVED", "CANCELLED"].includes(
                    eventObject?.eventStatus
                  ) ? (
                    <img
                      className="ml-3"
                      alt="add button"
                      src="https://img.icons8.com/material-outlined/24/88b3cc/add.png"
                    />
                  ) : null}
                </button>
              ) : (
                HallsList(
                  eventDates[event].halls,
                  event,
                  eventDates[event].dateObject
                )
              )}
            </div>
          </div>
        </div>
      );
    });
  const setDays = (date) => {
    setSelectedDays(date);
    var obj = {};
    date.map((d) => {
      const dateString = new Date(d.year, d.month - 1, d.day);
      if (eventDates[dateString.toDateString()]) {
        obj[dateString.toDateString()] = eventDates[dateString.toDateString()];
      } else if (!obj[dateString.toDateString()])
        obj[dateString.toDateString()] = {
          dateObject: d,
          eventDate: dateString,
          halls: [],
        };
    });
    dispatch(createDatesState(obj));
    dispatch(selectDate(""));
    if (date.length === 0) dispatch(createDatesState({}));
  };
  const dynamicCalender = () => {
    if (isLong)
      return (
        <Calendar
          value={selectedDayRange}
          onChange={setSelectedDayRange}
          colorPrimary="#0fbcf9" // added this
          colorPrimaryLight="rgba(75, 207, 250, 0.4)"
          renderFooter={() => (
            <div
              style={{
                padding: "1rem 2rem",
              }}
              className="flex justify-center"
            >
              <button
                style={{
                  padding: "0.5rem 2rem",
                  marginRight: 15,
                }}
                onClick={() => setShowCalender(false)}
                className="outlineBtn text-arma-blue border-[1px] rounded-[8px] mt-2 mb-2 px-[25px]"
              >
                Select
              </button>
              <button
                style={{
                  padding: "0.5rem 2rem",
                }}
                onClick={() => setShowCalender(false)}
                className="outlineCancelBtn text-[#ff6863] border-[1px] rounded-[8px] mt-2 mb-2 px-[25px]"
              >
                Cancel
              </button>
            </div>
          )}
        />
      );
    else
      return (
        <Calendar
          value={selectedDays}
          shouldHighlightWeekends
          colorPrimary="#139beb"
          minimumDate={minimumDate}
          onChange={(e) => {
            setDays(e);
          }}
          renderFooter={() => (
            <div
              style={{
                padding: "1rem 2rem",
              }}
              className="flex justify-center"
            >
              <button
                style={{
                  padding: "0.5rem 2rem",
                }}
                onClick={() => setShowCalender(false)}
                className="outlineBtn text-arma-blue border-[1px] rounded-[8px] mt-2 mb-2 px-[25px]"
              >
                Done
              </button>
            </div>
          )}
        />
      );
  };
  const CalenderPopUp = () => {
    return (
      <div
        className="bg-black/20 fixed top-0  w-full h-full flex bottom-0 left-0 right-0 z-20 justify-center place-content-center "
        onClick={(e) => {
          setShowCalender(false);
        }}
      >
        <div
          className="p-6 max-w-[90%] rounded-[24px] absolu w-[400px] my-auto z-[15]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {dynamicCalender()}
        </div>
      </div>
    );
  };
  const test = () => {
    setEventHalls({
      ...eventHalls,
      "Sat May 28 2022": {
        dateObject: {
          day: 28,
          month: 4,
          year: 2022,
        },
        eventDate: "2022-05-27T18:30:00.000Z",
        halls: ["chetana", "Sumedha"],
      },
    });
  };

  return (
    <div
      className="flex flex-col min-h-screen justify-start items-center"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      {key.length != 0 ? (
        <SelectHalls
          show={showHallSelection}
          setShow={setShowHallSelection}
          hallsData={hallList}
          oldEventDates={oldEventDates}
          eventStatus={eventObject.eventStatus}
        />
      ) : (
        <></>
      )}
      <div
        className="flex text-arma-title text-4xl font-bold mx-5 text-justify mt-3 mb-3 items-center"
        style={{ color: "#1970A3" }}
      >
        Update Event Venue
        {Object.keys(eventDates).length === 0 &&
        selectedDays.length === 0 ? null : ![
            "COMPLETED",
            "APPROVED",
            "REJECTED",
            "CANCELLED",
          ].includes(eventObject.eventStatus) ? (
          <button
            className="ml-3"
            onClick={() => {
              setShowCalender(true);
            }}
          >
            <img
              alt="edit calender"
              src="https://img.icons8.com/ios-filled/30/88b3cc/edit-calendar.png"
            />
          </button>
        ) : null}
      </div>

      {showCalender ? CalenderPopUp() : null}
      {Object.keys(eventDates).length === 0 && selectedDays.length === 0 ? (
        <div className="flex flex-col items-center">
          {
            //   <div className="flex flex-row items-center">
            //   <h4 className="mr-3">Is it a long period of time?</h4>
            //   <Switch
            //     onChange={setIsLong}
            //     checked={isLong}
            //     onColor="#86d3ff"
            //     onHandleColor="#2693e6"
            //     handleDiameter={30}
            //     uncheckedIcon={false}
            //     checkedIcon={false}
            //     boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            //     activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            //     height={20}
            //     width={48}
            //   />
            // </div>
          }
          <div className="mt-3">Please select event dates</div>
          <button className="mt-[50px]" onClick={() => setShowCalender(true)}>
            <img
              alt="add button"
              src="https://img.icons8.com/material-outlined/96/88b3cc/add.png"
            />
          </button>
        </div>
      ) : null}
      {DatesList()}
      {selectedDays.length > 0 ? (
        <div className="sm:w-3/4 flex sm:items-end mx-auto sm:mx-0">
          <button
            className="btn px-8 py-3   text-xl tracking-wide  ml-auto my-8"
            onClick={async () => {
              updateReservations(eventDates);
            }}
          >
            Update
          </button>
        </div>
      ) : null}
    </div>
  );
};

export { EventVenue };
