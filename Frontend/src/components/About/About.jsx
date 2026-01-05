import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Header */}
      <section className="about-header">
        <h1 className="about-title">About <span>LearnHub</span></h1>
        <p className="about-subtitle">
          LearnHub is your trusted platform for smart learning — connecting
          students and tutors for a seamless learning experience.
        </p>
      </section>

      {/* Main Content */}
      <section className="about-main">
        <div className="about-text">
          <h2>Empowering Students Through Smart Learning</h2>
          <p>
            At <strong>LearnHub</strong>, we believe that education should be
            accessible, flexible, and tailored to individual learning goals.  
            Our platform helps students book personalized sessions with verified
            tutors, access interactive resources, and track their academic progress.
          </p>

          <div className="about-section">
            <h3>🎯 Our Mission</h3>
            <p>
              To make quality education accessible to every student by bridging
              the gap between learners and skilled educators.
            </p>
          </div>

          <div className="about-section">
            <h3>🌐 Our Vision</h3>
            <p>
              To build the most trusted and student-friendly digital platform
              where learners can grow academically and professionally.
            </p>
          </div>

          <div className="about-section">
            <h3>🚀 Why Choose LearnHub?</h3>
            <ul>
              <li>Simple and user-friendly booking system</li>
              <li>Verified tutors across multiple domains</li>
              <li>Secure payment options and transparent pricing</li>
              <li>Personalized dashboard for students & tutors</li>
              <li>24/7 support and feedback system</li>
            </ul>
          </div>

          <a href="/register" className="about-btn">Join LearnHub Today</a>
        </div>

        <div className="about-image">
          {/* <img src={aboutImg} alt="About LearnHub" /> */}
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="stat-card">
          <h4>10K+</h4>
          <p>Active Students</p>
        </div>
        <div className="stat-card">
          <h4>1.2K+</h4>
          <p>Verified Tutors</p>
        </div>
        <div className="stat-card">
          <h4>500+</h4>
          <p>Courses Offered</p>
        </div>
      </section>
    </div>
  );
};

export default About;
