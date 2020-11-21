import * as express from 'express';
import { LocationController } from '../controllers/location';
import * as papa from 'papaparse';
import { locationrouter } from './location';

const app = express();

app.post('/', (req, res, next) => {
    LocationController.getInstance()
    .setVisualizationForDB()
    .then(msg =>{
        res.status(200).json({
            message: 'Query executed correctly',
            content: msg
        });
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error in query execution',
            error: err
        });
    });
});

app.get('/t', (req, res, next) => {
    LocationController.getInstance()
    .getVisualizationInfo(Number(req.query.limit))
    .then(result => {
        const cleanResult: any[] = [];
        result.forEach(loc => {
            cleanResult.push({ latitude: loc.latitude, longitud: loc.longitude, count: loc.count});
        });
        const csv = papa.unparse(cleanResult);
        res.status(200).send(csv);
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error in query execution',
            error: err
        });
    });
});

export { app as visualizationrouter };