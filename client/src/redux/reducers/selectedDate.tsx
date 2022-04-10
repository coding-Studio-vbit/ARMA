const initialString = "";
const selectedDateReducer = (state = initialString, action) => {
  switch (action.type) {
    case "SELECT_DATE":
      return action.payload;
    default:
      return state;
  }
};

export default selectedDateReducer;
