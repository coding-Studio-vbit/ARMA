import eventDatesReducer from "./eventDates";
import selectedDateReducer from "./selectedDate";
import eventDetailsReducer from "./eventDetails";
import reservedDateReducer from "./reservedHalls";
import { combineReducers } from "redux";

const AllReducers = combineReducers({
  eventDates: eventDatesReducer,
  selectedDate: selectedDateReducer,
  eventDetails: eventDetailsReducer,
  reservedDate: reservedDateReducer,
});
export type RootState = ReturnType<typeof AllReducers>;
export default AllReducers;
