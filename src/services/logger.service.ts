import Koa from 'koa'
import logger from 'koa-logger'

/**
 * Logger service implementation.
 * Useful for dependency injection.
 * Can swap any logger implementation here.
 */
export class LoggerService {
    static getLogger(): Koa.Middleware {
        return logger()
    }
}
