import BoxSkeleton from "@/components/BoxSkeleton";
import DeliveryScheduleBox from "@/components/DeliveryScheduleBox";
import ListAddress from "@/components/ListAddress";
import LocationBox from "@/components/LocationBox";
import Navbar from "@/components/Navbar";
import useCart from "@/hooks/useCart";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { Snap } from "midtrans-client";
import formatRupiah from "@/hooks/RupiahFormater";

function Checkout() {
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState<string | null>(null);
  // label
  const [label, setLabel] = useState<string | null>(null);
  //PHONE
  const [phone, setPhone] = useState<string | null>(null);
  const [recipient, setRecipient] = useState<string | null>(null);
  const { cart } = useCart();
  const [confirmedAddress, setConfirmedAddress] = useState<boolean>(false);
  const [snapToken, setSnapToken] = useState("");

  async function handleCheckout() {
    const token = Cookies.get("token");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!token) {
      Router.push("/login");
    }
    if (cart.length === 0) {
      Router.push("/");
    }
    if (token) {
      const amount = cart.reduce(
        (acc: number, item: { price: number; quantity: number }) => {
          return acc + item.price * item.quantity;
        },
        0
      );

      //item list with format like this
      // [
      //   {
      //      "quantity"  : 2,
      //      "product"      : {
      //          "id"    : "product-1",
      //          "name"  : "Product 1",
      //          "price" : 10000
      // }

      const item_list = cart.map((item: any) => {
        //select only selected true
        if (item.selected) {
          return {
            quantity: item.quantity,
            product: {
              id: item.id,
              name: item.name,
              price: item.price,
            },
          };
        }
      });

      const data = {
        amount: amount,
        item_list,
      };

      console.log("data", data);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/order/snap`,
        data
      );
      console.log("response", response);

      // clear cart
      localStorage.removeItem("cart");
      // redirect to payment page
      Router.push(response.data.data.redirect_url);

      // const snap = new Snap({
    }
  }

  useEffect(() => {
    setLoading(true);

    //check is login and have product in cart if not redirect to home page
    const token = Cookies.get("token");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!token) {
      Router.push("/");
    }
    if (cart.length === 0) {
      Router.push("/");
    }
    if (token) {
      setLoading(true);
      const fetchData = async () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_BACKEND}/mainAddress`)
          .then((response) => {
            console.log("myaddress primary", response.data.data);
            setCurrentAddress(response.data.data.fullAddress);
            setCity(response.data.data.city);
            setLabel(response.data.data.label);
            setPhone(response.data.data.phoneNumber);
            setRecipient(response.data.data.recipient);
            setConfirmedAddress(true);
            setLoading(false);
          });
      };

      fetchData();
      setLoading(false);
    }
  }, []);

  return (
    <div className="py-16">
      <Navbar type={"type2"} title="Checkout" backUrl="/Cart" />
      <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4   ">
        {/* // address box */}
        <div className="flex flex-row justify-between">
          <h2 className="header1">Delivery Location</h2>
          <ListAddress type="type1">Change Address</ListAddress>
        </div>
        {loading ? (
          <BoxSkeleton width="100%" height="auto" borderRadius="20" />
        ) : (
          <div className="mt-4 bg-white rounded-lg  p-4 flex flex-col border-2 border-gray-200">
            <div className="flex flex-row mb-1">
              <span className=" text-[#31353b]  font-semibold ">
                {recipient}
              </span>

              <span className="header3 ml-2 text-[#31353b]">({label})</span>
            </div>
            <div className="mb-2">
              <p className="text-[#31353b]">{phone}</p>
            </div>
            <p className="text-subtitle-text text-sm ">{currentAddress}</p>
          </div>
        )}
      </div>
      <DeliveryScheduleBox />
      <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4">
        <h1 className="header1">Order detail</h1>
        {/* // show cart item but select only selected = true */}
        <div className="mt-4">
          {cart.map((item) => {
            if (item.selected) {
              return (
                <div
                  className="w-full border-2 px-4 py-4 border-gray-200  mb-2 flex flex-col"
                  key={item.id}
                >
                  <div className="flex flex-row gap-2 justify-between">
                    <div className="flex flex-row gap-5">
                      <div>
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_BACKEND +
                            "/images/" +
                            item.image
                          }
                          width={60}
                          height={60}
                          className="object-cover  "
                          alt={"Image " + item.name}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h5 className=" text-[#31353b]  font-semibold ">
                          {item.name}
                        </h5>
                        <span className="text-subtitle-text text-sm ">
                          Berat : {item.weight}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#31353b] font-semibold">
                        Rp {item.price} / kg
                      </span>
                    </div>
                  </div>

                  {/* // sectioon total */}
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 mt-4">
                      <span className="text-subtitle-text">Total : </span>
                      <span className="text-[#31353b] font-semibold">
                        Rp {item.price * item.quantity}
                      </span>
                    </div>
                    <span className="text-primary-green font-semibold">
                      {item.quantity}x
                    </span>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div className="max-w-xl mx-auto z-20 fixed bottom-0 left-0 right-0  flex flex-row  gap-5 items-center  bg-white  px-4 sm:px-4 lg:px-4 lg:py-8      mt-2">
          <button
            className="bg-primary-green text-white px-4 py-2 rounded-lg w-full"
            onClick={handleCheckout}
          >
            Checkout
          </button>
          {snapToken && (
            <iframe
              src={`https://app.sandbox.midtrans.com/snap/v1/${snapToken}`}
              width="100%"
              height="700px"
            />
          )}
        </div>
      </div>
      <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4 mb-20">
        <h1 className="header1">Payment Summary</h1>
        <div className="flex flex-col  gap-2 mt-4">
          <div className="flex flex-row justify-between">
            <span className="text-subtitle-text">Total Quantity</span>
            <span className="text-[#31353b] font-semibold">
              {/* // total selected product   */}
              {cart.reduce((acc, item) => {
                if (item.selected) {
                  return acc + item.quantity;
                } else {
                  return acc;
                }
              }, 0)}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span className="text-subtitle-text">Delivery fee </span>
            <span className="text-[#31353b] font-semibold">
              {/* // total selected product   */}
              Free
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span className="text-subtitle-text">Total Product Price </span>
            <span className="text-[#31353b] font-semibold">
              {/* // total selected product   */}

              {formatRupiah(
                cart.reduce((acc, item) => {
                  if (item.selected) {
                    return acc + item.price * item.quantity;
                  } else {
                    return acc;
                  }
                }, 0)
              )}
            </span>
          </div>

          <div className="border-2 border-dashed  mt-5"></div>
          <div className="flex flex-row justify-between mt-2">
            <span className="text-subtitle-text">Total </span>
            <span className="text-[#31353b] font-semibold">
              {/* // total selected product   */}
              {formatRupiah(
                cart.reduce((acc, item) => {
                  if (item.selected) {
                    return acc + item.price * item.quantity;
                  } else {
                    return acc;
                  }
                }, 0)
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
