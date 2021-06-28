module.exports = {
  apps: [
    {
      name: 'caffeine-dev',
      script: './src/index.ts',
      watch: ['src/**/*.{ts,js,yaml}'],
      node_args: ['-r', 'esm', '-r', 'ts-node/register'],
      exec_interpreter: 'node',
      env: {
        NODE_ENV: 'development'
      },
      args: ['--color']
    }
  ]
}
