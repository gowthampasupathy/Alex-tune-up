import React, { useEffect, useState } from "react";
import "../Styles/Admin_Bookings.css";
import "../Styles/Admin_Service.css";
import axios from "axios";
import { useNavigate } from "react-router";
import Admin_navbar from "./Admin_navbar";
const Admin_Bookings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("AdminToken");
  const [activetab, Setactivetab] = useState(1);
  const [booking, setbooking] = useState([]);
  const [loader, Setloader] = useState(false);
  const active = (index) => {
    Setactivetab(index);
  };
  //To Verify Admin Using the jwt token stored in local storage
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await axios.get("https://alex-tune-up-api.onrender.com/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (result.data.status !== "Success") {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };

    verifyUser();
  });
  //To get the booking details based on the status
  const getbookings = async (bookingstatus) => {
    await axios
      .get(`https://alex-tune-up-api.onrender.com/getbookingdetails/${bookingstatus}`)
      .then((res) => {
        setbooking(res.data);
        Setloader(true);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    let bookingstatus = " ";
    if (activetab === 1) {
      bookingstatus = "pending";
    } else if (activetab === 2) {
      bookingstatus = "completed";
    } else {
      bookingstatus = "delivered";
    }
    getbookings(bookingstatus);
  }, [activetab]);
  const handleSubmit = async (id, status) => {
    //Update Status and Send Completed Mail to user
    await axios
      .put(`https://alex-tune-up-api.onrender.com/updateBookingstatus/${id}`, { status })
      .then((res) => {
        let bookingstatus = " ";
        if (activetab === 1) {
          bookingstatus = "pending";
        } else if (activetab == 2) {
          bookingstatus = "completed";
        } else {
          bookingstatus = "delivered";
        }
        getbookings(bookingstatus);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Admin_navbar />
      <div className="bookingstab">
        <div
          className={activetab === 1 ? "active-tab" : "tab"}
          onClick={() => active(1)}
        >
          Pendings
        </div>
        <div
          className={activetab === 2 ? "active-tab" : "tab"}
          onClick={() => active(2)}
        >
          Completed
        </div>
        <div
          className={activetab === 3 ? "active-tab" : "tab"}
          onClick={() => active(3)}
        >
          Delivered
        </div>
      </div>
      {loader ? (
        <div className="tabcontent">
          <div className={activetab === 1 ? "active-content" : "content"}>
            <table className="booking-table">
              <thead>
                <th>Bike Number</th>
                <th>Service Plan</th>
                <th>Bike Received Date</th>
                <th>Delivery Date</th>
                <th>Status</th>
              </thead>
              <tbody>
                {booking.map((d) => {
                  return (
                    <tr>
                      <td aria-label="Bike Number">{d.bikenumber}</td>
                      <td aria-label="Service Plan">
                        {d.serviceplan.map((e) => {
                          return <div>{e}</div>;
                        })}
                      </td>
                      <td aria-label="Bike Received Date">{d.recieveddate}</td>
                      <td aria-label="Delivery Date">{d.deliverydate}</td>
                      <td aria-label="Status">
                        <button
                          className="add-btn-sm"
                          onClick={() => handleSubmit(d._id, "completed")}
                        >
                          Completed
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={activetab === 2 ? "active-content" : "content"}>
            <table className="booking-table">
              <thead>
                <th>Bike Number</th>
                <th>Service Plan</th>
                <th>Bike Received Date</th>
                <th>Delivery Date</th>
                <th>Status</th>
              </thead>
              <tbody>
                {booking.map((d) => {
                  return (
                    <tr>
                      <td aria-label="Bike Number">{d.bikenumber}</td>
                      <td aria-label="Service Plan">
                        {d.serviceplan.map((e) => {
                          return <div>{e}</div>;
                        })}
                      </td>
                      <td aria-label="Bike Received Date">{d.recieveddate}</td>
                      <td aria-label="Delivery Date">{d.deliverydate}</td>
                      <td aria-label="Status">
                        <button
                          className="add-btn-sm"
                          onClick={() => handleSubmit(d._id, "delivered")}
                        >
                          Ready For Delivery
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={activetab === 3 ? "active-content" : "content"}>
            {" "}
            <table className="booking-table">
              <thead>
                <th>Bike Number</th>
                <th>Service Plan</th>
                <th>Bike Received Date</th>
                <th>Delivery Date</th>
                <th>Status</th>
              </thead>
              <tbody>
                {booking.map((d) => {
                  return (
                    <tr>
                      <td aria-label="Bike Number">{d.bikenumber}</td>
                      <td aria-label="Service Plan">
                        {d.serviceplan.map((e) => {
                          return <div>{e}</div>;
                        })}
                      </td>
                      <td aria-label="Bike Received Date">{d.recieveddate}</td>
                      <td aria-label="Delivery Date">{d.deliverydate}</td>
                      <td aria-label="Status">Delivered</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
    </div>
  );
};

export default Admin_Bookings;
