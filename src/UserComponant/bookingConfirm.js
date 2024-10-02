import Nav from "./User_Nav";
import "../Styles/User_Booking.css";
import User_Nav from "./User_Nav";
function BookingConfirm() {
  return (
    <>
      <div className="flex-containerdiv">
        <User_Nav active={3} />
        <div className="flex-itemdiv2">
          <div className="bookcfm">
            <h2>Hey There!!🎉🎊. Your slot has been Booked. </h2>
          </div>
        </div>
      </div>
    </>
  );
}
export default BookingConfirm;
