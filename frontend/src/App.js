import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserRoute from './components/Routes/UserRoute';
import UserDashboard from './pages/user/UserDashboard';
import SellerRoute from './components/Routes/SellerRoute';
import SellerDashboard from './pages/Seller/SellerDashboard';
import CreateProduct from './pages/Seller/CreateProduct';
import CreateCategory from './pages/Seller/CreateCategory';
import AboutUs from './pages/AboutUs';
import UpdateProduct from './pages/Seller/UpdateProduct';
import UpdateProfileSeller from './pages/Seller/UpdateProfileSeller';
import Messages from './pages/Seller/Messages';
import CategoryWiseSellers from './pages/CategoryWiseSellers';
import SeperateSeller from './pages/SeperateSeller';
import CategoryWiseProducts from './pages/CategoryWiseProducts';
import SeperateProduct from './pages/SeperateProduct';
import ChatPage from './pages/user/ChatPage';
import ChatWithUser from './pages/Seller/ChatWithUser';
import UpdateProfileCustomer from './pages/user/UpdateProfileCustomer';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/:categoryname" element={<CategoryWiseSellers />} />
        <Route path="/seller/:sid" element={<SeperateSeller />} />
        <Route path="/individual-product/:pid" element={<SeperateProduct />} />
        <Route
          path="/category-products/:cid"
          element={<CategoryWiseProducts />}
        />
        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="update-customer-profile" element={<UpdateProfileCustomer />} />
          <Route path="chat-with-seller/:sid" element={<ChatPage />} />
        </Route>
        <Route path="/dashboard" element={<SellerRoute />}>
          <Route path="seller" element={<SellerDashboard />} />
          <Route path="chat/:cid" element={<ChatWithUser />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="messages-seller" element={<Messages />} />
          <Route path="update-product/:pid" element={<UpdateProduct />} />
          <Route path="update-profile" element={<UpdateProfileSeller />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
