const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  metricName: {
    type: String,
    required: [true, 'Please provide a metric name'],
    trim: true
  },
  metricValue: {
    type: Number,
    required: [true, 'Please provide a metric value']
  },
  metricType: {
    type: String,
    enum: ['revenue', 'users', 'conversion', 'performance', 'growth', 'uptime'],
    required: [true, 'Please provide a metric type']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot be more than 200 characters']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    type: Map,
    of: String
  }
});

// Index for faster queries
analyticsSchema.index({ metricType: 1, timestamp: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
