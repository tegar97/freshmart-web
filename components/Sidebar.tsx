import formatRupiah from "@/hooks/RupiahFormater";
import useCart from "@/hooks/useCart";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface CartItem {
  name: string;
  price: number;
  quantity: number;

}

interface SidebarProps {
  showCart: boolean;
}

function Sidebar() {

  const { cartShow, handleShowCart, cart } = useCart();
  const [count, setCount] = useState(0);
 
  const clonedCart = [...cart]; 
  console.log('cone => ',clonedCart)


useEffect(() => {
  // code yang memerlukan data cart
  console.log('cart in sidebar => ',cart)
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
      <div className="px-4 py-4 border-t-2 border-gray-200   cursor-pointer  ">
        <div
          className="flex flex-row gap-4 items-center"
          onClick={() => handleShowCart()}
        >
          <Image src={"/cart.svg"} width={20} height={20} alt="home icon" />
          <span
            className="text-[#2b2b2b] text-sm"
            onClick={() => setCount(count + 1)}
          >
            Keranjang {count}
          </span>
        </div>
      </div>
      {cartShow && (
        <div className="px-4 py-4 border-t-2 border-gray-200  rounded-t-lg max-h-28 overflow-auto">
          <div className="flex flex-row justify-between mb-3">
            <span className="text-sm"> Cart</span>
            <span className="text-primary-green text-sm">View Cart </span>
          </div>
          <hr></hr>
          <ul className="mt-4">
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

          <div className="mt-4">
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
