import React, { useCallback, useEffect, useState } from "react";
import pageStyle from "./audience.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { IoTime } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../../components/pageLoader/PageLoader";
import { CalculateTimeAgo } from "../../../utility/TimeAgo";
import SearchComponent from "../../../components/Search/SearchComponent";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function AllEvent() {
  const navigateTO = useNavigate();
  const { userID } = useSelector((state) => state.EventManagement);
  const [allEvents, setAllEvents] = useState([]);
  const [filterEvents, setFilterEvents] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCardClick = (type, eventID) => {
    navigateTO(`/events/${type}/${eventID}`);
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
      .get(`${BACKEND_URL}events/get-event`)
      .then((response) => {
        if (response.data.success) {
          setAllEvents(response.data.allData);
          setFilterEvents(response.data.allData);
          setLoading(false);
        } else {
          setFilterEvents([]);
          setAllEvents([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [userID]);

  return (
    <section className={pageStyle.__audienceAllEventsContainer}>
      <SearchComponent searchTerm={searchTerm} setSearchTerm={handleSearch} placeholder={"Serach events"} />
      {Loading ? (
        <PageLoader />
      ) : (
        <>
          {filterEvents?.length > 0 ? (
            <>
              <div className={pageStyle.__audienceEventcard_Box}>
                {filterEvents?.map((events) => {
                  return (
                    <article
                      onClick={() => handleCardClick("event", events._id)}
                      key={events._id}
                      className={pageStyle.__audience_EventCards}
                    >
                      {events?.isPrivate && <span className={pageStyle.privateTag}>Private</span>}
                      <h2 className={pageStyle.title}>{events?.title.slice(0, 30)}...</h2>
                      <p className={pageStyle.date}>
                        <IoTime className={pageStyle.statsICON} />
                        {new Date(events?.date).toLocaleDateString()} at {events?.time}
                      </p>
                      <p className={pageStyle.location}>
                        <FaLocationDot className={pageStyle.statsICON} /> {events?.location.slice(0, 30)}...
                      </p>
                      <p className={pageStyle.description}>{events?.description.substring(0, 30)}...</p>
                      <div className={pageStyle.footer}>
                        <span className={pageStyle.price}>
                          <AiFillDollarCircle className={pageStyle.statsICON} />
                          {events?.ticketPrice}
                        </span>
                        <span className={pageStyle.availability}>
                          {events?.soldTickets <= events?.ticketQuantity
                            ? `${events?.ticketQuantity - events?.soldTickets} tickets left`
                            : "Sold Out"}
                        </span>
                      </div>
                      <div className={pageStyle.__EventCards__userINFO}>
                        {events?.organizer.profile ? (
                          <>
                          <img src={events?.organizer.profile} alt="" className={pageStyle.__userProfilePICTURE}/>
                          </>
                        ) : (
                          <span className={pageStyle.__userInitials}>{events?.organizer.fullName[0]}</span>
                        )}
                        <span className={pageStyle.__userINFO_fullName}>{events?.organizer.fullName}</span>
                        <span className={pageStyle.__eventCreatedAt}>
                          <CalculateTimeAgo time={events?.createdAt} />
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          ) : (
            <p className={pageStyle.__noEvents}>No events found</p>
          )}
        </>
      )}
    </section>
  );
}

export default AllEvent;
