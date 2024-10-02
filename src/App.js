
import { Route,Routes } from 'react-router';
import Loginpage from '../src/UserComponant/Loginpage';
import Signup from '../src/UserComponant/Signup'
import Home from './UserComponant/User_Home';
import UserService from './UserComponant/User_Service';
import History from './UserComponant/User_History'
import UserBookings from './UserComponant/User_Bookings';
import BookingConfirm from './UserComponant/bookingConfirm'
import MainComponant from './LandingPageComponants/MainComponant';
import Admin_Bookings from './AdminComponant/Admin_Bookings';
import Admin_Service from './AdminComponant/Admin_Service';
import Admin_User from './AdminComponant/Admin_User';
import User_Home from './UserComponant/User_Home';
import User_Service from './UserComponant/User_Service';
import User_History from './UserComponant/User_History';
import User_Bookings from './UserComponant/User_Bookings';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainComponant/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Loginpage/>}></Route>
        <Route path='/bookings' element={<Admin_Bookings/>}></Route>
        <Route path='/service' element={<Admin_Service/>}></Route>
        <Route path='/users' element={<Admin_User/>}></Route>
        <Route path='/home' element={<User_Home/>}></Route>
        <Route path='/userservice/:id' element={<User_Service/>}></Route>
        <Route path='/history' element={<User_History/>}></Route>
        <Route path='/userbookings' element={<User_Bookings/>}></Route>
        <Route path='/bookingsuccess' element={<BookingConfirm/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
