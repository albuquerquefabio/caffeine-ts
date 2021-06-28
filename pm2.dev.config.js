module.exports = {
  apps: [
    {
      name: 'caffeine-dev',
      script: './src/index.ts',
      watch: ['src/**/*.{ts,js,yaml}'],
      node_args: ['-r', 'tsconfig-paths/register'],
      exec_interpreter: 'ts-node-dev',
      env: {
        NODE_ENV: 'development'
      },
      args: ['--color']
    }
  ]
}
