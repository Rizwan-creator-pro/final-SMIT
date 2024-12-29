import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext); // Get the current user from context
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(user.photoURL || ""); // Initialize with current user photoURL
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imgbbAPIKey = import.meta.env.VITE_IMAGE_HOSTING_KEY; // Use import.meta.env for Vite

  // Function to upload the file to imgbb and get its URL
  const uploadPhotoToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );
      return response.data.data.url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw new Error("Image upload failed");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const name = data.name;
    const file = data.photoURL?.[0]; // Get the selected file

    try {
      let photoURL = "";
      // 1. Upload photo to imgbb if a file is selected
      if (file) {
        // Check if the uploaded file is an image
        const fileType = file.type.split("/")[0];
        if (fileType !== "image") {
          alert("Please upload a valid image file.");
          setLoading(false);
          return;
        }
        photoURL = await uploadPhotoToImgbb(file);
        setImagePreview(photoURL); // Update image preview with the new URL
      }

      // 2. Update user profile (name and photoURL)
      await updateUserProfile(name, photoURL); // Assuming this updates the auth profile
      // Update the local state for image preview to reflect the change immediately
      if (photoURL) {
        setImagePreview(photoURL); // Update the preview with the new image
      }

      // Optionally, send this data to your backend API
      await axios.put("http://localhost:6001/api/update-profile", {
        name,
        photoURL,
      });

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen max-w-md mx-auto flex items-center justify-center">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              defaultValue={user.name} // Set default value to current user's name
              {...register("name", { required: true })}
              placeholder="Your name"
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              type="file"
              accept="image/*" // Limit file selection to images
              {...register("photoURL")}
              className="file-input w-full mt-1"
            />
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value={loading ? "Updating..." : "Update"}
              className="btn bg-green text-white"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
