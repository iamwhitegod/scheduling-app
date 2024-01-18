import React from "react";
import Modal from "./Modal";
import { useEvent } from "../context/event";
import * as Yup from "yup";
import { Formik } from "formik";

const AddScheduleModal = ({ modal }) => {
  const {
    state: { selectedEvent },
    addSchedule,
  } = useEvent();

  const initialValues = {
    name: "",
    minutes: "",
    seconds: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Title is required"),
    minutes: Yup.number().required("Minutes is required"),
    seconds: Yup.number().required("Seconds is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    const { name, minutes, seconds } = values;

    const schedule = {
      scheduleId: (Math.random() * 1000000).toString().split(".")[1],
      name,
      duration: `${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`,
    };

    addSchedule({ eventId: selectedEvent.eventId, newSchedule: schedule });

    modal.closeModal();
    // resetForm();
  };

  return (
    <Modal isOpen={modal.isOpen} onClose={modal.closeModal}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form className="flex flex-col gap-4 px-4" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-[16px]">
              <label
                htmlFor="title"
                className="text-black font-sans font-medium text-[16px] mb-2"
              >
                Schedule Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                className="w-full border-[1px] border-primaryDark rounded-md py-3 px-3 text-[16px] font-sans font-medium"
              />

              {errors?.name && (
                <span className="text-[8px] text-red-200">{errors?.name}</span>
              )}
            </div>

            <div className="flex flex-col mb-[100px]">
              <label
                htmlFor="title"
                className="text-black font-sans font-medium text-[16px] mb-3"
              >
                &nbsp;
              </label>

              <div className="flex gap-6">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="hour"
                    className="text-black font-sans text-[12px] mb-2"
                  >
                    Hour(s)
                  </label>
                  <input
                    type="number"
                    id="hour"
                    name="hour"
                    min={0}
                    max={23}
                    value={0}
                    disabled
                    className="w-full border-[1px] border-primaryDark rounded-md py-3 px-3 text-[16px] font-sans font-medium"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label
                    htmlFor="hour"
                    className="text-black font-sans text-[12px] mb-2"
                  >
                    Min(s)
                  </label>
                  <input
                    type="number"
                    id="minutes"
                    name="minutes"
                    min={0}
                    max={59}
                    value={values.minutes}
                    onChange={handleChange}
                    className="w-full border-[1px] border-primaryDark rounded-md py-3 px-3 text-[16px] font-sans font-medium"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label
                    htmlFor="hour"
                    className="text-black font-sans text-[12px] mb-2"
                  >
                    Sec(s)
                  </label>
                  <input
                    type="number"
                    id="seconds"
                    name="seconds"
                    min={0}
                    max={59}
                    value={values.seconds}
                    onChange={handleChange}
                    className="w-full border-[1px] border-primaryDark rounded-md py-3 px-3 text-[16px] font-sans font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#338EC0] text-white font-sans font-medium text-[16px] py-[12px] px-[40px] rounded-md cursor-pointer w-full uppercase"
            >
              Add to Schedule list
            </button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddScheduleModal;
