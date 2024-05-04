import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="w-screen px-10 py-2  flex items-center justify-between border border-slate-500 sticky top-0 right-0 bg-black text-white ">
      <Link to="/">
        <p className="font-bold text-base ">E-commerce</p>
      </Link>
      <div className="w-[70%] border border-slate-500 rounded-md overflow-hidden ">
        <input
          type="text"
          className=" px-2 py-1 w-full outline-none border-none  "
          placeholder="search for your products"
        />
      </div>
      <div className="px-4 py-1 flex justify-between gap-8 ">
        <Link to="/admin">Admin panel</Link>
        <div className="w-[30px] h-[30px] rounded-full  bg-white  ">
          <img src="/images/user.png" alt="admin photo" className="w-full" />
        </div>
        <div className="w-[30px] h-[30px] rounded-full text-2xl  ">
          <FaShoppingCart />
        </div>
      </div>
    </div>
  );
};

export default Header;
