#!/bin/bash

# Deploy MEAN Stack Application to AWS EC2

echo "☁️  Deploying MEAN Stack Application to AWS..."
echo ""

# Check if Terraform is installed
if ! command -v terraform &> /dev/null; then
    echo "❌ Terraform is not installed. Please install Terraform first."
    exit 1
fi

# Navigate to infrastructure directory
cd infra

# Initialize Terraform
echo "🔧 Initializing Terraform..."
terraform init

# Plan infrastructure changes
echo ""
echo "📋 Planning infrastructure changes..."
terraform plan

# Ask for confirmation
echo ""
read -p "Do you want to apply these changes? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Deployment cancelled"
    exit 0
fi

# Apply infrastructure changes
echo ""
echo "🚀 Applying infrastructure changes..."
terraform apply -auto-approve

# Get EC2 instance IP
echo ""
echo "📡 Getting EC2 instance IP..."
INSTANCE_IP=$(terraform output -raw instance_public_ip)

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║   ✅ Infrastructure Deployed Successfully            ║"
echo "║                                                       ║"
echo "║   🌐 Instance IP: $INSTANCE_IP                        ║"
echo "║                                                       ║"
echo "║   Next steps:                                         ║"
echo "║   1. SSH into instance                                ║"
echo "║   2. Install Docker and Docker Compose                ║"
echo "║   3. Clone repository                                 ║"
echo "║   4. Run: ./scripts/start-docker.sh                   ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
