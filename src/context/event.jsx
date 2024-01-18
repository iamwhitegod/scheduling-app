import { createContext, useContext, useReducer } from "react";

const EventContext = createContext();

export const useEvent = () => useContext(EventContext);

const event = {
  title: "ADPList Meetup",
  duration: "02:45:00",
  eventId: "123456789",
  schedules: [
    { scheduleId: "123456590", name: "Introduction", duration: "15:00" },
    { scheduleId: "123456545", name: "Career Growth", duration: "35:00" },
    {
      scheduleId: "123456098",
      name: "Job Hunting 101: Dos & Don'ts",
      duration: "40:00",
    },
  ],
};

const initialState = {
  events: [event],
  selectedEvent: null,
  loading: false,
};

const eventReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_EVENT":
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case "SELECT_EVENT":
      return {
        ...state,
        selectedEvent: action.payload,
      };

    case "DELETE_EVENT":
      const deletedEventId = action.payload;
      console.log(deletedEventId);

      let updatedSelectedEventAfterDelete;

      const updatedEvents = state.events.filter(
        (event) => event.eventId !== deletedEventId
      );

      updatedSelectedEventAfterDelete =
        state.selectedEvent && state.selectedEvent.eventId === deletedEventId
          ? null
          : state.selectedEvent;

      return {
        ...state,
        events: updatedEvents,
        selectedEvent: updatedSelectedEventAfterDelete,
      };

    case "ADD_SCHEDULE":
      const { eventId: eventToUpdate, newSchedule } = action.payload;
      let updateSelectedSchedule;

      const updatedEventsWithAddedSchedule = state.events.map((event) => {
        if (event.eventId === eventToUpdate) {
          const updatedSchedules = [...event.schedules, newSchedule];

          const [hours, minutes, seconds] = event.duration.split(":");
          const totalEventDurationInSeconds =
            parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

          // Calculate total duration of all schedules in Seconds
          const totalDurationSeconds = updatedSchedules.reduce(
            (sum, schedule) => {
              const [minutes, seconds] = schedule.duration.split(":");
              const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);

              return sum + totalSeconds;
            },
            0
          );

          if (totalDurationSeconds <= totalEventDurationInSeconds) {
            // If total duration is within event duration, update selectedSchedule
            if (
              state.selectedEvent &&
              state.selectedEvent.eventId === eventToUpdate
            ) {
              updateSelectedSchedule = {
                ...state.selectedEvent,
                schedules: updatedSchedules,
              };
            }
            return { ...event, schedules: updatedSchedules };
          } else {
            const remainingTimeInSeconds =
              totalDurationSeconds - totalEventDurationInSeconds;
            const remainingDate = new Date(remainingTimeInSeconds * 1000);
            const formattedTime = remainingDate.toISOString().substr(11, 8);

            alert(
              `Cannot schedule. You only have ${formattedTime} minutes left`
            );

            return event;
          }
        }
        return event;
      });

      return {
        ...state,
        events: updatedEventsWithAddedSchedule,
        selectedEvent: updateSelectedSchedule
          ? updateSelectedSchedule
          : state.selectedEvent,
      };

    case "DELETE_SCHEDULE":
      const { eventId, scheduleId } = action.payload;
      let updatedSelectedEventAfterDel;

      const updatedEventsWithDeletedSchedule = state.events.map((event) => {
        if (event.eventId === eventId) {
          const updatedSchedules = event.schedules.filter(
            (schedule) => schedule.scheduleId !== scheduleId
          );

          // Check if the selectedEvent is the one being updated
          if (state.selectedEvent && state.selectedEvent.eventId === eventId) {
            updatedSelectedEventAfterDel = {
              ...state.selectedEvent,
              schedules: updatedSchedules,
            };
          }

          return { ...event, schedules: updatedSchedules };
        }

        return event;
      });

      return {
        ...state,
        events: updatedEventsWithDeletedSchedule,
        selectedEvent: updatedSelectedEventAfterDel, // Update the selectedEvent
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  const createEvent = (event) => {
    dispatch({ type: "CREATE_EVENT", payload: event });
  };

  const selectEvent = (event) => {
    dispatch({ type: "SELECT_EVENT", payload: event });
  };

  const deleteEvent = (event) => {
    dispatch({ type: "DELETE_EVENT", payload: event.eventId });
  };

  const addSchedule = (schedule) => {
    dispatch({ type: "ADD_SCHEDULE", payload: schedule });
  };

  const deleteSchedule = (schedule) => {
    dispatch({ type: "DELETE_SCHEDULE", payload: schedule });
  };

  return (
    <EventContext.Provider
      value={{
        state,
        dispatch,
        createEvent,
        deleteEvent,
        selectEvent,
        addSchedule,
        deleteSchedule,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
