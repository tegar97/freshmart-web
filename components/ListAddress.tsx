import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { Product } from "@/types/ProductGroup";
import useCart from "@/hooks/useCart";
import Image from "next/image";
import Addressbox from "./Addressbox";
import MyAddressBox from "./MyAddressBox";
import SearchAddressLocationForm from "./SearchLocation";
import MapsPopup from "./getLocationDetail";
import AdditionAddressBoxForm from "./AdditionAddressBoxForm";
import axios from "axios";
import Cookies from "js-cookie";
function ListAddress({}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState();
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [MyAddress, setMyAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      setModalIsOpen(false);
    }
    setLoading(true);
    const fetchData = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_BACKEND}/address`)
        .then((response) => {
          setMyAddress(response.data.data);
          setLoading(false);
        });
    };
    fetchData();
  }, [token]);

  console.log(MyAddress);

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  function openModal() {
    setModalIsOpen(true);
  }

  //disable scroll when modal is open
  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalIsOpen]);

  function setModalIsClose() {
    setModalIsOpen(false);
    setStep(1);
  }

  return (
    <div>
      <span
        className="ml-2 text-primary-green cursor-pointer"
        onClick={openModal}
      >
        Ubah
      </span>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsClose()}
        className="modal-address max-w-xl  mx-auto   h-full overflow-y-auto  bg-white shadow-lg absolute border-none "
        overlayClassName="overlay"
      >
        {/* <h1 className="mb-4 text-2xl font-bold">Choose Quantity</h1> */}

        {step === 1 && (
          <MyAddressBox
            setNextStep={nextStep}
            loading={loading}
            MyAddress={MyAddress}
          />
        )}
        {step === 2 && (
          <SearchAddressLocationForm
            setNextStep={nextStep}
            setCurrentPosition={setCurrentPosition}
          />
        )}

        {step === 3 && (
          <MapsPopup
            setNextStep={nextStep}
            currentPositionUser={currentPosition}
            setCity={setCity}
            setPostalCode={setPostalCode}
            setProvince={setProvince}
            setStreet={setStreet}
            setAddressParent={setAddress}
            setDistrict={setDistrict}
          />
        )}

        {step === 4 && (
          <AdditionAddressBoxForm
            city={city}
            postalCode={postalCode}
            province={province}
            street={street}
            district={district}
            addressParent={address}
            currentPosition={currentPosition}
          />
        )}
      </ReactModal>
    </div>
  );
}

export default ListAddress;
