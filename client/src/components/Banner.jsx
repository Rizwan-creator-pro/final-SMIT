import React from "react";
import bannerImg from "/images/home/1.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24">
      <div className="py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8">

        {/* img */}
        <div className="md:w-1/2">
          <img src={bannerImg} alt="" />
        </div>

        {/* texts */}
        <div className="md:w-1/2 px-4 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Step into a World of Seamless <span className="text-green">Events</span>
          </h2>
          <p className="text-xl">
            Where Every Detail Speaks of Innovation, Elegance, and Unforgettable Experiences.
          </p>
          <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
            <Link to="/menu">Explore Events</Link>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Banner;
