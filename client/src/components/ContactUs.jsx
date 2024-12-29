import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useDarkMode } from "../contexts/DarkModeContext";
import { Navigate, useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { darkMode } = useDarkMode(); // Get dark mode state from context


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:6001/contacts",
        formData
      );
      Swal.fire({
        title: "Thank You!",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      
      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      navigate("/");
    } 
    catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to send message. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  console.log(formData)

  return (
    <div className={`mt-10 mb-10 ${
      darkMode ? "text-black" : ""
    }`}>
      <div className="flex items-center justify-center min-h-screen m-5">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Name*"
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email*"
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label htmlFor="phone" className="block text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </div>

            {/* Message */}
            <div className="mb-3">
              <label htmlFor="message" className="block text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here...."
                rows="3" // Reduced the number of rows to make the form height smaller
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green text-white py-2 px-4 rounded w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
