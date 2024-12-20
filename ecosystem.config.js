// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'simwastasik', // Ganti dengan nama aplikasi Anda
      script: 'node_modules/.bin/next', // Jalankan Next.js
      args: 'start', // Argumen untuk menjalankan aplikasi
      instances: 'max', // Menggunakan semua core CPU
      exec_mode: 'cluster', // Mode cluster untuk meningkatkan performa
      env: {
        NODE_ENV: 'development', // Set environment ke production
      },
      watch: false, // Nonaktifkan watch jika tidak diperlukan
    },
  ],
};
