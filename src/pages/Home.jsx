import React from "react";
import { useNavigate } from "react-router";
import { useEvent } from "../context/EventContext";

import "./home.css";
export const Home = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useEvent();
  return (
    <div>
      <div className="title p-3">
        <h1>Meetup events</h1>

        <select
          defaultValue={"placeholder"}
          onChange={(event) =>
            dispatch({ type: "FILTER_BY", payload: event.target.value })
          }
        >
          <option value={"placeholder"} disabled>
            Select Event type
          </option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Both">Both</option>
        </select>
      </div>
      <div className="events">
        {state.filteredData.length ? (
          state.filteredData.map(
            ({ id, title, eventStartTime, eventThumbnail, eventType }) => {
              const date = new Date(eventStartTime);
              const day = date.toLocaleDateString("en-US", { weekday: "long" });
              const month = date.toLocaleDateString("en-US", { month: "long" });
              const dateNumber = date.getDate();
              const year = date.getFullYear();
              const time = date.toLocaleTimeString("en-US", {
                timeStyle: "short",
              });

              return (
                <div
                  onClick={() => navigate(`/event/${id}`)}
                  className="card"
                  key={id}
                >
                  <p className="tag font-bold">{eventType}</p>
                  <img src={eventThumbnail} alt="" width={200} height={200} />
                  <p>
                    {day} {month}
                    {dateNumber} {year} {time} IST
                  </p>
                  <h4 className="font-bold">{title}</h4>
                </div>
              );
            }
          )
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
};
