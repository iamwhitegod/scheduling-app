import { Trash } from "@phosphor-icons/react";
import React from "react";
import { useEvent } from "../context/event";

const EventItem = ({ schedule }) => {
  const {
    state: { selectedEvent },
    deleteSchedule,
  } = useEvent();

  const [minutes = 0, seconds = 0] = schedule?.duration
    ?.split(":")
    ?.map(Number);
  const formattedDuration = `${minutes}mins`;

  return (
    <li className="schedule">
      <span className="text-black font-sans font-medium text-[16px]">
        {schedule.name}
      </span>

      <div className="flex  items-center gap-8">
        <span className="text-black font-sans font-medium text-[16px]">
          {formattedDuration}
        </span>

        <Trash
          size={24}
          color="#00C9D2"
          weight="regular"
          className="cursor-pointer"
          onClick={() =>
            deleteSchedule({
              eventId: selectedEvent?.eventId,
              scheduleId: schedule.scheduleId,
            })
          }
        />
      </div>
    </li>
  );
};

export default EventItem;
