# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json ./

# Install dependencies
#RUN npm install --legacy-peer-deps
RUN npm i -g pnpm
RUN pnpm i 

# Copy application files
COPY . .

# Build the application
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
RUN pnpm build

# Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app
RUN npm i -g pnpm 

# Copy built application from builder
COPY --from=builder /app .

# Set runtime environment variable
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

# Expose port
EXPOSE 3000

# Run the application
CMD ["pnpm", "start"]
