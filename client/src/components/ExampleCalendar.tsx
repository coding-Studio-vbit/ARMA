import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, Day } from "react-modern-calendar-datepicker";

//JUST EXAMPLE. USE THE CALENDAR COMPONENT DIRECTLY

const EventCalendar = () => {
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);
  return (
    <Calendar
      value={selectedDays}
      onChange={(e) => {
        setSelectedDays(e);
      }}
      shouldHighlightWeekends
    />
  );
};

export { EventCalendar };
