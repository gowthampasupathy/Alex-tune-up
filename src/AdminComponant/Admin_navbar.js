import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Mainlogo from "../Assets/Alex-logo.png";
//rgb(0, 72, 255)  
// rgb(30, 31, 33)
import "../Styles/Admin_Nav.css";
import { Link, useNavigate } from "react-router-dom";
const Admin_navbar = () => {
  const [activetab, Setactivetab] = useState(1);
  const navigate = useNavigate();
  const active = (index) => {
    Setactivetab(index);
  };
  const getout = async () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <Navbar expand="lg" className="navbar" fixed="top">
        <Container>
          <Navbar.Brand>
            <img className="navlogo" alt="Mainlogo" src={Mainlogo}></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <div className="navcontent">
              <Nav className="navcontent">
                <Nav.Link className="navitem">
                  <div>
                    <Link to={"/bookings"} className="item">
                      Bookings
                    </Link>
                  </div>
                </Nav.Link>
                <Nav.Link className="navitem">
                  <div>
                    <Link to={"/users"} className="item">
                      Users
                    </Link>
                  </div>
                </Nav.Link>
                <Nav.Link className="navitem">
                  <div>
                    <Link to={"/service"} className="item">
                      Services
                    </Link>
                  </div>
                </Nav.Link>
                <Nav.Link>
                  <button className="logoutbtn" onClick={getout}>
                    Log Out
                  </button>
                </Nav.Link>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Admin_navbar;
