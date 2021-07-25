module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
          esmodules: true
        }
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
          '@services': './src/services',
          '@type': './src/types'
        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
}
