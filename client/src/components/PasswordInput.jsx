import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Input from './Input';
import styles from './PasswordInput.module.css';

export default function PasswordInput({
  id,
  name,
  placeholder,
  value,
  onChange,
  error,
  isValid,
  autoComplete,
  testId
}) {
  const [show, setShow] = useState(false);

  const toggleButton = (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => setShow(!show)}
      aria-label={show ? "Hide password" : "Show password"}
      data-testid={`${testId}-toggle`}
    >
      {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
    </button>
  );

  return (
    <Input
      id={id}
      name={name}
      type={show ? 'text' : 'password'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
      isValid={isValid}
      autoComplete={autoComplete}
      inputStyle={{ paddingRight: '40px' }}
      rightElement={toggleButton}
      testId={testId}
    />
  );
}
