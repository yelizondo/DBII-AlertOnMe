import * as express from 'express';
import { LocationController } from '../controllers/location';
import * as papa from 'papaparse';

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

app.get('/', (req, res, next) => {
    const defaultLimit = 5;
    LocationController.getInstance()
    .getVisualizationInfo(Number(req.query.limit || defaultLimit))
    .then(result => {
        const csv = papa.unparse(result);
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