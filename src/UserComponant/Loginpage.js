import React, { useState } from "react";
import "../Styles/Loginpage.css";
import photo from "../Assets/loginpic.jpg";
import logo from "../Assets/Alex-logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Loginpage = () => {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const navigate = useNavigate();
  const [emailerror, Setemailerror] = useState("");
  const [opacity, Setopacity] = useState("");
  const [passworderror, Setpassworderror] = useState("");
  const [cursor, Setcursor] = useState("pointer");
  const [btnval, Setbtnval] = useState("Login");

  //TO send the information to the DB and check wheather the informaiton are valid or not and route based on their role
  const Submit = async (e) => {
    e.preventDefault();
    Setcursor("not-allowed");
    Setopacity(0.6);
    Setbtnval("logging In Please Wait");
    await axios
      .post("https://alex-tune-up-api.onrender.com/login", { email, password })
      .then((res) => {
        if (res.data.status === "success") {
          Setemailerror("");
          Setpassword("");
          if (res.data.role === "admin") {
            localStorage.setItem("AdminToken", res.data.token);
            navigate("/bookings");
          }
          if (res.data.role === "user") {
            localStorage.setItem("UserToken", res.data.token);
            localStorage.setItem("userid", res.data.uid);
            localStorage.setItem("email", res.data.useremail);
            navigate("/home");
          }
        } else if (res.data === "Not a valid password") {
          Setemailerror("");
          Setpassworderror(res.data);
          Setcursor("pointer");
          Setopacity();
          Setbtnval("Sign In");
        } else {
          Setpassworderror("");
          Setemailerror(res.data);
          Setcursor("pointer");
          Setopacity();
          Setbtnval("Login");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="maindiv">
      <div className="loginbox">
        <div className="logincontentleft">
          <div className="shopname">
            <img className="mainlogo" src={logo}></img>
          </div>
          <div className="mainlogincontent">
            <div className="logincontent">
              <h1 className="welcome">WELCOME BACK</h1>
              <p className="content">
                The faster you fill up ,The faster you can book you service
              </p>
            </div>
            <div className="infodiv">
              <div className="infotext">Email</div>
              <input
                type="email"
                className="inputlogin"
                onChange={(e) => Setemail(e.target.value)}
                required
              ></input>
              <p style={{ color: "red", fontWeight: "bold" }}>{emailerror}</p>
            </div>
            <div className="infodiv">
              <div className="infotext">Password</div>
              <input
                type="password"
                className="inputlogin"
                onChange={(e) => Setpassword(e.target.value)}
                required
              ></input>
              <p style={{ color: "red", fontWeight: "bold" }}>
                {passworderror}
              </p>
            </div>
            <button
              className="signinbutton"
              style={{ cursor: cursor, opacity: opacity }}
              onClick={Submit}
            >
              {btnval}
            </button>
          </div>
          <div className="signuptext">
            Don't Have An Account?
            <Link className="link" to={"/signup"}>
              <span className="signup">Sign Up</span>
            </Link>
          </div>
        </div>
        <div className="logincontentright">
          <img className="photo" src={photo}></img>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
