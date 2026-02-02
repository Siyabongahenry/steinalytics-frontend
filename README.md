# Steinalytics Frontend

![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![AWS S3](https://img.shields.io/badge/AWS-S3-orange?logo=amazonaws)
![CloudFront](https://img.shields.io/badge/AWS-CloudFront-orange?logo=amazonaws)
![CloudFormation](https://img.shields.io/badge/AWS-CloudFormation-orange?logo=amazonaws)
![GitHub Actions](https://img.shields.io/badge/GitHub-Actions-blue?logo=githubactions)
![CI/CD](https://img.shields.io/badge/CI/CD-Automated-success?logo=github)

A modern **ReactJS** frontend application for the Steinalytics platform, designed to deliver responsive dashboards and Excel automation tools.  
This project integrates seamlessly with the [Steinalytics Backend](https://github.com/Siyabongahenry/SteinalyticsReportAPI) powered by FastAPI.

---

## ✨ Features
- Built with **ReactJS** for dynamic, responsive UI  
- Authentication via **AWS Cognito** (integrated with backend)  
- Hosted on **Amazon S3** with **CloudFront CDN** for global delivery  
- Automated deployments via **GitHub Workflows** (CI/CD pipeline)  
- Secure communication with backend APIs over HTTPS  

---

## 🏗️ Architecture Overview

```text
+---------------------+          HTTPS Requests          +---------------------+
|  Steinalytics       |  ----------------------------->  |  Steinalytics       |
|  Frontend (ReactJS) |                                   |  Backend (FastAPI)  |
|  - Hosted on S3     |                                   |  - Hosted on EC2/ECS|
|  - CloudFront CDN   |                                   |  - Auth via Cognito |
+---------------------+                                   +---------------------+
         |
         v
+---------------------+
| End Users           |
| Access via Browser  |
+---------------------+
