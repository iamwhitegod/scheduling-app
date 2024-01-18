import React from "react";
import Modal from "./Modal";
import { Formik } from "formik";
import * as Yup from "yup";
import { useEvent } from "../context/event";

const CreateEventModal = ({ modal }) => {
  const { createEvent } = useEvent();
  const initialValues = {
    title: "",
    hour: "",
    minutes: "",
    seconds: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    hour: Yup.number().required("Hour is required"),
    minutes: Yup.number().required("Minutes is required"),
    seconds: Yup.number().required("Seconds is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    const { title, hour, minutes, seconds } = values;

    const event = {
      eventId: (Math.random() * 1000000).toString().split(".")[1],
      title,
      duration: `${hour < 10 ? "0" : ""}${hour}:${
        minutes < 10 ? "0" : ""
      }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
    };

    createEvent(event);

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
            <div className="flex flex-col mb-[24px]">
              <label
                htmlFor="title"
                className="text-black font-sans font-medium text-[16px] mb-2"
              >
                Enter title of event here
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                className="w-full border-[1px] border-primaryDark rounded-md py-3 px-3 text-[16px] font-sans font-medium"
              />

              {errors?.title && (
                <span className="text-[8px] text-red-200">{errors?.title}</span>
              )}
            </div>

            <div className="flex flex-col mb-[100px]">
              <label
                htmlFor="duration"
                className="text-black font-sans font-medium text-[16px] mb-3"
              >
                How long is the event meant to run?
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
                    value={values.hour}
                    onChange={handleChange}
                    className="w-full border-[1px] border-primaryDark rounded-md py-3 px-3 text-[16px] font-sans font-medium"
                    required
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
                    value={values.minutes}
                    onChange={handleChange}
                    required
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
                    required
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
              Create Event
            </button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateEventModal;
