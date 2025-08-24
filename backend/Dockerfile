# Multi-stage build for production optimization
FROM node:18-alpine AS builder

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat \
    curl

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Production stage
FROM node:18-alpine AS production

# Create app directory
WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache \
    curl \
    python3 \
    py3-pip \
    && addgroup -g 1001 -S nodejs \
    && adduser -S nashmi -u 1001

# Copy built dependencies from builder stage
COPY --from=builder --chown=nashmi:nodejs /app/node_modules ./node_modules

# Copy source code
COPY --chown=nashmi:nodejs src/ ./src/
COPY --chown=nashmi:nodejs package*.json ./

# Create necessary directories
RUN mkdir -p uploads logs assets/xr && \
    chown -R nashmi:nodejs uploads logs assets

# Switch to non-root user
USER nashmi

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Start application
CMD ["node", "src/app.js"]