import React from 'react';
import styles from './StarBackground.module.css';

export default function StarBackground() {
  return (
    <div className={styles.starsContainer}>
      <div className={styles.stars}></div>
      <div className={styles.stars2}></div>
      <div className={styles.stars3}></div>
    </div>
  );
}
