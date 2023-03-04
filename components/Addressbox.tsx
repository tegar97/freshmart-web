import React from 'react'

function Addressbox({
  active = false,
  label,
  address,
  phone,
}: {
  active?: boolean;
  label: string;
  address: string;
  phone: string;
}) {
    

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
        <div className="flex flex-col">
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
            <button className="bg-primary-green text-white py-2 px-4 rounded-md w-full">
              Pilih
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Addressbox