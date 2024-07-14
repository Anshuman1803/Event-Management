import React, { useEffect, useState } from 'react'
import pageStyle from "./organizer.module.css";
import { MdEmojiEvents } from "react-icons/md";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { GiTicket } from "react-icons/gi";
import { useSelector } from 'react-redux';
import axios from 'axios';
import PageLoader from '../../../components/pageLoader/PageLoader';
// import toast from "react-hot-toast"
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
            <MdEmojiEvents className={`${pageStyle.__StatsCard_ICON}`} />
            <h2 className={`${pageStyle.__StatsCard_title}`}>Total Events</h2>
            <h3 className={`${pageStyle.__StatsCard_stats}`}>{statsData?.TotalEvent}</h3>
          </div>

          <div className={`${pageStyle.__StatsCard}`}>
            <MdEmojiEvents className={`${pageStyle.__StatsCard_ICON}`} />
            <h2 className={`${pageStyle.__StatsCard_title}`}>Past Events</h2>
            <h3 className={`${pageStyle.__StatsCard_stats}`}>{statsData?.PastEvents}</h3>
          </div>

          <div className={`${pageStyle.__StatsCard}`}>
            <MdEmojiEvents className={`${pageStyle.__StatsCard_ICON}`} />
            <h2 className={`${pageStyle.__StatsCard_title}`}>Upcomming Events</h2>
            <h3 className={`${pageStyle.__StatsCard_stats}`}>{statsData?.UpcomingEvents}</h3>
          </div>

          <div className={`${pageStyle.__StatsCard}`}>
            <GiTicket className={`${pageStyle.__StatsCard_ICON}`} />
            <h2 className={`${pageStyle.__StatsCard_title}`}> Total Ticket sales</h2>
            <h3 className={`${pageStyle.__StatsCard_stats}`}>0</h3>
          </div>

          <div className={`${pageStyle.__StatsCard}`}>
            <LiaRupeeSignSolid className={`${pageStyle.__StatsCard_ICON}`} />
            <h2 className={`${pageStyle.__StatsCard_title}`}> Total Income</h2>
            <h3 className={`${pageStyle.__StatsCard_stats}`}>0</h3>
          </div>

        </div>
      }

    </section>
  )
}

export default Profile