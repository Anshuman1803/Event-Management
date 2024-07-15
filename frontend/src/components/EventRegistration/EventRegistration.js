import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

const EventRegistration = () => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const ticketPrice = 50; // Set the ticket price here

  useEffect(() => {
    setTotalPrice(quantity * ticketPrice);
  }, [quantity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Event Registration</h1>
      <form className={styles.registrationForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Full Name</label>
          <input autoComplete="off" type="text" id="fullName" name="fullName" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input autoComplete="off" type="email" id="email" name="email" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input autoComplete="off" type="tel" id="phone" name="phone" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="quantity">Quantity</label>
          <input
            autoComplete="off"
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="5"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <span>Total Price</span>
          <p className={styles.totalPrice}>{totalPrice.toFixed(2)}</p>
        </div>
        <button type="submit" className={styles.submitBtn}>
          Register
        </button>
      </form>
    </div>
  );
};

export default EventRegistration;
