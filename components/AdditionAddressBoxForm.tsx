import { userContext } from "@/context/UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import React, { useContext, useEffect } from "react";
import DeliveryScheduleBox from "./DeliveryScheduleBox";
import FloatingLabelInput from "./FloatingLabelInput";
import LoadingButton from "./LoadingButton";

function AdditionAddressBoxForm({
  city,
  postalCode,
  province,
  street,
  district,

  addressParent,
  currentPosition,
  prevStep,
}: {
  addressParent: string;
  city: string;

  postalCode: string;
  province: string;
  district: string;
  street: string;
    currentPosition: any;
    prevStep: any;
    
}) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState(addressParent);
  // courier message
  const [courierMessage, setCourierMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
const [loading , setLoading] = React.useState(false);
  useEffect(() => {
    setAddress(addressParent);
    const userStorage = localStorage.getItem("user");

    //convert localstorage user to json
    if (userStorage) {
      const userJson = JSON.parse(userStorage);
      setName(userJson.name);
    }
  }, [addressParent]);

  //submit
  const submit = async () => {
    setLoading(true);
    //validation in english
    if (name === "") {
      setErrorMessage("Name is required");
      return;
    }
    if (phone === "") {
      setErrorMessage("Phone number is required");
      return;
    }
    if (address === "") {
      setErrorMessage("Address is required");
      return;
    }
    console.log("city", city);
    console.log("province", province);
    console.log("district", district);
    console.log("postalCode", postalCode);
    
    // if city , province , district , postal code is empty back to step 3
    if (
      city === "" ||
      province === "" ||
      district === "" ||
      postalCode === ""
    ) {
      prevStep();
      return;
    }

    const token = Cookies.get("token");
    const userStorage = localStorage.getItem("user");
    const userJson = JSON.parse(userStorage);
    const userId = userJson.id;
    const data = {
      label: "Rumah",
      fullAddress: address,
      city: city,
      postal_code: postalCode,
      province: province,
      districts: district,
      phoneNumber: phone,
      latitude: currentPosition.lat,
      longitude: currentPosition.lng,
      street: street,
      isMainAddress: true,
      message_courier: courierMessage,
      recipient: name,
    };
    console.log(token);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/address`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLoading(false);
   // if error 
    

    //save data to localstorage
    const UserAddressData = {
      city: res.data.data.city,
      address: res.data.data.fullAddress,
      lat: res.data.data.latitude,
      lng: res.data.data.longitude,
    };
    localStorage.setItem("user-address", JSON.stringify(UserAddressData));
    localStorage.setItem("confirmed_address", "true");

    //redirect
    const redirect = localStorage.getItem("redirect");
    if (redirect) {
      localStorage.removeItem("redirect");
      Router.push(redirect);
    } else {
      Router.reload();
    }

  };

  return (
    <div className="flex flex-col gap-5  relative   ">
      {/* // error message */}

      <div className="flex flex-col  gap-1">
        <h1 className="text-xl font-semibold  text-grey-text    ">
          Let{"'"} s complete your address details!
        </h1>
      </div>
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      <hr></hr>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-subtitle-text">Receiver{"'"}s name</label>

          <FloatingLabelInput
            label=""
            placeholder="Who should we address this to? "
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-subtitle-text">Phone Number</label>
          <FloatingLabelInput
            label=""
            placeholder="Let us know the best phone number to reach you at!"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-subtitle-text">Your address </label>
          <FloatingLabelInput
            label=""
            placeholder="Your address"
            type="text"
            isTextArea={true}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-subtitle-text">Note for courier </label>
          <FloatingLabelInput
            label=""
            placeholder="
           Any notes for our trusty courier? We'll make sure to pass it on!
            
            "
            type="text"
            isTextArea={true}
            value={courierMessage}
            onChange={(e) => setCourierMessage(e.target.value)}
          />
        </div>
        {loading ? (
          <LoadingButton> Loding ..</LoadingButton>
        ) : (
          <button
            onClick={submit}
            className="bg-primary-green active:bg-opacity-60 hover:bg-opacity-90 text-white rounded-md py-2"
          >
            Save now
          </button>
        )}
      </div>
    </div>
  );
}

export default AdditionAddressBoxForm;
