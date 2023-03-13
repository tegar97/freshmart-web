import formatRupiah from "@/hooks/RupiahFormater";
import useCart from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CartItem {
  name: string;
  price: number;
  quantity: number;

}

interface SidebarProps {
  showCart: boolean;
}

function Sidebar({ cart } : {cart: CartItem[]}) {
  const [count, setCount] = useState(0);

  const clonedCart = [...cart];
  console.log("cone => ", clonedCart);

  useEffect(() => {
    // code yang memerlukan data cart   
    console.log("cart in sidebar => ", cart);
  }, [cart]);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div className="fixed sidebar ">
      {/* <div className="px-4 py-4 border-t-2 border-gray-200  rounded-t-lg  ">
        <div className="flex flex-row gap-4 items-center">
          <Image
            src={"/menu1-icon-v1.svg"}
            width={20}
            height={20}
            alt="home icon"
          />
          <span className="text-[#2b2b2b] text-sm">Home Page</span>
        </div>
      </div> */}
      <div className="px-4 py-4 border-t-2 border-gray-200   mb-1 cursor-pointer   bg-white">
        <Link href="/chef-ai">
          <div className="flex flex-row gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-robot text-[#666666]"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M7 7h10a2 2 0 0 1 2 2v1l1 1v3l-1 1v3a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-3l-1 -1v-3l1 -1v-1a2 2 0 0 1 2 -2z"></path>
              <path d="M10 16h4"></path>
              <circle cx="8.5" cy="11.5" r=".5" fill="currentColor"></circle>
              <circle cx="15.5" cy="11.5" r=".5" fill="currentColor"></circle>
              <path d="M9 7l-1 -4"></path>
              <path d="M15 7l1 -4"></path>
            </svg>
            <span className="text-[#2b2b2b] text-sm">Chef Ai</span>
          </div>
        </Link>
      </div>
      <div className="px-4 py-4 border-t-2 border-gray-200   mb-1 cursor-pointer   bg-white">
        <Link href="/chef-ai/my-recipe">
          <div className="flex flex-row gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-checkup-list"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
              <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 14h.01"></path>
              <path d="M9 17h.01"></path>
              <path d="M12 16l1 1l3 -3"></path>
            </svg>
            <span className="text-[#2b2b2b] text-sm">My Amazing Recipe </span>
          </div>
        </Link>
      </div>
      <div className="px-4 py-4 border-t-2  border-gray-200  kt cursor-pointer bg-white  ">
        <div className="flex flex-row gap-4 items-center">
          <Image src={"/cart.svg"} width={20} height={20} alt="home icon" />
          <span className="text-[#2b2b2b] text-sm">Shopping Cart</span>
        </div>
      </div>

      {cart.length > 0 && (
        <div className="px-4 py-4 border-t-2 border-gray-200   bg-white rounded-t-lg max-h-28 overflow-auto">
          <div className="flex flex-row justify-between mb-3  bg-white ">
            <span className="text-sm"> Cart</span>
            <Link href={"/Cart"}>
              <span className="text-primary-green text-sm">View Cart </span>
            </Link>
          </div>
          <hr></hr>
          <ul className="mt-4 ">
            {clonedCart.map((cartItem: CartItem) => {
              return (
                <li key={cartItem.name} className="text-sm mt-4 ">
                  <div className="flex flex-row justify-between gap-4">
                    <h3 className="text-sm overflow-hidden text-ellipsis  whitespace-nowrap">
                      {cartItem.name}
                    </h3>
                    <div>
                      <span className="font-semibold ">
                        {formatRupiah(cartItem.price * cartItem.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 ">
            <hr></hr>
            <div className="flex flex-row justify-between mt-4">
              <div className="flex flex-col ">
                <span className="text-xs">Total</span>
                <span className="font-semibold  text-sm">
                  {formatRupiah(getTotalPrice())}
                </span>
              </div>
              <button className="bg-primary-green text-xs px-2 py-1 text-white rounded-sm">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(Sidebar);
