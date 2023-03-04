import { userContext } from "@/context/UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";
import FloatingLabelInput from "./FloatingLabelInput";

function AdditionAddressBoxForm({
  city,
  postalCode,
  province,
  street,
  district,

  addressParent,
  currentPosition,
}: {
  addressParent: string;
  city: string;

  postalCode: string;
  province: string;
  district: string;
  street: string;
  currentPosition: any;
}) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState(addressParent);

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
        isMainAddress : true,
      };
      console.log(token)

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/address`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
  };

  return (
    <div className="flex flex-col gap-5  relative   ">
      <div className="flex flex-col  gap-1">
        <h1 className="text-xl font-semibold  text-grey-text    ">
          Lengkapi detail alamat
        </h1>
      </div>
      <hr></hr>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-subtitle-text">Nama Penerima</label>

          <FloatingLabelInput
            label=""
            placeholder="Nama Penerima"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-subtitle-text">Nomor Telepon</label>
          <FloatingLabelInput
            label=""
            placeholder="Nomor Telepon"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-subtitle-text">Alamat </label>
          <FloatingLabelInput
            label=""
            placeholder="Alamat"
            type="text"
            isTextArea={true}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
              <button
                  onClick={submit}
                  className="bg-primary-green text-white rounded-md py-2">
          Simpan
        </button>
      </div>
    </div>
  );
}

export default AdditionAddressBoxForm;
