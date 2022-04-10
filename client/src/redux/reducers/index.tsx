import eventDatesReducer from "./eventDates";
import selectedDateReducer from "./selectedDate";
import { combineReducers } from "redux";

const AllReducers = combineReducers({
  eventDates: eventDatesReducer,
  selectedDate: selectedDateReducer,
});
export type RootState = ReturnType<typeof AllReducers>;
export default AllReducers;
