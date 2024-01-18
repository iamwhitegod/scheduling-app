import React from "react";
import { styles } from "./Homepage";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/auth";

const SignIn = () => {
  const { login = null, state = {} } = useAuth();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const onSubmit = (values, { resetForm }) => {
    const { email, password } = values;
    login({ email, password });

    // resetForm();
  };

  return (
    <div className="signin min-h-[100vh]" style={styles}>
      <nav className="py-8">
        <div className="max-w-[1140px] px-[24px] mx-auto flex justify-between items-center">
          <button className="text-white bg-primaryDark px-6 py-4 text-[20px] cursor-pointer rounded-md">
            Eventter
          </button>
        </div>
      </nav>

      <main className="py-16 pt-[10vh]">
        <div className="max-w-[1140px] px-[24px] mx-auto flex flex-col justify-between items-center">
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
              <form className="w-[500px] mx-auto" onSubmit={handleSubmit}>
                <h2 className="text-primaryDark text-center text-[36px] font-sans font-bold">
                  Sign In
                </h2>
                <p className="text-primaryDark text-[16px] text-center font-sans font-medium mb-[56px]">
                  Don't have an account? Sign Up
                </p>

                <div className="flex flex-col mb-[24px]">
                  <label
                    htmlFor="email"
                    className="text-black font-sans font-medium text-[16px]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values?.email}
                    onChange={handleChange}
                    className="w-full border-[1px] border-primaryDark rounded-md py-3 px-3 text-[16px] font-sans font-medium"
                  />

                  {errors?.email && (
                    <span className="text-[8px] text-red-200">
                      {errors?.email}
                    </span>
                  )}
                </div>

                <div className="flex flex-col mb-[48px]">
                  <label
                    htmlFor="password"
                    className="text-black font-sans font-medium text-[16px]"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={values?.password}
                    onChange={handleChange}
                    className="w-full border-[1.5px] border-primaryDark rounded-md py-3 px-3 text-[16px]"
                  />

                  {errors?.password && (
                    <span className="text-[8px] text-red-200">
                      {errors?.password}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={state?.loading}
                  className="text-center w-full text-[16px] text-white font-sans font-bold flex justify-center items-center bg-primaryLight px-[40px] py-[16px] gap-5 rounded-md"
                >
                  {state?.loading ? "Loading..." : "Sign In Now"}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
