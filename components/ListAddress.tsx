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
function ListAddress({children,type='type1'} : {children : any, type : string}) {
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
  const [refetch, setRefetch] = useState(false);

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
    console.log('rerender?')
  }, [token,modalIsOpen]);

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
      {type === "type1" ? (
        <span
          className="ml-2 text-primary-green cursor-pointer"
          onClick={openModal}
        >
          {children}
        </span>
      ) : (
        <button
          onClick={openModal}
          className="bg-primary-green text-white px-4 py-2 rounded-lg w-full"
        >
          {children}
        </button>
      )}

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
            setModalIsClose={setModalIsClose}
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
          // <button onClick={nextStep}>next step</button>
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
            prevStep={prevStep}
          />
        )}
      </ReactModal>
    </div>
  );
}

export default ListAddress;
