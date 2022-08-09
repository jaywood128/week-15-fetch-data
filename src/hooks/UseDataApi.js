import { useState, useEffect, useReducer } from "react";
import dataFetchReducer from "../reducers/dataFetchReducer";
import axios from "axios";
const UseDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  // To-do: initialize useReducer to fix broken code
  // useReducer(reducer, initialState) => returns state and dispatch
  // Useful when you have more complex state - cleaner than using a bunch of useState() calls
  //Accept the reducer, initial state => returns current state and dispatch function
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  // useEffect(() => {
  //   console.log("Called on initial render and every render after");

  //   const fetchData = async () => {
  //     // This gets called on every render
  //     console.log("render!");
  //     // set loading
  //     // try/catch
  //     // check status === 200
  //     // call async function
  //     setIsLoading(true);

  //     try {
  //       const response = await axios(url);
  //       setIsLoading(false);
  //       if (response.status === 200) {
  //         console.log(response.data);
  //         setData(response.data);
  //         console.log(data);
  //       }
  //     } catch (error) {
  //       alert(error);
  //       setIsError(true);
  //     }
  //   };

  //   fetchData();
  //   // if you return a function React will call it when unmounting a component
  //   return () => console.log("unmounting...");
  // }, [url]);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      // Call dispatch when you want to complete some action that modifies state using the appropriate action object
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();

    // Called when a component is unmounted and prevents memory leaks
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};

export default UseDataApi;
