// RegistrationTable.js
import React from 'react';
import styles from './registerduser.module.css';
import {CalculateTimeAgo} from "../../utility/TimeAgo"

const RegisteredUser = ({ registrations }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Registered At</th>
            <th>Total Tickets</th>
            <th>Amount $</th>
          </tr>
        </thead>
        <tbody>
          {registrations?.map((registration, index) => (
            <tr key={index}>
              <td data-label="S.No.">{index + 1}</td>
              <td data-label="Name">{registration.fullName}</td>
              <td data-label="Email">{registration.email}</td>
              <td data-label="Phone">{registration.phone}</td>
              <td data-label="Registered At"><CalculateTimeAgo time={registration.PurchaseDate}/> ago </td>
              <td data-label="Total Tickets">{registration.QuantityofTickets}</td>
              <td data-label="Amount $">{registration.TotalPricePaid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredUser;
