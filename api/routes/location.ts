import * as express from 'express';
import { LocationController } from '../controllers/location';

const app = express();

app.post('/', (req, res, next) => {
    LocationController.getInstance()
    .insertLocation(req.query.guid as string, Number(req.query.latitude), Number(req.query.longitude), req.query.canton as string)
    .then(msg => {
        res.status(200).json({
            message: 'Articles generated'
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err
        });
    });
});

app.post('/test', (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        message: 'sent'
    });
});

export { app as locationrouter };