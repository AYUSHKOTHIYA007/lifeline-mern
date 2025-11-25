import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/requests`);
    const data = await response.json();
    setRequests(data);
  };

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/admin/login');
    else fetchRequests();
  }, [navigate]);

  const handleUpdateStatus = async (requestId, status) => {
    await fetch(`${API_BASE_URL}/api/admin/requests/${requestId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchRequests();
  };

  return (
    <div>
      <h1 className="h2 mb-4">Manage Blood Requests</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Blood Group</th>
                  <th>Units</th>
                  <th>Hospital</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.patient_name}</td>
                    <td>
                      <span className="badge bg-danger">
                        {req.blood_group}
                      </span>
                    </td>
                    <td>{req.units_required}</td>
                    <td>{req.hospital_name}</td>
                    <td>{req.contact_mobile}</td>
                    <td>
                      {req.status === 'approved' && (
                        <span className="badge bg-success">Approved</span>
                      )}
                      {req.status === 'pending' && (
                        <span className="badge bg-warning">Pending</span>
                      )}
                      {req.status === 'rejected' && (
                        <span className="badge bg-danger">Rejected</span>
                      )}
                    </td>
                    <td>
                      {req.status === 'pending' ? (
                        <>
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() =>
                              handleUpdateStatus(req._id, 'approved')
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              handleUpdateStatus(req._id, 'rejected')
                            }
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageRequests;
