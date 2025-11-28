# Multi-stage build for Angular app

# Stage 1: Build the Angular app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the app with nginx
FROM nginx:alpine

# Copy built app from build stage
COPY --from=build /app/dist/marketplace /usr/share/nginx/html

# Copy custom nginx config if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
