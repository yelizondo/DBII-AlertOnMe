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

    public static getInstance() : LocationController {
        if (!this.instance) {
            this.instance = new LocationController();
        }
        return this.instance;
    }
}