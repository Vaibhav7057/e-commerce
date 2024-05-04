import React from "react";
import { Outlet, Link } from "react-router-dom";
const AdminPanel = () => {
  return (
    <div className="flex w-full h-screen ">
      <div className="flex flex-col gap-3 pt-8 w-[20%] h-full items-center ">
        <div className="w-[100px] h-[100px] rounded-full  ">
          <img src="/images/user.png" alt="admin photo" className="w-full" />
        </div>
        <p>Vaibhav Gedam</p>
        <div className=" w-[80%] mt-3 gap-2  flex flex-col">
          <Link to="/admin" className="bg-slate-200 w-full text-center p-2">
            Users
          </Link>
          <Link
            to="/admin/products"
            className="bg-slate-200 w-full text-center p-2"
          >
            Products
          </Link>
        </div>
      </div>

      <div className="w-[80%] h-full overflow-hidden ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
