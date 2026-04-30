import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import StarBackground from '../components/StarBackground';
import styles from './Dashboard.module.css';

const API = 'http://localhost:5000/api/auth';

const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [tokenRaw, setTokenRaw] = useState('');
  const [tokenDecoded, setTokenDecoded] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        navigate('/signin', { replace: true });
        return;
      }
      
      setTokenRaw(token);
      const decoded = decodeToken(token);
      setTokenDecoded(decoded);

      try {
        const res = await axios.get(`${API}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          throw new Error('Not success');
        }
      } catch (err) {
        localStorage.removeItem('auth_token');
        navigate('/signin', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (!tokenDecoded?.exp) return;
    
    const updateTimer = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = tokenDecoded.exp - now;
      setTimeLeft(remaining > 0 ? remaining : 0);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [tokenDecoded]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/signin', { replace: true });
  };

  if (loading) {
    return (
      <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
      </div>
    );
  }

  if (!user) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="page-container">
      <StarBackground />
      <div className={styles.dashboardPage}>
        <header className={styles.dashboardHeader}>
          <div className={styles.logoContainer}>
             <img src="/icon.png" alt="Logo" className={styles.logoImage} />
          </div>

          <Button variant="outline" onClick={handleLogout} style={{ width: 'auto' }} testId="logout-btn">
            Logout
          </Button>
        </header>

        <main>
          <div style={{ marginBottom: 40 }}>
            <h1 className={styles.welcomeText}>Welcome back, {user.name}</h1>
            <p className="subtitle" style={{ textAlign: 'left', marginBottom: 0 }}>
              Here's what's happening with your account today.
            </p>
          </div>

          <div className={styles.dashboardCard}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Full Name</div>
              <div className={styles.infoValue} id="user-name" data-testid="user-name">{user.name}</div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Email Address</div>
              <div className={styles.infoValue} id="user-email" data-testid="user-email">{user.email}</div>
            </div>

            <div className={styles.infoItem} style={{ marginBottom: 0 }}>
              <div className={styles.infoLabel}>Status</div>
              <div className={styles.infoValue} style={{ color: '#4ade80' }}>● Active</div>
            </div>
          </div>

          {/* QA & Debug Tools */}
          <div className={`${styles.dashboardCard} ${styles.qaCard}`} style={{ marginTop: '24px', borderColor: 'rgba(255, 184, 108, 0.3)' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#ffb86c', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔧 QA Debug Tools
            </h3>
            
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Session Timer (Expires in 5m)</div>
              <div className={styles.infoValue} style={{ color: timeLeft === 0 ? '#ff5555' : '#f1fa8c', fontWeight: '600', fontSize: '20px', fontFamily: 'monospace' }} data-testid="session-timer">
                {timeLeft > 0 ? timeString : 'EXPIRED'}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Raw Token (localStorage)</div>
              <pre className={styles.codeBlock} data-testid="raw-token">{tokenRaw}</pre>
            </div>

            <div className={styles.infoItem} style={{ marginBottom: 0 }}>
              <div className={styles.infoLabel}>Decoded Payload</div>
              <pre className={styles.codeBlock} data-testid="decoded-payload">{JSON.stringify(tokenDecoded, null, 2)}</pre>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
