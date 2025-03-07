"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ShowToast from "../ShowToast";

const validationSchema = yup.object({
  name: yup.string().required("Full Name is required").min(3),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  issue: yup.string().required("Please select an issue"),
  message: yup.string().required("Message is required").min(20),
});

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      issue: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
          setLoading(true);
          const res = await fetch("/api/contact-form", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          const data = await res.json();
          if (data.success) {
            resetForm();
            ShowToast(data.message, "success");
          } else {
            ShowToast(data.message, "error");
          }
        
      } catch (err) {
        void err;
        ShowToast("Internel server error", "error");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="mb-8 text-center mx-[10%] md:mx-[20%] xl:mx-72 md:text-left text-white">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            className={`border-[1.5px] border-gray-400/60 rounded-sm text-gray-700 lg:text-base xl:text-lg w-full py-5 pl-6 ${
              formik.touched.name && formik.errors.name ? "border-red-500" : ""
            }`}
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className={`border-[1.5px] border-gray-400/60 rounded-sm text-gray-700 lg:text-base xl:text-lg w-full py-5 pl-6 ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : ""
            }`}
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
          )}
        </div>

        <div className="mb-4">
          <select
            className={`border-[1.5px] border-gray-400/60 rounded-sm text-gray-700 lg:text-base xl:text-lg w-full py-5 pl-6 ${
              formik.touched.issue && formik.errors.issue
                ? "border-red-500"
                : ""
            }`}
            {...formik.getFieldProps("issue")}
          >
            <option value="" disabled>
              Select issue
            </option>
            <option value="Feedback & Suggestions">
              Feedback & Suggestions
            </option>
            <option value="Report a Problem">Report a Problem</option>
            <option value="Sponsorship & Advertising">
              Sponsorship & Advertising
            </option>
            <option value="Login/Account Issues">Login/Account Issues</option>
          </select>
          {formik.touched.issue && formik.errors.issue && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.issue}
            </div>
          )}
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Message"
            rows={3}
            className={`border-[1.5px] border-gray-400/60 rounded-sm text-gray-700 lg:text-base xl:text-lg w-full py-5 pl-6 ${
              formik.touched.message && formik.errors.message
                ? "border-red-500"
                : ""
            }`}
            {...formik.getFieldProps("message")}
          />
          {formik.touched.message && formik.errors.message && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.message}
            </div>
          )}
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`bg-yellow-400 text-black font-bold text-lg lg:text-xl w-full py-4 hover:bg-yellow-500 transition-colors justify-center items-center inline-flex ${
            loading && "cursor-wait"
          }`}
        >
          {loading ? (
            <>
              Sending... <div className="loader h-max ml-1"></div>
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
