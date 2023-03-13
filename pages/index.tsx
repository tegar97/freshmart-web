import { useRouter } from "next/router";
import useSWR from "swr";
import styles from "@/styles/Home.module.css";
import { Category } from "@/types/Category";
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductGroupList";
import ProductGroupList from "@/components/ProductGroupList";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { userContext } from "@/context/UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import LocationBox from "@/components/LocationBox";
import BannerBox from "@/components/BannerBox";
import CategoryBox from "@/components/CategoryBox";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { cartContext } from "@/context/CartContext";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import useCart from "@/hooks/useCart";
import Dropzone from "react-dropzone";
import DropzoneArea from "@/components/DropZoneArea";

interface UserAddress {
  city: string;
  address: string;
  lat: number;
  lng: number;
}

const Home: React.FC = () => {
  const token = Cookies.get("token");
  const pathname = usePathname();
  console.log("Path" + pathname);
  const [user, setUser] = useState<any>(null);
  const [confirmedAddress, setConfirmedAddress] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const { cart, trigger, handleAddCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [loadCity, setLoadCity] = useState<boolean>(false);

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

  // check if  bottom of page
  useEffect(() => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    console.log(bottom);
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;
      if (bottom) {
        setShowCart(true);
      } else {
        setShowCart(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const address = localStorage.getItem("user-address");
    const confirmAddress = localStorage.getItem("confirmed_address");

    // const checkCity = async () => {
    //   const response = await axios.get(
    //     `${process.env.NEXT_PUBLIC_API_BACKEND}/checkCity?city_name=${city}`
    //   );
    //   console.log("response", response);
    //   if (response.data.data == true) {
    //     setIsAvailable(true);
    //   }

    //   if (response.data.data == false) {
    //     setIsAvailable(false);
    //   }
    // };
    if (!token) {
      if (confirmAddress == null) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation(position.coords);
          },
          (error) => {
            return setLocation({
              latitude: -6.1753924,
              longitude: 106.8249641,
            });
          }
        );
      }

      if (userStorage) {
        const userObject = JSON.parse(userStorage);
        setUser(userObject);
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

   
    }

    console.log("trigger ", trigger);
    console.log("redner ulang data cart pada index.tsx = ", cart);
  }, [location, city, cart, trigger, token]);

  //check if user login or not and get user primary address if user login and confirmed address is true then get city from address and get product by city name from api and show it on page if user not login then get product by city name from api and show it on page if user not confirmed address then get user current location and get city from location and get product by city name from api and show it on page if user confirmed address then get city from address and get product by city name from api and show it on page if user not confirmed address then get user current location and get city from location and get product by city name from api and show it on page

  useEffect(() => {
    if (token) {
      setLoading(true);
      const fetchData = async () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_BACKEND}/mainAddress`)
          .then((response) => {
            if (response.data.data != null) {
              console.log("myaddress primary", response.data.data);
              setCurrentAddress(response.data.data.fullAddress);
              setCity(response.data.data.city);
              setConfirmedAddress(true);
              const data = {
                city: response.data.data.city,
                address: response.data.data.fullAddress,
                lat: response.data.data.latitude,
                lng: response.data.data.longitude,
              };
              localStorage.setItem("user-address", JSON.stringify(data));
              localStorage.setItem("confirmed_address", "true");
              setLoading(false);
            } else {
              const address = localStorage.getItem("user-address");

              setConfirmedAddress(true);
              if (address) {
                const addressObject = JSON.parse(address);
                setCurrentAddress(addressObject.address);
                setCity(addressObject.city);
              }
            }
          });
      };

      fetchData();

      setLoading(false);
    }
  }, [token, city]);

  // request check city

  console.log("city", city);

  return (
    <div className="py-16 ">
      <Head>
        <title>Freshmarket</title>
      </Head>
      <Navbar type={"type1"} />
      <Sidebar cart={cart} showCart={showCart} />
      <LocationBox
        confirmedAddress={confirmedAddress}
        currentAddress={currentAddress}
      />

     
          <BannerBox />
          <CategoryBox />
          {confirmedAddress && city ? (
            <ProductGroupList city={city} handleAddCart={handleAddCart} />
          ) : (
            "loading"
          )}
          <Footer />
            

    </div>
  );
};

export default Home;
