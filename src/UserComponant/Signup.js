import React, { useState } from "react";
import "../Styles/Signup.css";
import photo from "../Assets/re1.jpg";
import logo from "../Assets/Alex-logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, Setemail] = useState("");
  const [name, Setname] = useState("");
  const [phonenumber, Setphonenumber] = useState();
  const [password, Setpassword] = useState("");
  const [bikenumber, Setbikenumber] = useState("");
  const role = "user";
  const date = new Date();
  const formatdate = date.toLocaleDateString();
  const [otp, Setotp] = useState();
  const navigate = useNavigate();
  const [btnclass, Setbtnclass] = useState("signup-disable");
  const [verify, Setverify] = useState("disable-btn");
  const [emailerror, Setemailerror] = useState("");
  const [passworderror, Setpassworderror] = useState("");
  const [phonenumbererror, Setphonenumbererror] = useState("");
  const [val, Setval] = useState(0);
  const [validate, Setvalidate] = useState(false);
  const [opacity, Setopacity] = useState("");
  const [cursor, Setcursor] = useState("pointer");
  const [btnval, Setbtnval] = useState("SignUp");
  const [otperror, Setotperror] = useState("");
  const [check, Setcheck] = useState(false);

  const Getotp = () => {
    //To get the Otp for the email validation
    axios
      .post("https://alex-tune-up-api.onrender.com/getotp", { email })
      .then((res) => {
        if (res.data == "Email Sent To User") {
          toast.success(" Otp Sent Successfully");
          Setverify("otp-btn");
        }
      })
      .catch((error) => console.log(error));
  };
  //To check the otp is valid or not which is entered by the user
  const Verifyotp = () => {
    axios
      .post("https://alex-tune-up-api.onrender.com/verifyotp", { email, otp })
      .then((res) => {
        if (res.data == "OTP Verified") {
          Setbtnclass("signinbutton");
        }
      })
      .catch((error) => console.log(error));
  };
  //TO create the new acccount for the user based on the provided information
  const Submit = () => {
    axios
      .post("https://alex-tune-up-api.onrender.com/signup", {
        name,
        email,
        phonenumber,
        password,
        role,
        formatdate,
      })
      .then((res) => navigate("/login"))
      .catch((e) => console.log(e));
  };
  //To check the email already exit in the Db or not
  const checkemail = (email) => {
    axios
      .post("https://alex-tune-up-api.onrender.com/getemail", { email })
      .then((res) => {
        if (res.data === "yes") {
          Setemailerror("Email Already Exist");
          Setvalidate(false);
        } else {
          Setemailerror("");
          Setvalidate(true);
        }
      })
      .catch((er) => console.log(er));
  };
  //TO make the sign-up button disable till the process complete
  const Wait = () => {
    Setcursor("not-allowed");
    Setopacity(0.6);
    Setbtnval("Signing Up Please Wait");
    Submit();
  };
  //To handle the error in email,password and the phone number
  const handlesubmit = async (e) => {
    e.preventDefault();
    handleerror(email, password, phonenumber);
    if (check) {
      checkemail(email);
      if (validate) {
        Wait();
      }
    }
  };
  const handleerror = (email, password, phonenumber) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(email)) {
      Setemailerror("Please Enter A Valid Email Address");
      Setval(1);
      Setvalidate(false);
    } else if (password.length < 8) {
      Setpassworderror("Password Must Contain Minimum 8 Characters");
      Setval(1);
      Setvalidate(false);
    } else if (phonenumber.length < 10) {
      Setphonenumbererror("Please Enter The Valid Contact Number");
      Setval(1);
      Setvalidate(false);
    } else {
      Setemailerror("");
      Setphonenumbererror("");
      Setpassworderror("");
      Setval(0);
      Setvalidate(true);
      Setcheck(true);
    }
  };

  return (
    <div>
      <div className="maindiv">
        <div className="signupbox">
          <div className="signupcontentleft">
            <div className="shopname">
              <img className="mainlogo" src={logo}></img>
            </div>
            <div className="mainsignupcontent">
              <div className="signupcontent">
                <h2 className="started">GET STARTED NOW</h2>
              </div>
              <div className="infodiv">
                <div className="infotext">Name</div>
                <input
                  type="text"
                  className="signupinput"
                  onChange={(e) => Setname(e.target.value)}
                  required
                ></input>
              </div>
              <div className="infodiv">
                <div className="infotext">Email</div>
                <input
                  type="email"
                  className="signupinput"
                  onChange={(e) => Setemail(e.target.value)}
                  required
                ></input>
                <p style={{ color: "red" }}>{emailerror}</p>
              </div>
              <div className="infodiv">
                <div className="infotext">Phone Number</div>
                <input
                  type="number"
                  className="signupinput"
                  onChange={(e) => Setphonenumber(e.target.value)}
                  required
                ></input>
                <p style={{ color: "red" }}>{phonenumbererror}</p>
              </div>
              <div className="infodiv">
                <div className="infotext">Password</div>
                <input
                  type="password"
                  className="signupinput"
                  onChange={(e) => Setpassword(e.target.value)}
                  required
                ></input>
                <p style={{ color: "red" }}>{passworderror}</p>
              </div>
              <div className="infodiv">
                <label>Enter OTP</label>
                <br></br>
                <input
                  type="number"
                  onChange={(e) => Setotp(e.target.value)}
                  className="signupinput"
                ></input>
                <p style={{ color: "red" }}>{otperror}</p>
              </div>
              <div>
                <button className="otp-btn" onClick={Getotp}>
                  Get OTP
                </button>
                <button className={verify} onClick={Verifyotp}>
                  Verify OTP
                </button>
              </div>
              <button className={btnclass} onClick={handlesubmit}>
                Sign Up
              </button>
            </div>
            <div className="signuptext">
              Already Have An Account?
              <Link className="link" to={"/login"}>
                <span className="signup"> Sign In</span>
              </Link>
            </div>
          </div>
          <div className="signupcontentright">
            <img className="photo" src={photo}></img>
          </div>
        </div>
        <ToastContainer autoClose={9000} />
      </div>
    </div>
  );
};

export default Signup;
