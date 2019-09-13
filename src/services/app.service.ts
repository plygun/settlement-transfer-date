import { Server } from 'http'
import Koa from 'koa'
import Helmet from 'koa-helmet'
import Cors from 'koa2-cors'
import { LoggerService } from './logger.service'
import { RouterService } from './router.service'

export class AppService {
    private static app: any

    static createApplication(): any {
        this.createInstance()
        this.registerMiddleware()

        return this.app
    }

    static getApplication(): any {
        return this.app
    }

    private static createInstance() {
        // add WebSocket support
        this.app = new Koa()
    }

    private static registerMiddleware() {
        this.app.use(Helmet())

        // logger middleware (only for dev environment)
        if (process.env.NODE_ENV === 'development') {
            this.app.use(LoggerService.getLogger())
        }

        // CORS rules
        this.app.use(Cors({origin: 'http://localhost'}))

        // error handler
        this.app.use(async (ctx, next) => {
            try {
                await next()
            } catch (err) {
                ctx.status = err.status || err.code
                ctx.body = {
                    success: false,
                    message: err.message,
                }
            }
        })

        // register response body parser
        this.app.use(RouterService.getBodyParser())

        // register http routes
        this.app.use(RouterService.getRoutes())
    }

    static listen(port: number): Server {
        // create server and listen to connections
        return this.app.listen(port, () => console.log(`Server is running on port ${port}`))
    }
}
