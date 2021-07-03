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
          '@auth': './src/auth',
          '@controllers': './src/api/controllers',
          '@env': './src/environment',
          '@lib': './src/lib',
          '@models': './src/api/models',
          '@routers': './src/api/routers',
          '@services': './src/services',
          Types: './src/types'
        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
}
