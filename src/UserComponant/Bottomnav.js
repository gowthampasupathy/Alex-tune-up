import React from "react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/User_Nav.css";
const Bottomnav = () => {
  const navigate = useNavigate();
  const [btnclass, Setbtnclass] = useState("profile-info");
  const [click, Setclcik] = useState(false);
  const userid = localStorage.getItem("userid");
  const [userinfo, Setuserinfo] = useState({});
  //To Get the USer information Based on the User id stored in the local storage
  useEffect(() => {
    axios
      .get(`https://alex-tune-up-api.onrender.com/getUserinfo/${userid}`)
      .then((res) => Setuserinfo(res.data))
      .catch((error) => console.log(error));
  }, {});
  //TO get logout of the website
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  //TO Handle the responsive bottom navigation bar profile detail page
  const profile = () => {
    if (click === false) {
      Setbtnclass("profile-info-active");
      Setclcik(true);
    } else {
      Setbtnclass("profile-info");
      Setclcik(false);
    }
  };
  return (
    <div>
      <div className={btnclass}>
        <div>{userinfo.name}</div>
        <div>{userinfo.email}</div>
        <div onClick={logout}>Log Out</div>
      </div>
      <div className="responsive-bar ">
        <div className="bottom-bar w3-animate-fading">
          <div className="bottom-bar-item" onClick={() => navigate("/home")}>
            {" "}
            <span style={{ color: "black", fontSize: 25, textAlign: "center" }}>
              <i class="bi bi-house-fill"></i>
            </span>
            <span>Home</span>
          </div>
          <div className="bottom-bar-item" onClick={() => navigate("/history")}>
            <span style={{ color: "black", fontSize: 25, textAlign: "center" }}>
              <i class="bi bi-hourglass-split"></i>
            </span>{" "}
            <span>History</span>
          </div>
          <div
            className="bottom-bar-item"
            onClick={() => navigate("/userbookings")}
          >
            <span style={{ color: "black", fontSize: 25, textAlign: "center" }}>
              <i class="bi bi-gear-wide-connected"></i>
            </span>{" "}
            <span>Bookings</span>
          </div>
          <div className="bottom-bar-item" onClick={profile}>
            <span style={{ color: "black", fontSize: 25, textAlign: "center" }}>
              <i class="bi bi-person-fill"></i>
            </span>{" "}
            <span>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bottomnav;
