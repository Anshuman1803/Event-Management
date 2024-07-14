//  CreateEvent
import React, { useState } from 'react';
import styles from './organizer.module.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const CreateEvent = () => {
  const { userID } = useSelector((state) => state.EventManagement);
  const [eventData, setEventData] = useState({
    organizer: userID,
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    ticketPrice: '',
    ticketQuantity: '',
    isPrivate: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BACKEND_URL}events/create-new-events`, eventData).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Create New Event</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label htmlFor="title" className={styles.label}>Event Title</label>
          <input
            required
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            autoComplete='off'
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="description" className={styles.label}>Description</label>
          <textarea
            required
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            autoComplete='off'
            className={styles.textarea}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="date" className={styles.label}>Date</label>
          <input
            required
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            autoComplete='off'
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="time" className={styles.label}>Time</label>
          <input
            required
            type="time"
            id="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
            autoComplete='off'
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="location" className={styles.label}>Location</label>
          <input
            required
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            autoComplete='off'
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="ticketPrice" className={styles.label}>Ticket Price</label>
          <input
            required
            type="number"
            id="ticketPrice"
            name="ticketPrice"
            value={eventData.ticketPrice}
            onChange={handleChange}
            autoComplete='off'
            min="0"
            step="1"
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="ticketQuantity" className={styles.label}>Ticket Quantity</label>
          <input
            required
            type="number"
            id="ticketQuantity"
            name="ticketQuantity"
            value={eventData.ticketQuantity}
            onChange={handleChange}
            autoComplete='off'
            min="1"
            step="1"
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="isPrivate"
              checked={eventData.isPrivate}
              onChange={handleChange}
              autoComplete='off'
              className={styles.checkbox}
            />
            Private Event
          </label>
        </div>

        <button type="submit" className={`${styles.submitButton}`}>
          Create Event
        </button>
      </form>
    </section>
  );
};

export default CreateEvent;