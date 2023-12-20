module.exports = {
  apps: [
    {
      name: 'caffeine-cluster',
      script: './build/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      log_file: './logs/server-cluster.log',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
