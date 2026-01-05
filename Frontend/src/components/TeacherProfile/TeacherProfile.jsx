import React, { useContext, useState } from "react";
import "./TeacherProfile.css";
import { assets } from "../../assets/frontendImages";
import axios from "axios";
// import Auth from "../Auth/Auth";
import { AuthContext } from "../../context/AuthContext";

const TeacherProfile = () => {

  const {url}=useContext(AuthContext)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    qualification: "",
    subject: "",
    experience: "",
    bio: "",
    price: "",
    mode: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const API_URL =`${url}/api/teacher/create`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("qualification", formData.qualification);
      data.append("experience", formData.experience);
      data.append("bio", formData.bio);
      data.append("price", formData.price);
      data.append("mode", formData.mode);

      // backend expects ARRAY for subjects
      data.append("subjects[]", formData.subject);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await axios.post(API_URL, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        alert("🎉 Teacher profile created successfully!");
        setFormData({
          name: "",
          email: "",
          qualification: "",
          subject: "",
          experience: "",
          bio: "",
          price: "",
          mode: "",
          image: null,
        });
        setPreview(null);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create profile");
    }
  };

  return (
    <div className="teacher-profile-container">
      <h2>Join LearnHub as a Teacher</h2>
      <p>Create your teaching profile and start mentoring students</p>

      {/* Image Upload */}
      <div className="image-upload">
        <img
          src={preview || assets.upload_image}
          alt="Profile"
          className="profile-preview"
        />

        <label className="upload-btn">
          Upload Photo
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
      </div>

      <form className="teacher-profile-form" onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Qualification" required />
        <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject Expertise" required />
        <input name="experience" type="number" value={formData.experience} onChange={handleChange} placeholder="Experience" required />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price per session" required />

        <select name="mode" value={formData.mode} onChange={handleChange} required>
          <option value="">Select Mode</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Both">Both</option>
        </select>

        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Short bio" required />

        <button type="submit" className="submit-btn">
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default TeacherProfile;
