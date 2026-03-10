/**
 * PM2 ecosystem – run: pm2 start ecosystem.config.cjs
 * Commands: pm2 start | stop | restart | logs
 */
module.exports = {
  apps: [
    {
      name: 'cfmfence-api',
      script: 'api/email.js',
      interpreter: 'node',
      env_file: '.env',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
    },
  ],
};
