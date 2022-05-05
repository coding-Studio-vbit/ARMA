const initialState = {};
const eventDatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_DATES":
      return { ...action.payload };
    case "UPDATE_DATES":
      const key = action.key;
      state[key] = { ...state[key], halls: [...action.payload] };
      return { ...state };
    default:
      return { ...state };
  }
};

export default eventDatesReducer;
