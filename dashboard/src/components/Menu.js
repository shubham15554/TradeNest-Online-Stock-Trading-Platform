import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import { BrowserRouter, Route, Routes , Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { UserContext } from "./userContext";
const Menu = ({username}) => {

    const [selectMenu , setSelectMenu] = useState(0);
    const [isProfileOpen , setIsProfileOpen] = useState(false);
    const {user,setUser} = React.useContext(UserContext);
    const handleMenuClick  = (index) => {
      setSelectMenu(index);
    }
    const handleProfileClick = () => {
      setIsProfileOpen(!isProfileOpen);
    }

    const menuClass = "menu";
    const activeClass = "menu selected";
    
    function handleLogoutClick(){
        localStorage.removeItem("token");
        setUser(null);
         window.location.href = "http://localhost:3000/Login";
    }

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />

      <div className="menus">
        <ul>
          <li>
            <Link to='/' style={{ textDecoration: "none" }} onClick={() => handleMenuClick(0)}>
             <p className={selectMenu == 0 ? activeClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
           <Link to='/orders' style={{ textDecoration: "none" }} onClick={() => handleMenuClick(1)}>
             <p className={selectMenu == 1 ? activeClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link to='/holdings' style={{ textDecoration: "none" }} onClick={() => handleMenuClick(2)}>
             <p className={selectMenu == 2 ? activeClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link to='/positions' style={{ textDecoration: "none" }} onClick={() => handleMenuClick(3)}>
             <p className={selectMenu == 3 ? activeClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link to='/funds' style={{ textDecoration: "none" }} onClick={() => handleMenuClick(4)}>
             <p className={selectMenu == 4 ? activeClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link to='/apps' style={{ textDecoration: "none" }} onClick={() => handleMenuClick(5)}>
              <p className={selectMenu == 5 ? activeClass : menuClass}>Apps</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} onClick={() =>{ handleMenuClick(6); handleLogoutClick()}}>
              <p className={selectMenu == 6 ? activeClass : menuClass}>Logout</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" >
         
          <div className="avatar">{ user?.username?.charAt(0).toUpperCase() || "ZU"}</div>
          <p className="username" onClick={handleProfileClick}>{user.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
