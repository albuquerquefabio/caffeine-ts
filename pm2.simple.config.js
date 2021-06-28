module.exports = {
  apps: [
    {
      name: 'caffeine-simple',
      script: './build/index.js',
      watch: false,
      log_file: './logs/server-simple.log',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
