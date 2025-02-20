"use client";

import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Container from "../components/Login-register/Container";
import Link from "next/link";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function Page() {
  return (
    <Container>
      <div className="text-gray-800">
        <h1 className="text-gray-800 text-center text-2xl xl:text-3xl font-semibold mt-3">
          Login
        </h1>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirm_password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Form Submitted", values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <>
              <form onSubmit={handleSubmit}>
                {/* Email Filed */}
                <div className="input-group bg-none mt-6">
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    className="input input w-full border-2 border-gray-400/40 rounded-sm"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=" "
                  />
                  <label className="user-label">Email</label>
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="input-group bg-none mt-6">
                  <input
                    type="password"
                    name="password"
                    autoComplete="off"
                    className="input input w-full border-2 border-gray-400/40 rounded-sm"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=" "
                  />
                  <label className="user-label">Password</label>
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>
                {/* Submit Button */}
                <div className="w-full justify-center inline-flex">
                  <button
                    type="submit"
                    className="w-full justify-center bg-center py-2 mt-6 h-full rounded-sm bg-yellow-400 font-medium text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Loading ..." : "Login"}
                  </button>
                </div>
              </form>
              <p className="text-gray-400 mt-4 text-left">
                Dont have an account?{" "}
                <span>
                  <Link
                    href="/register"
                    className="text-indigo-600 underline font-semibold"
                  >
                    Register
                  </Link>
                </span>
              </p>
              <p className="text-gray-400 mt-4 text-left">
                <span>
                  <Link
                    href="#"
                    className="text-indigo-600 underline underline-offset-2 font-normal text-sm"
                  >
                    Forgot password?
                  </Link>
                </span>
              </p>
            </>
          )}
        </Formik>
      </div>
    </Container>
  );
}

export default Page;
