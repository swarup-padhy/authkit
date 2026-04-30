import React from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

export default function Button({
  children,
  type = 'button',
  variant = 'primary', // primary, outline, ghost
  loading = false,
  disabled = false,
  onClick,
  style,
  testId
}) {
  let className = `${styles.btn} ${styles[variant]}`;
  if (disabled || loading) {
    className += ` ${styles.disabled}`;
  }

  return (
    <motion.button
      type={type}
      className={className}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
      whileHover={!(disabled || loading) ? {} : {}}
      whileTap={!(disabled || loading) ? { scale: 0.97 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      layout="position"
      data-testid={testId}
    >
      {loading && <span className={styles.spinner} />}
      {children}
    </motion.button>
  );
}
