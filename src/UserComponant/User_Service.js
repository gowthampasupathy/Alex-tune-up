import "../Styles/User_Service.css";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Bottomnav from "./Bottomnav";
import React from "react";
import User_Nav from "./User_Nav";

const User_Service = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loader, Setloader] = useState(false);
  const [serviceinfo, Setserviceinfo] = useState({
    coverimageurl: "",
    detailimageurl: "",
    servicetitle: "",
    totalcost: "",
    duration: "",
    servicedetails: [],
  });
  //To get the particular service infomration by the serivce id
  useEffect(() => {
    if (id) {
      axios
        .get(`https://alex-tune-up-api.onrender.com/getservicebyId/${id}`)
        .then((res) => {
          Setserviceinfo(res.data);
          Setloader(true);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);
  return (
    <div>
      <>
        <div className="flex-containerdiv">
          <User_Nav active={1} />
          <div className="flex-itemdiv2">
            {loader ? (
              <div className="flex-itemdiv-in">
                <h1 className="bord">{serviceinfo.servicetitle}</h1>
                <div className="servicediv">
                  <img
                    className="service-img"
                    src={serviceinfo.detailimageurl}
                    alt="General Service"
                  />
                  <div className="service-content">
                    <h3>{serviceinfo.servicetitle} Include:</h3>

                    <table className="servicecnt">
                      {serviceinfo.servicedetails.map((d) => {
                        return (
                          <tr>
                            <td>{d.details}</td>
                            <td>Rs.{d.cost}</td>
                          </tr>
                        );
                      })}
                    </table>
                    <div className="service-bottom">
                      <p className="srvc">
                        Total Payable Amount: Rs.{serviceinfo.totalcost}
                      </p>
                      <button
                        className="service-btn"
                        onClick={() => navigate("/userbookings")}
                      >
                        {" "}
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div class="loader">
                <div class="square" id="sq1"></div>
                <div class="square" id="sq2"></div>
                <div class="square" id="sq3"></div>
                <div class="square" id="sq4"></div>
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
      </>
    </div>
  );
};

export default User_Service;
