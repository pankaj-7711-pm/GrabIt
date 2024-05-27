import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserRoute from './components/Routes/UserRoute';
import UserDashboard from './pages/user/UserDashboard';
import SellerRoute from './components/Routes/SellerRoute';
import SellerDashboard from './pages/Seller/SellerDashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard/seller" element={<SellerDashboard />} /> */}
        {/* <Route path="/dashboard/user" element={<UserDashboard />} /> */}
        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<UserDashboard />} />
        </Route>
        <Route path="/dashboard" element={<SellerRoute />}>
          <Route path="seller" element={<SellerDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
