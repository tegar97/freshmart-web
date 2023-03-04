import React from 'react'
import Addressbox from './Addressbox';

function MyAddressBox({ setNextStep,loading, MyAddress }: { setNextStep: () => void , loading : any,  MyAddress: any}) {
  
  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex flex-col  gap-1">
        <h1 className="text-xl font-semibold  text-grey-text    ">
          Mau kirim belanjaan kemana?
        </h1>
        <span className="text-sm text-subtitle-text">
          Biar pengalaman belanjamu lebih baik, pilih alamat dulu.
        </span>
      </div>
      <hr></hr>
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
              key={item.id}
              label={item.label}
              address={item.fullAddress}
              phone={item.phoneNumber}
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
            Tambah Alamat Baru
          </span>
        </button>
      </div>
    </div>
  );
}

export default MyAddressBox