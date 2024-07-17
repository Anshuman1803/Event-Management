import React, { useState } from "react";
import styles from "./auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateUserData } from "../../redux/ReduxSlice";
import ButtonLoader from "../../components/buttonLoader/ButtonLoader";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const Login = () => {
  const [Loading, setLoading] = useState(false);
  const dispatchTo = useDispatch();
  const navigateTO = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    role: "audience",
  });
  // ! handle changes of the input fields
  const handleInputOnchange = (e) => {
    const { name, value } = e.target;
    const newValue = name !== "fullName" ? value.replace(/\s/g, "") : value;
    setUserDetails({
      ...userDetails,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${BACKEND_URL}auth/user/login`, userDetails)
      .then((response) => {
        if (response.data.success) {
          setLoading(false);
          toast.success(response.data.resMsg);
          dispatchTo(
            updateUserData({
              profile: response.data.UserDetails.profile,
              token: response.data.TOKEN,
              fullName: response.data.UserDetails.fullName,
              role: response.data.UserDetails.role,
              userID: response.data.UserDetails._id,
            })
          );
          navigateTO("/");
          setUserDetails({
            email: "",
            password: "",
            role: "audience",
          });
        } else {
          setLoading(false);
          toast.error(response.data.resMsg);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          if (error.response.status === 409) {
            toast(error.response.data.resMsg, {
              icon: "❗",
            });
          } else if (error.response.status === 500) {
            toast.error(error.response.data.resMsg);
          } else {
            toast.error("An unexpected error occurred. Please try again later.");
          }
        }
      });
  };

  const handleGoogleLogin = (e) => {
    // window.open(`http://localhost:5000/api/eventmanagement/v1/auth/google/callback`, "__self")
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>

        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              autoComplete="off"
              name="role"
              className={styles.radioInput}
              value="audience"
              checked={userDetails.role === "audience"}
              onChange={handleInputOnchange}
            />
            Audience
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              autoComplete="off"
              name="role"
              className={styles.radioInput}
              value="organizer"
              checked={userDetails.role === "organizer"}
              onChange={handleInputOnchange}
            />
            Organizer
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            name="email"
            value={userDetails.email}
            onChange={handleInputOnchange}
            autoComplete="off"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password:
          </label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={styles.input}
              name="password"
              value={userDetails.password}
              autoComplete="off"
              onChange={handleInputOnchange}
              required
            />
            <button type="button" className={styles.togglePassword} onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button type="submit" className={`${styles.submitButton} ${Loading && "Unactive"}`}>
          {Loading ? <ButtonLoader /> : "Login"}
        </button>
        <div className={`${styles.registerLink} ${Loading && "Unactive"}`}>
          <p>
            New user? <Link to="/user/register">Register here</Link>
          </p>
        </div>

        <button className={styles.googleButton} onClick={handleGoogleLogin}>
          <svg className={styles.googleIcon} width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <g fill="#000" fillRule="evenodd">
              <path
                d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
                fill="#EA4335"
              />
              <path
                d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                fill="#4285F4"
              />
              <path
                d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
                fill="#FBBC05"
              />
              <path
                d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
                fill="#34A853"
              />
            </g>
          </svg>
          <span className={styles.buttonText}>Continue with google</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
