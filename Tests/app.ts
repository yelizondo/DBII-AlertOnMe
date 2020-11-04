import * as express from 'express';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes'
import { Logger } from './common';
import * as mongoose from 'mongoose';

class App {

    public express: express.Application;
    private log: Logger;
    private db : any;

    constructor() {
        this.log = new Logger();
        this.connectMongoose();
        this.express = express();
        this.middleware();
        this.routes();
    }

    private connectMongoose() {
        const connectionURL = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
        try {
            mongoose.connect(connectionURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            this.db = mongoose.connection;

            this.db.on('error', () => {
                this.log.error("Can't connect to Mongo");
            });

            this.db.once('open', () => {
                this.log.info("Connected to Mongo");
            });

        } catch (e) {
            this.log.error(e);
        }
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.use('/api', Routes);

        this.express.use('*', (req,res,next) => {
            res.send("Invalid request");
        });
    }
}

export default new App().express;