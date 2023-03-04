import { useRouter } from "next/router";

import CategoryList from "@/components/CategoryList";

import { useContext, useEffect, useState } from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCategory from "@/components/ProductCategory";
import Router from "next/router";
import { cartContext } from "@/context/CartContext";
import Sidebar from "@/components/Sidebar";
import useSWR from "swr";
import ProductGrid from "@/components/ProductGrid";

interface UserAddress {
  city: string;
  address: string;
  lat: number;
  lng: number;
}

const apiUrl = (cityName: string, slug: string) => {
  return `${process.env.NEXT_PUBLIC_API_BACKEND}/productsGroup/${slug}?city_name=${cityName}`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProductGroup: React.FC = () => {
  const [city, setCity] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const { cart, setCart, setCheckTriggerCart, checkTriggerCart } =
    useContext(cartContext);
  const router = useRouter();
  const { slug } = router.query;
    const { data, error } = useSWR(apiUrl(city, slug), fetcher);

  useEffect(() => {
    const address = localStorage.getItem("user-address");
    if (address) {
      const addressObject = JSON.parse(address);

      setCity(addressObject.city);
    }

    const cartData = localStorage.getItem("cart");
    const cart = cartData ? JSON.parse(cartData) : [];
    setCart(cart);
    if (checkTriggerCart == true) {
      setShowCart(true);
    }
  }, [city, slug, setCart, checkTriggerCart]);

  function setCartShow() {
    if (showCart == true) {
      setShowCart(false);
      setCheckTriggerCart(false);
    } else {
      setShowCart(true);
      setCheckTriggerCart(true);
    }
  }


    
    console.log(data)

     if (error) {
       return <div>Error: {error.message}</div>;
     }
     if (!data) {
       return <div>Loading...</div>;
     }

  return (
    <div className="py-16 ">
      <Navbar type={"type1"}  />
      <Sidebar cart={cart} setCartShow={setCartShow} showCart={showCart} />
      <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4 ">
              <h1 className="header1">{ data.status != 404 && data.data.title}</h1>

       
      </div>
      <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4 ">
        <div className="grid grid-cols-4 gap-10 ">
          {data.status != 404
            ? data.data.products.map((products: Product[], index: any) => (
                <ProductGrid key={index} product={products} />
              ))
            : "Tidak ada product yang tersedia diwilaya nada"}
        </div>
        {data.data.length == 0
          ? "Ooops products with this category are currently  not available "
          : ""}
      </div>
      <Footer />
    </div>
  );
};

export default ProductGroup;
