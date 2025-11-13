variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.medium"
}

variable "ami_id" {
  description = "AMI ID for Amazon Linux 2023"
  type        = string
  default     = "ami-0453ec754f44f9a4a" # Amazon Linux 2023 (us-east-1)
}

variable "deploy_public_key" {
  description = "Public SSH key for deployment"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "development"
}
