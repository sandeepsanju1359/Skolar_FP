// SignIn.js

import React, { useState } from "react";
import axios from "axios";
import Dashboard from "../Dashbard/Dashboard"; // Import the Dashboard component
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleNewUserClick = () => {
    setShowNewUser(!showNewUser);
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
      setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 404) {
        alert("Invalid username or password"); // Display alert for invalid details
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {/* Conditionally render the Dashboard component if user is logged in */}
      {isLoggedIn ? (
        <Dashboard />
      ) : (
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
                  <h2 className="title">Login</h2>
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
                    {showNewUser ? "Register" : "Login"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
