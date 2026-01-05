import React from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate=useNavigate();
  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Left Text Area */}
        <div className="hero-text">
          <h1 className="hero-title">
            Empower Your <span>Learning Journey</span> with LearnHub
          </h1>
          <p className="hero-subtitle">
            Book expert tutors, explore personalized courses, and take the next
            step toward your success — all in one platform designed for students.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">
              Students Available
            </button>
            <button href="/courses" className="btn-secondary">
              Tutors Available
            </button>
          </div>
        </div>

        {/* Right Image Area */}
        <div className="hero-image">
          {/* <img src={heroImg} alt="LearnHub Hero" /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
