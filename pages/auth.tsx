import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Auth() {
    return (
      <div>
        <div className="sidebar px-4 py-4 border-2 border-gray-200  rounded-lg  ">
          <Link href="/">
            <div className="flex flex-row gap-4 items-center">
              <Image
                src={"/menu1-icon-v1.svg"}
                width={20}
                height={20}
                alt="home icon"
              />
              <span className="text-[#2b2b2b] text-sm">Home Page</span>
            </div>
          </Link>
        </div>
        <div className="relative z-0 " style={{ height: "100vh" }}>
          <div className="video-overlay z-10"></div>

          <video
            autoPlay
            muted
            loop
            className="absolute z-0 object-cover w-full h-full"
          >
            <source src="/auth.mp4" type="video/mp4" />
          </video>
          <div className="h-8 absolute top-5 z-10 px-5">
            <span className="text-white font-semibold text-xl">
              Freshmarket
            </span>
          </div>
          <div className=" px-5 absolute   mt-10 bottom-14 left-1/2 transform -translate-x-1/2  z-10 w-full">
            <div className="flex flex-col gap-3 text-center mb-24">
              <h1 className="text-white font-medium text-2xl">
                Fresh Vegetables
              </h1>
              <span className="text-white ">
                {" "}
                Fresh produce from local farmers, delivered straight to your
                doorstep
              </span>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-5">
                            <Link href={"/register"} className="w-full">

              <button className="bg-white w-full text-primary-green   border-2 border-primary-green font-bold py-2 px-4 rounded">
                Register
                </button>
                </Link>
              <Link href={"/login"}>
                <button className="bg-primary-green text-white  font-bold py-2 px-4 rounded mr-4 w-full">
                  Login
                </button>
              </Link>
            </div>
            {/* <div className="text-center">

                    <span className="text-white ">Back to homepage</span>
                    </div> */}
          </div>
        </div>
      </div>
    );
}

export default Auth;
