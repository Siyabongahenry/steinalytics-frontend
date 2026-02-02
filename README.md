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

## ✨ Features
- Built with **Vite + ReactJS** for fast builds and hot module replacement  
- Authentication via **AWS Cognito** (integrated with backend)  
- Hosted on **Amazon S3** with **CloudFront CDN** for global delivery  
- Automated deployments via **GitHub Workflows** (CI/CD pipeline)  
- Secure communication with backend APIs over HTTPS  

---

## 📦 Installation (Local Development)

```bash
# Clone the repository
git clone https://github.com/Siyabongahenry/steinalytics-frontend.git
cd steinalytics-frontend

# Install dependencies
npm install

# Create .env and .gitignore

# Add the content below in .env
VITE_API_URL=https://api.yourdomain.co.za
VITE_COGNITO_CLIENT_ID=your_cognito_client_id
VITE_COGNITO_USER_POOL_ID=your_user_pool_id

# Add the content below in .gitignore
/node_modules
/dist
.env

```text
+---------------------+          HTTPS Requests          +---------------------+
|  Steinalytics       |  ----------------------------->  |  Steinalytics       |
|  Frontend (Vite+React) |                                |  Backend (FastAPI)  |
|  - Hosted on S3     |                                   |  - Hosted on EC2/ECS|
|  - CloudFront CDN   |                                   |  - Auth via Cognito |
+---------------------+                                   +---------------------+
         |
         v
+---------------------+
| End Users           |
| Access via Browser  |
+---------------------+


```

# Start development server
npm run dev
