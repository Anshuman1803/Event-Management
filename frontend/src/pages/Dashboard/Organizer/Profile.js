import React from 'react'
import pageStyle from "./organizer.module.css";
import { MdEmojiEvents } from "react-icons/md";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { GiTicket } from "react-icons/gi";
function Profile() {
  return (
    <section className={`${pageStyle.__profileContainer}`}>
      <div className={`${pageStyle.__statsBox}`}>

        <div className={`${pageStyle.__StatsCard}`}>
          <MdEmojiEvents className={`${pageStyle.__StatsCard_ICON}`} />
          <h2 className={`${pageStyle.__StatsCard_title}`}>Total Events</h2>
          <h3 className={`${pageStyle.__StatsCard_stats}`}>0</h3>
        </div>

        <div className={`${pageStyle.__StatsCard}`}>
          <MdEmojiEvents className={`${pageStyle.__StatsCard_ICON}`} />
          <h2 className={`${pageStyle.__StatsCard_title}`}>Past Events</h2>
          <h3 className={`${pageStyle.__StatsCard_stats}`}>0</h3>
        </div>

        <div className={`${pageStyle.__StatsCard}`}>
          <MdEmojiEvents className={`${pageStyle.__StatsCard_ICON}`} />
          <h2 className={`${pageStyle.__StatsCard_title}`}>Upcomming Events</h2>
          <h3 className={`${pageStyle.__StatsCard_stats}`}>0</h3>
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

    </section>
  )
}

export default Profile