import React from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <section className={styles.contact}>
      <h2 className={styles.title}>Contact</h2>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Phone</h3>
          <p className={styles.cardContent}>+7 (499) 350-66-04</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Socials</h3>
          <div className={styles.socials}>
            <div className={styles.icon}><svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.5 0H9.5C4.27546 0 0 4.27361 0 9.5V28.5C0 33.7245 4.27546 38 9.5 38H28.5C33.7245 38 38 33.7245 38 28.5V9.5C38 4.27361 33.7245 0 28.5 0ZM19 26.9164C14.6271 26.9164 11.0832 23.3709 11.0832 19C11.0832 14.6271 14.6271 11.0832 19 11.0832C23.3709 11.0832 26.9168 14.6271 26.9168 19C26.9168 23.3709 23.3709 26.9164 19 26.9164ZM29.2918 11.0832C27.9789 11.0832 26.9168 10.0196 26.9168 8.70818C26.9168 7.39673 27.9789 6.33318 29.2918 6.33318C30.6047 6.33318 31.6668 7.39673 31.6668 8.70818C31.6668 10.0196 30.6047 11.0832 29.2918 11.0832Z" fill="#282828"/>
</svg>
</div>
            <div className={styles.icon}><svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.2793 3C11.8027 3 3.2793 11.5228 3.2793 22C3.2793 25.6862 4.3363 29.24 6.34268 32.3263L3.38197 39.2348C3.17786 39.7098 3.28424 40.2628 3.65039 40.6289C3.89284 40.8714 4.21693 41 4.54596 41C4.71419 41 4.88428 40.9666 5.04508 40.8973L11.9536 37.936C15.0393 39.9436 18.5931 41 22.2793 41C32.7565 41 41.2793 32.4772 41.2793 22C41.2793 11.5228 32.7565 3 22.2793 3ZM32.0316 28.8009C32.0316 28.8009 30.452 30.8271 29.3103 31.3008C26.4083 32.502 22.3115 31.3008 17.6443 26.635C12.9785 21.9678 11.7767 17.871 12.9785 14.969C13.4522 13.826 15.4784 12.2477 15.4784 12.2477C16.0276 11.8197 16.8811 11.8729 17.3734 12.3652L19.6656 14.6573C20.1579 15.1496 20.1579 15.9561 19.6656 16.4484L18.227 17.8858C18.227 17.8858 17.6443 19.6349 21.1437 23.1355C24.6432 26.635 26.3935 26.0523 26.3935 26.0523L27.8309 24.6137C28.3232 24.1214 29.1297 24.1214 29.622 24.6137L31.9141 26.9059C32.4064 27.3982 32.4596 28.2505 32.0316 28.8009Z" fill="#282828"/>
</svg>
</div>
          </div>
        </div>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Address</h3>
          <p className={styles.cardContent}>Dubininskaya Ulitsa, 96, Moscow, Russia, 115093</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Working Hours</h3>
          <p className={styles.cardContent}>24 hours a day</p>
        </div>
      </div>
      <div className={styles.map}></div>
    </section>
  );
};

export default Contact;
