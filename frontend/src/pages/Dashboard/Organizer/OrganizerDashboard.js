import React, { useEffect } from 'react'
import pageStyle from "./organizer.module.css";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { UserLoggedOut } from '../../../redux/ReduxSlice'
import LOGO from "../../../assets/LOGO.png"
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

function OrganizerDashboard() {
    const{pathname} = useLocation();
    const navigateTO = useNavigate();
    const dispatchTO = useDispatch();

    const handleLogOutClick = (e) => {
        dispatchTO(UserLoggedOut());
        navigateTO('/user/login');
      }


    useEffect(()=>{
        if(pathname === "/"){
            navigateTO("/profile")
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pathname])
    return (
        <section className={`${pageStyle.__organizerDashboardContainer}`}>
            <aside className={`${pageStyle.__DashboardContainer__sidebar}`}>
                <img src={LOGO} alt="Event-Management" className={`${pageStyle.__dashboardLOGO}`} />

                <nav className={`${pageStyle.__dashboard_navbar}`}>

                    <NavLink  title='Profile' to={"/profile"} className={({ isActive }) => (isActive ? `${pageStyle.__navItems} ${pageStyle.active}` : `${pageStyle.__navItems}`)}>
                        <FaUser className={`${pageStyle.__navItemsICON}`} />
                        <span className={`${pageStyle.__navItemsText}`}>Profile</span>
                    </NavLink>

                    <NavLink title='Create Events'  to={"/create-events"} className={({ isActive }) => (isActive ? `${pageStyle.__navItems} ${pageStyle.active}` : `${pageStyle.__navItems}`)}>
                        <IoIosCreate className={`${pageStyle.__navItemsICON}`} />
                        <span className={`${pageStyle.__navItemsText}`}>Create Events</span>
                    </NavLink>

                    <NavLink  title='All Events' to={"/all-events"} className={({ isActive }) => (isActive ? `${pageStyle.__navItems} ${pageStyle.active}` : `${pageStyle.__navItems}`)}>
                        <MdOutlineEventAvailable className={`${pageStyle.__navItemsICON}`} />
                        <span className={`${pageStyle.__navItemsText}`}>All Events</span>
                    </NavLink>


                    <NavLink title='Setting' to={"/setting"} className={({ isActive }) => (isActive ? `${pageStyle.__navItems} ${pageStyle.active}` : `${pageStyle.__navItems}`)}>
                        <IoIosSettings  className={`${pageStyle.__navItemsICON}`} />
                        <span className={`${pageStyle.__navItemsText}`}>Setting</span>
                    </NavLink>

                </nav>

                <button onClick={handleLogOutClick} title='Log Out' className={`${pageStyle.__logoutButton}`}>
                <IoLogOut className={`${pageStyle.__navItemsICON}`} />
                <span className={`${pageStyle.__navItemsText}`}>Log Out</span>
                </button>
            </aside>
            <div className={`${pageStyle.__outletcontainer}`}>
                <Outlet />
            </div>

        </section>
    )
}

export default OrganizerDashboard