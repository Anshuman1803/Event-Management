import React from 'react'
import headerStyle from "./header.module.css"
import LOGO from "../../assets/LOGO.png"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { GiHamburgerMenu } from "react-icons/gi";
import { UserLoggedOut } from '../../redux/ReduxSlice'

export function Header() {
  const dispatchTO = useDispatch();
  const { isActive, profile, fullName } = useSelector((state) => state.EventManagement);
  const navigateTO = useNavigate();
  const handleProfileClick = (e) => {
    const ActiveUserPOPUP = document.querySelector(`.${headerStyle.__activeUser_POPUP}`);
    ActiveUserPOPUP.classList.toggle(`${headerStyle.__UnactivePOPUP}`)
  }
  const handleNavigateTO = (e) => {
    navigateTO('/user/login')
  }
  const handleLogOutClick = (e) => {
    dispatchTO(UserLoggedOut());
    navigateTO('/user/login');
    handleProfileClick();
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
              profile ? <img onClick={handleProfileClick} src={profile} alt='userProfile' className={`${headerStyle.__userProfile}`} /> : <p onClick={handleProfileClick} className={`${headerStyle.__userInitialLetter}`}>
                {fullName[0]}
              </p>
            }

            <div className={`${headerStyle.__activeUser_POPUP} ${headerStyle.__UnactivePOPUP}`}>
              <Link onClick={handleProfileClick} className={`${headerStyle.__activeUser_POPUP_ITEM}`}>Dashboard</Link>
              <Link onClick={handleProfileClick} className={`${headerStyle.__activeUser_POPUP_ITEM}`}>Setting</Link>
              <button onClick={handleLogOutClick} className={`${headerStyle.__activeUser_POPUP_LogoutButton}`}>Log out</button>

            </div>
          </> : <>
            <button type='button' className={`${headerStyle.__NavItems_Buttons}`} onClick={handleNavigateTO}>Login/Signup</button>
          </>
        }
      </nav>
      <button type='button' className={`${headerStyle.__hamButton}`}><GiHamburgerMenu /></button>
    </header>
  )
}