import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import useCart from "@/hooks/useCart";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function MyRecipeDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { cart } = useCart();
  const [recipe, setRecipe] = React.useState({});
  const [activeMenu, setActiveMenu] = React.useState("description");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <div className="py-16">
      <Navbar type={"type1"} />
      <Sidebar cart={cart} />

      <div className="bg-[#acdea6]  px-4 sm:px-4 lg:px-4 lg:py-4  ">
        <div>
          <div className="mt-5 bg-[#f5f4e9] py-2  rounded-md">
            <h1 className=" text-center  text-lg font-semibold text-[#22561e] ">
              Ayam Katsu Wijen Sangrai
            </h1>
          </div>
          <div className="bg-[#f5f4e9]  rounded-md mt-5 px-5 py-5 h-80">
            <Image
              src={"/x2.jpg"}
              width={300}
              height={300}
              className="w-full rounded-md  h-full   object-cover   "
              alt={""}
            />
          </div>
          <div className="mt-5 bg-[#f5f4e9] py-2 rounded-xl px-4">
            <h1 className=" text-left  text-lg font-semibold mb-2 text-[#22561e] ">
              Ingredients
            </h1>

            <ul className=" list-disc px-4">
              <li className="text-[#22561e]">Ayam</li>
              <li className="text-[#22561e]">Wijen</li>
              <li className="text-[#22561e]">Saus</li>
            </ul>
          </div>
         
                  <div className="mt-5 bg-[#f5f4e9] py-2 rounded-md px-4">
            <h1 className=" text-left  text-lg font-semibold mb-2 text-[#22561e] ">
              You can buy ingredient here
            </h1>
          </div>
          
          <div className="mt-5 bg-[#f5f4e9] py-2 rounded-xl px-4">
            <h1 className=" mb-4 text-left  text-lg font-semibold  text-[#22561e] ">
             How to make it
            </h1>

            <ul className="list-decimal px-4 mb-4 ">
              
              {/* // list number  */}
              <li className="text-[#22561e] mb-2">
                <span className="text-[#22561e]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates, quod.
                </span>

              </li>
        

             
            </ul>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default MyRecipeDetail;
