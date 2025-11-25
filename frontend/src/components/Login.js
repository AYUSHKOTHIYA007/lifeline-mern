// frontend/src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        let retrievedUserName = '';

        if (data.name) {
          retrievedUserName = data.name;
        } else if (data.user && data.user.name) {
          retrievedUserName = data.user.name;
        } else if (data.userName) {
          retrievedUserName = data.userName;
        }

        if (retrievedUserName) {
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('userName', retrievedUserName);
          alert(data.message || 'Login successful');
          navigate('/profile');
        } else {
          console.error('Login API response missing user name:', data);
          alert(
            'Login successful, but user name is missing in the server response.'
          );
          localStorage.setItem('userId', data.userId);
          navigate('/profile');
        }
      } else {
        alert(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your connection or try again.');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-5 col-md-7">
        <div className="card shadow-sm p-4 p-md-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">User Login</h2>
            <p className="text-muted">Welcome back to LifeLine.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-lifeline btn-lg">
                Login
              </button>
            </div>
            <div className="text-center mt-3">
              <p className="text-muted mb-2">
                Don't have an account?{' '}
                <Link to="/signup" className="text-lifeline">
                  Sign Up
                </Link>
              </p>

              <p className="text-muted small">
                <Link to="/admin/login" className="text-secondary">
                  Login as Admin
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
