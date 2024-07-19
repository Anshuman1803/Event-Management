import React, { useCallback, useEffect, useState } from "react";
import styles from "./organizer.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { IoTime } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../../components/pageLoader/PageLoader";
import SearchComponent from "../../../components/Search/SearchComponent";
import toast from "react-hot-toast";
import { UserLoggedOut } from "../../../redux/ReduxSlice";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function ALLEvents() {
  const navigateTO = useNavigate();
  const dispatchTO = useDispatch();
  const { userID,token } = useSelector((state) => state.EventManagement);
  const headers = { Authorization: `Bearer ${token}` };

  const [allEvents, setAllEvents] = useState([]);
  const [filterEvents, setFilterEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleCardClick = (type, eventID) => {
    navigateTO(`/event/${type}/${eventID}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setLoading(true);
  };

  const debounceSearch = useCallback(() => {
    if (searchTerm) {
      setFilterEvents(allEvents.filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilterEvents(allEvents);
    }
    setLoading(false);
  }, [searchTerm, allEvents]);

  useEffect(() => {
    const handler = setTimeout(debounceSearch, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceSearch]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}events/get-All-events/${userID}`,{headers})
      .then((response) => {
        if (response.data.success) {
          setAllEvents(response.data.eventData);
          setFilterEvents(response.data.eventData);
          setLoading(false);
        } else {
          setAllEvents(response.data.eventData);
          setFilterEvents(response.data.eventData);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          if (error.response.status === 404) {
            toast.error(error.response.data.resMsg);
          } else if (error.response.status === 500) {
            toast.error(error.response.data.resMsg);
          } else if (error.response.status === 401) {
            toast.error(error.response.data.resMsg);
            dispatchTO(UserLoggedOut())
          } else {
            toast.error("An unexpected error occurred. Please try again later.");
          }
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  return (
    <section className={`${styles.__allEventsContainer}`}>
      <SearchComponent
        customClass={"organizerSearchBox"}
        searchTerm={searchTerm}
        setSearchTerm={handleSearch}
        placeholder={"Serach events"}
      />
      {Loading ? (
        <PageLoader />
      ) : (
        <>
          {filterEvents?.length > 0 ? (
            <>
              <div className={styles.__audienceEventcard_Box}>
                {filterEvents?.map((events) => {
                  return (
                    <article
                      className={styles.__eventsCard}
                      key={events?._id}
                      onClick={() => handleCardClick(userID, events._id)}
                    >
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
                          {events?.soldTickets <= events?.ticketQuantity
                            ? `${events?.ticketQuantity - events?.soldTickets} tickets left`
                            : "Sold Out"}
                        </span>
                      </div>
                      {events?.isPrivate && <span className={styles.privateTag}>Private</span>}
                    </article>
                  );
                })}
              </div>
            </>
          ) : (
            <p className={styles.__noEvents}>No events found</p>
          )}
        </>
      )}
    </section>
  );
}

export default ALLEvents;
