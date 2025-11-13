const Analytics = require('../models/Analytics');

// @desc    Get all analytics
// @route   GET /api/analytics
// @access  Public
exports.getAnalytics = async (req, res) => {
  try {
    const { metricType, startDate, endDate } = req.query;
    let query = {};

    if (metricType) {
      query.metricType = metricType;
    }

    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const analytics = await Analytics.find(query).sort({ timestamp: -1 });
    
    res.status(200).json({
      success: true,
      count: analytics.length,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// @desc    Get analytics by type
// @route   GET /api/analytics/type/:type
// @access  Public
exports.getAnalyticsByType = async (req, res) => {
  try {
    const analytics = await Analytics.find({ 
      metricType: req.params.type 
    }).sort({ timestamp: -1 });

    res.status(200).json({
      success: true,
      count: analytics.length,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// @desc    Create new analytics entry
// @route   POST /api/analytics
// @access  Public
exports.createAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.create(req.body);

    res.status(201).json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: error.message
    });
  }
};

// @desc    Get analytics summary
// @route   GET /api/analytics/summary
// @access  Public
exports.getAnalyticsSummary = async (req, res) => {
  try {
    const summary = await Analytics.aggregate([
      {
        $group: {
          _id: '$metricType',
          count: { $sum: 1 },
          avgValue: { $avg: '$metricValue' },
          maxValue: { $max: '$metricValue' },
          minValue: { $min: '$metricValue' },
          latestTimestamp: { $max: '$timestamp' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// @desc    Delete analytics entry
// @route   DELETE /api/analytics/:id
// @access  Public
exports.deleteAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.findByIdAndDelete(req.params.id);

    if (!analytics) {
      return res.status(404).json({
        success: false,
        error: 'Analytics entry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Analytics entry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};
