import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Input.module.css';

export default function Input({
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  isValid,
  autoComplete,
  autoFocus,
  inputStyle,
  rightElement,
  testId
}) {
  let inputClassName = styles.input;
  if (error) {
    inputClassName += ` ${styles.invalid}`;
  } else if (isValid) {
    inputClassName += ` ${styles.valid}`;
  }

  const errorId = `${id}-error`;

  return (
    <div className={styles.formGroup}>
      {/* Screen reader only label for accessibility */}
      <label htmlFor={id} className={styles.label}>
        {placeholder}
      </label>
      <div className={styles.inputContainer}>
        <input
          id={id}
          name={name}
          type={type}
          className={inputClassName}
          style={inputStyle}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          data-testid={testId}
        />
        {rightElement}
      </div>
      <div className={styles.errorContainer}>
        <AnimatePresence>
          {error && (
            <motion.div 
              id={errorId} 
              className={styles.errorText} 
              role="alert" 
              data-testid={`${testId}-error`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <FiAlertCircle size={14} />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
