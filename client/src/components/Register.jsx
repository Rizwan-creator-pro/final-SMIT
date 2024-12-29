import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordToastShown, setPasswordToastShown] = useState(false); // State to track toast display
  const { signUpWithGmail, createUser, updateUserProfile } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const validateStrongPassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const onSubmit = (data) => {
    const { email, password, photoURL, name } = data;

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateUserProfile(name, photoURL)
          .then(() => {
            const userInfor = {
              name: data.name,
              email: data.email,
            };

            axiosPublic
              .post("/users", userInfor)
              .then((response) => {
                toast.success("Registration successful!");
                navigate(from, { replace: true });
              })
              .catch((error) => {
                console.error("Axios error:", error);
                toast.error("Registration failed. Please try again.");
              });
          })
          .catch((error) => {
            console.error("Profile update error:", error);
            toast.error("Failed to update profile.");
          });
      })
      .catch((error) => {
        console.error("Create user error:", error);
        if (error.code === "auth/email-already-in-use") {
          toast.error("This email is already registered. Please sign in.");
        } else {
          toast.error("Signup failed. Please check your credentials.");
        }
      });
  };

  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: user.displayName,
          email: user.email,
        };

        axiosPublic
          .post("/users", userInfor)
          .then((response) => {
            toast.success("Signin successful!");
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.error("Axios error:", error);
            if (error.response?.status === 409) {
              toast.error("This email is already registered. Please sign in.");
            } else {
              toast.error("Registration failed. Please try again.");
            }
          });
      })
      .catch((error) => {
        console.error("Google sign up error:", error);
        if (error.code === "auth/email-already-in-use") {
          toast.error("This email is already registered. Please sign in.");
        } else {
          toast.error("Google signup failed. Please try again.");
        }
      });
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action mt-0 flex flex-col justify-center">
        <form
          className="card-body"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="font-bold text-lg">Create An Account!</h3>

          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="input input-bordered w-full md:w-96 py-3"
              required
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red text-sm mt-2">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="input input-bordered w-full md:w-96 py-3"
              required
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red text-sm mt-2">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="input input-bordered w-full md:w-96 py-3"
              required
              {...register("password", {
                required: "Password is required",
                validate: (value) => {
                  if (!validateStrongPassword(value)) {
                    if (!passwordToastShown) {
                      // Show toast only once
                      toast.error(
                        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                      );
                      setPasswordToastShown(true); // Set to true to prevent further toasts
                    }
                    return "Invalid password"; // Return an error message to display below the input
                  }
                  setPasswordToastShown(false); // Reset when valid
                  return true; // Valid password
                },
              })}
            />
            {errors.password && (
              <p className="text-red text-sm mt-2">{errors.password.message}</p>
            )}
          </div>

          {/* Register Button */}
          <div className="form-control mt-4">
            <input
              type="submit"
              value="Register"
              className="btn bg-green text-white w-full md:w-96 py-3"
            />
          </div>

          <p className="text-center my-2">
            Have an account?{" "}
            <Link className="underline text-red ml-1" to="/login">
              Login
            </Link>{" "}
          </p>

          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>

        {/* Social Sign In */}
        <div className="text-center space-x-3 mb-5">
          <button
            className="btn btn-circle hover:bg-green hover:text-white"
            onClick={handleRegister}
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
      {/* Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default Register;
