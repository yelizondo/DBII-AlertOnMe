import * as express from 'express';
import { LocationController } from '../controllers/location';

const app = express();

app.post('/', (req, res, next) => {
    LocationController.getInstance()
    .setVisualizationForDB()
    .then(msg =>{
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

app.get('/', (req, res, next) => {
    const defaultLimit = 5;
    LocationController.getInstance()
    .getVisualizationInfo(Number(req.query.limit || defaultLimit))
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error in query execution'
        });
    });
});

export { app as visualizationrouter };