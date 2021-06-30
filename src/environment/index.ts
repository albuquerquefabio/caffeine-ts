import development from './development'
import production from './production'
const env = process.env.NODE_ENV
const environment = env && env === 'production' ? production : development
export default environment
