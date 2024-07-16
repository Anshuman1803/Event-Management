import React, { useEffect, useState } from "react";
import styles from "./organizer.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { IoTime } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../../components/pageLoader/PageLoader";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function ALLEvents() {
  const navigateTO = useNavigate();
  const { userID } = useSelector((state) => state.EventManagement);
  const [allEvents, setAllEvents] = useState([]);
  const [Loading, setLoading] = useState(false);

  const handleCardClick = (type, eventID) => {
    navigateTO(`/event/${type}/${eventID}`);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}events/get-All-events/${userID}`)
      .then((response) => {
        if (response.data.success) {
          setAllEvents(response.data.eventData);
          setLoading(false);
        } else {
          setAllEvents(response.data.eventData);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [userID]);

  return (
    <section className={`${styles.__allEventsContainer}`}>
      {Loading ? (
        <PageLoader />
      ) : (
        <>
          {allEvents?.map((events, index) => {
            return (
              <article className={styles.__eventsCard} key={events?._id} onClick={() => handleCardClick(userID,events._id)}>
                <h2 className={styles.title}>{events?.title.slice(0, 30)}...</h2>
                <p className={styles.date}>
                  <IoTime className={styles.statsICON} />
                  {new Date(events?.date).toLocaleDateString()} at {events?.time}
                </p>
                <p className={styles.location}>
                  <FaLocationDot className={styles.statsICON} /> {events?.location.slice(0, 30)}
                </p>
                <p className={styles.description}>{events?.description.substring(0, 30)}...</p>
                <div className={styles.footer}>
                  <span className={styles.price}>
                    <AiFillDollarCircle className={styles.statsICON} />
                    {events?.ticketPrice}
                  </span>
                  <span className={styles.availability}>
                    {events?.ticketQuantity > 0 ? `${events?.ticketQuantity} tickets left` : "Sold Out"}
                  </span>
                </div>
                {events?.isPrivate && <span className={styles.privateTag}>Private</span>}
              </article>
            );
          })}
        </>
      )}
    </section>
  );
}

export default ALLEvents;
