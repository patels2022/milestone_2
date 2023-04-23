import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./login.css";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [userData, setUserData] = useState({ userName: "", password: "" });

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userData.userName, userData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        sessionStorage.setItem("user", user.email);
        sessionStorage.setItem("userDetail", JSON.stringify(user));
        window.location.href = "/";
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="userName"
            value={userData?.userName}
            onChange={handleFormData}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={userData?.password}
            onChange={handleFormData}
            required
          />
          <input type="submit" value="Login" />
        </form>
        <NavLink to="/sign-up">Create new account</NavLink>
      </div>
    </div>
  );
}
