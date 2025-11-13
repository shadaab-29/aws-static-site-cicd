const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Analytics = require('../models/Analytics');

dotenv.config();

const users = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'developer',
    status: 'active'
  },
  {
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'user',
    status: 'active'
  },
  {
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'developer',
    status: 'active'
  },
  {
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'user',
    status: 'inactive'
  }
];

const analytics = [
  {
    metricName: 'Total Revenue',
    metricValue: 42847,
    metricType: 'revenue',
    description: 'Monthly revenue increased by 23%'
  },
  {
    metricName: 'Active Users',
    metricValue: 18500,
    metricType: 'users',
    description: 'Real-time active users on platform'
  },
  {
    metricName: 'Conversion Rate',
    metricValue: 94.3,
    metricType: 'conversion',
    description: 'Customer satisfaction rate'
  },
  {
    metricName: 'Performance Score',
    metricValue: 7392,
    metricType: 'performance',
    description: 'Overall system performance metrics'
  },
  {
    metricName: 'Monthly Growth',
    metricValue: 28.5,
    metricType: 'growth',
    description: 'Month-over-month growth percentage'
  },
  {
    metricName: 'System Uptime',
    metricValue: 99.9,
    metricType: 'uptime',
    description: 'System reliability percentage'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await Analytics.deleteMany();
    console.log('🗑️  Cleared existing data');

    // Insert seed data
    await User.insertMany(users);
    console.log('👥 Users seeded successfully');

    await Analytics.insertMany(analytics);
    console.log('📊 Analytics seeded successfully');

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
