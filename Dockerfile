# ==============================================================================
# Multi-Stage Dockerfile for TechPioneers Web Application
# ==============================================================================
# This Dockerfile supports both local development and production deployments
# using Docker build targets.
#
# Usage:
#   Local Development:  docker build --target development -t techpioneers:dev .
#   Production Build:   docker build --target production -t techpioneers:prod .
#
# The production stage is optimized for Google Cloud Run deployment.
# ==============================================================================

# ==============================================================================
# Stage 1: Base - Common dependencies for all stages
# ==============================================================================
FROM node:24-slim AS base

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# ==============================================================================
# Stage 2: Development - Local development with hot-reloading
# ==============================================================================
FROM base AS development

# Install all dependencies (including devDependencies for development tools)
RUN npm install

# Copy application source code
# Note: In docker-compose, volumes will override these for hot-reloading
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start development server with host flag for Docker networking
CMD ["npm", "run", "dev", "--", "--host"]

# ==============================================================================
# Stage 3: Builder - Build production assets
# ==============================================================================
FROM base AS builder

# Install all dependencies (build requires devDependencies like Vite)
RUN npm ci

# Copy application source code
COPY . .

# Build the application for production
RUN npm run build

# ==============================================================================
# Stage 4: Production - Optimized production runtime (Google Cloud Run)
# ==============================================================================
FROM nginx:alpine AS production

# Install wget for health checks and apache2-utils for htpasswd
RUN apk add --no-cache wget apache2-utils

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy production nginx configuration (public - no authentication)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose HTTP port (Cloud Run uses PORT env var, defaults to 80)
EXPOSE 80

# Health check for Cloud Run and container orchestration
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/health || exit 1

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

# ==============================================================================
# Stage 5: Protected - Production runtime with HTTP Basic Authentication
# ==============================================================================
FROM nginx:alpine AS protected

# Install wget for health checks and apache2-utils for htpasswd
RUN apk add --no-cache wget apache2-utils

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy protected nginx configuration (with authentication)
COPY nginx.protected.conf /etc/nginx/nginx.conf

# Create .htpasswd file with default credentials (will be overridden by build args)
ARG AUTH_USERNAME=techpioneers
ARG AUTH_PASSWORD=changeMe2024!
RUN htpasswd -cb /etc/nginx/.htpasswd ${AUTH_USERNAME} ${AUTH_PASSWORD}

# Expose HTTP port (Cloud Run uses PORT env var, defaults to 80)
EXPOSE 80

# Health check for Cloud Run and container orchestration
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/health || exit 1

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

