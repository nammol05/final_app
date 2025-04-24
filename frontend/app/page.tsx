import React from "react";

export default function BannerComponent() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-[75vw] h-[75vh] bg-[#42b146] flex justify-center items-center">
        <h1 className="fixed top-[55px] bg-white px-4 py-2 border-2 border-black font-bold text-6xl">Banner</h1>
        <button className="absolute top-[5px] right-[5px] bg-white border border-black cursor-pointer text-[15px] px-2">x</button>
        <div className="w-[200px] h-[200px] bg-white absolute left-[-100px] rounded-full"></div>
        <div className="w-[200px] h-[200px] bg-white absolute bottom-[-100px] right-0 rounded-tl-full rounded-bl-full"></div>
        <span className="bg-opacity-20 px-5 py-2 border border-dashed border-white text-5xl text-white">
          This is css position
        </span>
      </div>
    </div>
  );
}