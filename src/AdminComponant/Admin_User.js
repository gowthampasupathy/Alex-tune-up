import React, { useEffect, useState } from "react";
import "../Styles/Admin_Service.css";
import axios from "axios";
import Admin_navbar from "./Admin_navbar";
const Admin_User = () => {
  const [user, Setuser] = useState([]);
  const [loader, Setloader] = useState(false);
  //TO Get all the user information
  useEffect(() => {
    axios
      .get("https://alex-tune-up-api.onrender.com/getuser")
      .then((res) => {
        Setuser(res.data);
        Setloader(true);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Admin_navbar />
      <div className="Userinfodiv">
        <span>
          <h2 className="userinfohead">Registered User Info</h2>
        </span>
        {loader ? (
          <div className="userinfotable">
            <table className="user-table">
              <thead>
                <th>Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Registered On</th>
              </thead>
              <tbody>
                {user.map((d) => {
                  return (
                    <tr>
                      <td aria-label="Name">{d.name}</td>
                      <td aria-label="Email Address">{d.email}</td>
                      <td aria-label="Phone Number">{d.phonenumber}</td>
                      <td aria-label="Registered On">{d.registereddate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
      </div>
    </div>
  );
};

export default Admin_User;
