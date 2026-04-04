# Deployment Instructions

## Overview
This document outlines comprehensive deployment instructions for the **betc-edu-pro-forge** repository across different environments: production, staging, and development.

## Environments
### Production
- Ensure the production environment mirrors the necessary configurations for scalability and reliability.

### Staging
- The staging environment should replicate the production environment closely but allows for testing before pushing to production.

### Development
- The development environment is for testing features in a controlled environment before moving to staging.

## Docker Setup
1. **Build the Docker Image**:
   ```bash
   docker build -t betc-edu-pro-forge .
   ```
2. **Run the Docker Container**:
   ```bash
   docker run -d -p 80:80 --name betc-app betc-edu-pro-forge
   ```

## Database Migrations
1. **Run Migrations**:
   ```bash
   docker exec -it betc-app php artisan migrate --env=production
   ```
   - Use `--env=staging` or `--env=development` accordingly for other environments.

## Environment Configuration
- Set environment variables in the `.env` file:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_db_name
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   ```

## Health Checks
- Implement health check endpoints to monitor the application health (e.g. `/health`).

## Monitoring
- Utilize tools like Prometheus and Grafana for real-time monitoring of the application.

## Scaling
- Use Kubernetes or Docker Swarm for scaling according to your application's needs.

## Backup and Disaster Recovery Procedures
1. **Database Backups**:
   ```bash
   docker exec -it betc-app mysqldump -u your_db_user -p your_db_name > backup.sql
   ```
2. **Disaster Recovery**:
   - Ensure regular backups and document recovery steps to restore service quickly in case of failure.

**Note**: Always test deployment and recovery procedures in a staging environment before production deployment.