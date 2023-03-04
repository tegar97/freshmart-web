import React, { createContext, useState } from "react";

export const cartContext = createContext<any>(null); // inisialisasi userContext dengan nilai null

export const CartProvider = ({ children } : { children :React.ReactNode}) => {
const [cart, setCart] = useState(null);
  const [checkTriggerCart, setCheckTriggerCart] = useState(null);

  // inisialisasi user state dengan nilai null

  return (
    <cartContext.Provider value={{ checkTriggerCart, setCheckTriggerCart,cart,setCart }}>
      {children}
    </cartContext.Provider>
  );
};
