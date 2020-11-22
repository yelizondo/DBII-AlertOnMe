import { Logger } from "../common";
import { Location, Intersection } from "../models";

export class VisualizationController {
    private static instance: VisualizationController;
    private log: Logger;

    private constructor() {
        this.log = new Logger();
    }

    public insertLocation(pGUID:string, pLatitud:number, pLongitud:number, pCanton:string) {
        const date = new Date();
        const newLocation = new Location({
            guid: pGUID,
            location: {
                type: 'Point',
                coordinates: [pLongitud, pLatitud]
            },
            canton: pCanton,
            timestamp: date,
            dotw: date.getDay()
        });
        return newLocation.save();
    }

    public setVisualizationForDB() {
        return Location.distinct('location', (error, locations) => {
            locations.forEach((myDoc) => {
                const longitude = myDoc.coordinates[0];
                const latitude = myDoc.coordinates[1];
                const canton = myDoc.canton;
                Location.find({
                    location: {
                        $near : {
                            $geometry: { type: "Point", coordinates: myDoc.coordinates },
                            $minDistance: 0.1,
                            $maxDistance: 10
                        }
                    }
                }).estimatedDocumentCount((err, count) => {
                    Intersection.findOneAndUpdate(
                        {longitude, latitude},
                        { count, canton },
                        { upsert: true, new: true, setDefaultsOnInsert: true },
                        (e, result) => {
                            if (e) return;
                        }
                    );
                });
            });
        });
    }

    public getVisualizationInfo(pLimit:number, pCanton:string) {
        return Intersection.aggregate([
            { $match: { canton: pCanton }},
            { $sort: { count: -1}},
            { $limit: pLimit}
        ])
    }

    public static getInstance() : VisualizationController {
        if (!this.instance) {
            this.instance = new VisualizationController();
        }
        return this.instance;
    }
}