import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";
import axios from "axios";

const Cards = ({ item }) => {
  const { name, image, price, _id, createdAt, recipe, eventLocation, category, eventDateTime } = item;
  const { user } = useContext(AuthContext);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, refetch] = useCart();

  const handleHeartClick = () => setIsHeartFilled((prev) => !prev);

  const handleAddToCart = async () => {
    if (user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        createdAt,
        quantity: 1,
        image,
        price,
        email: user.email,
      };
      try {
        const response = await axios.post(
          "http://localhost:6001/carts",
          cartItem
        );
        if (response) {
          refetch(); // Refetch cart
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Food added to the cart.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        const errorMessage =
          error.response?.data.message || "An error occurred";
        Swal.fire({
          position: "center",
          icon: "warning",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${isHeartFilled ? "text-rose-500" : "text-white"
          }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <figure>
        <img
          src={image}
          alt={name}
          className="hover:scale-105 transition-all duration-300 md:h-72"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p> {/* Display recipe */}
        <p className="text-gray-500 text-sm">
          Added On: {new Date(createdAt).toLocaleDateString()}
        </p> {/* Display createdAt */}
        <p className="text-gray-500 text-sm">
          Event Date Time: {new Date(eventDateTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, month: 'long', day: 'numeric', year: 'numeric' })}
        </p> {/* Display createdAt */}
        <p className="text-gray-700 text-sm font-medium">
          Location: {eventLocation}
        </p> {/* Display location */}
        {/* <p className="text-gray-700 text-sm font-medium">
          Category: {category}
        </p>  */}
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span> {price}
          </h5>
          <button onClick={handleAddToCart} className="btn bg-green text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
