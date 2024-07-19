import React, { useEffect, useState } from "react";
import styles from "./audience.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import PageLoader from "../../../components/pageLoader/PageLoader";
import { UserLoggedOut } from "../../../redux/ReduxSlice";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const MyTickets = () => {
  const { userID, token } = useSelector((state) => state.EventManagement);
  const [myTickets, setTickets] = useState([]);
  const [Loading, setLoading] = useState(false);
  const dispatchTO = useDispatch();

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${BACKEND_URL}events/get-tickets/${userID}`,{headers})
      .then((response) => {
        if (response.data.success) {
          setTickets(response.data.tickets);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false)
        if (error.response) {
          if (error.response.status === 404) {
            toast.error(error.response.data.resMsg);
            setTickets(error.response.data.tickets);
          } else if (error.response.status === 500) {
            toast.error(error.response.data.resMsg);
          }else if (error.response.status === 401) {
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
    <section className={styles.__audienceAllEventsContainer}>
      {Loading ? (
        <PageLoader />
      ) : (
        <>
          {myTickets.length === 0 ? (
              <p className={styles.__noEvents}>No Tickets found</p>
          ) : (
            <div className={styles.__audienceEventcard_secondaryBOX}>
              {myTickets.map((ticket) => {
                return (
                  <article key={ticket._id} className={styles.ticket}>
                    <div className={styles.ticketHeader}>
                      <h2 className={styles.ticketTitle}>{ticket.title}</h2>
                    </div>
                    <div className={styles.ticketContent}>
                      <div className={styles.userInfo}>
                        {ticket?.profile ? (
                          <img src={ticket?.profile} alt={ticket.fullName} className={styles.userImage} />
                        ) : (
                          <div className={styles.userImagePlaceholder}>{ticket.fullName.charAt(0)}</div>
                        )}
                        <div className={styles.userDetails}>
                          <div className={styles.userName}>{ticket.fullName}</div>
                          <div className={styles.userPhone}>{ticket.phone}</div>
                        </div>
                      </div>
                      <div className={styles.ticketInfo}>
                        <span className={styles.ticketLabel}>Date & Time:</span>
                        <span className={styles.ticketValue}> {new Date(ticket.date).toLocaleDateString()} at {ticket.time}</span>
                      </div>
                      <div className={styles.ticketDivider}></div>
                      <div className={styles.ticketInfo}>
                        <span className={styles.ticketLabel}>Paid:</span>
                        <span className={styles.ticketValue}>${ticket.TotalPricePaid.toFixed(2)}</span>
                      </div>
                      <div className={styles.ticketInfo}>
                        <span className={styles.ticketLabel}>Number of Tickets:</span>
                        <span className={styles.ticketValue}>{ticket.QuantityofTickets}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MyTickets;
