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

app.get('/', (req, res, next) => {
    const defaultLimit = 5;
    if (req.query.canton) {
        VisualizationController.getInstance()
        .getVisualizationInfo(Number(req.query.limit || defaultLimit), req.query.canton as string)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error in query execution'
            });
        });
    } else {
        res.status(400).json({
            message: "Invalid query"
        });
    }
});

export { app as visualizationrouter };