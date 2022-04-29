const initialString = {};
const reservationsReducer = (state = initialString, action) => {
  switch (action.type) {
    case "CREATE_RESERVATIONS":
      return action.payload;
    default:
      return state;
  }
};

export default reservationsReducer;
