"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import ShowToast from "../components/ShowToast";

interface FormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  Gender: string;
  Birthdate: string;
  image: string;
  imageFile?: File | null;
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    Gender: "",
    Birthdate: "",
    image: "",
    imageFile: null,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
        imageFile: file,
      }));
    }
  };

  // Handles text input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Updates user profile
  const handleSave = async () => {
    const sendFormData = new FormData();
    sendFormData.append("id", formData.id);
    sendFormData.append("name", formData.name);
    sendFormData.append("email", formData.email);
    sendFormData.append("phone", formData.phone);
    sendFormData.append("address", formData.address);
    sendFormData.append("Gender", formData.Gender);
    sendFormData.append("Birthdate", formData.Birthdate);

    // Append image file only if a new one is selected
    if (formData.imageFile) {
      sendFormData.append("image", formData.imageFile);
    }

    try {
      setLoading(true);
      const response = await fetch("/api/auth/update-user", {
        method: "PUT",
        body: sendFormData,
      });

      const data = await response.json();
      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          image: data.user.image,
          imageFile: null,
        }));
        ShowToast("Profile Updated...");
      }
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      ShowToast("Internel server error");
    } finally {
      setLoading(false);
    }
  };

  // Fetches user details
  const getUserDetails = async () => {
    try {
      const res = await fetch(`/api/auth/user`, { method: "GET" });
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          ...data.user,
          imageFile: null,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="mt-6 flex items-center justify-center">
      <div className="max-w-lg w-full flex flex-col gap-2 text-sm pt-5 text-center">
        <div className="relative w-36 h-36 mx-auto">
          {/* Profile Image */}
          <Image
            src={formData.image}
            height={144}
            width={144}
            alt="Profile Image"
            className={`rounded-lg w-36 h-36 object-cover ${
              isEditing && "opacity-70"
            }`}
          />

          {/* Upload Icon */}
          {isEditing && (
            <label
              htmlFor="imageUpload"
              className="absolute inset-0 flex items-center justify-center bg-opacity-50 rounded-lg cursor-pointer"
            >
              <Image
                src="/assets/upload_icon.png"
                height={144}
                width={144}
                alt="Upload Icon"
                className="rounded-lg w-36 h-36 object-cover"
              />
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>

        {/* Name Field */}
        {isEditing ? (
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="font-medium text-3xl text-[#262626] mt-4 text-center border rounded p-1"
          />
        ) : (
          <p className="font-medium text-3xl text-[#262626] mt-4">
            {formData.name}
          </p>
        )}

        <hr className="bg-[#ADADAD] h-[1px] border-none" />

        {/* Contact Information */}
        <div className="text-left">
          <p className="text-gray-600 text-center underline mt-3">
            CONTACT INFORMATION
          </p>
          <div className="grid grid-cols-2 gap-y-2 gap-x-40 mt-5 text-gray-600 text-center">
            <p className="font-medium -mr-36 mt-1">Email:</p>
            <p className="text-gray-500 -ml-28 mt-1">{formData.email}</p>
            <p className="font-medium -mr-36 mt-1">Phone:</p>
            {isEditing ? (
              <input
                name="phone"
                value={formData.phone || ""}
                onChange={handleInputChange}
                className="text-blue-500 -ml-16 border rounded p-1"
              />
            ) : (
              <p className="text-blue-500 -ml-28 mt-1">
                {formData.phone || "No phone provided"}
              </p>
            )}

            <p className="font-medium -mr-36 mt-1">Address:</p>
            {isEditing ? (
              <input
                name="address"
                value={formData.address || ""}
                onChange={handleInputChange}
                className="text-blue-500 -ml-16 border rounded p-1"
              />
            ) : (
              <p className="text-gray-500 -ml-28 mt-1">
                {formData.address || "No address provided"}
              </p>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="text-left">
          <p className="text-[#797979] text-center underline mt-4">
            BASIC INFORMATION
          </p>
          <div className="grid grid-cols-2 gap-y-2 mt-5 text-gray-600 text-center">
            {/* Gender Field */}
            <p className="font-medium mt-1 -mr-24">Gender:</p>
            {isEditing ? (
              <select
                name="Gender"
                value={formData.Gender}
                onChange={handleInputChange}
                className="text-gray-500 ml-4 border rounded p-1 w-40"
              >
                <option disabled value="">
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-500 mt-1 -ml-24">
                {formData.Gender || "Not Selected"}
              </p>
            )}
            {/* Birth Date Field */}
            <p className="font-medium mt-1 -mr-24">Birth Date:</p>
            {isEditing ? (
              <input
                type="date"
                name="Birthdate"
                value={formData.Birthdate}
                onChange={handleInputChange}
                className="text-gray-500 ml-4 border rounded p-1 w-40"
              />
            ) : (
              <p className="text-gray-500 mt-1 -ml-24">
                {formData.Birthdate || "Not Selected"}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex gap-4 justify-center">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={loading}
                className={`border-[1px] border-gray-500 px-8 py-2 rounded-full text-black transition-all flex ${
                  loading && "font-semibold cursor-not-allowed"
                }`}
              >
                {loading ? "Save Changes..." : "Save"}{" "}
                {loading && <div className="ml-1 loader"></div>}
              </button>
              {!loading && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="border border-gray-500 px-8 py-2 rounded-full text-black transition-all"
                >
                  Cancel
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="border-[1px] border-gray-500 px-8 py-2 rounded-full text-black transition-all"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
