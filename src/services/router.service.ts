import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { routes as ApiRoutes} from '../api/v1/routes'

/**
 * Router service implementation.
 * Useful for dependency injection.
 * Can swap any router implementation here.
 */
export class RouterService {
    static getBodyParser(): Koa.Middleware {
        return bodyParser({
            enableTypes: ['json'],
            jsonLimit: '5mb',
            strict: true,
            onerror: (err, ctx) => {
                ctx.throw('body parse error', 422)
            },
        })
    }

    static getRoutes(): Koa.Middleware {
        return ApiRoutes.routes()
    }
}
