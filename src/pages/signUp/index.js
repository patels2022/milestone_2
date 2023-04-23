import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../login/login.css";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function SignUp() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      await updateProfile(auth.currentUser, {
        displayName: `${userData.firstName} ${userData.lastName}`,
      });
      if (userCredential.user) {
        sessionStorage.setItem("user", userCredential.user.email);
        sessionStorage.setItem(
          "userDetail",
          JSON.stringify(userCredential.user)
        );
        window.location.href = "/";
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <div className="login-box">
        <h2 className="login-heading">Create a new account</h2>
        <form onSubmit={handleSignUp}>
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="firstName"
            value={userData.firstName}
            onChange={handleFormData}
            required
          />
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="lastName"
            value={userData.lastName}
            onChange={handleFormData}
            required
          />
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="email"
            value={userData.email}
            onChange={handleFormData}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={userData.password}
            onChange={handleFormData}
            required
          />
          <input type="submit" value="Sign Up" />
        </form>
        <NavLink to="/login">Already have an account!</NavLink>
      </div>
    </div>
  );
}
