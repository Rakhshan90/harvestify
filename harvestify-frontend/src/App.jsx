// import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navigation/Navbar"
import Login from "./Components/User/Login"
import Register from "./Components/User/Register"
import Home from "./Components/Home"
import CreateProduct from "./Components/Product/CreateProduct"
import CreateAuction from "./Components/Auction/CreateAuction"
import Auctions from "./Components/Auction/Auctions"
import Auction from "./Components/Auction/Auction"
import ProductList from "./Components/Product/ProductList"
import Product from "./Components/Product/Product"
import UpdateProduct from "./Components/Product/UpdateProduct"
import PrivateProtectRoute from "./Components/Navigation/ProtectedRoutes/PrivateProtectRoute"
import AdminProtectRoute from "./Components/Navigation/ProtectedRoutes/AdminProtectRoute"
import UpdatePassword from "./Components/User/UpdatePassword"
import ForgotPassword from "./Components/User/ForgotPassword"
import ResetPassword from "./Components/User/ResetPassword"
import UpdateProfile from "./Components/User/UpdateProfie"
import UserList from "./Components/User/UserList"
import ProfilePhotoUpload from "./Components/User/ProfilePhotoUpload"
import FarmerProtectRoute from "./Components/Navigation/ProtectedRoutes/FarmerProtectRoute"

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/products" element={<ProductList />} />
          <Route exact path="/product/:id" element={<Product />} />
          <Route exact path="/create-product" element={<FarmerProtectRoute>
            <CreateProduct />
          </FarmerProtectRoute>} />
          <Route exact path="/update-product/:id" element={<FarmerProtectRoute>
            <UpdateProduct />
          </FarmerProtectRoute>} />
          <Route exact path="/auctions" element={<Auctions />} />
          <Route exact path="/auction/:id" element={<PrivateProtectRoute>
            <Auction />
          </PrivateProtectRoute>} />
          <Route exact path="/create-auction/:id" element={<AdminProtectRoute>
            <CreateAuction />
          </AdminProtectRoute>} />
          <Route exact path="/update-password" element={<PrivateProtectRoute>
            <UpdatePassword />
          </PrivateProtectRoute>} />
          <Route exact path="/update-profile" element={<PrivateProtectRoute>
            <UpdateProfile />
          </PrivateProtectRoute>} />
          <Route exact path="/forgot-password" element={
            <ForgotPassword />} />
          <Route exact path="/reset-password/:token" element={
            <ResetPassword />} />
          <Route exact path="/users" element={<UserList />} />
          <Route exact path="/profile-photo-upload" element={<ProfilePhotoUpload />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
