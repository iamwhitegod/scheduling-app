import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import React, { useState } from "react";
import { useEvent } from "../context/event";

const Timer = () => {
  const {
    state: { selectedEvent },
  } = useEvent();

  const { schedules } = selectedEvent || {};
  let start = 0,
    end = schedules?.length - 1;

  const [current, setCurrent] = useState(start);

  return (
    <div className="min-h-[100vh] bg-primaryVeryDark">
      <div className="flex flex-col justify-center items-center min-h-[100vh] min-w-[1140px] relative">
        <span className="text-white text-[36px] font-sans font-bold">
          {schedules[current]?.name}
        </span>
        <h1 className="text-white text-[200px] leading-[240px]">00:59:00</h1>
        <span className="text-primaryLight font-sans font-semibold text-[28px] text-[#00C9D2]">
          {current === end
            ? `The End`
            : `Up next: ${schedules[current + 1]?.name}`}
        </span>
      </div>

      <div className="">
        <CaretCircleLeft
          size={32}
          color="#00C9D2"
          weight="regular"
          className="left"
          onClick={() => {
            if (current <= start) return;

            setCurrent(current - 1);
          }}
        />
        <CaretCircleRight
          size={32}
          color="#00C9D2"
          weight="regular"
          className="right"
          onClick={() => {
            if (current >= end) return;

            setCurrent(current + 1);
          }}
        />
      </div>
    </div>
  );
};

export default Timer;
