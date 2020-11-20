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
    LocationController.getInstance()
    .getVisualizationInfo(Number(req.query.limit))
    .then(result => {
        const csv = papa.unparse(result);
        console.log(csv);
        res.status(200).sendFile(csv);
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error in query execution',
            error: err
        });
    });
});

export { app as visualizationrouter };