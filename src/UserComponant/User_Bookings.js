import "../Styles/User_Booking.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Bottomnav from "./Bottomnav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import User_Nav from "./User_Nav";

const User_Bookings = () => {
  const [userinfo, Setuserinfo] = useState();
  const [name, Setname] = useState("");
  const [bikenumber, Setbikenumber] = useState("");
  const [mobilenumber, Setmobilenumber] = useState("");
  const [service, Setservice] = useState([]);
  const [startdate, Setstartdate] = useState("");
  const [enddate, Setenddate] = useState("");
  const [days, Setdays] = useState(0);
  const [totalcost, Settotalcost] = useState(0);
  const status = "pending";
  const userid = localStorage.getItem("userid");
  const [email, Setemail] = useState("");
  const navigate = useNavigate();
  const [serviceinfo, Setserviceinfo] = useState([]);

  //TO get the Service Details
  useEffect(() => {
    axios
      .get("https://alex-tune-up-api.onrender.com/getservicedetails")
      .then((res) => {
        Setserviceinfo(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  //To get the user email id for mail purpose using the user id in the local storage
  useEffect(() => {
    axios
      .get(`https://alex-tune-up-api.onrender.com/getemail/${userid}`)
      .then((res) => Setemail(res.data))
      .catch((error) => console.log(error));
  }, [userid]);
  //TO store only the checked service into the array and remove the others
  const handleclick = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      Setservice([...service, value]);
    } else {
      Setservice(service.filter((d) => d !== value));
    }
  };
  //To get how many days required to do the selected service and the total cost to do the service
  const Submit = async (e) => {
    e.preventDefault();
    let per_count = 0;
    let per_cost = 0;
    const serviceDetails = await Promise.all(
      service.map(async (serviceName) => {
        const res = await axios.get(
          `https://alex-tune-up-api.onrender.com/getservicedays/${serviceName}`
        );
        return res.data[0];
      })
    );
    serviceDetails.forEach((d) => {
      per_cost += d.totalcost;
      per_count += d.duration;
    });
    console.log(serviceDetails);
    const date = new Date(startdate);
    date.setDate(date.getDate() + per_count);
    Setenddate(date.toLocaleDateString());
    Settotalcost(per_cost);
  };
  //TO store and the send mail to the owner that new bike serivce is arrived

  const savedata = async (e) => {
    e.preventDefault();
    toast.success("Your Bookings Is In Progress ");
    try {
      await axios.post("https://alex-tune-up-api.onrender.com/SaveServiceData", {
        email,
        name,
        bikenumber,
        mobilenumber,
        startdate,
        enddate,
        service,
        status,
        totalcost,
      });

      navigate("/bookingsuccess");
    } catch (error) {
      console.log(error);
      toast.error("Booking failed. Please try again.");
    }
  };
  //to validate all the fields are not empty
  const validate = (e) => {
    e.preventDefault();
    if (
      name.length == 0 ||
      mobilenumber.length == 0 ||
      service.length == 0 ||
      startdate.length == 0 ||
      enddate.length == 0 ||
      bikenumber.length == 0
    ) {
      toast.warning("All Fields should be filled");
    } else {
      savedata(e);
    }
  };

  return (
    <>
      <div className="flex-containerdiv">
        <User_Nav active={3} />
       <div className="flex-itemdiv2">
       <div className="home-content" >
          <h2 className="bord">Bookings</h2>
          <form className="bookingdiv">
            <label>Owner Name</label>
            <input
              type="text"
              className="booking"
              onChange={(e) => Setname(e.target.value)}
            />
            <label>Vehicle Number</label>
            <input
              type="text"
              className="booking"
              onChange={(e) => Setbikenumber(e.target.value)}
            />
            <label>Mobile Number</label>
            <input
              type="text"
              className="booking"
              onChange={(e) => Setmobilenumber(e.target.value)}
            />
            <div className="option-checkbox">
              <label className="optnn">Select Service</label> <br />
              {serviceinfo.map((d) => {
                return (
                  <div className="optn">
                    <input
                      type="checkbox"
                      value={d.servicetitle}
                      checked={service.includes(d.servicetitle)}
                      onChange={handleclick}
                      className="form-check-input chk"
                    />
                    <label className="slabel">{d.servicetitle}</label>
                  </div>
                );
              })}
            </div>
            <br />
            <br />
            <label>Select Date</label>
            <input
              type="date"
              onChange={(e) => Setstartdate(e.target.value)}
              className="booking"
            />
            <br />
            <div className="estimate-data">
              <div>
                Total Payable Amount: Rs.
                <i className="bi bi-currency-rupee" />
                {totalcost}
                <br />
                <br />
                Estimated Delivery Date: {enddate}
              </div>
              <div>
                <button className="calc" onClick={Submit}>
                  Calculate Amount
                </button>
              </div>
            </div>
            <br />
            <button
              className="subm"
              onClick={(e) => {
                validate(e);
              }}
            >
              Book Now
            </button>
          </form>
          <ToastContainer autoClose={6000} />
          <Bottomnav />
        </div>
       </div>
      </div>
    </>
  );
};

export default User_Bookings;
