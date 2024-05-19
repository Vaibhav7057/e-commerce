import React from "react";
import AdminPanel from "./components/AdminPanel";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import GetAllProducts from "./components/product/GetAllProducts";
import GetAllUsers from "./components/user/GetAllUsers";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import ViewProduct from "./components/product/ViewProduct";

function App() {
  return (
    <>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewproduct/:id" element={<ViewProduct />} />
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="/admin" element={<GetAllUsers />} />
          <Route path="/admin/products" element={<GetAllProducts />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
