import React, { useContext, useState } from "react";
import "./Auth.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Auth = ({ setLogin }) => {
  const [state, setState] = useState("signup");
  const { setToken } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpass, setConpass] = useState("");

  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state === "signup" && password !== conpass) {
      alert("Passwords are not matching!");
      return;
    }

    try {
      const url =
        state === "signup"
          ? "http://localhost:5000/api/user/register"
          : "http://localhost:5000/api/user/login";

      const body =
        state === "signup"
          ? { name, email, password }
          : { email, password };

      const res = await axios.post(url, body);

      if (res.data.success) {
        
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setLogin(false);
        alert("Authentication Successful");
        if(state==="signup"){
          navigate("/profile");
        }
        else{
          navigate("/")
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Server Error");
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <div className="auth-close">
          <span onClick={() => setLogin(false)}>✕</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h3 className="auth-title">
            {state === "signup" ? "Sign Up" : "Login"}
          </h3>

          {state === "signup" && (
            <input
              className="auth-input"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            className="auth-input"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {state === "signup" && (
            <input
              className="auth-input"
              type="password"
              placeholder="Confirm Password"
              value={conpass}
              onChange={(e) => setConpass(e.target.value)}
              required
            />
          )}

          <button className="auth-submit" type="submit">
            {state === "signup" ? "Sign Up" : "Login"}
          </button>

          <p className="auth-switch">
            {state === "signup" ? (
              <>
                Already have an account?
                <span onClick={() => setState("login")}> Login</span>
              </>
            ) : (
              <>
                Don’t have an account?
                <span onClick={() => setState("signup")}> Sign Up</span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
