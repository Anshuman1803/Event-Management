import React, { useEffect, useState } from "react";
import pageStyle from "./eventdetails.module.css";
import { useParams } from "react-router-dom";
import PageLoader from "../pageLoader/PageLoader";
import axios from "axios";
import { IoTime } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { LiaRupeeSignSolid } from "react-icons/lia";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function EventDetails() {
  const [Loading, setLoading] = useState(false);
  const [data, setEventData] = useState({});
  const { type, id } = useParams();

const handleBackbuttonClick = (e)=>{
    e.preventDefault();
    window.history.back();
}
const handleRegisterButtonClick  = (e)=>{
    e.preventDefault();
}

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}events/get-event/${id}`)
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          setEventData(response.data.eventData);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <section className={pageStyle.__DetailsPageContainer}>
      {Loading ? (
        <PageLoader />
      ) : (
        <>
          <h1 className={pageStyle.__EventTitle}>{data?.title}</h1>

          <p className={pageStyle.__EventDescription}>{data?.description}</p>
          <p className={pageStyle.__EventOrganizerDetails}>
            {data?.organizer?.profile ? (
              <></>
            ) : (
              <span className={pageStyle.__userInitials}>{data?.organizer?.fullName[0]}</span>
            )}
            <span className={pageStyle.__EventOrganizer_Name}> {data?.organizer?.fullName}</span>
            {!data?.isPrivate && <span className={pageStyle.__EventprivateTag}>Private</span>}
          </p>

          <div className={pageStyle.__eventData_Container}>
            <p className={pageStyle.__EventDateBox}>
              <IoTime className={pageStyle.__EventDataICON} />
              <span className={pageStyle.__EventDataText}>
                {new Date(data?.date).toLocaleDateString()} at {data?.time}
              </span>
            </p>

            <p className={pageStyle.__EventLocationBox}>
              <FaLocationDot className={pageStyle.__EventDataICON} />
              <span className={pageStyle.__EventDataText}>{data?.location}</span>
            </p>

            <p className={pageStyle.__EventpriceTagBox}>
              {data?.ticketPrice}
              <LiaRupeeSignSolid className={pageStyle.__priceTagICON} />
            </p>

            <p className={pageStyle.__EventTicketCount}>
              {data?.ticketQuantity > 0 ? `${data?.ticketQuantity} tickets left` : "Sold Out"}
            </p>
          </div>

          <hr/>
         <div className={pageStyle.__buttoncontainer}>
         <button type="button" className={pageStyle.__BackButton} onClick={handleBackbuttonClick}>Back</button>
         
         {
            type === "PastEvent" && <p className={pageStyle.__RegistrationCLosed}>Registration Closed</p>
         }
        
        {
            type === "UpcomingEvent" &&  <button type="button" className={pageStyle.__EventRegisterButton} onClick={handleRegisterButtonClick}>Register Now</button>
        }

         </div>
        </>
      )}
    </section>
  );
}

export default EventDetails;
