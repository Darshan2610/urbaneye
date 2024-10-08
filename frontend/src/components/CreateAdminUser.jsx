import React, { useState } from "react";
import axios from "../utils/axios";

const CreateAdminUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    address: "",
    phoneNumber: "",
    aadharNumber: "",
    profilePhoto: null, // State for the profile photo
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePhoto") {
      setFormData({ ...formData, profilePhoto: files[0] }); // Set the file for profile photo
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get the token from local storage

    // Create a FormData object to handle file upload
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post("/admin/create-admin", data, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      });
      alert(response.data.message);
      // console.log(response.data)
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Admin User
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="address" className="sr-only">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="sr-only">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="aadharNumber" className="sr-only">
                Aadhar Number
              </label>
              <input
                id="aadharNumber"
                name="aadharNumber"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Aadhar Number"
                value={formData.aadharNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="profilePhoto" className="sr-only">
                Profile Photo
              </label>
              <input
                id="profilePhoto"
                name="profilePhoto"
                type="file"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminUser;