import React, { useState, useEffect } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import styles from "./page.module.css";
import ButtonLoader from "../buttonLoader/ButtonLoader";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const EventRegistration = ({ CbCancle, ticketPrice, eventID }) => {
  const { userID } = useSelector((state) => state.EventManagement);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isNaN(quantity)) {
      setTotalPrice(quantity * ticketPrice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity > 5) {
      toast.error(`From one account you can buy only 5 tickets`);
    } else if (isNaN(phone) || phone.length < 10 || phone.length > 10) {
      toast.error(`Invalid phone number`);
    } else {
      setLoading(true);
      axios
        .post(`${BACKEND_URL}events/register-for-event`, {
          UserID: userID,
          phone: phone,
          EventID: eventID,
          QuantityofTickets: quantity,
          TotalPricePaid: totalPrice,
        })
        .then((response) => {
          if (response.data.success) {
            setLoading(false);
            toast.success(response.data.resMsg);
          } else {
            toast.error(response.data.resMsg);
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.registrationForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input
            autoComplete="off"
            type="tel"
            id="phone"
            name="phone"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
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
          <p className={styles.price}>
            <AiFillDollarCircle />
            {ticketPrice.toFixed(2)} per ticket
          </p>
        </div>
        <div className={styles.__eventTicketPriceBox}>
          <span>Total Price</span>
          <p className={styles.totalPrice}>
            {" "}
            <AiFillDollarCircle />
            {totalPrice.toFixed(2)}
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <button type="button" className={styles.backBtn} onClick={() => CbCancle(false)}>
            Cancle
          </button>
          <button type="submit" className={styles.submitBtn}>
            {loading ? <ButtonLoader /> : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventRegistration;
