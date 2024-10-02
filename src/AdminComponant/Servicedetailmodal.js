import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Admin_Service.css";
const Servicedetailmodal = (props) => {
  const { id } = props;
  const [servicedetails, Setservicedetails] = useState([]);
  //TO get the service details based on the service ID
  useEffect(() => {
    axios
      .get(`https://alex-tune-up-api.onrender.com/getdata/${id}`)
      .then((res) => {
        const result = res.data;
        Setservicedetails(result);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onHide={props.onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Details Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {servicedetails.map((d) => {
            return (
              <div className="detailrow">
                <div className="detaildata">{d.details}</div>
                <div className="detaildata"> Rs.{d.cost}</div>
              </div>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={props.onHide}
          style={{ backgroundColor: "rgb(0, 72, 255)", borderColor: "rgb(0, 72, 255)" }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Servicedetailmodal;
