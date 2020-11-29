import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Logger } from '../common';
import { locationrouter, visualizationrouter, sessionstatusrouter } from './';
class Routes {

    public express: express.Application;
    public logger: Logger;

    constructor() {
        this.express = express();
        this.logger = new Logger();
        this.routes();
    }

    private routes(): void {
        this.express.use('/location', locationrouter);
        this.express.use('/visualization', visualizationrouter);
        this.express.use('/session', sessionstatusrouter);
    }
}

export default new Routes().express;