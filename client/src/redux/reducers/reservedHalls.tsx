const initialString = "";
const reservedDateReducer = (state = initialString, action) => {
  switch (action.type) {
    case "CREATE_RESERVATIONS":
      return action.payload;
    default:
      return state;
  }
};

export default reservedDateReducer;
