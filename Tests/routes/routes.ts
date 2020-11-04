import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Logger } from '../common';

class Routes {

    public express: express.Application;
    public logger: Logger;

    constructor() {
        this.express = express();
        this.logger = new Logger();

        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        // this.express.use('/tours', toursrouter);
        // this.logger.info("Tour route loaded");
    }
}

export default new Routes().express;

