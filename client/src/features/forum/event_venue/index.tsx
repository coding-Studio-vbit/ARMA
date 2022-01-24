import { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, Day } from "react-modern-calendar-datepicker";

const EventVenue = () => {
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);
  const [showCalender, setShowCalender] = useState(false);
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
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [eventDates] = useState<{ date: Date; halls: String[] }[]>([]);

  const HallsList = (halls: string[]) =>
    halls.map((hall: string) => {
      return (
        <button className="flex text-gray-500 flex-row justify-around px-8 mr-4 mb-2 rounded border border-[#139beb] hover:bg-[#139beb] hover:text-white cursor-pointer">
          <div className="">{hall}</div>
        </button>
      );
    });

  const DatesList = () =>
    selectedDays.map((date) => {
      const dateString = new Date(date.year, date.month, date.day);
      // eslint-disable-next-line
      var details = { date: dateString, halls: Array() };
      var temp = eventDates;
      temp.push(details);
      var halls = ["chetana", "Sumedha", "Nalanda", "Prerana"];
      console.log(temp.indexOf(details));
      return (
        <div
          key={dateString.toDateString()}
          className="flex flex-col bg-white w-8/12 my-3 p-5 justify-between items-center rounded-[25px]"
        >
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <div className="md:w-4/12 font-medium mb-2 text-black md:mb-0">
              {days[dateString.getDay()]}, {dateString.getDate()}{" "}
              {months[dateString.getMonth()]} {dateString.getFullYear()}
            </div>
            <div className="md:w-8/12 flex flex-wrap md:px-16 md:border-l-2">
              {halls.length === 0 ? null : HallsList(halls)}
            </div>
          </div>
        </div>
      );
    });

  const CalenderPopUp = () => {
    return (
      <div
        className="bg-black/20 fixed top-0  w-full h-full flex bottom-0 left-0 right-0 z-20 justify-center place-content-center "
        onClick={(e) => {
          setShowCalender(false);
        }}
      >
        <div
          className="p-6 max-w-[90%] rounded-[24px] absolu w-[400px] my-auto z-[15] "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Calendar
            value={selectedDays}
            shouldHighlightWeekends
            colorPrimary="#139beb"
            onChange={(e) => {
              setSelectedDays(e);
              console.log(e);
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
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex flex-col h-screen justify-start items-center pt-8"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <div
        className="flex text-arma-title text-4xl font-bold mx-5 text-justify mb-3 items-center"
        style={{ color: "#1970A3" }}
      >
        Event Venue
        {selectedDays.length === 0 ? null : (
          <button className="ml-3" onClick={() => setShowCalender(true)}>
            <img
              alt="edit calender"
              src="https://img.icons8.com/ios-filled/30/88b3cc/edit-calendar.png"
            />
          </button>
        )}
      </div>

      {showCalender ? CalenderPopUp() : null}
      {selectedDays.length === 0 ? (
        <div className="flex flex-col items-center">
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
    </div>
  );
};

export { EventVenue };
