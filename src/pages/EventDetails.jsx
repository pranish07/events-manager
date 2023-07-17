import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ModalForm } from "../components/ModalForm/ModalForm";
import { useEvent } from "../context/EventContext";
import "./eventDetails.css";

export const EventDetails = () => {
  const { eventId } = useParams();
  const { state, showRSVP, setShowRSVP } = useEvent();
  const findEvent = state.filteredData.find((event) => event.id === eventId);
  const date = new Date(findEvent?.eventEndTime);
  console.log(findEvent);

  const currDate = new Date();
  const endDay = date?.toLocaleDateString("en-US", { weekday: "long" });
  const endMonth = date?.toLocaleDateString("en-US", { month: "long" });
  const endDateNumber = date?.getDate();
  const endYear = date?.getFullYear();
  const endTime = date?.toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

  const startDate = new Date(findEvent?.eventStartTime);
  const startDay = startDate?.toLocaleDateString("en-US", { weekday: "long" });
  const startMonth = startDate?.toLocaleDateString("en-US", { month: "long" });
  const startDateNumber = startDate?.getDate();
  const startYear = startDate?.getFullYear();
  const startTime = startDate?.toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

  const [isEventOld, setIsEventOld] = useState(false);

  useEffect(() => {
    if (date < currDate) {
      setIsEventOld(true);
    }
  }, []);

  return (
    <div className="event-details">
      <div className="main-info">
        <h1> {findEvent?.title} </h1>
        <p>
          Hosted by:<strong>{findEvent?.hostedBy}</strong>
        </p>
        <img
          src={findEvent?.eventThumbnail}
          alt={findEvent?.title}
          width={100}
          height={250}
          className="event-img"
        />
        <h2>Details: </h2>
        <p>{findEvent?.eventDescription}</p>
        <h2>Additional Information: </h2>
        <p>
          <b>Dress code</b>: {findEvent?.additionalInformation?.dressCode}
        </p>
        <p>
          {" "}
          <b>Age Restrictions</b>:{" "}
          {findEvent?.additionalInformation?.ageRestrictions}
        </p>
        <h2>Event Tags</h2>
        <div className="event-tag-container">
          {findEvent?.eventTags?.map((tag) => (
            <p className="event-tag">{tag}</p>
          ))}
        </div>
      </div>

      <div className="secondary-info">
        <div className="info">
          <p>
            {/* <i className="fa-solid fa-calendar"></i>
             */}
            <span className="startTime">
              {startDay} {startMonth}
              {startDateNumber} {startYear}{" "}
            </span>
            at {startTime}{" "}
            <span className="endTime">
              {" "}
              to {endDay} {endMonth} {endDateNumber} {endYear} at {endTime}{" "}
            </span>
          </p>
          <p>
            <span>{findEvent?.location} </span>
            <span className="address">{findEvent?.address} </span>
          </p>
          <p>Rs. {findEvent?.price}</p>
        </div>

        {findEvent.speakers.length ? (
          <div className="speakers">
            <h2>Speakers: ({findEvent.speakers.length})</h2>
            <div className="speaker-container">
              {findEvent?.speakers?.map(({ name, image, designation }) => (
                <div className="speaker-card">
                  <img src={image} alt={name} height={60} width={60} />
                  <p>
                    <b>{name}</b>
                  </p>
                  <p>{designation}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="rsvp">
          {!isEventOld && (
            <button onClick={() => setShowRSVP(true)}>
              {" "}
              {findEvent?.rsvp ? "Already RSVP" : "RSVP"}
            </button>
          )}
        </div>
        {showRSVP && !findEvent?.rsvp && <ModalForm eventId={findEvent?.id} />}
      </div>
    </div>
  );
};
