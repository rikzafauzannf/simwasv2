# Gunakan image Node.js versi LTS
FROM node:18-alpine

# Set build-time argument
ARG API_BASE_URL

# Set environment variable for runtime
ENV NEXT_PUBLIC_API_ENDPOINT=${API_BASE_URL}

# Tentukan direktori kerja dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh proyek ke dalam container
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Ekspos port untuk aplikasi
EXPOSE 3000

# Perintah default untuk menjalankan aplikasi
CMD ["npm", "start"]
