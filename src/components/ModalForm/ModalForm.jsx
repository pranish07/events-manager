import React from "react";
import { useEvent } from "../../context/EventContext";
import "./modalForm.css";

export const ModalForm = ({ eventId }) => {
  const { state, dispatch, setShowRSVP } = useEvent();
  const findEvent = state.filteredData.find((event) => event.id === eventId);
  return (
    <div className="overlay">
      <form
        className="rsvp-form"
        onSubmit={(event) => {
          event.preventDefault();
          setShowRSVP(false);
          dispatch({ type: "RSVP", payload: eventId });
        }}
      >
      
        <span className="back" onClick={() => setShowRSVP(false)}>
          back
        </span>
        <h2>Complete your RSVP</h2>

        <p>Fill in your personal information</p>

        <label>
          Name
          <input required />
        </label>

        <label>
          Email
          <input type="email" required />
        </label>

        {!findEvent?.isPaid && !findEvent?.price === "Free" && (
          <p>You have to make the payment at the venue</p>
        )}
        <button>RSVP</button>
      </form>
    </div>
  );
};
