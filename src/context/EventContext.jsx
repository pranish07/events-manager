import React, { createContext, useContext, useReducer, useState } from "react";
import { initialState, reducer } from "../reducers/EventReducers";
const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showRSVP, setShowRSVP] = useState(false);

  return (
    <EventContext.Provider value={{ state, dispatch, showRSVP, setShowRSVP }}>
      {children}
    </EventContext.Provider>
  );
};
export const useEvent = () => useContext(EventContext);
