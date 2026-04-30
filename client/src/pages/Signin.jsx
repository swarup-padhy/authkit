import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthCard from '../components/AuthCard';
import authStyles from '../components/AuthCard.module.css';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';
import StarBackground from '../components/StarBackground';

const API = 'http://localhost:5000/api/auth';

export default function Signin() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (globalError) {
      setGlobalError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');

    const { email, password } = formData;

    if (!email.trim() || !password) {
      setGlobalError('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API}/signin`, { email, password });
      if (res.data.success) {
        localStorage.setItem('auth_token', res.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg === 'INVALID_CREDENTIALS') {
        setGlobalError('Invalid credentials');
      } else {
        setGlobalError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <StarBackground />
      <AuthCard
        title="Yooo, welcome back!"
        subtitle={<>First time here? <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Sign up for free</Link></>}
        globalError={globalError}
        onSubmit={handleSubmit}
      >
        <Input
          id="signin-email"
          name="email"
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          autoFocus
          testId="email-input"
        />

        <PasswordInput
          id="signin-password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          testId="password-input"
        />

        <div className={authStyles.sectionSpacing}>
          <Button type="submit" loading={loading} disabled={loading} testId="submit-btn">
            {loading ? 'Submitting...' : 'Sign in'}
          </Button>
        </div>

        <div className={authStyles.separator}>or</div>

        <Button 
          variant="outline" 
          onClick={() => setGlobalError('Google Sign-in is currently disabled.')}
          testId="google-btn"
        >
          Continue with Google
        </Button>

        <p className={authStyles.terms}>
          You acknowledge that you read, and agree, to our<br/>
          <a href="#">Terms of Service</a> and our <a href="#">Privacy Policy</a>.
        </p>
      </AuthCard>
    </div>
  );
}
