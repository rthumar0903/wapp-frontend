// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import "./App.css";
import { useEffect, useState } from "react";
import { AuthProvider } from "./utils/AuthProvider";
import PrivateRoutes from "./utils/PrivateRoute";
// import Customer from "./Components/Customer";
import CustomerDetails from "./Components/CustomerDetails/CustomerDetails";
import CustomerProfile from "./Components/CustomerDetails/CustomerProfile";
import Sidebar from "./Components/CustomerDetails/Sidebar";
import CustomerAttachment from "./Components/CustomerDetails/CustomerAttachment";
import Agent from "./Components/Agent/Agent";
import OrderDetails from "./Components/Agent/OrderDetails";
import Admin from "./Components/Admin/Admin";
import Order from "./Components/Admin/Order";
import Customer from "./Components/Admin/Customer";
import AgentAdmin from "./Components/Admin/Agent";
import Shop from "./Components/Admin/Shop";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Customer />} />
            </Route> */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
            />
            {/* <Route path="/customer-details" element={<CustomerDetails />}>
              <Route path="profile" element={<CustomerProfile />} />
              <Route path="attachment" element={<CustomerAttachment />} />
            </Route> */}
            <Route path="/agent" element={<Agent />}>
              <Route path="order" element={<OrderDetails />} />
              <Route path="attachment" element={<CustomerAttachment />} />
            </Route>
            <Route path="/admin" element={<Admin />}>
              <Route path="order" element={<Order />} />
              <Route path="customer" element={<Customer />} />
              <Route path="agent" element={<AgentAdmin />} />
              <Route path="shop" element={<Shop />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
