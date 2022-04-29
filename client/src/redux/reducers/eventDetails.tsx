const initialState = {};
const eventDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_EVENT_DETAILS":
      return { ...action.payload };
    default:
      return state;
  }
};

export default eventDetailsReducer;
