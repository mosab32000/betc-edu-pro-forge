#!/bin/bash

# Nashmi EduVerse Nexus - Production Deployment Script
# This script handles the complete deployment of the educational platform

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ASCII Art Banner
echo -e "${BLUE}"
cat << "EOF"
    _   __           __               _ ______    __      _    __                    
   / | / /___ ______/ /_  ____ ___   (_) ____/___/ /_  __| |  / /__  _____________ 
  /  |/ / __ `/ ___/ __ \/ __ `__ \ / / __/ / __  / / / /| | / / _ \/ ___/ ___/ _ \
 / /|  / /_/ (__  ) / / / / / / / // / /___/ /_/ / /_/ / | |/ /  __/ /  (__  )  __/
/_/ |_/\__,_/____/_/ /_/_/ /_/ /_//_/_____/\__,_/\__,_/  |___/\___/_/  /____/\___/ 
                                                                                   
    🎓 Advanced Educational Platform - Production Deployment
    🚀 Version 2.0.0 - Comprehensive Learning Ecosystem
EOF
echo -e "${NC}"

# Functions
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

print_step() {
    echo -e "${PURPLE}🔄 $1${NC}"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root for security reasons"
fi

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
    print_status "Environment variables loaded"
else
    print_error ".env file not found. Please create it from .env.example"
fi

# Validate required environment variables
required_vars=(
    "MONGO_ROOT_USERNAME"
    "MONGO_ROOT_PASSWORD" 
    "REDIS_PASSWORD"
    "JWT_SECRET"
    "JWT_REFRESH_SECRET"
    "EMAIL_USER"
    "EMAIL_PASS"
    "OPENAI_API_KEY"
)

print_step "Validating environment variables..."
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        print_error "Environment variable $var is not set"
    fi
done
print_status "All required environment variables are set"

# Check system requirements
print_step "Checking system requirements..."

# Check Docker
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
fi

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
fi

# Check available disk space (minimum 10GB)
available_space=$(df / | awk 'NR==2 {print $4}')
required_space=10485760  # 10GB in KB

if [ "$available_space" -lt "$required_space" ]; then
    print_error "Insufficient disk space. At least 10GB required."
fi

# Check available memory (minimum 4GB)
available_memory=$(free -m | awk 'NR==2{printf "%.0f", $7}')
required_memory=4096  # 4GB in MB

if [ "$available_memory" -lt "$required_memory" ]; then
    print_warning "Low available memory. At least 4GB recommended."
fi

print_status "System requirements check completed"

# Create necessary directories
print_step "Creating necessary directories..."
mkdir -p {logs,backups,uploads,ssl,monitoring/data}
mkdir -p backend/{uploads,logs,assets/xr}
mkdir -p infrastructure/{monitoring/grafana/dashboards,logging}
chmod 755 logs backups uploads
print_status "Directories created"

# Backup existing data if deployment exists
if docker ps -a --format 'table {{.Names}}' | grep -q nashmi; then
    print_step "Existing deployment detected. Creating backup..."
    
    timestamp=$(date +"%Y%m%d_%H%M%S")
    backup_dir="./backups/deployment_backup_$timestamp"
    mkdir -p "$backup_dir"
    
    # Backup MongoDB data
    if docker ps --format 'table {{.Names}}' | grep -q nashmi-mongodb; then
        print_info "Backing up MongoDB data..."
        docker exec nashmi-mongodb mongodump --out /tmp/backup
        docker cp nashmi-mongodb:/tmp/backup "$backup_dir/mongodb"
        print_status "MongoDB backup completed"
    fi
    
    # Backup Redis data
    if docker ps --format 'table {{.Names}}' | grep -q nashmi-redis; then
        print_info "Backing up Redis data..."
        docker exec nashmi-redis redis-cli --rdb /tmp/dump.rdb
        docker cp nashmi-redis:/tmp/dump.rdb "$backup_dir/redis_dump.rdb"
        print_status "Redis backup completed"
    fi
    
    # Backup uploaded files
    if [ -d "backend/uploads" ]; then
        cp -r backend/uploads "$backup_dir/"
        print_status "Uploaded files backup completed"
    fi
    
    print_status "Backup created at $backup_dir"
fi

# Stop existing containers
print_step "Stopping existing containers..."
docker-compose down --remove-orphans
print_status "Existing containers stopped"

# Pull latest images
print_step "Pulling latest base images..."
docker-compose pull --ignore-pull-failures
print_status "Base images updated"

# Build custom images
print_step "Building application images..."
docker-compose build --parallel --compress
print_status "Application images built"

# Run database migrations and setup
print_step "Setting up databases..."

# Start only database services first
docker-compose up -d mongodb redis
print_info "Waiting for databases to be ready..."
sleep 30

# Wait for MongoDB to be ready
print_info "Waiting for MongoDB to initialize..."
timeout=60
while ! docker exec nashmi-mongodb mongosh --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
    timeout=$((timeout-1))
    if [ $timeout -le 0 ]; then
        print_error "MongoDB failed to start within timeout period"
    fi
    sleep 1
done
print_status "MongoDB is ready"

# Wait for Redis to be ready
print_info "Waiting for Redis to initialize..."
timeout=30
while ! docker exec nashmi-redis redis-cli -a "$REDIS_PASSWORD" ping >/dev/null 2>&1; do
    timeout=$((timeout-1))
    if [ $timeout -le 0 ]; then
        print_error "Redis failed to start within timeout period"
    fi
    sleep 1
done
print_status "Redis is ready"

# Start monitoring services
print_step "Starting monitoring services..."
docker-compose up -d prometheus grafana elasticsearch kibana
print_status "Monitoring services started"

# Start application services
print_step "Starting application services..."
docker-compose up -d backend ai-service blockchain-service xr-service
print_info "Waiting for backend services to initialize..."
sleep 45

# Check backend health
print_info "Checking backend service health..."
timeout=60
while ! curl -sf http://localhost:5000/health >/dev/null 2>&1; do
    timeout=$((timeout-1))
    if [ $timeout -le 0 ]; then
        print_error "Backend service failed to start within timeout period"
    fi
    sleep 1
done
print_status "Backend service is healthy"

# Start frontend and proxy
print_step "Starting frontend and proxy services..."
docker-compose up -d frontend nginx
print_status "All services started"

# Run post-deployment setup
print_step "Running post-deployment setup..."

# Create initial admin user if not exists
print_info "Setting up initial admin user..."
docker-compose exec -T backend node -e "
const mongoose = require('mongoose');
const User = require('./src/models/User');
const bcrypt = require('bcryptjs');
const config = require('./src/config');

async function createAdminUser() {
    try {
        await mongoose.connect(config.database.url);
        
        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            const admin = new User({
                email: 'admin@nashmi.edu.jo',
                passwordHash: await bcrypt.hash('Admin123!@#', 12),
                profile: {
                    firstName: 'System',
                    lastName: 'Administrator',
                    displayName: 'Admin'
                },
                role: 'admin',
                status: 'active',
                'security.emailVerified': true
            });
            
            await admin.save();
            console.log('✅ Admin user created successfully');
        } else {
            console.log('ℹ️ Admin user already exists');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Failed to create admin user:', error);
        process.exit(1);
    }
}

createAdminUser();
"

# Setup SSL certificates (if not using Let's Encrypt)
if [ ! -f "nginx/ssl/nashmi.crt" ]; then
    print_info "Generating self-signed SSL certificates for development..."
    mkdir -p nginx/ssl
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout nginx/ssl/nashmi.key \
        -out nginx/ssl/nashmi.crt \
        -subj "/C=JO/ST=Amman/L=Amman/O=Nashmi EduVerse/CN=localhost"
    print_status "SSL certificates generated"
fi

# Perform health checks
print_step "Performing comprehensive health checks..."

services=(
    "mongodb:27017"
    "redis:6379" 
    "backend:5000"
    "ai-service:5001"
    "blockchain-service:5002"
    "xr-service:5003"
    "frontend:3000"
    "prometheus:9090"
    "grafana:3000"
)

for service in "${services[@]}"; do
    service_name=$(echo $service | cut -d: -f1)
    port=$(echo $service | cut -d: -f2)
    
    if docker ps --format 'table {{.Names}}' | grep -q "nashmi-$service_name"; then
        if curl -sf "http://localhost:$port" >/dev/null 2>&1 || \
           nc -z localhost $port >/dev/null 2>&1; then
            print_status "$service_name is running and accessible"
        else
            print_warning "$service_name is running but not accessible on port $port"
        fi
    else
        print_error "$service_name container is not running"
    fi
done

# Display deployment summary
print_step "Deployment completed successfully! 🎉"
echo ""
echo -e "${GREEN}📊 Deployment Summary:${NC}"
echo -e "${CYAN}===========================================${NC}"
echo -e "🌐 Frontend URL:      ${GREEN}https://localhost${NC}"
echo -e "🔧 Backend API:       ${GREEN}http://localhost:5000${NC}"
echo -e "🤖 AI Service:        ${GREEN}http://localhost:5001${NC}"
echo -e "⛓️  Blockchain:        ${GREEN}http://localhost:5002${NC}"
echo -e "🥽 XR Service:        ${GREEN}http://localhost:5003${NC}"
echo -e "📈 Prometheus:        ${GREEN}http://localhost:9090${NC}"
echo -e "📊 Grafana:           ${GREEN}http://localhost:3001${NC}"
echo -e "🔍 Kibana:            ${GREEN}http://localhost:5601${NC}"
echo -e "🏥 Health Check:      ${GREEN}http://localhost:5000/health${NC}"
echo ""
echo -e "${YELLOW}📋 Default Credentials:${NC}"
echo -e "Admin Email: ${GREEN}admin@nashmi.edu.jo${NC}"
echo -e "Admin Password: ${GREEN}Admin123!@#${NC}"
echo -e "Grafana: ${GREEN}admin / ${GRAFANA_ADMIN_PASSWORD:-admin123}${NC}"
echo ""
echo -e "${PURPLE}🛠️  Management Commands:${NC}"
echo -e "View logs: ${CYAN}docker-compose logs -f [service]${NC}"
echo -e "Stop services: ${CYAN}docker-compose down${NC}"
echo -e "Update services: ${CYAN}./scripts/deploy.sh${NC}"
echo -e "Backup data: ${CYAN}./scripts/backup.sh${NC}"
echo ""
echo -e "${GREEN}✅ Nashmi EduVerse Nexus is now ready for educational innovation!${NC}"
echo -e "${BLUE}🎓 Empowering students, teachers, and institutions with cutting-edge technology${NC}"

# Send notification (if webhook is configured)
if [ -n "$SLACK_WEBHOOK_URL" ]; then
    curl -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\"🚀 Nashmi EduVerse Nexus deployed successfully!\\n📅 Environment: $NODE_ENV\\n⏰ Time: $(date)\\n🔗 URL: https://localhost\"}" \
    "$SLACK_WEBHOOK_URL" >/dev/null 2>&1
fi

# Optional: Open browser to application
if command -v xdg-open &> /dev/null; then
    read -p "Open application in browser? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        xdg-open "https://localhost"
    fi
elif command -v open &> /dev/null; then
    read -p "Open application in browser? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open "https://localhost"
    fi
fi

exit 0