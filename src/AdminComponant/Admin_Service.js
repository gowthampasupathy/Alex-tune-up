import React, { useEffect, useState } from "react";
import "../Styles/Admin_Service.css";
import axios from "axios";
import Serviceeditmodal from "./Serviceeditmodal";
import Servicedetailmodal from "./Servicedetailmodal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin_navbar from "./Admin_navbar";

const Admin_Service = () => {
  const [activetab, Setactivetab] = useState(1);
  const [trackchange, Settrackchange] = useState(0);
  const [service, Setservice] = useState([]);
  const [editmodal, Seteditmodal] = useState(false);
  const [idval, Setid] = useState("");
  const [serviceinfo, Setserviceinfo] = useState([]);
  const [details, Setdetails] = useState("");
  const [cost, Setcost] = useState(0);
  const [totalcost, Settotalcost] = useState(0);
  const [coverimageurl, Setcoverimageurl] = useState("");
  const [detailimageurl, Setdetailimageurl] = useState("");
  const [servicetitle, Setservicetitle] = useState("");
  const [duration, Setduration] = useState(0);
  const [detailmodal, Setdetailmodal] = useState(false);
  const [loader, Setloader] = useState(false);

  const active = (index) => {
    Setactivetab(index);
  };

  //To add the specific service deails with their cost
  const handleAdd = async () => {
    Setserviceinfo([
      ...serviceinfo,
      {
        details: details,
        cost: cost,
      },
    ]);
    toast.success("Details Added");
  };
  //To Delete the service information Based On the id
  const deleteService = (id) => {
    axios
      .delete(`https://alex-tune-up-api.onrender.com/deletebyId/${id}`)
      .then((res) => {
        Settrackchange(2);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };
  //TO Save the Service Details in to the database
  const handleSubmit = () => {
    axios
      .post("https://alex-tune-up-api.onrender.com/saveService", {
        coverimageurl,
        detailimageurl,
        servicetitle,
        duration,
        serviceinfo,
        totalcost,
      })
      .then((res) => toast.success("Service Details Added"))
      .catch((error) => console.log(error));
  };
  //To Get all the available service details to display in table
  useEffect(() => {
    axios
      .get("https://alex-tune-up-api.onrender.com/getservicedetails")
      .then((res) => {
        Setservice(res.data);
        Setloader(true);
      })
      .catch((error) => console.log(error));
  }, [trackchange]);

  // TO open the details edit modal
  const openModel = (serviceId) => {
    Seteditmodal(true);
    Setid(serviceId);
  };

  //TO open the service details modal
  const opendetailModel = (serviceId) => {
    Setdetailmodal(true);
    Setid(serviceId);
    Settrackchange(1);
  };

  //To validate that all the fields are filler or not
  const validate = () => {
    if (
      coverimageurl.length == 0 ||
      detailimageurl.length == 0 ||
      duration == 0 ||
      servicetitle.length == 0 ||
      totalcost == 0
    ) {
      toast.warning("All field Should be filled");
      console.log(coverimageurl);
      console.log(detailimageurl);
      console.log(servicetitle);
      console.log(details);
      console.log(duration);
      console.log(cost);
      console.log(totalcost);
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="overalldiv">
      <div className="servicecontent">
        <Admin_navbar />
        <div className="headingdiv">
          <div
            className={activetab === 1 ? "active-tab" : "tab"}
            onClick={() => active(1)}
          >
            Available Service
          </div>
          <div
            className={activetab === 2 ? "active-tab" : "tab"}
            onClick={() => active(2)}
          >
            Create Service
          </div>
        </div>
        {loader ? (
          <div className="tabcontent">
            <div className={activetab === 1 ? "active-content" : "content"}>
              <table className="user-table">
                <thead>
                  <th>Service Plan</th>
                  <th>Cost</th>
                  <th>Duration</th>
                  <th>Details</th>
                  <th>Modification</th>
                </thead>
                <tbody>
                  {service.map((d) => (
                    <tr key={d._id}>
                      <td aria-label="Service Plan">{d.servicetitle}</td>
                      <td aria-label="Cost">Rs.{d.totalcost}</td>
                      <td aria-label="Duration">{d.duration}</td>
                      <td
                        aria-label="Details"
                        onClick={() => opendetailModel(d._id)}
                        style={{ cursor: "pointer" }}
                      >
                        Click TO See Details
                      </td>
                      <td aria-label="Modification">
                        <button
                          className="add-btn"
                          onClick={() => openModel(d._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="add-btn"
                          onClick={() => deleteService(d._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={activetab === 2 ? "active-content" : "content"}>
              <h2 className="service-head">
                Enter Details To Create New Service
              </h2>
              <form className="form">
                <div className="input-flex-div">
                  <div className="input-flex-item">
                    <label>Card Cover ImageUrl</label>
                    <br />
                    <input
                      type="text"
                      className="serviceinput"
                      onChange={(e) => Setcoverimageurl(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-flex-item">
                    <label>Details Page ImageUrl</label>
                    <br />
                    <input
                      type="text"
                      className="serviceinput"
                      onChange={(e) => Setdetailimageurl(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="input-flex-div">
                  <div className="input-flex-item">
                    <label>Service Title</label>
                    <br />
                    <input
                      type="text"
                      className="serviceinput"
                      onChange={(e) => Setservicetitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-flex-item">
                    <label>Duration</label>
                    <br />
                    <input
                      type="number"
                      className="serviceinput"
                      onChange={(e) => Setduration(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="input-flex-div">
                  <div className="input-flex-item">
                    <label>Service Detail</label>
                    <br />
                    <input
                      type="text"
                      className="serviceinput"
                      onChange={(e) => Setdetails(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-flex-item">
                    <label>Cost of Particular Service</label>
                    <br />
                    <input
                      type="number"
                      className="serviceinput-cost"
                      onChange={(e) => Setcost(e.target.value)}
                      required
                    />
                    <button
                      className="servicebtn"
                      type="button"
                      onClick={handleAdd}
                    >
                      Add Service
                    </button>
                  </div>
                </div>
                <div className="input-flex-div">
                  <div className="input-flex-item">
                    <label>Overall Cost</label>
                    <br />
                    <input
                      type="number"
                      style={{ width: "40%" }}
                      className="serviceinput"
                      onChange={(e) => Settotalcost(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button className="add-btn" type="button" onClick={validate}>
                  Add Details
                </button>
              </form>
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
        {editmodal && (
          <Serviceeditmodal
            show={editmodal}
            id={idval}
            onHide={() => Seteditmodal(false)}
          />
        )}
        {detailmodal && (
          <Servicedetailmodal
            show={detailmodal}
            id={idval}
            onHide={() => Setdetailmodal(false)}
          />
        )}
      </div>
      <ToastContainer autoClose={6000} />
    </div>
  );
};

export default Admin_Service;
