import React, { useState } from 'react';
import styles from './auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import ButtonLoader from '../../components/buttonLoader/ButtonLoader';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const Register = () => {
  const navigateTO = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    fullName: "",
    password: "",
    role: "audience",
  })

  // ! handle changes of the input fields
  const handleInputOnchange = (e) => {
    const { name, value } = e.target;
    const newValue = name !== 'fullName' ? value.replace(/\s/g, '') : value;
    setUserDetails({
      ...userDetails,
      [name]: newValue,
    });
  }

  // ! Register logic
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    axios.post(`${BACKEND_URL}auth/user/register`, userDetails).then((response) => {
      if (response.data.success) {
        setLoading(false)
        toast.success(response.data.resMsg);
        navigateTO("/user/login")
        setUserDetails({
          email: "",
          fullName: "",
          password: "",
          role: "audience",
        });
      } else {
        setLoading(false)
        toast.error(response.data.resMsg);
      }
    }).catch((error) => {
      setLoading(false)
      if (error.response) {
        if (error.response.status === 409) {
          toast(error.response.data.resMsg, {
            icon: '❗',
          });
        } else if (error.response.status === 500) {
          toast.error(error.response.data.resMsg);
        } else {
          toast.error('An unexpected error occurred. Please try again later.');
        }
      }
    })
    // Handle registration logic here
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Register</h2>

        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              autoComplete='off'
              name='role'
              className={styles.radioInput}
              value="audience"
              checked={userDetails.role === 'audience'}
              onChange={handleInputOnchange}
            />
            Audience
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              autoComplete='off'
              name='role'
              className={styles.radioInput}
              value="organizer"
              checked={userDetails.role === 'organizer'}
              onChange={handleInputOnchange}
            />
            Organizer
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name='email'
            className={styles.input}
            value={userDetails.email}
            onChange={handleInputOnchange}
            autoComplete='off'
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="fullName" className={styles.label}>Full Name:</label>
          <input
            type="text"
            autoComplete='off'
            id="fullName"
            name='fullName'
            className={styles.input}
            value={userDetails.fullName}
            onChange={handleInputOnchange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={styles.input}
              name='password'
              value={userDetails.password}
              autoComplete='off'
              onChange={handleInputOnchange}
              required
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit" className={`${styles.submitButton} ${Loading && "Unactive"}`}>
          {
            Loading ? <ButtonLoader /> : "Register"
          }
        </button>
        <div className={`${styles.registerLink} ${Loading && "Unactive"}`}>
          <p>Already have an account?  <Link to="/user/login">Login here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;