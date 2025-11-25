import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000'; // ✅ Local backend

function Profile() {
  const [profile, setProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  // --- Helper Functions ---

  // ✅ Safe date formatter that works with both string and Date
  const formatDate = (value) => {
    if (!value) return 'N/A';

    try {
      const date = new Date(value); // handles Date object or ISO string
      if (isNaN(date.getTime())) return 'N/A';

      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return 'N/A';
    }
  };

  // Function to determine the last donation date
  const getLastDonationDate = (history) => {
    if (!history || history.length === 0) return 'Never';

    const sortedHistory = [...history].sort(
      (a, b) => new Date(b.donation_date) - new Date(a.donation_date)
    );
    return formatDate(sortedHistory[0].donation_date);
  };

  // --- Data Fetching ---
  useEffect(() => {
    if (!userId) {
      alert('Please log in to view your profile.');
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/profile/${userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfile(data);
        setErrorMsg('');
      } catch (error) {
        console.error('Error fetching profile:', error);
        setErrorMsg('Unable to load profile. Please try again later.');
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  if (errorMsg) {
    return (
      <div className="container py-4">
        <h2 className="fw-bold mb-3">My Profile</h2>
        <div className="alert alert-danger">{errorMsg}</div>
      </div>
    );
  }

  if (!profile || !profile.user) {
    return (
      <div className="container py-4">
        <p>Loading profile...</p>
      </div>
    );
  }

  // --- Data Preparation ---
  const lastDonationDate = getLastDonationDate(profile.history);

  // Build address:
  // 1) Prefer the detailed fields (address_line, city, state, pincode)
  // 2) Fallback to 'address' field (required in schema)
  const addressParts = [
    profile.user.address_line,
    profile.user.city,
    profile.user.state,
    profile.user.pincode,
  ].filter(Boolean);

  const fullAddressFromParts = addressParts.join(', ');
  const displayAddress =
    fullAddressFromParts || profile.user.address || 'Address not set';

  // Google Maps link: prefer stored google_maps_link; else build from address text
  const mapHref =
    profile.user.google_maps_link && profile.user.google_maps_link.trim() !== ''
      ? profile.user.google_maps_link
      : displayAddress && displayAddress !== 'Address not set'
      ? `https://maps.google.com/?q=${encodeURIComponent(displayAddress)}`
      : null;

  // Member since – use created_at if present
  const memberSinceDate = formatDate(profile.user.created_at);

  // --- Rendering the Profile UI ---
  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">My Profile</h2>
      <div className="row g-4">
        {/* --- Personal Information (Left Column) --- */}
        <div className="col-lg-8">
          <div className="card shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
              <h5 className="mb-0 text-muted">Personal Information</h5>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => navigate('/edit-profile')}
              >
                <i className="bi bi-pencil me-1"></i> Edit Profile
              </button>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <p className="fw-bold mb-0">Full Name:</p>
                <p>{profile.user.name}</p>
              </div>
              <div className="col-md-6">
                <p className="fw-bold mb-0">Email Address:</p>
                <p>{profile.user.email}</p>
              </div>
              <div className="col-md-6">
                <p className="fw-bold mb-0">Age:</p>
                <p>{profile.user.age || 'N/A'}</p>
              </div>
              <div className="col-md-6">
                <p className="fw-bold mb-0 text-danger">Blood Group:</p>
                <p className="fw-bold text-danger">
                  {profile.user.blood_group || 'N/A'}
                </p>
              </div>
              <div className="col-md-6">
                <p className="fw-bold mb-0">Gender:</p>
                <p>{profile.user.gender || 'N/A'}</p>
              </div>
              <div className="col-md-6">
                <p className="fw-bold mb-0">Mobile Number:</p>
                <p>{profile.user.mobile || 'N/A'}</p>
              </div>

              {/* Address */}
              <div className="col-12 mt-3">
                <p className="fw-bold mb-0">Address:</p>
                <p>{displayAddress}</p>

                {mapHref && (
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    View on Google Maps
                  </a>
                )}
              </div>

              {/* Last Donation Date & Member Since */}
              <div className="col-md-6 mt-3">
                <p className="fw-bold mb-0">Last Donation Date:</p>
                <p>{lastDonationDate}</p>
              </div>
              <div className="col-md-6 mt-3">
                <p className="fw-bold mb-0">Member Since:</p>
                <p>{memberSinceDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Donation History (Right Column) --- */}
        <div className="col-lg-4">
          <div className="card text-white bg-dark shadow p-4">
            <h5 className="card-title mb-3">Donation History</h5>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {profile.history && profile.history.length > 0 ? (
                profile.history
                  .sort(
                    (a, b) =>
                      new Date(b.donation_date) - new Date(a.donation_date)
                  )
                  .map((h, index) => (
                    <div
                      key={h._id || index}
                      className={`p-2 rounded ${
                        index > 0 ? 'mt-2 border-top border-secondary' : ''
                      }`}
                    >
                      <p className="mb-0 fw-bold">{h.venue}</p>
                      <small className="text-muted">
                        {formatDate(h.donation_date)} - {h.units || 1} unit(s)
                      </small>
                    </div>
                  ))
              ) : (
                <p className="text-muted">
                  No donation history recorded yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
