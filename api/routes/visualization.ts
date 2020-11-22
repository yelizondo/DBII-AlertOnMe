import * as express from 'express';
import { VisualizationController } from '../controllers';

const app = express();

app.post('/', (req, res, next) => {
    VisualizationController.getInstance()
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

app.get('/map', (req, res, next) => {
    const defaultLimit = 5;
    VisualizationController.getInstance()
    .getMapVisualizationInfo(Number(req.query.limit || defaultLimit))
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error in query execution'
        });
    } else {
        res.status(400).json({
            message: "Invalid query"
        });
    }
});

app.get('/heatMap', (req, res, next) => {
    VisualizationController.getInstance()
    .getActivityVisualizationInfo(String(req.query.canton)) // ! Si se decide no poner match hay que quitar
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