import React from 'react';
import styles from './home.module.css';
const Home = () => {
  return (
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Create Unforgettable Events</h1>
          <p className={styles.heroText}>
            Welcome to our Event Management System. Plan, organize, and execute 
            extraordinary events with ease. From conferences to concerts, we've 
            got you covered.
          </p>
          <button className={styles.ctaButton}>Get Started</button>
        </div>
      </section>
  );
};

export default Home;