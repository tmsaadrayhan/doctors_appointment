import Link from "next/link";
import React from "react";


const Header = () => {
  return (
    <div className="head-container text-[#ffffff] bg-[#0147ab] flex justify-center">
      <div className="m-[1rem]">
        <Link href="/">Home</Link>
      </div>
      <div className="m-[1rem]">
        <Link href="/doctors">Doctors</Link>
      </div>
      <div className="m-[1rem]">
        <Link href="/appointments">Appointments</Link>
      </div>
    </div>
  );
};

export default Header;
