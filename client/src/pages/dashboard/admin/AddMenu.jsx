import React from "react";
import { FaPlus, FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddMenu = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // image hosting key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

  const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (hostingImg.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        eventLocation: data.eventLocation,
        eventDateTime: data.eventDateTime, // Include the event date and time
        image: hostingImg.data.data.display_url,
      };
      const postMenuItem = await axiosSecure.post("/menu", menuItem);
      if (postMenuItem) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Item is inserted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Create A New <span className="text-green">Event</span>
      </h2>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Event Title*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Title"
              className="input input-bordered w-full"
            />
          </div>

          {/* 2nd row */}
          <div className="flex items-center gap-4">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue="default"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Tech</option>
                <option value="pizza">Music</option>
                <option value="soup">Sports</option>
                <option value="dessert">Party</option>
                <option value="drinks">Islamic</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Event Date and Time */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Event Date and Time*</span>
            </label>
            <input
              type="datetime-local"
              {...register("eventDateTime", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Event Location */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Event Location*</span>
            </label>
            <input
              {...register("eventLocation", { required: true })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Location"
            />
          </div>

          {/* Event Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Event Description</span>
            </label>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Tell the world about your Event"
            ></textarea>
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-green text-white px-6">
            Add Event <FaPlus />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
