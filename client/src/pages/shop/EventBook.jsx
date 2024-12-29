import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const EventBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    eventDescription: "",
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

    // Form validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      !formData.guests ||
      !formData.eventDescription
    ) {
      Swal.fire({
        title: "Error!",
        text: "All fields except special requests are required.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:6001/api/event-booking",
        formData
      );
      Swal.fire({
        title: "Success!",
        text: "Your event booking was successful!",
        icon: "success",
        confirmButtonText: "OK",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 1,
        eventDescription: "",
        specialRequests: "",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to book the event. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="mt-10 mb-10 text-black">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mt-10 mx-5">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Book Your <span className="text-green">Event</span>
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Your Email"
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Your Phone Number"
                required
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <label className="block text-gray-700">Event Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </div>

            {/* Time */}
            <div className="mb-4">
              <label className="block text-gray-700">Event Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </div>

            {/* Guests */}
            <div className="mb-4">
              <label className="block text-gray-700">Number of Guests</label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                min="1"
                max="1000"
                required
              />
            </div>

            {/* Event Description */}
            <div className="mb-4">
              <label className="block text-gray-700">Event Description</label>
              <input
                type="text"
                name="eventDescription"
                value={formData.eventDescription}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Wedding, Birthday, etc."
                required
              />
            </div>

            {/* Special Requests */}
            <div className="mb-4">
              <label className="block text-gray-700">Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Any special requirements"
                rows="3"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green text-white py-2 px-4 rounded w-full"
            >
              Book Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventBooking;
