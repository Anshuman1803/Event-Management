import React, { useEffect, useState } from 'react'
import pageStyle from "./organizer.module.css";
import { MdEmojiEvents } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { GiTicket } from "react-icons/gi";
import { useSelector } from 'react-redux';
import axios from 'axios';
import PageLoader from '../../../components/pageLoader/PageLoader';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function Profile() {
  const { userID } = useSelector((state) => state.EventManagement);
  const [statsData, setStatsData] = useState({});
  const [Loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get(`${BACKEND_URL}events/calculate-user-stats/${userID}`).then((response) => {
      if (response.data.success) {
        setStatsData(response.data.statsData);
        setLoading(false);
      } else {
        setStatsData(response.data.statsData);
        setLoading(false);
      }
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    })

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