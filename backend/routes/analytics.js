const express = require('express');
const router = express.Router();
const {
  getAnalytics,
  getAnalyticsByType,
  createAnalytics,
  getAnalyticsSummary,
  deleteAnalytics
} = require('../controllers/analyticsController');

router.route('/')
  .get(getAnalytics)
  .post(createAnalytics);

router.route('/summary')
  .get(getAnalyticsSummary);

router.route('/type/:type')
  .get(getAnalyticsByType);

router.route('/:id')
  .delete(deleteAnalytics);

module.exports = router;
