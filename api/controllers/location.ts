import { Logger } from "../common";
import { Location, Intersection } from "../models";

export class LocationController {
    private static instance: LocationController;
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
        return Location.find().distinct('location', (error, locations) => {
            locations.forEach((myDoc) => { console.log(1);
                const longitude = myDoc.coordinates[0];
                const latitude = myDoc.coordinates[1];
                const intersectionCount = Location.find({
                    location: {
                        $near : {
                            $geometry: { type: "Point", coordinates: myDoc.coordinates},
                            $minDistance: 0,
                            $maxDistance: 10
                        }
                    }
                }).count();
                Intersection.update({ longitude, latitude },
                {
                    $set: {
                        count: intersectionCount
                    }
                },
                {
                    upsert: true
                });
            });
        });
    }

    public getVisualizationInfo(pLimit:number) {
        return Intersection.aggregate([
            { $sort: { count: -1}},
            { $limit: pLimit}
        ])
    }

    public static getInstance() : LocationController {
        if (!this.instance) {
            this.instance = new LocationController();
        }
        return this.instance;
    }
}