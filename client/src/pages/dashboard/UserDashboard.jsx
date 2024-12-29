import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // For confirmation dialogs
import { FaTrashAlt } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import axiosSecure from "../../hooks/useAxiosSecure"; // Assuming you use axiosSecure for protected API calls

const UserDashboard = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");

  // Fetch orders
  const { refetch: refetchOrders, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:6001/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  // Fetch reservations
  const { refetch: refetchReservations, data: reservations = [] } = useQuery({
    queryKey: ["reservations", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:6001/reservation?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Format time to 12-hour format
  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(":");
    const hourIn12 = hour % 12 || 12; // Converts 0 to 12
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${hourIn12}:${minute} ${ampm}`;
  };

  // Handle cancellation (generic for orders, reservations, events)
  const handleCancel = async (id, type) => {
    const result = await Swal.fire({
      title: "Cancel",
      text: "Enter your cancellation reason:",
      input: "text",
      inputPlaceholder: "Enter your reason here...",
      showCancelButton: true,
      confirmButtonText: "Submit",
    });

    if (result.isConfirmed) {
      setCancelMessage(result.value);

      const endpoint =
        type === "order"
          ? `/cancel-order/${id}`
          : type === "reservation"
            ? `/cancel-reservation/${id}`
            : `/cancel-event/${id}`;

      await fetch(`http://localhost:6001${endpoint}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: cancelMessage }),
      });

      Swal.fire(
        "Canceled!",
        "Your cancellation has been processed.",
        "success"
      );
      refetchOrders();
      refetchReservations();
      // refetchEvents(); // Uncomment if you have a fetch for events
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 my-10">
      {/* User Information */}
      <div className="py-12">
        <h2 className="text-3xl font-bold">User Dashboard</h2>
        <p>Name: {user?.displayName}</p>
        <p>Email: {user?.email}</p>
        <p>User ID: {user?.uid}</p>
      </div>

      {/* Orders Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Your Event Registrations</h3>
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-green text-white">
                <tr>
                  <th>#</th>
                  <th>Reg Date</th>
                  <th>Transaction Id</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td>{item.transactionId}</td>
                    <td>${item.price}</td>
                    <td>{item.status}</td>
                    <td>
                      <Link
                        to="/contact-us"
                        className="btn btn-sm bg-green text-white ml-2"
                      >
                        Contact Us
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>

      {/* Reservations Section */}
      {/* <div className="mt-8 mb-8">
        <h3 className="text-xl font-semibold">Reservations</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            <thead className="bg-green text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr key={reservation._id}>
                  <th>{index + 1}</th>
                  <td>{reservation.name}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.phone}</td>
                  <td>{formatDate(reservation.date)}</td>
                  <td>{formatTime(reservation.time)}</td>{" "}
                  {/* Use formatTime here */}
      {/* <td>{reservation.guests}</td>
                  <td>{reservation.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
    //     </div> */}
    </div>
    // </div>
  );
};

export default UserDashboard;
