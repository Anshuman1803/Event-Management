import React, { useEffect, useState } from "react";
import pageStyle from "./audience.module.css";
// import { useSelector } from "react-redux";
import axios from "axios";
import { IoTime } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../../components/pageLoader/PageLoader";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function AllEvent() {
  const navigateTO = useNavigate();
  //   const { userID } = useSelector((state) => state.EventManagement);
  const [allEvents, setAllEvents] = useState({
    upcomingEvents: [],
    pastEvents: [],
  });
  const [Loading, setLoading] = useState(false);

  const handleCardClick = (type, eventID) => {
    navigateTO(`/events/${type}/${eventID}`);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}events/get-event`)
      .then((response) => {
        if (response.data.success) {
          setAllEvents({
            upcomingEvents: response.data.upcomingEvents,
            pastEvents: response.data.pastEvents,
          });
          setLoading(false);
        } else {
          setAllEvents({
            upcomingEvents: response.data.upcomingEvents,
            pastEvents: response.data.pastEvents,
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <section className={pageStyle.__audienceAllEventsContainer}>
      {Loading ? (
        <PageLoader />
      ) : (
        <>
          <h1 className={pageStyle.__eventTypeTITLE}>UpComing Events</h1>
          <div className={pageStyle.__audienceEventcard_Box}>
            {allEvents?.upcomingEvents.length === 0 ? (
              <p> No UpComming Events </p>
            ) : (
              <>
                {allEvents?.upcomingEvents.map((events) => {
                  return (
                    <article
                      onClick={() => handleCardClick("UpcomingEvent", events._id)}
                      key={events._id}
                      className={pageStyle.__audience_EventCards}
                    >
                      {events?.isPrivate && <span className={pageStyle.privateTag}>Private</span>}
                      <h2 className={pageStyle.title}>{events?.title}</h2>
                      <p className={pageStyle.date}>
                        <IoTime className={pageStyle.statsICON} />
                        {new Date(events?.date).toLocaleDateString()} at {events?.time}
                      </p>
                      <p className={pageStyle.location}>
                        <FaLocationDot className={pageStyle.statsICON} /> {events?.location}
                      </p>
                      <p className={pageStyle.description}>{events?.description.substring(0, 50)}...</p>
                      <div className={pageStyle.footer}>
                        <span className={pageStyle.price}>
                          <AiFillDollarCircle className={pageStyle.statsICON} />
                          {events?.ticketPrice}
                        </span>
                        <span className={pageStyle.availability}>
                          {events?.ticketQuantity > 0 ? `${events?.ticketQuantity} tickets left` : "Sold Out"}
                        </span>
                      </div>
                      <div className={pageStyle.__EventCards__userINFO}>
                        {events?.organizer.profile ? (
                          <></>
                        ) : (
                          <span className={pageStyle.__userInitials}>{events?.organizer.fullName[0]}</span>
                        )}
                        <span className={pageStyle.__userINFO_fullName}>{events?.organizer.fullName}</span>
                      </div>
                    </article>
                  );
                })}
              </>
            )}
          </div>

          <>
            <h1 className={pageStyle.__eventTypeTITLE}>Past Events</h1>
            <div className={pageStyle.__audienceEventcard_Box}>
              {allEvents?.pastEvents.length === 0 ? (
                <p> No past Events </p>
              ) : (
                <>
                  {allEvents?.pastEvents.map((events) => {
                    return (
                      <article
                        onClick={() => handleCardClick("PastEvent", events._id)}
                        key={events._id}
                        className={pageStyle.__audience_EventCards}
                      >
                        {events?.isPrivate && <span className={pageStyle.privateTag}>Private</span>}
                        <h2 className={pageStyle.title}>{events?.title}</h2>
                        <p className={pageStyle.date}>
                          <IoTime className={pageStyle.statsICON} />
                          {new Date(events?.date).toLocaleDateString()} at {events?.time}
                        </p>
                        <p className={pageStyle.location}>
                          <FaLocationDot className={pageStyle.statsICON} /> {events?.location}
                        </p>
                        <p className={pageStyle.description}>{events?.description.substring(0, 50)}...</p>
                        <div className={pageStyle.footer}>
                          <span className={pageStyle.price}>
                            <AiFillDollarCircle className={pageStyle.statsICON} />
                            {events?.ticketPrice}
                          </span>
                          <span className={pageStyle.availability}>
                            {events?.ticketQuantity > 0 ? `${events?.ticketQuantity} tickets left` : "Sold Out"}
                          </span>
                        </div>
                        <div className={pageStyle.__EventCards__userINFO}>
                          {events?.organizer.profile ? (
                            <></>
                          ) : (
                            <span className={pageStyle.__userInitials}>{events?.organizer.fullName[0]}</span>
                          )}
                          <span className={pageStyle.__userINFO_fullName}>{events?.organizer.fullName}</span>
                        </div>
                      </article>
                    );
                  })}
                </>
              )}
            </div>
          </>
        </>
      )}
    </section>
  );
}

export default AllEvent;
