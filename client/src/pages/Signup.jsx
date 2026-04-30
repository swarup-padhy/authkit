import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthCard from '../components/AuthCard';
import authStyles from '../components/AuthCard.module.css';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';
import StarBackground from '../components/StarBackground';
import PasswordRules from '../components/PasswordRules';

const API = 'http://localhost:5000/api/auth';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UPPER_REGEX = /[A-Z]/;
const LOWER_REGEX = /[a-z]/;
const NUMBER_REGEX = /[0-9]/;
const SPECIAL_REGEX = /[^A-Za-z0-9]/;

export default function Signup() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [passwordRules, setPasswordRules] = useState({
    upper: false,
    lower: false,
    number: false,
    special: false,
    minLength: false
  });
  const [isTypingPassword, setIsTypingPassword] = useState(false);

  useEffect(() => {
    const allSatisfied = Object.values(passwordRules).every((val) => val === true);
    let timer;
    if (allSatisfied && isTypingPassword) {
      timer = setTimeout(() => {
        setIsTypingPassword(false);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [passwordRules, isTypingPassword]);

  const validateName = (name) => {
    if (!name) return 'Name is required';
    if (name.trim().length < 3) return 'Name must be at least 3 characters';
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePasswordRules = (pwd) => {
    return {
      upper: UPPER_REGEX.test(pwd),
      lower: LOWER_REGEX.test(pwd),
      number: NUMBER_REGEX.test(pwd),
      special: SPECIAL_REGEX.test(pwd),
      minLength: pwd.length >= 8
    };
  };

  const validatePassword = (rules) => {
    if (!rules.upper || !rules.lower || !rules.number || !rules.special || !rules.minLength) {
      return 'Password does not meet all requirements';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (globalError) setGlobalError('');

    let fieldError = '';
    if (name === 'name') {
      fieldError = validateName(value);
    } else if (name === 'email') {
      fieldError = validateEmail(value);
    } else if (name === 'password') {
      if (!isTypingPassword) setIsTypingPassword(true);
      const newRules = validatePasswordRules(value);
      setPasswordRules(newRules);
      fieldError = validatePassword(newRules);
    }

    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');

    const { name, email, password } = formData;

    if (!name.trim() && !email.trim() && !password) {
      setGlobalError('Please fill all required fields');
      return;
    }

    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const pwdRules = validatePasswordRules(password);
    const pwdErr = validatePassword(pwdRules);

    if (nameErr || emailErr || pwdErr) {
      setErrors({ name: nameErr, email: emailErr, password: pwdErr });
      setIsTypingPassword(true); // show rules if they tried to submit invalid password
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API}/signup`, { name, email, password });
      if (res.data.success) {
        localStorage.setItem('auth_token', res.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg === 'EMAIL_EXISTS') {
        setErrors((prev) => ({ ...prev, email: 'Email already exists' }));
      } else {
        setGlobalError(msg || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <StarBackground />
      <div style={{ padding: '24px', width: '100%' }}>
        <Button 
          variant="outline" 
          onClick={() => navigate('/signin')} 
          style={{ width: 'auto', display: 'inline-flex', padding: '6px 14px', borderRadius: '20px' }}
        >
          &lt; Back
        </Button>
      </div>

      <AuthCard
        title="Create an account"
        subtitle={<>Already have an account? <Link to="/signin" style={{ color: 'white', textDecoration: 'none' }}>Sign in</Link></>}
        globalError={globalError}
        onSubmit={handleSubmit}
      >
        <Input
          id="signup-name"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          isValid={formData.name.length > 0 && !errors.name}
          autoComplete="name"
          autoFocus
          testId="name-input"
        />

        <Input
          id="signup-email"
          name="email"
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          isValid={formData.email.length > 0 && !errors.email}
          autoComplete="email"
          testId="email-input"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <PasswordInput
            id="signup-password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password && !isTypingPassword ? 'Password is required' : ''} // Rely on rules for detail
            isValid={formData.password.length > 0 && !errors.password}
            autoComplete="new-password"
            testId="password-input"
          />
          <PasswordRules rules={passwordRules} isVisible={isTypingPassword} />
        </div>

        <div className={authStyles.sectionSpacing}>
          <Button type="submit" loading={loading} disabled={loading} testId="submit-btn">
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </div>

        <div className={authStyles.separator}>or</div>

        <Button variant="outline" onClick={() => setGlobalError('Google sign up is disabled for this demo')} testId="google-btn">
          Sign up with Google
        </Button>

        <p className={authStyles.terms}>
          You acknowledge that you read, and agree, to our<br/>
          <a href="#">Terms of Service</a> and our <a href="#">Privacy Policy</a>.
        </p>
      </AuthCard>
    </div>
  );
}
