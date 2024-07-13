import React, { useState } from 'react';
import styles from './auth.module.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    userName: "",
    fullName: "",
    password: "",
    showPassword: "",
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
            autoComplete='off'
            id="email"
            name='email'
            className={styles.input}
            value={userDetails.email}
            onChange={handleInputOnchange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="userName" className={styles.label}>Username:</label>
          <input
            type="text"
            autoComplete='off'
            id="userName"
            name='userName'
            className={styles.input}
            value={userDetails.userName}
            onChange={handleInputOnchange}
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
              autoComplete='off'
              id="password"
              name='password'
              className={styles.input}
              value={userDetails.password}
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
        <button type="submit" className={`${styles.submitButton}`}>Register</button>
        <div className={styles.registerLink}>
          <p>Already have an account?  <Link to="/user/login">Login here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;