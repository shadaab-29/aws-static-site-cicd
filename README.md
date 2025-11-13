# 🚀 MEAN Stack Three-Tier Web Application

A complete three-tier web application built with the MEAN stack (MongoDB, Express.js, Angular/React, Node.js) for DevOps testing and demonstration purposes.

## 📋 Table of Contents

- [Architecture](#architecture)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Deployment Options](#deployment-options)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Contributing](#contributing)

## 🏗️ Architecture

This application follows a **three-tier architecture**:

### **Tier 1: Presentation Layer (Frontend)**
- **Technology**: React.js
- **Port**: 3001
- **Features**: 
  - User management interface
  - Analytics dashboard
  - Real-time data visualization
  - Responsive design

### **Tier 2: Application Layer (Backend)**
- **Technology**: Node.js + Express.js
- **Port**: 3000
- **Features**:
  - RESTful API endpoints
  - Business logic layer
  - Authentication middleware
  - Error handling and logging
  - CORS configuration

### **Tier 3: Data Layer (Database)**
- **Technology**: MongoDB
- **Port**: 27017
- **Features**:
  - User data models
  - Analytics data storage
  - Connection pooling
  - Data validation schemas

## ✨ Features

- ✅ Complete CRUD operations for users
- ✅ Analytics data management
- ✅ Real-time dashboard
- ✅ RESTful API architecture
- ✅ Docker containerization
- ✅ Infrastructure as Code (Terraform)
- ✅ CI/CD pipeline (GitHub Actions)
- ✅ Health check endpoints
- ✅ Error handling and validation
- ✅ Responsive UI design

## 📦 Prerequisites

### For Local Development:
- Node.js 18+ (Node.js 22 recommended)
- MongoDB 7.0+
- npm or yarn

### For Docker Deployment:
- Docker 20.10+
- Docker Compose 2.0+

### For AWS Deployment:
- AWS Account
- Terraform 1.5+
- AWS CLI configured

## 🚀 Quick Start

### Option 1: Local Development (Without Docker)

```bash
# Clone the repository
git clone <repository-url>
cd sandbox

# Start MongoDB (make sure MongoDB is installed)
mongod --dbpath ~/data/db

# Install and start backend
cd backend
npm install
npm start

# In a new terminal, install and start frontend
cd frontend
npm install
npm start
```

Or use the convenience script:

```bash
chmod +x scripts/start-local.sh
./scripts/start-local.sh
```

### Option 2: Docker Compose (Recommended)

```bash
# Start all services with Docker Compose
docker-compose up -d

# Seed the database
docker-compose exec backend node scripts/seed.js

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Or use the convenience script:

```bash
chmod +x scripts/start-docker.sh
./scripts/start-docker.sh
```

### Option 3: AWS Deployment

```bash
# Navigate to infrastructure directory
cd infra

# Copy and configure variables
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values

# Deploy infrastructure
terraform init
terraform plan
terraform apply

# Get instance IP
terraform output instance_public_ip
```

Or use the convenience script:

```bash
chmod +x scripts/deploy-aws.sh
./scripts/deploy-aws.sh
```

## 🌐 Access Points

After starting the application:

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **API Health Check**: http://localhost:3000/api/health
- **MongoDB**: mongodb://localhost:27017

## 📚 API Documentation

### Health Check
```bash
GET /api/health
```

### Users API
```bash
GET    /api/users          # Get all users
GET    /api/users/:id      # Get user by ID
POST   /api/users          # Create new user
PUT    /api/users/:id      # Update user
DELETE /api/users/:id      # Delete user
```

### Analytics API
```bash
GET    /api/analytics              # Get all analytics
GET    /api/analytics/summary      # Get analytics summary
GET    /api/analytics/type/:type   # Get analytics by type
POST   /api/analytics              # Create analytics entry
DELETE /api/analytics/:id          # Delete analytics entry
```

### Example API Calls

```bash
# Health check
curl http://localhost:3000/api/health

# Get all users
curl http://localhost:3000/api/users

# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }'

# Get analytics
curl http://localhost:3000/api/analytics
```

## 📁 Project Structure

```
/vercel/sandbox/
├── backend/                 # Express.js API server (Tier 2)
│   ├── config/             # Configuration files
│   ├── controllers/        # Business logic
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── scripts/            # Utility scripts
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── Dockerfile          # Backend Docker image
│
├── frontend/               # React application (Tier 1)
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   ├── package.json        # Frontend dependencies
│   └── Dockerfile          # Frontend Docker image
│
├── infra/                  # Terraform infrastructure
│   ├── main.tf             # Main infrastructure
│   ├── variables.tf        # Variables
│   ├── providers.tf        # Provider configuration
│   └── outputs.tf          # Output values
│
├── scripts/                # Deployment scripts
│   ├── start-local.sh      # Start locally
│   ├── start-docker.sh     # Start with Docker
│   └── deploy-aws.sh       # Deploy to AWS
│
├── .github/
│   └── workflows/
│       └── deploy-meanstack.yml  # CI/CD pipeline
│
├── docker-compose.yml      # Docker Compose configuration
└── README.md               # This file
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### API Testing with curl
```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test user creation
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","role":"user"}'

# Test getting users
curl http://localhost:3000/api/users
```

## 🔧 Configuration

### Backend Environment Variables (.env)
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/meanstack
FRONTEND_URL=http://localhost:3001
API_VERSION=v1
```

### Frontend Environment Variables (.env)
```env
REACT_APP_API_URL=http://localhost:3000/api
PORT=3001
```

## 🐳 Docker Commands

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes
docker-compose down -v

# Restart a service
docker-compose restart backend

# Execute command in container
docker-compose exec backend node scripts/seed.js
```

## 🌩️ AWS Deployment

### Infrastructure Components
- EC2 instance (t2.medium)
- Security groups (ports 22, 80, 3000, 3001, 27017)
- Amazon Linux 2023 AMI
- Docker and Docker Compose pre-installed

### Deployment Steps
1. Configure AWS credentials
2. Update `infra/terraform.tfvars`
3. Run `terraform apply`
4. SSH into instance
5. Clone repository
6. Run `./scripts/start-docker.sh`

## 📊 Monitoring

### Health Checks
- Backend: http://localhost:3000/api/health
- Frontend: http://localhost:3001/health

### Logs
```bash
# Docker logs
docker-compose logs -f

# Backend logs
docker-compose logs -f backend

# Frontend logs
docker-compose logs -f frontend

# MongoDB logs
docker-compose logs -f mongodb
```

## 🔒 Security Considerations

- MongoDB is not exposed to the internet (internal network only)
- Environment variables for sensitive data
- CORS configuration for API security
- Helmet.js for security headers
- Input validation on all endpoints
- SSH key-based authentication for AWS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

MIT License - feel free to use this project for learning and testing purposes.

## 👥 Author

**DevOps Team**

## 🙏 Acknowledgments

- MEAN Stack Community
- Docker Documentation
- Terraform AWS Provider
- React.js Team

---

**Happy DevOps Testing! 🚀**
