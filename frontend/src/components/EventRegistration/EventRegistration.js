import React, { useState, useEffect } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import styles from "./page.module.css";

const EventRegistration = ({CbCancle}) => {
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
        <div className={styles.__eventTicketPriceBox}>
          <span>Ticket Price</span>
          <p className={styles.price}><AiFillDollarCircle/>{ticketPrice.toFixed(2)} per ticket</p>
        </div>
        <div className={styles.__eventTicketPriceBox}>
          <span>Total Price</span>
          <p className={styles.totalPrice}> <AiFillDollarCircle/>{totalPrice.toFixed(2)}</p>
        </div>
        <div className={styles.buttonContainer} >
          <button type="button" className={styles.backBtn} onClick={()=>CbCancle(false)}>
            Cancle
          </button>
          <button type="submit" className={styles.submitBtn}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventRegistration;
