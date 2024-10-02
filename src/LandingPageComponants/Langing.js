import React from "react";
import "../Styles/Landing.css";
import bikepic from "../Assets/re1.jpg";
import { useNavigate } from "react-router";
const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="maindivhome">
        <div className="mainflx">
          <div className="subdiv1">
            <img className="bikepic" src={bikepic} />
          </div>
          <div className="subdiv2">
            <div className="headcontent">
              <h1 className="landing-heading">
                Welcome to Alex Tune-Up<br></br>Your Trusted Bike Service
                Partner
              </h1>
            </div>
            <div className="subcontent">
              <p>
                At Alex Tune-Up, we understand that your bike is more than just a
                mode of <br></br>transportation—it's a vital part of your daily
                life. That's why we are dedicated to<br></br> providing
                top-notch service and care to keep your bike running smoothly
                and safely.
              </p>
            </div>
            <div className="downbtn">
              <button
                class="animated-button"
                onClick={() => navigate("/login")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="arr-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span class="text">E X P L O R E</span>
                <span class="circle"></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="arr-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
