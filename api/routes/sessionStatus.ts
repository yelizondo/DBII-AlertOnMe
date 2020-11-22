import * as express from 'express';
import { SessionStatusController } from '../controllers';

const app = express();

app.post('/', (req, res, next) => {
    SessionStatusController.getInstance()
    .insertSessionStatus(req.query.guid as string, Boolean(req.query.status))
    .then(msg => {
        res.status(200).json({
            message: 'Query executed correctly'
        });
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error in query execution'
        });
    });
});

export { app as sessionstatusrouter };