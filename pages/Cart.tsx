import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import useCart from "@/hooks/useCart";
import ProductGroupList from "@/components/ProductGroupList";
import CartProduct from "@/components/CartProduct";
import formatRupiah from "@/hooks/RupiahFormater";
import Cookies from "js-cookie";
import Link from "next/link";
import LoadingButton from "@/components/LoadingButton";
import ListAddress from "@/components/ListAddress";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const [MyAddress, setMyAddress] = useState([]);
  console.log("MyAddress => ", MyAddress);
  // const [cart, setCart] = useState<CartItem[]>([]);
  const {
    cart,
    handleChange,
    handleDelete,
    handleAddToCart,
    handleMinusToCart,
    clearCart,
    handleAddCart,
    handleUnselectItem,
    handleSelectItem,
    handleSelectAllItem,
    handleUnselectAllItem,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");

  const [confirmedAddress, setConfirmedAddress] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  interface UserAddress {
    city: string;
    address: string;
    lat: number;
    lng: number;
  }
  const getAddressFromLatLng = async (
    latitude: number,
    longitude: number
  ): Promise<UserAddress> => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_MAPS_KEY}`
    );
    const data = await response.json();

    const localityComponent = data.results[0].address_components.find(
      (component: any) =>
        component.types.includes("administrative_area_level_2")
    );

    let getCity;
    if (localityComponent) {
      getCity = localityComponent.long_name;
    } else {
      console.log("Tidak ditemukan kota.");
    }

    const userAddressData: UserAddress = {
      city: getCity,
      address: data?.results[0].formatted_address,
      lat: latitude,
      lng: longitude,
    };
    return userAddressData;
  };

  useEffect(() => {
    setLoading(true);

    const address = localStorage.getItem("user-address");
    const confirmAddress = localStorage.getItem("confirmed_address");

    if (confirmAddress == null) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    if (confirmAddress === "true") {
      setConfirmedAddress(true);
      if (address) {
        const addressObject = JSON.parse(address);
        setCurrentAddress(addressObject.address);
        setCity(addressObject.city);
      }
    } else if (location) {
      getAddressFromLatLng(location.latitude, location.longitude).then(
        (address) => {
          console.log(address);
          setCurrentAddress(address.address);
          setCity(address.city);
          localStorage.setItem("user-address", JSON.stringify(address));
          localStorage.setItem("confirmed_address", "true");
        }
      );
    }

    const cartData = localStorage.getItem("cart");
    const cart = cartData ? JSON.parse(cartData) : [];

    const fetchData = async () => {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_BACKEND}/address`)
          .then((response) => {
            setMyAddress(response.data.data);
            setLoading(false);
          });
      }
    };
    if (!token) {
      setCheckLogin(false);
    }
    if (token) {
      setCheckLogin(true);

      fetchData();
    }
    setLoading(false);
  }, [location, city, token, getAddressFromLatLng]);

  //handle redirect to login  then back to cart
  const handleRedirect = () => {
    localStorage.setItem("redirect", "/Cart");
    window.location.href = "/auth";
  };

  const redirectToCheckout = async () => {

    localStorage.setItem("redirect", "/checkout");
  };



  return (
    <div className="py-16">
      <Navbar type={"type1"} />

      <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4   ">
        <h1 className="header1">Your Cart</h1>

        <div className="flex flex-row justify-between items-center mt-5">
          <div className="flex gap-2">
            {
              // if all product selected, then checked

              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                onChange={
                  cart.every((cart) => cart.selected)
                    ? handleUnselectAllItem
                    : handleSelectAllItem
                }
                checked={cart.every((cart) => cart.selected)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-primary-green dark:border-gray-600"
              />
            }
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Select all
            </label>
          </div>

          <div>
            {/* button text delete cart  */}
            <button
              className=" text-primary-green px-4 py-2 rounded-lg"
              onClick={clearCart}
            >
              Hapus
            </button>
          </div>
        </div>

        {/* product cart with 4 column : checkbox , image, name and price , add and delete quantity */}

        {cart.map((cart, index) => {
          return (
            <CartProduct
              key={index}
              cart={cart}
              index={index}
              handleUnselectItem={handleUnselectItem}
              handleSelectItem={handleSelectItem}
              handleAddToCart={handleAddToCart}
              handleMinusToCart={handleMinusToCart}
              handleDelete={handleDelete}
              handleChange={handleChange}
            />
          );
        })}
        <div className="mt-10">
          {/* // total */}
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-md text-left mb-1 font-medium">Total</h1>
            <h1 className="text-md font-semibold text-left mb-1 ">
             
              {formatRupiah(
                cart
                  .filter((cart) => cart.selected)
                  .reduce((acc, cart) => {
                    return acc + cart.price * cart.quantity;
                  }, 0)
              )}
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-5">
        {confirmedAddress && city ? (
          <ProductGroupList city={city} handleAddCart={handleAddCart} />
        ) : (
          "loading"
        )}
      </div>
      <div className="max-w-xl mx-auto z-20 fixed bottom-0 left-0 right-0  flex flex-row  gap-5 items-center  bg-white  px-4 sm:px-4 lg:px-4 lg:py-8      mt-2">
        {checkLogin == false && !loading && (
          <button
            onClick={handleRedirect}
            className="bg-primary-green text-white px-4 py-2 rounded-lg w-full"
          >
            Checkout
          </button>
        )}
        {loading && <LoadingButton>Checkout</LoadingButton>}
        {checkLogin && MyAddress.length > 0 && (
          <Link href={'/checkout'} className="w-full">
            <button className="bg-primary-green text-white px-4 py-2 rounded-lg w-full">
              Checkout
            </button>
          </Link>
        )}
        {!loading && checkLogin && MyAddress.length == 0 && (
          <div className="w-full" onClick={redirectToCheckout}>
            <ListAddress type="type2">Checkout</ListAddress>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
