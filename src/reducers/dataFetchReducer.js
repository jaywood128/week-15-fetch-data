// The reducer function is a pure function that accepts current state, and an action object
// Depedning on the action object, the reducer will return a copy of the modified state
// ** React will check the difference between the initial state and returned state to decide if it shoud
//re-render the component
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      // returns a copy of state
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export default dataFetchReducer;
