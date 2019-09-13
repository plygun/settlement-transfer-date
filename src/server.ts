import { config } from 'dotenv'
import { AppService } from './services/app.service'

config()
const port = +process.env.APP_PORT || 3000
AppService.createApplication()

// create server and listen to connections
const Server = AppService.listen(port)

export { Server }
