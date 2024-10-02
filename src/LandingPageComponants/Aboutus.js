import React from "react";
import "../Styles/About.css";
import abtbike from "../Assets/yamaha.jpg";
const Aboutus = () => {
  return (
    <div className="abtmain">
      <div className="abts">
        <div className="abttitle">
          <h1>About Us</h1>
        </div>
        <div className="abtmaindiv">
          <div className="abtdiv1">
            <img className="abtbike" src={abtbike}></img>
          </div>
          <div className="abtdiv2">
            <div className="abtcontent">
              <p>
                At Alex Tune-Up, we are passionate about bikes and dedicated to
                providing the best service for your two-wheeler. Established
                with a vision to deliver top-notch bike maintenance and repair
                services, Alex Tune-Up has become a trusted name in the
                community. Our team of skilled mechanics and technicians is
                committed to ensuring your bike runs smoothly and safely.
              </p>
              <p style={{ marginTop: 20 }}>
                We strive to build long-lasting relationships with our customers
                by maintaining high standards of quality and integrity in
                everything we do. Whether it's a routine maintenance check or a
                complex repair, we aim to exceed your expectations and keep your
                bike in perfect running condition.
              </p>
              <p style={{ marginTop: 20 }}>
                At Alex Tune-Up, your satisfaction and safety are our top
                priorities. Ride with confidence, knowing that we are here to
                support you every mile of the way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
