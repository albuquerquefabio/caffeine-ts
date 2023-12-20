module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
          esmodules: true
        },
        loose: true
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@api': './src/api',
          '@auth': './src/auth',
          '@env': './src/environment',
          '@lib': './src/lib',
          '@services': './src/services'
        }
      }
    ]
  ],
  ignore: ['**/*.test.js', '**/*.spec.js', '**/*.test.ts', '**/*.spec.ts', 'node_modules']
}
