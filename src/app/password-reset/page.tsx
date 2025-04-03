"use client";

import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import ShowToast from "../components/ShowToast";

function ForgotPassword() {
  const [timer, settimer] = useState(0);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (
    values: { email: string },
    { setSubmitting }: FormikHelpers<{ email: string }>
  ) => {
    try {
      const response = await fetch("/api/auth/password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await response.json();
      if (data.success) {
        ShowToast("Reset link sent! Check your email.", "success");

        settimer(60);
      } else {
        ShowToast(data.message || "Something went wrong.", "error");
      }
    } catch (error) {
      if (error instanceof Error) {
        ShowToast(error.message)
      }else{
        ShowToast("Error sending reset link:", "error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const timer = setInterval(() => {
        settimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timer]);

  return (
    <div className="min-h-screen -mb-32 flex items-center justify-center custom-background px-4">
      <div className="w-full max-w-md -mt-[10%] bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Request Password Reset
        </h2>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 sm:px-6 bg-yellow-400 text-black font-semibold rounded-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-yellow-400 disabled:cursor-not-allowed"
                disabled={isSubmitting || timer > 0}
              >
                {isSubmitting ? (
                  <div className="cursor-wait flex items-center space-x-2 justify-center">
                    <p className="font-semibold">Sending...</p>
                    <div className="loader"></div>
                  </div>
                ) : timer > 0 ? (
                  `Try again in ${timer}s`
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;
