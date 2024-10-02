import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../Styles/Servicemodal.css";
import axios from "axios";

const Serviceeditmodal = (props) => {
  const { show, id, onHide } = props;

  const [service, Setservice] = useState({
    coverimageurl: "",
    detailimageurl: "",
    servicetitle: "",
    totalcost: "",
    duration: "",
    servicedetails: [],
  });
  //To Get the serivce Details Based on the ID
  useEffect(() => {
    if (id) {
      axios
        .get(`https://alex-tune-up-api.onrender.com/getservicebyId/${id}`)
        .then((res) => Setservice(res.data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  //To handle the changes in the service details array
  const handleDetailChange = (index, key, value) => {
    const updatedDetails = [...service.servicedetails];
    updatedDetails[index][key] = value;
    Setservice({ ...service, servicedetails: updatedDetails });
  };

  //To update the service Details Based on the ID
  const getDetails = () => {
    axios
      .put(`https://alex-tune-up-api.onrender.com/updateservicebyId/${id}`, { service })
      .then((res) => {
        onHide();
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Service Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="modal-form">
          <div>
            <label>Card Cover ImageUrl</label>
            <br />
            <input
              type="text"
              className="modal-input"
              value={service.coverimageurl}
              onChange={(e) =>
                Setservice({ ...service, coverimageurl: e.target.value })
              }
            />
          </div>
          <div>
            <label>Details Page ImageUrl</label>
            <br />
            <input
              type="text"
              className="modal-input"
              value={service.detailimageurl}
              onChange={(e) =>
                Setservice({ ...service, detailimageurl: e.target.value })
              }
            />
          </div>
          <div>
            <label>Service Title</label>
            <br />
            <input
              type="text"
              className="modal-input"
              value={service.servicetitle}
              onChange={(e) =>
                Setservice({ ...service, servicetitle: e.target.value })
              }
            />
          </div>
          <div>
            <label>Cost</label>
            <br />
            <input
              type="number"
              className="modal-input"
              value={service.totalcost}
              onChange={(e) =>
                Setservice({ ...service, totalcost: e.target.value })
              }
            />
          </div>
          <div>
            <label>Duration</label>
            <br />
            <input
              type="number"
              className="modal-input"
              value={service.duration}
              onChange={(e) =>
                Setservice({ ...service, duration: e.target.value })
              }
            />
          </div>
          <label>Each Service Information</label>
          <br />
          {service.servicedetails.map((d, index) => (
            <div key={index} className="details-div">
              <div className="details-item">
                <input
                  type="text"
                  className="modal-input-last"
                  value={d.details}
                  onChange={(e) =>
                    handleDetailChange(index, "details", e.target.value)
                  }
                />
              </div>
              <div className="details-item">
                <input
                  type="number"
                  className="modal-input"
                  value={d.cost}
                  onChange={(e) =>
                    handleDetailChange(index, "cost", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ backgroundColor: "rgb(0, 72, 255)", borderColor: "rgb(0, 72, 255)" }}
          onClick={getDetails}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Serviceeditmodal;
