import { userContext } from '@/context/UserContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext } from 'react'
import Router from "next/router";

function Addressbox({
  active = false,
  id,
  label,
  address,
  phone,
  setModalIsClose,
}: {
  active?: boolean;
  id: string;
  label: string;
  address: string;
  phone: string;
  setModalIsClose: any;
  }) {
    const token = Cookies.get("token");
    const {  isChangeAddress, setIsChangeAddress }  = useContext(userContext);

  const changePrimaryAddress = () => {
    //change primary address

    const response = axios.post(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/ChangeMainAddress`,
      {
        newAddress: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    response.then((res) => {
         
       const UserAddressData = {
         city: res.data.data.city,
         address: res.data.data.fullAddress,
         lat: res.data.data.latitude,
         lng: res.data.data.longitude,
       };
              localStorage.setItem(
                "user-address",
                JSON.stringify(UserAddressData)
              );
      localStorage.setItem("confirmed_address", "true");
   Router.reload();
    });

    console.log(isChangeAddress);
    //replace myAddress with new primary address
  };

  return (
    <div
      className="flex flex-col gap-2 items-center justify-center px-4    py-4  border-gray-100 border-2 rounded-2xl "
      style={
        active
          ? {
              border: "2px solid rgba(49, 186, 87, 0.5)",
              backgroundColor: "rgba(49, 186, 87, 0.07)",
            }
          : { border: "2px solid #E5E5E5" }
      }
    >
      <div className="w-full flex flex-row  justify-between  items-center ">
        <div className="flex flex-col  w-4/5">
          <h5 className="font-medium text-grey-text">{label} </h5>
          {/* phone number */}

          <span className="font-medium text-grey-text">{phone}</span>

          <span className="text-sm text-subtitle-text text-ellipsis overflow-hidden   ">
            {/* // limit address when to long */}
            {address}
          </span>
        </div>
        <div
          className="
        flex flex-col"
        >
          {active ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-check text-primary-green"
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
              <path d="M5 12l5 5l10 -10"></path>
            </svg>
          ) : (
            <button
              onClick={changePrimaryAddress}
              className="bg-primary-green text-white py-2 px-4 rounded-md w-full"
            >
              Pilih
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Addressbox