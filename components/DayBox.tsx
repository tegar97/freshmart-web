import React from "react";

function DayBox({
  day,
  date,
  month,
  isSelected = false,
  onClick,
}: {
  day: string;
  date: string;
  month: string;
  isSelected: boolean;
  onClick: any;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border-2 shadow-md rounded-lg flex flex-col px-4 py-4 items-center ${
        isSelected ? "border-primary-green " : "border-gray-200"
      }`}
      style={{ minWidth: "110px", height: "110px" }}
    >
      <span className="text-sm text-left mb-1 text-[#696969]">{day}</span>
      <span className="font-medium">{date} </span>
      <span className="text-sm text-left items-center mb-1 text-[#696969] ">
        {month}
      </span>
    </div>
  );
}

export default DayBox;
