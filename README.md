# 🌐 AWS Static Site CI/CD

This project demonstrates **fully automated deployment** of a static website using:
- **Terraform** for provisioning AWS EC2 + NGINX
- **GitHub Actions** for CI/CD
- **NGINX** to serve static content

---

## ⚙️ Tech Stack

| Layer | Tool | Purpose |
|-------|------|----------|
| Infrastructure | Terraform | EC2, Security Group, Key Pair |
| Web Server | NGINX | Serves static files |
| CI/CD | GitHub Actions | Deploys automatically on push |
| Hosting | AWS EC2 | Compute instance for static site |

---

## 🚀 Quick Start

1. **Provision Infrastructure**
  
   cd infra
   terraform init
   terraform plan
   terraform apply
