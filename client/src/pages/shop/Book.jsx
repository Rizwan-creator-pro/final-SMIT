import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Book = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    specialRequests: "",
  });

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
      !formData.date ||
      !formData.time ||
      !formData.guests
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
        "http://localhost:6001/reservation",
        formData
      );
      Swal.fire({
        title: "Reservation Confirmed!",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 1,
        specialRequests: "",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to make reservation. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="mt-10 mb-10 text-black">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mt-10 mx-5">
          <h2 className="text-2xl font-bold text-center mb-4">
            Book a <span className="text-green">Table</span>
          </h2>
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
                placeholder="Your Name"
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
                placeholder="Your Email"
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
                required
                placeholder="Your Phone Number"
              />
            </div>

            {/* Date */}
            <div className="mb-3">
              <label htmlFor="date" className="block text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Time */}
            <div className="mb-3">
              <label htmlFor="time" className="block text-gray-700">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            {/* Number of Guests */}
            <div className="mb-3">
              <label htmlFor="guests" className="block text-gray-700">
                Number of Guests
              </label>
              <select
                id="guests"
                name="guests"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                value={formData.guests}
                onChange={handleChange}
                required
              >
                {[...Array(20).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Special Requests */}
            <div className="mb-3">
              <label htmlFor="specialRequests" className="block text-gray-700">
                Special Requests
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                placeholder="Any special requests..."
                rows="3"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                value={formData.specialRequests}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green text-white py-2 px-4 rounded w-full"
            >
              Make Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Book;
