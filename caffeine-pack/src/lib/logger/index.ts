import zoya from 'zoya'

const log = {
  // @typecript-eslint/explicit-module-boundary-types
  info: (str: string, context?: any): void => {
    zoya.info(str, context)
  },
  trace: (str: string, context?: any): void => {
    zoya.trace(str, context)
  },
  debug: (str: string, context?: any): void => {
    zoya.debug(str, context)
  },
  success: (str: string, context?: any): void => {
    zoya.success(str, context)
  },
  warn: (str: string, context?: any): void => {
    zoya.warn(str, context)
  },
  error: (str: string, context?: any): void => {
    zoya.error(str, context)
  },
  failed: (str: string, context?: any): void => {
    zoya.failed(str, context)
  },
  fatal: (str: string, context?: any): void => {
    zoya.fatal(str, context)
  }
}
export default log
