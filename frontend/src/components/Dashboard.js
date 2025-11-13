import React, { useState, useEffect } from 'react';
import { checkHealth, getUsers, getAnalyticsSummary } from '../services/api';

function Dashboard() {
  const [health, setHealth] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [analyticsSummary, setAnalyticsSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [healthData, usersData, summaryData] = await Promise.all([
        checkHealth(),
        getUsers(),
        getAnalyticsSummary()
      ]);

      setHealth(healthData);
      setUserCount(usersData.count || 0);
      setAnalyticsSummary(summaryData.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div>
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
        <button className="btn btn-primary" onClick={fetchDashboardData}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#667eea' }}>Dashboard Overview</h2>

      {/* Health Status */}
      {health && (
        <div className="success" style={{ marginBottom: '30px' }}>
          <strong>✅ Server Status:</strong> {health.message}
          <br />
          <small>Environment: {health.environment} | Version: {health.version}</small>
        </div>
      )}

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <div className="value">{userCount}</div>
          <div className="description">Registered users in the system</div>
        </div>

        <div className="stat-card">
          <h3>Analytics Metrics</h3>
          <div className="value">{analyticsSummary.length}</div>
          <div className="description">Different metric types tracked</div>
        </div>

        <div className="stat-card">
          <h3>System Status</h3>
          <div className="value">✓</div>
          <div className="description">All systems operational</div>
        </div>

        <div className="stat-card">
          <h3>API Version</h3>
          <div className="value">{health?.version || 'v1'}</div>
          <div className="description">Current API version</div>
        </div>
      </div>

      {/* Analytics Summary */}
      {analyticsSummary.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '15px', color: '#667eea' }}>Analytics Summary</h3>
          <div className="grid">
            {analyticsSummary.map((metric, index) => (
              <div key={index} className="card">
                <h3>{metric._id}</h3>
                <p><strong>Count:</strong> {metric.count}</p>
                <p><strong>Average:</strong> {metric.avgValue?.toFixed(2)}</p>
                <p><strong>Max:</strong> {metric.maxValue}</p>
                <p><strong>Min:</strong> {metric.minValue}</p>
                <p style={{ fontSize: '0.85rem', color: '#999', marginTop: '10px' }}>
                  Last updated: {new Date(metric.latestTimestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Architecture Info */}
      <div style={{ marginTop: '40px', padding: '20px', background: '#f7fafc', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '15px', color: '#667eea' }}>Three-Tier Architecture</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <h4 style={{ color: '#764ba2', marginBottom: '10px' }}>🎨 Presentation Layer</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              React.js frontend with responsive UI components and real-time data visualization
            </p>
          </div>
          <div>
            <h4 style={{ color: '#764ba2', marginBottom: '10px' }}>⚙️ Application Layer</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Node.js + Express.js RESTful API with business logic and middleware
            </p>
          </div>
          <div>
            <h4 style={{ color: '#764ba2', marginBottom: '10px' }}>💾 Data Layer</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              MongoDB database with Mongoose ODM for data persistence and validation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
