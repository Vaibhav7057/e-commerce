import React from "react";

const ServiceLoader = ({ text }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-slate-200 opacity-40  ">
      <div className="flex flex-col justify-center items-center ">
        <div className="w-[50px] h-[50px] rounded-full border border-violet-800 border-b-violet-400 spinner "></div>
        <p className="text-center text-black mt-4">{text}</p>
      </div>
    </div>
  );
};

export default ServiceLoader;
