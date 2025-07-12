import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/auth/register', {
        name,
        email,
        password,
      });

      const token = res.data.access_token;
      localStorage.setItem('token', token);

      // Navigate to dashboard or login
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="register-form-wrapper">
          <div className="register-logo">InsideBox</div>

          <h2 className="register-heading">Start your journey</h2>
          <h3 className="register-subheading">Sign Up to InsideBox</h3>

          <form className="register-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              className="register-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              className="register-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="register-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="register-button">Sign Up</button>
          </form>

          {error && <p className="error-message">{error}</p>}

          <p className="register-alt">or sign up with</p>
          <div className="register-socials">
            <button className="register-social-btn">f</button>
            <button className="register-social-btn">G</button>
            <button className="register-social-btn"></button>
          </div>

          <p className="register-login-text">
            Have an account? <Link to="/login" className="register-link">Sign in</Link>
          </p>
        </div>
      </div>

      <div className="register-right"></div>
    </div>
  );
};

export default Register;
