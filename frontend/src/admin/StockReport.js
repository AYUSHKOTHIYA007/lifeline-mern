// src/admin/StockReport.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

function StockReport() {
  const [stock, setStock] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login');
    } else {
      const fetchStock = async () => {
        const response = await fetch(`${API_BASE_URL}/api/admin/stock`);
        const data = await response.json();
        setStock(data);
      };
      fetchStock();
    }
  }, [navigate]);

  const handleUnitChange = (index, value) => {
    const updatedStock = [...stock];
    updatedStock[index].units = Math.max(0, parseInt(value, 10) || 0);
    setStock(updatedStock);
  };

  const handleUpdateStock = async () => {
    await fetch(`${API_BASE_URL}/api/admin/stock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stock),
    });
    alert('Stock updated!');
  };

  return (
    <div>
      <h1 className="h2 mb-4">Blood Stock Report</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Blood Group</th>
                <th>Available Units</th>
                <th style={{ width: '200px' }}>Update Units</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item, index) => (
                <tr key={item._id}>
                  <td className="fw-bold fs-5">{item.blood_group}</td>
                  <td>
                    <div className="progress" style={{ height: '25px' }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${item.units * 2}%` }}
                      >
                        {item.units} Units
                      </div>
                    </div>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={item.units}
                      onChange={(e) => handleUnitChange(index, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end mt-3">
            <button className="btn btn-primary" onClick={handleUpdateStock}>
              <i className="fas fa-save me-2"></i>Update Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockReport;
