# --------------------------
# DATA SOURCES
# --------------------------
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# --------------------------
# RESOURCES
# --------------------------
resource "aws_key_pair" "deployer" {
  key_name   = "meanstack-deploy-key"
  public_key = file(var.deploy_public_key)
}

resource "aws_security_group" "meanstack_sg" {
  name        = "meanstack-sg"
  description = "Security group for MEAN stack application"
  vpc_id      = data.aws_vpc.default.id

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "SSH access"
  }

  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP access"
  }

  # Backend API
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Backend API"
  }

  # Frontend
  ingress {
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Frontend application"
  }

  # MongoDB (restricted to VPC only for security)
  ingress {
    from_port   = 27017
    to_port     = 27017
    protocol    = "tcp"
    self        = true
    description = "MongoDB (internal only)"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic"
  }

  tags = {
    Name        = "meanstack-sg"
    Application = "MEAN Stack"
    Environment = var.environment
  }
}

resource "aws_instance" "meanstack" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  subnet_id                   = data.aws_subnets.default.ids[0]
  vpc_security_group_ids      = [aws_security_group.meanstack_sg.id]
  key_name                    = aws_key_pair.deployer.key_name
  associate_public_ip_address = true

  root_block_device {
    volume_size = 20
    volume_type = "gp3"
    encrypted   = true
  }

  user_data = <<-EOF
              #!/bin/bash
              set -e
              
              # Update system
              dnf update -y
              
              # Install Docker
              dnf install -y docker
              systemctl start docker
              systemctl enable docker
              usermod -aG docker ec2-user
              
              # Install Docker Compose
              curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose
              ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
              
              # Install Git
              dnf install -y git
              
              # Install Node.js 22
              curl -fsSL https://rpm.nodesource.com/setup_22.x | bash -
              dnf install -y nodejs
              
              # Create application directory
              mkdir -p /opt/meanstack
              cd /opt/meanstack
              
              # Create startup script
              cat > /opt/meanstack/start.sh << 'SCRIPT'
              #!/bin/bash
              cd /opt/meanstack
              docker-compose up -d
              SCRIPT
              
              chmod +x /opt/meanstack/start.sh
              
              # Create systemd service
              cat > /etc/systemd/system/meanstack.service << 'SERVICE'
              [Unit]
              Description=MEAN Stack Application
              After=docker.service
              Requires=docker.service
              
              [Service]
              Type=oneshot
              RemainAfterExit=yes
              WorkingDirectory=/opt/meanstack
              ExecStart=/opt/meanstack/start.sh
              ExecStop=/usr/local/bin/docker-compose down
              
              [Install]
              WantedBy=multi-user.target
              SERVICE
              
              # Enable service
              systemctl daemon-reload
              systemctl enable meanstack.service
              
              # Create welcome page
              mkdir -p /var/www/html
              cat > /var/www/html/index.html << 'HTML'
              <!DOCTYPE html>
              <html>
              <head>
                  <title>MEAN Stack - DevOps Testing</title>
                  <style>
                      body { font-family: Arial, sans-serif; margin: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
                      .container { max-width: 800px; margin: 0 auto; background: rgba(255,255,255,0.1); padding: 40px; border-radius: 10px; }
                      h1 { font-size: 3em; margin-bottom: 20px; }
                      .info { background: rgba(255,255,255,0.2); padding: 20px; border-radius: 5px; margin: 20px 0; }
                      a { color: #00ffcc; text-decoration: none; }
                      .status { color: #00ff00; }
                  </style>
              </head>
              <body>
                  <div class="container">
                      <h1>🚀 MEAN Stack Application</h1>
                      <p class="status">✅ Server is running</p>
                      <div class="info">
                          <h2>Three-Tier Architecture</h2>
                          <p><strong>Tier 1:</strong> React.js Frontend (Port 3001)</p>
                          <p><strong>Tier 2:</strong> Node.js + Express.js API (Port 3000)</p>
                          <p><strong>Tier 3:</strong> MongoDB Database (Port 27017)</p>
                      </div>
                      <div class="info">
                          <h2>Access Points</h2>
                          <p><a href="http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3001">Frontend Application</a></p>
                          <p><a href="http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000/api/health">Backend API Health</a></p>
                      </div>
                  </div>
              </body>
              </html>
              HTML
              
              # Install and configure nginx for welcome page
              dnf install -y nginx
              systemctl start nginx
              systemctl enable nginx
              
              echo "MEAN Stack infrastructure setup complete!"
              EOF

  tags = {
    Name        = "meanstack-server"
    Application = "MEAN Stack"
    Environment = var.environment
    Tier        = "All (3-Tier)"
  }
}

# --------------------------
# OUTPUTS
# --------------------------
output "instance_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.meanstack.public_ip
}

output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.meanstack.id
}

output "frontend_url" {
  description = "Frontend application URL"
  value       = "http://${aws_instance.meanstack.public_ip}:3001"
}

output "backend_url" {
  description = "Backend API URL"
  value       = "http://${aws_instance.meanstack.public_ip}:3000"
}

output "ssh_command" {
  description = "SSH command to connect to the instance"
  value       = "ssh -i <your-key.pem> ec2-user@${aws_instance.meanstack.public_ip}"
}
