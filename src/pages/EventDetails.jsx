import React from "react";
import { useParams } from "react-router-dom";
import { useEvent } from "../context/EventContext";

export const EventDetails = () => {
  const { eventId } = useParams();
  const { state } = useEvent();
  const findEvent = state.filteredData.find((event) => event.id === eventId);
const date =  new Date(findEvent?.eventEndTime);

  const currDate = new Date();
  const endDay = date?.toLocaleDateString("en-US",{weekday:"long"})
  const endMonth = date?.toLocaleDateString("en-US",{month:"long"})
  const endDateNumber = date?.getDate();
  const endYear = date?.getFullYear();
  const endTime = date?.toLocaleTimeString("en-US",{
    timeStyle:"short"
  })

const startDate = new Date(findEvent?.eventStartTime);
const startDay = startDate?.toLocaleDateString("en-US",{weekday:"long"})
const startMonth = startDate?.toLocaleDateString("en-US",{month:"long"})
  const startDateNumber = startDate?.getDate();
  const startYear = startDate?.getFullYear();
  const startTime = startDate?.toLocaleTimeString("en-US",{
    timeStyle:"short"
  })


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
          width={200}
          height={200}
        />
        <h2>Details</h2>
        <p>{findEvent?.eventDescription}</p>
        <h2>Additional Information: </h2>
        <p>Dress code: {findEvent?.additionalInformation?.dressCode}</p>
        <p>
          Age Restrictions: {findEvent?.additionalInformation?.ageRestrictions}
        </p>
        <h2>Event Tags</h2>
        {findEvent?.eventTags?.map((tag) => (
          <p>{tag}</p>
        ))}
      </div>

      <div className="secondary-info">
        <div className="info">
          <p>
          {/* <i className="fa-solid fa-calendar"></i>
           */}

           {startDay} {startMonth}{startDateNumber} {startYear} at {startTime} to
          
           {endDay} {endMonth} {endDateNumber} {endYear} at {endTime}

          </p>
          <p>{findEvent?.location} {findEvent?.address}</p>
          <p>Rs. {findEvent?.price}</p>

          
        </div>
        <div className="speakers">
          {findEvent?.speakers.map(({name,image,designation})=>(
          <div>
            <img src={image} alt={name} height={50} width={50} />
            <b>{name}</b>
            <p>{designation}</p>
          </div>            
          ))}
        </div>
        <div className="rsvp">
          <button>RSVP</button>
        </div>
      </div>
    </div>
  );
};
