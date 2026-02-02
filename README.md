# Steinalytics Frontend

![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-Build-purple?logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![AWS S3](https://img.shields.io/badge/AWS-S3-orange?logo=amazonaws)
![CloudFront](https://img.shields.io/badge/AWS-CloudFront-orange?logo=amazonaws)
![GitHub Actions](https://img.shields.io/badge/GitHub-Actions-blue?logo=githubactions)
![CI/CD](https://img.shields.io/badge/CI/CD-Automated-success?logo=github)

A modern **Vite + ReactJS** frontend application for the Steinalytics platform, designed to deliver responsive dashboards and Excel automation tools.  
This project integrates seamlessly with the [Steinalytics Backend](https://github.com/Siyabongahenry/SteinalyticsReportAPI) powered by FastAPI.

---

## 📦 Installation, 🏗️ Architecture & 🚀 Deployment

### Local Development Setup


1. Clone the repository (replace with your own repo if forked)
         ```bash
         git clone https://github.com/Siyabongahenry/steinalytics-frontend.git
         cd steinalytics-frontend
         ```

2. Install dependencies
         ```bash
         npm install
         ```

3. Create .env and .gitignore

         **Add the content below in .env**
        
         VITE_API_URL=https://api.yourdomain.co.za
         VITE_COGNITO_CLIENT_ID=your_cognito_client_id
         VITE_COGNITO_USER_POOL_ID=your_user_pool_id
        
         **Add the content below in .gitignore**
      
         /node_modules
         /dist
         .env
        
5. Start development server
         ```bash
         npm run dev
         ```
---
### 🚀 Deployment Guide

Follow these steps to deploy **Steinalytics Frontend** to AWS with automated CI/CD:

1. Create S3 Bucket + CloudFront Distribution
         - Create an **S3 bucket** to host the Vite build files (`dist/`).  
         - Configure a **CloudFront distribution** pointing to the S3 bucket for CDN caching and HTTPS delivery.  
         - Optionally, use **Route 53** to map your domain (`www.yourdomain.com`) to the CloudFront distribution.  

2. Configure GitHub Secrets
         Add the following secrets in your repository (`Settings > Secrets and variables > Actions`):
         
         - `AWS_ACCESS_KEY_ID` → IAM user access key  
         - `AWS_SECRET_ACCESS_KEY` → IAM user secret key  
         - `AWS_REGION` → e.g., `us-east-1`  
         - `S3_BUCKET_NAME` → your deployment bucket name  
         - `CLOUDFRONT_DISTRIBUTION_ID` → your CloudFront distribution ID  

3. Push Project to GitHub
         Commit and push your project to the `main` branch to trigger the GitHub Actions workflow:
         
         ```bash
         # Initialize git (if not already done)
         git init
         
         # Add all files
         git add .
         
         # Commit changes
         git commit -m "Initial commit for Steinalytics Frontend"
         
         # Add your GitHub repository as remote
         git remote add origin https://github.com/<your-username>/<your-repo>.git
         
         # Push to GitHub
         git branch -M main
         git push -u origin main
         ```
---       
## 🏗️ Architecture & Deployment

```text
+------------------------+          HTTPS Requests           +---------------------+
|  Steinalytics          |  -------------------------------->|  Steinalytics       |
|  Frontend (Vite+React) |                                   |  Backend (FastAPI)  |
|  - Hosted on S3        |                                   |  - Hosted on EC2/ECS|
|  - CloudFront CDN      |                                   |  - Auth via Cognito |
+------------------------+                                   +---------------------+
         |
         v
+---------------------+
| End Users           |
| Access via Browser  |
+---------------------+
