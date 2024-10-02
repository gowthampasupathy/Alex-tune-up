import "../Styles/User_Nav.css";
import "bootstrap/js/dist/dropdown";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../Assets/Alex-logo.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const User_Nav = (props) => {
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  //to Log out from the website
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className="flex-itemdiv1">
        <h4>
          {" "}
          <img alt="logo" src={logo} style={{ width: "90%",margin:"10px" }} />
        </h4>
        <div className="flex-rowdiv">
          <div className="navdiv">
            <div className={props.active === 1 ? "current" : "nav-itemdiv"}>
              <Link className="link" to={"/home"}>
                Home
              </Link>
            </div>
            <div className={props.active === 2 ? "current" : "nav-itemdiv"}>
              <Link className="link" to={"/history"}>
                History
              </Link>
            </div>
            <div className={props.active === 3 ? "current" : "nav-itemdiv"}>
              <Link className="link" to={"/userbookings"}>
                Bookings
              </Link>
            </div>
          </div>
          <div className="bottom-div">
            <div className="bottom-item">{email}</div>
            <div
              className="bottom-item"
              style={{ cursor: "pointer" }}
              onClick={logout}
            >
              Log Out
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User_Nav;
