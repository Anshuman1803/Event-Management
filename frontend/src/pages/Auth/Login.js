import React, { useState } from 'react';
import styles from './auth.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('audience');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted', { email, password, userType });
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
            className={styles.radioInput}
            value="audience"
            checked={userType === 'audience'}
            onChange={(e) => setUserType(e.target.value)}
          />
          Audience
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            className={styles.radioInput}
            value="organizer"
            checked={userType === 'organizer'}
            onChange={(e) => setUserType(e.target.value)}
          />
          Organizer
        </label>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>Email:</label>
        <input
          type="email"
          id="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

      <button type="submit" className={styles.submitButton}>Login</button>
      <div className={styles.registerLink}>
        <p>New user? <Link to="/user/register">Register here</Link></p>
      </div>
    </form>
   </div>
  );
};

export default Login;