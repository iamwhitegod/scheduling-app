import React, { useState } from "react";
import EventList from "../components/EventList";
import { Trash, UserCircle } from "@phosphor-icons/react";
import CreateEventModal from "../components/CreateEventModal";
import useModal from "../hooks/useModal";
import { useAuth } from "../context/auth";
import { useEvent } from "../context/event";
import { Link } from "react-router-dom";

const Events = () => {
  const { state = {}, logout = null } = useAuth();
  const { state: data = {}, deleteEvent, selectEvent } = useEvent();

  const createEventModal = useModal();

  const { events } = data || {};

  return (
    <>
      <div className="events-dashboard">
        <aside className="events-aside">
          <div className="flex gap-4 items-center cursor-pointer">
            <UserCircle size={48} weight="fill" color="#ffffff" />

            <span className="text-[20px] font-sans font-medium text-white">
              {state?.user?.name}
            </span>
          </div>

          <div className="flex flex-col gap-4 mb-auto">
            <h2 className="text-white font-sans font-bold text-[32px] mb-[32px]">
              My Events
            </h2>

            {events && events?.length > 0 && (
              <ul className="events-list">
                {events?.map((eve) => (
                  <li
                    className="events-item w-full justify-between"
                    key={eve.eventId}
                  >
                    <Link
                      to={`/events/${eve.eventId}`}
                      onClick={(e) => selectEvent(eve)}
                    >
                      <span className="text-white font-sans font-medium text-[16px]">
                        {eve.title}
                      </span>
                    </Link>
                    <Trash
                      size={24}
                      color="#00C9D2"
                      weight="regular"
                      onClick={() => deleteEvent(eve)}
                    />
                  </li>
                ))}
              </ul>
            )}

            {events?.length === 0 && (
              <div className="flex flex-col items-center">
                <span className="text-white font-sans font-medium text-[16px] mb-[24px]">
                  You have no events yet.
                </span>

                <button
                  onClick={createEventModal.openModal}
                  className="bg-[#00C9D2] text-white font-sans font-medium text-[16px] py-[12px] px-[40px] rounded-md cursor-pointer w-full"
                >
                  Create New Event
                </button>
              </div>
            )}
          </div>

          {events?.length > 0 && (
            <button
              onClick={createEventModal.openModal}
              className="bg-[#00C9D2] text-white font-sans font-medium text-[16px] py-[12px] px-[40px] rounded-md cursor-pointer w-full"
            >
              Create New Event
            </button>
          )}
        </aside>
        <main className="events-main">
          <div className="flex justify-end">
            <button
              onClick={logout}
              className="text-[16px] font-sans font-medium text-primaryDark cursor-pointer"
            >
              Logout
            </button>
          </div>

          <EventList />
        </main>
      </div>
      <CreateEventModal modal={createEventModal} />
    </>
  );
};

export default Events;
