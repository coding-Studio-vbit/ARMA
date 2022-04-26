export const createEventDetails = (details) => {
  return {
    type: "CREATE_EVENT_DETAILS",
    payload: details
  }
}

export const createDatesState = (DatesState) => {
  return {
    type: "CREATE_DATES",
    payload: DatesState,
  };
};

export const UpdateDatesState = (key, halls) => {
  return {
    type: "UPDATE_DATES",
    payload: halls,
    key: key,
  };
};

export const selectDate = (date) => {
  return {
    type: "SELECT_DATE",
    payload: date,
  };
};
