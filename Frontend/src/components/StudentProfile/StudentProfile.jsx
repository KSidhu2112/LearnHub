import React, { useContext, useState } from "react";
import "./StudentProfile.css";
import { assets } from "../../assets/frontendImages";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const StudentProfile = () => {
    const {url}=useContext(AuthContext)
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    interests: "",
    goal: "",
    image: null,
    imagePreview: "",
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  // ✅ Handle form submit (POST to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", profile.name);
      formData.append("email", profile.email);
      formData.append("phone", profile.phone);
      formData.append("education", profile.education);
      formData.append("skills", profile.skills);
      formData.append("interests", profile.interests);
      formData.append("goal", profile.goal);
      formData.append("image", profile.image);

      const res = await axios.post(
        `${url}/api/student/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert("🎉 Profile created successfully!");

        // Optional: Reset form
        setProfile({
          name: "",
          email: "",
          phone: "",
          education: "",
          skills: "",
          interests: "",
          goal: "",
          image: null,
          imagePreview: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create profile");
    }
  };

  return (
    <div className="student-profile-container">
      <h2>Join LearnHub as a Student</h2>
      <p>Create your profile to explore courses and mentors</p>

      {/* Profile Image Upload */}
      <div className="image-upload">
        <img
          src={profile.imagePreview || assets.upload_image}
          alt="Profile Preview"
          className="profile-preview"
        />

        <label className="upload-btn">
          Upload Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </label>
      </div>

      {/* Profile Form */}
      <form className="student-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={profile.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Education</label>
          <input
            type="text"
            name="education"
            placeholder="Eg: B.Tech, BSc, Diploma"
            value={profile.education}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Skills</label>
          <input
            type="text"
            name="skills"
            placeholder="Eg: Java, React, Python"
            value={profile.skills}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Interests</label>
          <input
            type="text"
            name="interests"
            placeholder="Eg: Web Development, AI"
            value={profile.interests}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label>Career Goal</label>
          <textarea
            name="goal"
            placeholder="What do you want to achieve with LearnHub?"
            value={profile.goal}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <button type="submit" className="submit-btn">
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;
