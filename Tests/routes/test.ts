import * as express from 'express';
import { Location } from '../models/location';

const app = express();

const cantones = ["Pérez Zeledón", "Escazú", "San Rafael"];

app.post('/', (req, res, next) => {
    const newLocation = new Location({
        guid: "_ASDFLKSDF82323LKJASDF8823",
        latitude: 2234534,
        longitude: 4554223,
        canton: cantones[Math.floor(Math.random() * Math.floor(3))],
        timestamp: Date.now()
    });
    newLocation.save();
});

export { app  as testrouter}