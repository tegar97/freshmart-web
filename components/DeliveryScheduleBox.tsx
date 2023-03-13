import React, { useState } from "react";
import DayBox from "./DayBox";
import moment from "moment";

function DeliveryScheduleBox() {
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = moment().add(i, "days");
    days.push(
      <DayBox
        key={i}
        day={day.format("dddd")}
        date={day.format("DD")}
        month={day.format("MMMM")}
        isSelected={day.isSame(selectedDate, "day")}
        onClick={() => setSelectedDate(day)}
      />
    );
  }

  return (
    <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4">
      <h1 className="header1">Let{"'"} s schedule the perfect delivery date</h1>
      {/* grid 4 column  */}
      <div className="flex flex-row gap-4 mt-4 w-full overflow-y-auto py-4">
        {days}
      </div>
      {selectedDate && (
        <div className="mt-4">
          <p className="text-gray-500">
            Your package should be delivered on. :{" "}
            {selectedDate.format("DD MMMM YYYY")}
          </p>
        </div>
      )}
    </div>
  );
}

export default DeliveryScheduleBox;
