import React from 'react'
import headerStyle from "./header.module.css"
import LOGO from "../../assets/LOGO.png"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export function Header() {
  const { isActive, profile } = useSelector((state) => state.EventManagement);
  const navigateTO = useNavigate();
  const handleProfileClick = (e) => {
    const ActiveUserPOPUP = document.querySelector(`.${headerStyle.__activeUser_POPUP}`);
    ActiveUserPOPUP.classList.toggle(`${headerStyle.__UnactivePOPUP}`)
  }
  const handleNavigateTO = (e) => {
    navigateTO('/user/login')
  }
  return (
    <header className={`${headerStyle.__appHeader}`}>
      <Link to={"/"} className={`${headerStyle.__appHeader_LOGOContainer}`}>
        <img src={LOGO} alt="Event-Management-LOGO" className={`${headerStyle.__appHeader_LOGO}`} />
      </Link>
      <nav className={`${headerStyle.__appNavbar}`}>

        <NavLink to={"/"} className={({ isActive }) => (isActive ? `${headerStyle.__NavItems} ${headerStyle.active}` : `${headerStyle.__NavItems}`)}>Home</NavLink>

        <NavLink to={"/events"} className={({ isActive }) => (isActive ? `${headerStyle.__NavItems} ${headerStyle.active}` : `${headerStyle.__NavItems}`)}>Events</NavLink>

        {
          isActive ? <>
            {
              profile ? <img onClick={handleProfileClick} src='https://res.cloudinary.com/project-instagram-clone/image/upload/v1720172954/r8qkwub4r4yoays3mxgy.jpg' alt='userProfile' className={`${headerStyle.__userProfile}`} /> : <p onClick={handleProfileClick} className={`${headerStyle.__userInitialLetter}`}>
                U
              </p>
            }

            <div className={`${headerStyle.__activeUser_POPUP} ${headerStyle.__UnactivePOPUP}`}>
              <Link onClick={handleProfileClick} className={`${headerStyle.__activeUser_POPUP_ITEM}`}>Dashboard</Link>
              <Link onClick={handleProfileClick} className={`${headerStyle.__activeUser_POPUP_ITEM}`}>Setting</Link>
              <button onClick={handleProfileClick} className={`${headerStyle.__activeUser_POPUP_LogoutButton}`}>Log out</button>

            </div>
          </> : <>
            <button type='button' className={`${headerStyle.__NavItems_Buttons}`} onClick={handleNavigateTO}>Login/Signup</button>
          </>
        }
      </nav>

    </header>
  )
}