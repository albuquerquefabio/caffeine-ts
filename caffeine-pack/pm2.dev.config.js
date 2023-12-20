module.exports = {
  apps: [
    {
      name: 'caffeine-dev',
      script: './src/index.ts',
      watch: ['src/**/*.{ts,js,yaml}'],
      node_args: ['-r', 'tsconfig-paths/register', "--respawn", "--transpile-only", "--ignore-watch", "node_modules", "--no-notify"],
      exec_interpreter: 'ts-node-dev',
      env: {
        NODE_ENV: 'development'
      },
      args: ['--color']
    }
  ]
}

