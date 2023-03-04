import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import useCart from "@/hooks/useCart";
import ProductGroupList from "@/components/ProductGroupList";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  // const [cart, setCart] = useState<CartItem[]>([]);
  const {
    cart,
    handleChange,
    handleDelete,
    handleAddToCart,
    handleMinusToCart,
    clearCart,
    
  } = useCart();

  const [confirmedAddress, setConfirmedAddress] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
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
  }, [location, city]);


  return (
    <div className="py-16">
      <Navbar type={"type1"} />

      <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4   ">
        <h1 className="header1">Your Cart</h1>

        <div className="flex flex-row justify-between items-center mt-5">
          <div className="flex gap-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-primary-green dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Pilih semua
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
            <div
              key={index}
              className="flex flex-row 
        justify-between items-center mt-4 "
            >
              <div className="flex flex-row gap-4 items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-primary-green dark:border-gray-600"
                />

                <div>
                  <div
                    style={{
                      borderRadius: "8px",
                      width: "72px",
                      height: "72px",
                    }}
                    className="bg-gray-100  rounded-lg flex items-center justify-center"
                  >
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_BACKEND +
                        "/images/" +
                        cart.image
                      }
                      width={60}
                      height={60}
                      className="object-cover  "
                      alt={"Image " + cart.name}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-left mb-1 text-[#696969]">
                    {cart.name}
                  </span>
                  {
                    <span className="text-sm text-left mb-1 text-[#696969]">
                      {cart.quantity} x Rp. {cart.price}
                    </span>
                  }

                  <span className="font-medium">
                    Rp. {cart.price * cart.quantity}{" "}
                  </span>
                </div>
              </div>

              {/* // add and sub quantity */}

              <div className="flex flex-row gap-4 items-center">
                <button
                  className="text-primary-green px-4 py-2 rounded-lg"
                  onClick={() => handleDelete(index)}
                >
                  Hapus
                </button>
                <div className="flex flex-row gap-4 items-center">
                  <button
                    onClick={() => handleMinusToCart(index)}
                    className="text-primary-green px-4 py-2 rounded-lg"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={cart.quantity}
                    onChange={(e) => handleChange(e, index)}
                    className="w-12 h-8 text-center border-2 border-primary-green rounded-lg"
                  />
                  <button
                    onClick={() => handleAddToCart(index)}
                    className="text-primary-green px-4 py-2 rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        {confirmedAddress && city ? (
          <ProductGroupList city={city} />
        ) : (
          "loading"
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
