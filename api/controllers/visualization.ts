import { Logger } from "../common";
import { Location, Intersection } from "../models";

export class VisualizationController {
    private static instance: VisualizationController;
    private log: Logger;

    private constructor() {
        this.log = new Logger();
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

    public getMapVisualizationInfo(pLimit:number) {
        return Intersection.aggregate([
            { $sort: { count: -1}},
            { $limit: pLimit}
        ])
    }

    public getActivityVisualizationInfo(){
        return Location.aggregate([
            {
                $project: {
                    "h": {$hour: "$timestamp"},
                    "dotw" : true,
                    "canton" : true
                }
            },
            {
                $group: {
                    _id: {dotw: "$dotw", hour: "$h", canton:"$canton" },
                    count: {$sum:1}
                }
            }
        ])
    }

    public static getInstance() : VisualizationController {
        if (!this.instance) {
            this.instance = new VisualizationController();
        }
        return this.instance;
    }
}