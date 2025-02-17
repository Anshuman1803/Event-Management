import React, { useEffect, useState } from "react";
import pageStyle from "./eventdetails.module.css";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../pageLoader/PageLoader";
import axios from "axios";
import { IoTime } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import EventRegistration from "../EventRegistration/EventRegistration"
import RegisteredUser from "../RegisteredUser/RegisteredUser";
import toast from "react-hot-toast";
import { UserLoggedOut } from "../../redux/ReduxSlice";
import { useDispatch, useSelector } from "react-redux";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function EventDetails() {
  const navigateTO = useNavigate()
  const { token } = useSelector((state) => state.EventManagement);
  const [Loading, setLoading] = useState(false);
  const [data, setEventData] = useState({});
  const [ToggleRegistration, setToggleRegistration] = useState(false)
  const { type, id } = useParams();
  const currentDate = new Date();
  const dispatchTO = useDispatch();
  const headers = { Authorization: `Bearer ${token}` };

const handleBackbuttonClick = (e)=>{
    e.preventDefault();
    navigateTO("/")
}
const handleRegisterButtonClick  = (e)=>{
    e.preventDefault();
    setToggleRegistration(true)
}

  useEffect(() => {
    if(!ToggleRegistration){
      setLoading(true);
      axios
        .get(`${BACKEND_URL}events/get-event/${id}`,{headers})
        .then((response) => {
          setLoading(false);
          if (response.data.success) {
            setEventData(response.data.eventData);
          }else{
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
      }
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id,ToggleRegistration]);
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
              <>
              <img src={data?.organizer?.profile} alt="" className={pageStyle.__userProfilePICTURE} /></>
            ) : (
              <span className={pageStyle.__userInitials}>{data?.organizer?.fullName[0]}</span>
            )}
            <span className={pageStyle.__EventOrganizer_Name}> {data?.organizer?.fullName}</span>
            {data?.isPrivate && <span className={pageStyle.__EventprivateTag}>Private</span>}
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
              <AiFillDollarCircle className={pageStyle.__priceTagICON} />
              {data?.ticketPrice}
            </p>

            <p className={pageStyle.__EventTicketCount}>
            {data?.soldTickets <= data?.ticketQuantity ? `${data?.ticketQuantity - data?.soldTickets} tickets left` : "Sold Out"}
            </p>
          </div>

          <hr/>

          {
            (type !== "event")  && <RegisteredUser registrations={data?.registeredUserDetails}/>
          }
         <div className={pageStyle.__buttoncontainer}>
         <button type="button" className={pageStyle.__BackButton} onClick={handleBackbuttonClick}>Back</button>
         
        {
          new Date(data?.date) < currentDate &&<p className={pageStyle.__RegistrationCLosed}>Registration Closed</p>
        }

        {
            (new Date(data?.date) > currentDate && type ==="event") &&  <button type="button" className={pageStyle.__EventRegisterButton} onClick={handleRegisterButtonClick}>Buy Now</button>
        }
         </div>
        </>
      )}

      {
        ToggleRegistration && <EventRegistration CbCancle={setToggleRegistration} ticketPrice={data?.ticketPrice} eventID={data?._id}/>
      }
    </section>
  );
}

export default EventDetails;
