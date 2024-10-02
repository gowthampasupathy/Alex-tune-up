import React from "react";
import "../Styles/Work.css";
const Works = () => {
  return (
    <>
      <div className="main">
        <div className="works">
          <div className="workhead">
            <h1>How Alex Tune-Up Works</h1>
          </div>
          <div className="boxmain">
            <div className="topbox">
              <div className="box">
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/glyph-neue/64/1A1A1A/event-accepted.png"
                  alt="event-accepted"
                />
              </div>
              <p className="texts">1.Book Your Service</p>
            </div>
            <div>
              <div className="box">
                <img
                  width="64"
                  height="64"
                  src="https://img.icons8.com/glyph-neue/64/gear--v1.png"
                  alt="gear--v1"
                />
              </div>
              <p className="texts">2.Service Your Bike </p>
            </div>
            <div>
              <div className="box">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency-systems-filled/48/quad-bike.png"
                  alt="quad-bike"
                />
              </div>
              <p className="texts">3.Take Your Bike</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Works;
