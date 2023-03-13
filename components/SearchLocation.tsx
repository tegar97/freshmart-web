import React, { useState } from "react";
import Addressbox from "./Addressbox";
import FloatingLabelInput from "./FloatingLabelInput";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function SearchAddressLocationForm({
  setNextStep,
  setCurrentPosition,

}: {
  setNextStep: () => void;
  setCurrentPosition: (latLng: { lat: number; lng: number }) => void;

}) {
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCurrentPosition(latLng);
    setNextStep();
    // output the lat and lng
  };
  const searchOptions = {
    componentRestrictions: { country: ["id"] },
  };
  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex flex-col  gap-1">
        <h1 className="text-xl font-semibold  text-grey-text    ">
          Hey, where should we send your goodies ?
        </h1>
        <span className="text-sm text-subtitle-text">
          Let{"'"} s get started by adding your destination city.
        </span>
      </div>
      <hr></hr>
      <PlacesAutocomplete
        value={locationName}
        onChange={setLocationName}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <FloatingLabelInput
              label=""
              placeholder="Type in your city or street here "
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              {...getInputProps()}
            />
            <div>
              {loading ? <div>Loading...</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#f2f2f2" : "#fff",
                };
                return (
                  <div
                    className="cursor-pointer py-2 px-4 text-sm text-subtitle-text max-h-60 overflow-y-auto"
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <button
        className=" w-full  text-primary-green  font-medium"
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
              const { latitude, longitude } = position.coords;
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_MAPS_KEY}&result_type=street_address`
              );
              const data = await response.json();
              const address = data.results[0].formatted_address;
              setLocationName(address);
              setAddress(address);
              setCurrentPosition({ lat: latitude, lng: longitude });
              setNextStep();
            });
          } else {
            console.log("Geolocation is not supported by this browser.");
          }
        }}
      >
        Want to make it easy? Let us use your current location!
      </button>

      {/* <button
        className="bg-primary-green w-full  text-white py-4 rounded-lg font-medium  "
        onClick={setNextStep}
      >
        Next
      </button> */}
    </div>
  );
}

export default SearchAddressLocationForm;
