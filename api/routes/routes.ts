import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Logger } from '../common';
import { locationrouter, visualizationrouter } from './';
class Routes {

    public express: express.Application;
    public logger: Logger;

    constructor() {
        this.express = express();
        this.logger = new Logger();

        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.use('/location', locationrouter);
        this.express.use('/visualization', visualizationrouter);
    }
}

export default new Routes().express;