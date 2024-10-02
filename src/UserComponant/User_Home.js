import "../Styles/User_Home.css";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Bottomnav from "./Bottomnav";

import React from "react";
import User_Nav from "./User_Nav";

const User_Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("UserToken");
  const [serviceinfo, Setserviceinfo] = useState([]);
  const [loader, Setloader] = useState(false);
  const api = process.env.REACT_APP_API_KEY;
  console.log("API Key:", api);
  useEffect(() => {   
    //TO verify wheather the user is valid one or not by the token stored in the local storage
    const verifyUser = async () => {
      try {
        const result = await axios.get("https://alex-tune-up-api.onrender.com/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (result.data.status !== "Success") {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
      }
    };

    verifyUser();
  });
  //to get the service details to showcase to  the user
  useEffect(() => {
    axios
      .get(`https://alex-tune-up-api.onrender.com/getservicedetails`)
      .then((res) => {
        Setserviceinfo(res.data);
        Setloader(true);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="flex-containerdiv">
        <User_Nav active={1} />
       <div className="flex-itemdiv2">
       <div className="home-content" >
          <h1 className="head">WELCOME..!!!</h1>
          <h2 className="bord">Available Services</h2>
          {loader ? (
            <div className="card-container">
              {serviceinfo.map((d) => {
                return (
                  <div className="card">
                    <img
                      className="cardimg"
                      src={d.coverimageurl}
                      alt="general service"
                    />
                    <div className="card-content">
                      <h3>{d.servicetitle}</h3>
                      <h5>
                        Rs.
                        <i class="bi bi-currency-rupee" />
                        {d.totalcost}
                      </h5>
                      <p>No.of Days: maximum {d.duration} working days</p>
                      <button
                        className="bttn"
                        onClick={() => navigate(`/userservice/${d._id}`)}
                      >
                        Know more
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div class="loader">
              <div class="square" id="sq1"></div>
              <div class="square" id="sq2"></div>

              <div class="square" id="sq5"></div>
              <div class="square" id="sq6"></div>
              <div class="square" id="sq7"></div>
              <div class="square" id="sq8"></div>
              <div class="square" id="sq9"></div>
            </div>
          )}
          <Bottomnav />
        </div>
       </div>
      </div>
    </>
  );
};

export default User_Home;
