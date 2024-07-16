import React from 'react'
import headerStyle from "./header.module.css"
import LOGO from "../../assets/LOGO.png"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GiHamburgerMenu } from "react-icons/gi";
import { UserLoggedOut } from '../../redux/ReduxSlice'
import { IoLogOut } from "react-icons/io5";


export function Header() {
  const dispatchTO = useDispatch();
  const navigateTO = useNavigate();


  const handleLogOutClick = (e) => {
    dispatchTO(UserLoggedOut());
    navigateTO('/user/login');
  }
  return (
    <header className={`${headerStyle.__appHeader}`}>
      <Link to={"/"} className={`${headerStyle.__appHeader_LOGOContainer}`}>
        <img src={LOGO} alt="Event-Management-LOGO" className={`${headerStyle.__appHeader_LOGO}`} />
      </Link>
      <nav className={`${headerStyle.__appNavbar}`}>

        <NavLink to={"/"} className={({ isActive }) => (isActive ? `${headerStyle.__NavItems} ${headerStyle.active}` : `${headerStyle.__NavItems}`)}>Events</NavLink>

        <button onClick={handleLogOutClick} className={headerStyle.__logoutButton}><IoLogOut className={headerStyle.__logoutICON}/> Log out</button>
        
      </nav>
      <button type='button' className={`${headerStyle.__hamButton}`}><GiHamburgerMenu /></button>
    </header>
  )
}