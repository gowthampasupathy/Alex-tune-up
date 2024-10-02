import "../Styles/User_History.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/User_Nav.css";
import Bottomnav from "./Bottomnav";
import React from "react";
import User_Nav from "./User_Nav";

const User_History = () => {
  const userid = localStorage.getItem("userid");
  const [history, Sethistory] = useState([]);
  const [loader, Setloader] = useState(false);
  // TO get the all the booking history of the certian user by the user it
  useEffect(() => {
    axios
      .get(`https://alex-tune-up-api.onrender.com/getBookinghistory/${userid}`)
      .then((res) => {
        Sethistory(res.data);
        Setloader(true);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="flex-containerdiv">
        <User_Nav active={2} />
       <div className="flex-itemdiv2">
       <div  className="home-content">
          <h2 className="bord">Service History</h2>

          {loader ? (
            <table className="service">
              <thead>
                <th>Vehicle Number</th>
                <th>Booked Date</th>
                <th>Delivery Date</th>
                <th>Service Plan</th>
                <th>Total Amount</th>

                <th>Status</th>
              </thead>{" "}
              <tbody>
                {history.map((d) => {
                  return (
                    <tr>
                      <td aria-label="Vehicle Number">{d.bikenumber}</td>
                      <td aria-label="Booked Date">{d.recieveddate}</td>
                      <td aria-label="Delivery Date">{d.deliverydate}</td>
                      <td aria-label="Service Plan">
                        {d.serviceplan.map((e) => {
                          return <p>{e}</p>;
                        })}
                      </td>
                      <td aria-label="Total Amount">
                        Rs.
                        <i class="bi bi-currency-rupee" />
                        {d.cost}
                      </td>

                      <td aria-label="Status">{d.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
      </div>
    </>
  );
};

export default User_History;
