import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Navbar from "@/components/Navbar";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import Link from "next/link";

const containerStyle = {
  width: "100%",
  height: "400px",
};



const MapsPopup = ({
  setNextStep,
  currentPositionUser,
  setCity,
  setPostalCode,
  setProvince,
  setStreet,
  setAddressParent,
  setDistrict
}: {
  setNextStep: () => void;
    currentPositionUser: any;
  setCity: (city: string) => void;
  setPostalCode: (postalCode: string) => void;
  setProvince: (province: string) => void;
  setStreet: (street: string) => void;
    setAddressParent: (address: string) => void;
    setDistrict: (district: string) => void;
}) => {
  const [currentPosition, setCurrentPosition] = useState(currentPositionUser);
  const [markerPosition, setMarkerPosition] = useState(currentPositionUser);
  const [address, setAddress] = useState("");
  const [searchAddress, setSearchAddress] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_MAPS_KEY}`,
  });

  const mapOptions = {
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  const onMarkerDragEnd = (event: any) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const onClick = (event: any) => {
    const latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(latLng);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      // Mencari komponen alamat dengan tipe "locality"
      console.log(results[0]);
      const localityComponent = results[0].address_components.find(
        (component) => component.types.includes("administrative_area_level_2")
      );

      console.log(localityComponent);

      if (localityComponent) {
        const city = localityComponent.long_name;
        console.log(`Kota: ${city}`);
      } else {
        console.log("Tidak ditemukan kota.");
      }
      if (status === "OK") {
        const UserAddressData = {
          city: results[0].address_components[4].long_name,
          address: results[0].formatted_address,
          lat: latLng.lat,
          lng: latLng.lng,
        };

        setAddress(results[0].formatted_address);
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
  };

  useEffect(() => {
    if (currentPositionUser) {
      const latLng = {
        lat: currentPositionUser.lat,
        lng: currentPositionUser.lng,
      };
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results, status) => {
        setAddress(results[0].formatted_address);
      });
    }
  }, [currentPosition, currentPositionUser]);

  const handleNextStep = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        if (results && results.length > 0) {
          let city = "";
          let postalCode = "";
          let province = "";
          let street = "";
          let district = "";
          let formattedAddress = "";

          // Get address components dynamically based on their types
          results[0].address_components.forEach((component) => {
            if (component.types.includes("administrative_area_level_2")) {
              city = component.long_name;
            } else if (component.types.includes("postal_code")) {
              postalCode = component.long_name;
            } else if (
              component.types.includes("administrative_area_level_1")
            ) {
              province = component.long_name;
            } else if (component.types.includes("route")) {
              street = component.long_name;
            } else if (
              component.types.includes("administrative_area_level_3") ||
              component.types.includes("administrative_area_level_4")
            ) {
              district = component.long_name;
            }
          });

          formattedAddress = results[0].formatted_address;


          const userAddressData = {
            city,
            postalCode,
            province,
            street,
            district,
            lat: markerPosition.lat,
            lng: markerPosition.lng,
          };
          console.log("x: ", userAddressData);

          console.log("hit nextstep");
          setCity(city);
          setPostalCode(postalCode);
          setProvince(province);
          setStreet(street);
          setAddressParent(formattedAddress);
          setDistrict(district);
          setNextStep();
        } else {
          console.log("No results found");
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
  };


  return isLoaded ? (
    <div className="flex flex-col gap-5  relative   ">
      <div className="flex flex-col  gap-1">
        <h1 className="text-xl font-semibold  text-grey-text    ">
          Let{"'"}s pinpoint your location
        </h1>
      </div>
      <div className="relative shadow-sm ">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={15}
          options={mapOptions}
          onClick={onClick}
        >
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={onMarkerDragEnd}
          />
        </GoogleMap>

        <div className="absolute bottom-0  bg-white  w-full py-4 px-4">
          <span>{address}</span>
        </div>
      </div>
      <div className="bg-white mt-2  ">
        {/* <h2>Your Address</h2>
        <FloatingLabelInput
          label=""
          placeholder={""}
          type="text"
          value={address}
          readonly={true}
          isTextArea={true}
          onChange={(e) => setAddress(e.target.value)}
        /> */}
        <button
          onClick={handleNextStep}
          className="bg-primary-green w-full  text-white py-4 rounded-lg font-medium  "
        >
          {" "}
          Let{"'"}s pick your spot and fill additional details
        </button>
      </div>
      {/* //floating button  */}
    </div>
  ) : null;
};

export default MapsPopup;
