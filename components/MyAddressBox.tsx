import React from 'react'
import Addressbox from './Addressbox';

function MyAddressBox({
  setNextStep,
  loading,
  MyAddress,
  setModalIsClose,
}: {
  setNextStep: () => void;
  loading: any;
    MyAddress: any;
    setRefetch: any;
    setModalIsClose: any;
}) {
  const [primaryAddress, setPrimaryAddress] = React.useState<any>(null);
  // if don't adddress 

  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex flex-col  gap-1">
        <h1 className="text-xl font-semibold  text-grey-text    ">
          Where should we send your goodies ?
        </h1>
        <span className="text-sm text-subtitle-text">
          Get ready to shop! Choose a delivery address first
        </span>
      </div>
      <hr></hr>
      {MyAddress.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <span>
            Looks like you haven{"'"} t saved any address yet. Let{"'"} s add one now!
          </span>
        </div>
      )}
      {loading ? (
        <div className="animate-pulse flex flex-col gap-2 items-center justify-center">
          <div className="w-full h-4 bg-gray-200 rounded"></div>
          <div className="w-full h-4 bg-gray-200 rounded"></div>
          <div className="w-full h-4 bg-gray-200 rounded"></div>
        </div>
      ) : (
        MyAddress &&
        MyAddress.map((item: any) => {
          return (
            <Addressbox
              active={item.isMainAddress ? true : false}
              id={item.id}
              key={item.id}
              label={item.label}
              address={item.fullAddress}
              phone={item.phoneNumber}
              setModalIsClose={setModalIsClose}
            />
          );
        })
      )}
      <div className="mt-4">
        <button
          className="border-2 w-full border-primary-green  px-2 py-2"
          onClick={setNextStep}
        >
          <span className="text-primary-green font-semibold">
            Add New Address
          </span>
        </button>
      </div>
    </div>
  );
}

export default MyAddressBox