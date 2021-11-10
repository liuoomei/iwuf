import { LogLevel } from 'fastify'
import { isProduction } from './env'

const prodLoggerConf = {
  level: 'warn',
  timestamp: () => `,"time":"${new Date(Date.now()).toLocaleString()}"`,
  formatters: {
    level: (label: LogLevel) => ({ log: { level: label } })
  }
}

const devLoggerConf = {
  level: 'trace',
  prettyPrint: {
    colorize: true,
    ignore: 'pid,hostname',
    translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
    singleLine: true
  }
}

export const loggerConf = isProduction ? prodLoggerConf : devLoggerConf
