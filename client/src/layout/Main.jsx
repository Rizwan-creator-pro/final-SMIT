import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../../src/App.css";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import { useDarkMode } from "../contexts/DarkModeContext"; // Import useDarkMode

const Main = () => {
  const { loading } = useContext(AuthContext);
  const { darkMode } = useDarkMode(); // Access dark mode state

  return (
    <div
      className={`${darkMode ? "dark bg-gray-900" : "bg-prigmayBG"
        } text-base-content`}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Navbar />
          <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            <Outlet />
          </div>
          <Footer className="bg-white dark:bg-gray-900 text-black dark:text-white" />
        </div>
      )}
    </div>
  );
};

export default Main;
