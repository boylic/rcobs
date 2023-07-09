import "./App.css";
import Home from "../src/pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ViewPage from "./pages/ViewPage";
import { UserContextProvider } from "./UserContext";
import AddCenter from "./pages/AddCenter";
import Account from "./pages/Account";
import axios from "axios";
import MyCenters from "./pages/MyCenters";
import MyBookings from "./pages/MyBookings";

axios.defaults.baseURL = "http://12.0.0.1:7000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="bg-gray-300">
      <UserContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/viewpage" element={<ViewPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/centers" element={<MyCenters />} />
          <Route path="/account/bookings/:id" element={<MyBookings />} />
          <Route path="/account/bookings" element={<MyBookings />} />
          
          
         

          <Route path="/add-center" element={<AddCenter />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
