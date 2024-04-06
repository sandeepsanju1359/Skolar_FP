// SignIn.js

import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import bg from "./bg.svg";
import wave from "./wave.png";
import avtar from "./avatar.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const [showNewUser, setShowNewUser] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formTitle, setFormTitle] = useState("Login"); // Initially set the form title to "Login"

  const handleNewUserClick = () => {
    setShowNewUser(!showNewUser);
    // Change the form title when switching between login and sign up modes
    setFormTitle(showNewUser ? "Login" : "Sign Up");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/signup", {
        username,
        password,
      });
      alert(response.data.message);
      // Clear input fields after successful registration
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      // Show the login form
      setShowNewUser(false);
      // Change the form title back to "Login"
      setFormTitle("Login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/signin", {
        username,
        password,
      });
      alert(response.data.message);
      // Clear input fields after successful login
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 404) {
        alert("Invalid username or password"); // Display alert for invalid details
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="card">
      <div>
        <img className="wave" src={wave} alt="wave" />
        <div className="container">
          <div className="img">
            <img src={bg} alt="background" />
          </div>
          <div className="login-content">
            <form>
              <img src={avtar} alt="avatar" />
              <h2 className="title">{formTitle}</h2>{" "}
              {/* Dynamically render the form title */}
              <div className="input-div one">
                <div className="i">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="div">
                  <input
                    type="text"
                    className="input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <div className="div">
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {showNewUser && (
                <div className="input-div pass">
                  <div className="i">
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                  <div className="div">
                    <input
                      type="password"
                      className="input"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              )}
              <a href="#" onClick={handleNewUserClick}>
                {showNewUser ? "Already User?" : "New User?"}
              </a>
              <button
                className="btn"
                onClick={showNewUser ? handleSignUp : handleSignIn}
              >
                {showNewUser ? "Sign Up" : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
