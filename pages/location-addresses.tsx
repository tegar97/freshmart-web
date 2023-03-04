import { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Navbar from "@/components/Navbar";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import Link from "next/link";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -6.1754,
  lng: 106.8272,
};

const MapContainer = () => {
  const [currentPosition, setCurrentPosition] = useState(center);
  const [markerPosition, setMarkerPosition] = useState(center);
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

  const onLoad = (map: any) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setMarkerPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        map.panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.log("Location not found");
      }
    );
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
          
          console.log(localityComponent)

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
          localStorage.setItem("user-address", JSON.stringify(UserAddressData));
          localStorage.setItem("confirmed_address", "true");

          setAddress(results[0].formatted_address);
        } else {
          console.log("Geocoder failed due to: " + status);
        }
      });
  };


  



    return isLoaded ? (
      <div className="py-16 ">
        <Navbar type={"type2"} title="Delivery location " backUrl="/" />
        <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4 ">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={15}
            options={mapOptions}
            onLoad={onLoad}
            onClick={onClick}
          >
            <Marker
              position={markerPosition}
              draggable={true}
              onDragEnd={onMarkerDragEnd}
            />
          </GoogleMap>
        </div>
        <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4 ">
          <h2>Your Address</h2>
          <FloatingLabelInput
            label=""
            placeholder={""}
            type="text"
            value={address}
            readonly={true}
            isTextArea={true}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Link href="/">
            <button className="bg-primary-green w-full  text-white py-4 rounded-lg font-medium  ">
              {" "}
              Change Address
            </button>
          </Link>
        </div>
      </div>
    ) : null;
};

export default MapContainer;
