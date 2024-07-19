import React, { useEffect, useState } from 'react'
import pageStyle from "./organizer.module.css";
import { MdEmojiEvents } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { GiTicket } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import PageLoader from '../../../components/pageLoader/PageLoader';
import { UserLoggedOut } from '../../../redux/ReduxSlice';
import toast from 'react-hot-toast'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function Profile() {
  const { userID, token } = useSelector((state) => state.EventManagement);
  const [statsData, setStatsData] = useState({});
  const [Loading, setLoading] = useState(false)
  const dispatchTO = useDispatch();
  const headers = { Authorization: `Bearer ${token}` };
  useEffect(() => {
    setLoading(true)
    axios.get(`${BACKEND_URL}events/calculate-user-stats/${userID}`,{headers}).then((response) => {
      if (response.data.success) {
        setStatsData(response.data.statsData);
        setLoading(false);
      } else {
        setStatsData(response.data.statsData);
        setLoading(false);
      }
    }).catch((error) => {
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
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID])
  return (
    <section className={`${pageStyle.__profileContainer}`}>
      {
        Loading ? <PageLoader /> : <div className={`${pageStyle.__statsBox}`}>

          <div className={`${pageStyle.__StatsCard}`}>
            <h2 className={`${pageStyle.__StatsCard_title}`}>Events <MdEmojiEvents className={`${pageStyle.__StatsCard_ICON}`} /></h2>
            <h3 className={`${pageStyle.__StatsCard_stats}`}>{statsData?.totalEvents}</h3>
          </div>

          <div className={`${pageStyle.__StatsCard}`}>
            <h2 className={`${pageStyle.__StatsCard_title}`}>Past Events <MdEmojiEvents className={`${pageStyle.__StatsCard_ICON}`} /></h2>
            <h3 className={`${pageStyle.__StatsCard_stats}`}>{statsData?.totalPastEvents}</h3>
          </div>

          <div className={`${pageStyle.__StatsCard}`}>
            <h2 className={`${pageStyle.__StatsCard_title}`}>Upcoming Events <MdEmojiEvents className={`${pageStyle.__StatsCard_ICON}`} /></h2>
            <h3 className={`${pageStyle.__StatsCard_stats}`}>{statsData?.totalUpcomingEvents}</h3>
          </div>

          <div className={`${pageStyle.__StatsCard}`}>
            <h2 className={`${pageStyle.__StatsCard_title}`}> Sold Tickets <GiTicket className={`${pageStyle.__StatsCard_ICON}`} /></h2>
            <h3 className={`${pageStyle.__StatsCard_stats}`}>{statsData?.totalTicketSales}</h3>
          </div>

          <div className={`${pageStyle.__StatsCard}`}>
            <h2 className={`${pageStyle.__StatsCard_title}`}>Earning <FaDollarSign className={`${pageStyle.__StatsCard_ICON}`} /></h2>
            <h3 className={`${pageStyle.__StatsCard_stats}`}>{statsData?.totalIncome}</h3>
          </div>

          <div className={`${pageStyle.__StatsCard}`}>
            <h2 className={`${pageStyle.__StatsCard_title}`}>Audience <HiUserGroup className={`${pageStyle.__StatsCard_ICON}`} /></h2>
            <h3 className={`${pageStyle.__StatsCard_stats}`}>{statsData?.registeredUsers}</h3>
          </div>

        </div>
      }

    </section>
  )
}

export default Profile