import React from 'react'

function DeliveryScheduleBox() {
  return (
    <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4  ">
      <h1 className="header1">Mau dikirim kapan ? </h1>
      {/* grid 4 column  */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="bg-white border-2 border-primary-green shadow-md rounded-lg flex flex-col px-4 py-4 items-center  ">
          <span className="text-sm text-left mb-1 text-[#696969]">Sunday</span>
          <span className="font-medium">26 </span>
          <span className="text-sm text-left items-center mb-1 text-[#696969] ">
            December
          </span>
        </div>
        <div className="bg-white  shadow-md rounded-lg flex flex-col px-4 py-4 items-center  ">
          <span className="text-sm text-left mb-1 text-[#696969]">Sunday</span>
          <span className="font-medium">26 </span>
          <span className="text-sm text-left items-center mb-1 text-[#696969] ">
            December
          </span>
        </div>
      </div>
    </div>
  );
}

export default DeliveryScheduleBox