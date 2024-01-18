import { PlayCircle, PlusSquare, Trash } from "@phosphor-icons/react";
import React from "react";
import EventItem from "./EventItem";
import AddScheduleModal from "./AddScheduleModal";
import useModal from "../hooks/useModal";
import { Link, useParams } from "react-router-dom";
import { useEvent } from "../context/event";

const NoSelectedEvent = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-[15vh] ml-[-200px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="222"
        height="222"
        viewBox="0 0 222 222"
        fill="none"
      >
        <path
          d="M204.518 198.505L22.1076 16.0025L10.2676 27.75L27.7501 45.325V175.75C27.7501 180.657 29.6992 185.362 33.1686 188.831C36.638 192.301 41.3436 194.25 46.2501 194.25H176.675L192.77 210.253L204.518 198.505ZM46.2501 175.75V63.7325L158.268 175.75H46.2501ZM75.8501 46.25L57.3501 27.75H175.75C180.657 27.75 185.362 29.6991 188.832 33.1685C192.301 36.6379 194.25 41.3435 194.25 46.25V164.65L175.75 146.15V46.25H75.8501Z"
          fill="#E4E4E4"
        />
      </svg>

      <p className=" text-gray-400 text-center font-sans font-medium text-[16px] mt-[16px]">
        Select an event to view more about it
      </p>
    </div>
  );
};

const EventList = () => {
  const { id } = useParams();
  const addScheduleModal = useModal();
  const { state: { selectedEvent = null } = {} } = useEvent();

  console.log(id);

  if (!selectedEvent) return <NoSelectedEvent />;

  let hours, minutes, seconds;

  if (selectedEvent && selectedEvent.duration) {
    const durationArray = selectedEvent.duration.split(":").map(Number);

    if (Array.isArray(durationArray) && durationArray.length >= 3) {
      [hours, minutes, seconds] = durationArray;
    } else {
      console.error("Invalid duration format");
    }
  } else {
    console.error("Selected event or duration is missing");
  }

  const formattedDuration = `(${hours}hr ${minutes}mins)`;

  return (
    <>
      {selectedEvent && (
        <>
          <div className="mt-[7vh]">
            <div className="flex justify-between items-center cursor-pointer max-w-[1000px] mx-auto mb-[32px]">
              <h2 className="text-black font-sans font-bold text-[36px]">
                {selectedEvent?.title}
                <span className="text-[#338EC0] text-[18px]">
                  {formattedDuration}
                </span>
              </h2>

              <Link to={`/timer`}>
                <PlayCircle size={32} weight="fill" color="#338EC0" />
              </Link>
            </div>

            <ul className="max-w-[1000px] mx-auto">
              {selectedEvent?.schedules?.map((schedule) => (
                <EventItem key={schedule?.scheduleId} schedule={schedule} />
              ))}
            </ul>

            <div className="max-w-[1000px] mx-auto mt-[24px]">
              <button
                className="flex items-center gap-3 cursor-pointer"
                onClick={addScheduleModal.openModal}
              >
                <PlusSquare size={24} weight="light" />
                <span className="text-[#214A61] font-sans text-[14px] font-bold">
                  Add Schedule
                </span>
              </button>
            </div>
          </div>

          <AddScheduleModal modal={addScheduleModal} />
        </>
      )}

      {/* {!selectedEvent && (
        
      )} */}
    </>
  );
};

export default EventList;
