import { useRouter } from "next/router";

import CategoryList from "@/components/CategoryList";

import { useContext, useEffect, useState } from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCategory from "@/components/ProductCategory";
import Router from "next/router";
import { cartContext } from "@/context/CartContext";
import Sidebar from "@/components/Sidebar";

interface UserAddress {
  city: string;
  address: string;
  lat: number;
  lng: number;
}

const Categories: React.FC = () => {
    const [city, setCity] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState(0);
   const [showCart, setShowCart] = useState(false);
   const { cart, setCart, setCheckTriggerCart, checkTriggerCart } = useContext(cartContext);
    const router = useRouter();
    const { category_id } = router.query;
    useEffect(() => {
      const address = localStorage.getItem("user-address");
      if (address) {
        const addressObject = JSON.parse(address);

        setCity(addressObject.city);
      }
      if (category_id) {
        setCategoryId(category_id);
      } 

      const cartData = localStorage.getItem("cart");
      const cart = cartData ? JSON.parse(cartData) : [];
      setCart(cart);
      if (checkTriggerCart == true) {
        setShowCart(true);
      }
    }, [city, category_id, setCart, checkTriggerCart]);

  function setCartShow() {
    if (showCart == true) {
      setShowCart(false);
      setCheckTriggerCart(false);
    } else {
      setShowCart(true);
      setCheckTriggerCart(true);
    }
  }


  return (
    <div className="py-16  ">
      <Navbar type={"type1"} />
      <Sidebar cart={cart} setCartShow={setCartShow} showCart={showCart} />

      <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4 ">
        <h1 className="header1">Categories</h1>

        <div className="mt-5 w-full flex flex-row">
          <CategoryList
            simpelMode={true}
            setCategoryId={setCategoryId}
            categoryId={categoryId}
          />
        </div>
      </div>
      <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4 min-h-screen ">
        {city && <ProductCategory city={city} category_id={categoryId} />}
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
