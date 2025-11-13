import React, { useState, useEffect } from 'react';
import { getAnalytics, createAnalytics, deleteAnalytics } from '../services/api';

function Analytics() {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    metricName: '',
    metricValue: '',
    metricType: 'revenue',
    description: ''
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAnalytics();
      setAnalytics(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch analytics');
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(null);

      await createAnalytics({
        ...formData,
        metricValue: parseFloat(formData.metricValue)
      });

      setSuccess('Analytics entry created successfully!');
      setFormData({ metricName: '', metricValue: '', metricType: 'revenue', description: '' });
      setShowForm(false);
      fetchAnalytics();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to create analytics entry');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this analytics entry?')) {
      return;
    }

    try {
      setError(null);
      await deleteAnalytics(id);
      setSuccess('Analytics entry deleted successfully!');
      fetchAnalytics();
    } catch (err) {
      setError(err.message || 'Failed to delete analytics entry');
    }
  };

  const getMetricIcon = (type) => {
    const icons = {
      revenue: '💰',
      users: '👥',
      conversion: '🎯',
      performance: '🚀',
      growth: '📈',
      uptime: '⚡'
    };
    return icons[type] || '📊';
  };

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#667eea' }}>Analytics Dashboard</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Add Metric'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      {showForm && (
        <div className="form">
          <h3 style={{ marginBottom: '20px', color: '#667eea' }}>Create New Analytics Entry</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Metric Name *</label>
              <input
                type="text"
                name="metricName"
                value={formData.metricName}
                onChange={handleInputChange}
                required
                placeholder="e.g., Total Revenue"
              />
            </div>
            <div className="form-group">
              <label>Metric Value *</label>
              <input
                type="number"
                step="0.01"
                name="metricValue"
                value={formData.metricValue}
                onChange={handleInputChange}
                required
                placeholder="e.g., 42847"
              />
            </div>
            <div className="form-group">
              <label>Metric Type *</label>
              <select
                name="metricType"
                value={formData.metricType}
                onChange={handleInputChange}
                required
              >
                <option value="revenue">Revenue</option>
                <option value="users">Users</option>
                <option value="conversion">Conversion</option>
                <option value="performance">Performance</option>
                <option value="growth">Growth</option>
                <option value="uptime">Uptime</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Optional description"
                rows="3"
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Create Entry
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {analytics.length === 0 ? (
        <div className="empty-state">
          <h3>No analytics data found</h3>
          <p>Click "Add Metric" to create your first analytics entry</p>
        </div>
      ) : (
        <div className="grid">
          {analytics.map((metric) => (
            <div key={metric._id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '2rem', marginRight: '10px' }}>
                  {getMetricIcon(metric.metricType)}
                </span>
                <h3 style={{ margin: 0 }}>{metric.metricName}</h3>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', margin: '15px 0' }}>
                {metric.metricValue.toLocaleString()}
              </div>
              {metric.description && (
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>
                  {metric.description}
                </p>
              )}
              <p style={{ fontSize: '0.85rem', color: '#999' }}>
                <strong>Type:</strong> {metric.metricType}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#999' }}>
                <strong>Recorded:</strong> {new Date(metric.timestamp).toLocaleString()}
              </p>
              <div className="actions">
                <button className="btn btn-danger" onClick={() => handleDelete(metric._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Analytics;
