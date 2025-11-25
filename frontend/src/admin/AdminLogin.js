import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ✅ Logic: Using the local backend URL as requested.
const LOCAL_API_ENDPOINT = 'http://localhost:5000/api/admin/login'; 

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Fetching directly from the local backend port 5000
            const response = await fetch(LOCAL_API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Simple localStorage flag logic retained
                localStorage.setItem('isAdmin', 'true');
                alert(data.message);
                navigate('/admin/dashboard');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Admin login error:', error);
            // Hinting the user to check their local server status
            alert('Admin login failed. Check if your backend server is running on Port 5000.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // UI: Using the detailed, two-column structure (New UI)
        <div className="admin-login-page d-flex align-items-center py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-10">
                        <div className="card admin-login-card shadow-lg border-0 overflow-hidden">
                            <div className="row g-0">
                                {/* Left illustration / info (desktop only) */}
                                <div className="col-lg-5 d-none d-lg-flex admin-login-illustration flex-column justify-content-between">
                                    <div>
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="admin-login-icon me-2">
                                                <i className="fas fa-shield-alt"></i>
                                            </div>
                                            <h5 className="mb-0 fw-semibold">LifeLine Admin</h5>
                                        </div>
                                        <h3 className="fw-bold mb-3">Secure Control Panel</h3>
                                        <p className="mb-4">
                                            Monitor blood stock, manage donors, and handle emergency
                                            blood requests from one secure dashboard.
                                        </p>
                                    </div>
                                    <p className="small text-light mb-0 opacity-75">
                                        Tip: Keep your admin credentials safe. Do not share with others.
                                    </p>
                                </div>

                                {/* Right: login form */}
                                <div className="col-lg-7">
                                    <div className="p-4 p-md-5">
                                        <div className="text-center mb-4">
                                            <div className="badge bg-light text-lifeline mb-2 px-3 py-2 rounded-pill">
                                                <i className="fas fa-user-lock me-2"></i>
                                                Admin Access Only
                                            </div>
                                            <h2 className="fw-bold mb-1">Admin Login</h2>
                                            <p className="text-muted mb-0">
                                                Sign in to manage the LifeLine blood bank system.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="username" className="form-label">
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="username"
                                                    placeholder="Enter admin username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label htmlFor="password" className="form-label">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    id="password"
                                                    placeholder="Enter admin password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <div className="form-check small">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="rememberAdmin"
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="rememberAdmin"
                                                    >
                                                        Remember me
                                                    </label>
                                                </div>
                                                <span className="small text-muted">
                                                    Default: admin / password123
                                                </span>
                                            </div>

                                            <div className="d-grid mt-3">
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-lifeline btn-lg"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? 'Logging In...' : 'Login to Admin Panel'}
                                                </button>
                                            </div>

                                            <div className="text-center mt-3">
                                                <p className="text-muted small mb-0">
                                                    Not an admin?{' '}
                                                    <Link
                                                        to="/login"
                                                        className="text-lifeline text-decoration-none"
                                                    >
                                                        Return to User Login
                                                    </Link>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;