"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import Container from "../components/Login-register/Container";
import Link from "next/link";
import ShowToast from "../components/ShowToast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function Page() {
  const router = useRouter();
  const [showOtpField, setShowOtpField] = useState<boolean>(false);
  const [resendOtp, setSendResetOtp] = useState<boolean>(false);
  const [timer, settimer] = useState<number>(0);
  const [otpEmail, setOtpEmail] = useState<string>("");

  useEffect(() => {
    if (timer > 0) {
      const timerId = setInterval(() => {
        settimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timer]);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must contain 4 characters!")
      .required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    otp: showOtpField
      ? Yup.string()
          .min(4, "OTP must be at least 4 characters")
          .required("OTP is required")
      : Yup.string(),
  });

  const handleResendOtp = async (
    name: string,
    email: string,
    password: string,
    otp: string
  ) => {
    setSendResetOtp(true)
    try {
      if (!otpEmail) {
        ShowToast("Email not found.", "error");
        return;
      }

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          otp: otp,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSendResetOtp(false)
        ShowToast(data.message || "OTP resent successfully", "success");
        settimer(60);
      } else {
        setSendResetOtp(false)
        ShowToast(data.message || "Failed to resend OTP", "error");
      }
    } catch (error) {
      setSendResetOtp(false)
      console.error("Resend OTP Error:", error);
      ShowToast("Something went wrong. Please try again.", "error");
    }
  };

  return (
    <Container>
      <div className="text-gray-800">
        <h1 className="text-gray-800 text-center text-2xl xl:text-3xl font-semibold mt-3">
          Sign Up
        </h1>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            otp: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: values.name,
                  email: values.email,
                  password: values.password,
                  otp: values.otp,
                }),
              });

              const data = await res.json();

              if (!data.success) {
                ShowToast(
                  data.message ? data.message : "SignUp Failed",
                  "error"
                );
              } else if (data.success === "pending") {
                ShowToast(
                  data.message ? data.message : "Retry again",
                  "success"
                );
                setOtpEmail(values.email);
                setShowOtpField(true);
                settimer(60);
              } else {
                ShowToast(
                  data.message ? data.message : "SignUp Successful",
                  "success"
                );
                Object.assign(values, {
                  email: "",
                  password: "",
                  confirm_password: "",
                  name: "",
                  otp: "",
                });
                router.refresh()
              }
            } catch (error) {
              console.error("Signup Error:", error);
              setErrors({ email: "Something went wrong. Try again!" });
            }
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
                {/* Full Name Field */}
                <div className="input-group bg-none mt-6">
                  <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    className="input input w-full border-2 border-gray-400/40 rounded-sm"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=" "
                  />
                  <label className="user-label">Full Name</label>
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Email Field */}
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

                {/* Confirm Password Field */}
                <div className="input-group bg-none mt-6">
                  <input
                    type="password"
                    name="confirm_password"
                    autoComplete="off"
                    className="input input w-full border-2 border-gray-400/40 rounded-sm"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=" "
                  />
                  <label className="user-label">Confirm Password</label>
                  {errors.confirm_password && touched.confirm_password && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.confirm_password}
                    </div>
                  )}
                </div>

                {/* Otp field with resend button */}
                {showOtpField && (
                  <div className="input-group bg-none mt-6">
                    <input
                      type="text"
                      name="otp"
                      autoComplete="off"
                      className="input input w-full border-2 border-gray-400/40 rounded-sm"
                      value={values.otp}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder=" "
                    />
                    <label className="user-label">Enter Otp</label>
                    {errors.otp && touched.otp && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.otp}
                      </div>
                    )}
                    <div className="flex justify-center mt-2">
                      <span
                        onClick={() =>
                          timer === 0 &&
                          handleResendOtp(
                            values.name,
                            values.email,
                            values.password,
                            ""
                          )
                        }
                        className={`text-sm cursor-pointer ${
                          timer > 0
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-indigo-600 hover:underline"
                        }`}
                      >
                        {timer > 0
                          ? `Resend OTP in ${timer}s`
                          : "Resend OTP"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="justify-center w-full bg-center py-2 mt-6 h-full rounded-sm bg-yellow-400 font-medium text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting || resendOtp ? (
                    <div className="cursor-wait flex items-center space-x-2 justify-center">
                      <p className="font-normal">Verification in progress...</p>
                      <div className="loader"></div>
                    </div>
                  ) : showOtpField ? (
                    "Verify OTP"
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
              <p className="text-gray-400 text-center mt-4">
                Already have an account?{" "}
                <span>
                  <Link
                    href="/login"
                    className="text-indigo-600 underline font-semibold"
                  >
                    Login
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
