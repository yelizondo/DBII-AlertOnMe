import * as express from 'express';
// import { ArticlesController } from '../controllers/articles'

const app = express();

app.post('/', (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        message: 'Articles generated'
    });
});

export { app as locationrouter };