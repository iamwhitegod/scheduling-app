import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useEvent } from "../context/event";

const Timer = () => {
  const {
    state: { selectedEvent },
  } = useEvent();

  const { schedules } = selectedEvent || {};
  let start = 0,
    end = schedules?.length - 1;

  const [current, setCurrent] = useState(start);

  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    let countdownInterval;

    const startCountdown = (duration) => {
      const [minutes, seconds] = duration.split(":");
      const endTime =
        Date.now() + parseInt(minutes) * 60 * 1000 + parseInt(seconds) * 1000;

      countdownInterval = setInterval(() => {
        const timeDiff = endTime - Date.now();
        if (timeDiff <= 0) {
          clearInterval(countdownInterval);
          setCurrent(current + 1); // Move to the next schedule
        } else {
          const minutes = Math.floor(timeDiff / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          setRemainingTime({ minutes, seconds });
        }
      }, 1000);
    };

    if (current < schedules.length) {
      startCountdown(schedules[current]?.duration);
    }

    // Cleanup the interval when the component unmounts or the current schedule changes
    return () => {
      clearInterval(countdownInterval);
    };
  }, [current, schedules]);

  const handlePrevClick = () => {
    if (current > start) {
      setCurrent(current - 1);
      setRemainingTime({ minutes: 0, seconds: 0 });
    }
  };

  const handleNextClick = () => {
    if (current < end) {
      setCurrent(current + 1);
      setRemainingTime({ minutes: 0, seconds: 0 });
    }
  };

  return (
    <div className="min-h-[100vh] bg-primaryVeryDark">
      <div className="flex flex-col justify-center items-center min-h-[100vh] min-w-[1140px] relative">
        <span className="text-white text-[36px] font-sans font-bold">
          {schedules[current]?.name}
        </span>
        <h1 className="text-white text-[200px] leading-[240px] show-timer">
          {`00:${
            remainingTime.minutes
              ? remainingTime.minutes.toString().padStart(2, "0")
              : "00"
          }:${
            remainingTime.seconds
              ? remainingTime.seconds.toString().padStart(2, "0")
              : "00"
          }`}
        </h1>
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
          onClick={handlePrevClick}
        />
        <CaretCircleRight
          size={32}
          color="#00C9D2"
          weight="regular"
          className="right"
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
};

export default Timer;
