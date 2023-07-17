import React, { createContext, useContext, useReducer, useState } from "react";
import { data } from "../data";
const EventContext = createContext();

const initialState = {
  data: data.meetups,
  filteredData: data.meetups.map((event) => ({ ...event, rsvp: false })),
  sortBy: "Both",
  searchValue: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FILTER_BY":
      return {
        ...state,
        filteredData: state.data.filter((data) =>
          action.payload === "Both" ? data : data.eventType === action.payload
        ),
      };

    case "SEARCH_BY":
      return{
        ...state,
        filteredData:state.data.filter((data)=> data.title.toLowerCase().includes(action.payload.toLowerCase().trim()) || data.eventType.toLowerCase().includes(action.payload.toLowerCase().trim())
        )
      }

    case "RSVP":
      return{
        ...state,
        filteredData: state.filteredData.map((event)=>event.id ===action.payload ? {...event,rsvp:true}:{...event,rsvp:false})
      }

    default:
      return state;
  }
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showRSVP,setShowRSVP] = useState(false)

  return (
    <EventContext.Provider value={{ state, dispatch,showRSVP,setShowRSVP }}>
      {children}
    </EventContext.Provider>
  );
};
export const useEvent = () => useContext(EventContext);
