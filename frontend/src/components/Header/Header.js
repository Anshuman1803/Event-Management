import React, { useState } from "react";
import headerStyle from "./header.module.css";
import LOGO from "../../assets/LOGO.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { UserLoggedOut } from "../../redux/ReduxSlice";
import { IoLogOut } from "react-icons/io5";

export function Header() {
  const dispatchTO = useDispatch();
  const navigateTO = useNavigate();
  const [toggleNavbar, setTogglenavbar] = useState(false);
  const handletoggleNavbar = (e) => {
    const navbar = document.querySelector(`.${headerStyle.__appNavbar}`);
    navbar.classList.toggle(`${headerStyle.hideNavbar}`);
    setTogglenavbar(!toggleNavbar)
  };

  const handleLogOutClick = (e) => {
    dispatchTO(UserLoggedOut());
    navigateTO("/user/login");
  };
  return (
    <header className={`${headerStyle.__appHeader}`}>
      <Link to={"/"} className={`${headerStyle.__appHeader_LOGOContainer}`}>
        <img src={LOGO} alt="Event-Management-LOGO" className={`${headerStyle.__appHeader_LOGO}`} />
      </Link>
      <nav className={`${headerStyle.__appNavbar} ${headerStyle.hideNavbar}`}>
        <NavLink
        onClick={handletoggleNavbar}
          to={"/"}
          className={({ isActive }) =>
            isActive ? `${headerStyle.__NavItems} ${headerStyle.active} ` : `${headerStyle.__NavItems}`
          }
        >
          Events
        </NavLink>
        <NavLink
        onClick={handletoggleNavbar}
          to={"/tickets"}
          className={({ isActive }) =>
            isActive ? `${headerStyle.__NavItems} ${headerStyle.active}` : `${headerStyle.__NavItems}`
          }
        >
          My Tickets
        </NavLink>

        <button onClick={handleLogOutClick} className={headerStyle.__logoutButton}>
          <IoLogOut className={headerStyle.__logoutICON} /> Log out
        </button>
      </nav>
      {toggleNavbar ? (
        <button type="button" className={`${headerStyle.__hamButton}`} onClick={handletoggleNavbar}>
          <RxCross2 />
        </button>
      ) : (
        <button type="button" className={`${headerStyle.__hamButton}`} onClick={handletoggleNavbar}>
          <GiHamburgerMenu />
        </button>
      )}
    </header>
  );
}
