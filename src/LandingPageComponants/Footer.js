import React from "react";
import "../Styles/Footer.css";
import logo from "../Assets/Alex-logo.png";
const Footer = () => {
  return (
    <div>
      <div className="footermaindiv">
        <div className="footerdiv1">
          <div>
            <img className="bikelogo" src={logo}></img>
          </div>
          <p className="footercontent">
          Alex Tune-Up redefines bike service with a customer-first approach.
            <br></br> Experience seamless booking, professional maintenance, and
            personalized<br></br> care for your bike. Trust us to keep your ride
            smooth and safe.
          </p>
        </div>
        <div className="footerdiv2">
          <h1 className="ftrhdd">Contact Us</h1>
          <div className="diccon">
            <p className="rtrr">alextuneup@gmail.com</p>
            <p className="rtrr">6374013119</p>
          </div>
        </div>
      </div>
      <div className="resp-div">
        <h1 className="contact-us">Contact Us</h1>
        <div className="contact-item">
          <p className="">alextuneup@gmail.com</p>
          <p className="">6374013119</p>
        </div>
      </div>
      <hr className="line"></hr>
      <div className="copy">
        Copyyright &copy;2024 By Alex Tune-Up .All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
