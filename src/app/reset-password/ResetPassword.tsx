"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ShowToast from "../components/ShowToast";

function ResetPassword() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      ShowToast("Invalid or missing email.", "error");
    }
  }, [email]);

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .min(4, "OTP must be 4 digits or greater")
      .required("OTP is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (
    values: { otp: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (!email) {
      ShowToast("Email is missing in the request.", "error");
      setSubmitting(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: values.otp,
          newPassword: values.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        ShowToast(data.message, "success");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        ShowToast(
          data.message || "Invalid OTP or error resetting password.",
          "error"
        );
      }
    } catch (error) {
      ShowToast("Something went wrong. Please try again.", "error");
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen -mb-32 flex items-center justify-center custom-background px-4">
      <div className="w-full max-w-md -mt-[10%] bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Enter New Password
        </h2>

        <Formik
          initialValues={{ otp: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Enter OTP
              </label>
              <Field
                type="text"
                name="otp"
                placeholder="Enter your OTP"
                className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <ErrorMessage
                name="otp"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Enter New Password
              </label>
              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 sm:px-6 bg-yellow-400 text-black font-semibold rounded-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-yellow-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="cursor-wait flex items-center space-x-2 justify-center">
                  <p className="font-semibold">Verification in progress...</p>
                  <div className="loader"></div>
                </div>
              ) : (
                <p className="font-semibold">Send Reset Link</p>
              )}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ResetPassword;
