import { Logger } from "../common";
import { Location, Intersection } from "../models";

export class VisualizationController {
    private static instance: VisualizationController;
    private log: Logger;

    private constructor() {
        this.log = new Logger();
    }

    public setVisualizationForDB() {
        return Location.aggregate(
            [
                {
                    $project: {
                        "canton" : true,
                        "location": true
                    }
                },
                {
                    $group: {
                        _id: {location: "$location"},
                        canton: {$first: "$canton"}
                    }
                }
            ], (err,result) => {
                result.forEach((myDoc) =>{
                    const canton = myDoc.canton;
                    const longitude = myDoc._id.location.coordinates[0];
                    const latitude = myDoc._id.location.coordinates[1];
                    const intersectionCount = Location.find(
                        {
                            location:
                            { $near:
                                {
                                    $geometry : { type: "Point", coordinates: myDoc._id.location.coordinates },
                                    $minDistance: 0,
                                    $maxDistance: 10
                                }
                            }
                        }
                    ).exec((error, findDocuments) => {
                        const lenght = findDocuments.length;
                        Intersection.findOneAndUpdate(
                            {longitude, latitude, canton},
                            { count: lenght },
                            { upsert: true, new: true, setDefaultsOnInsert: true },
                            (e, res) => {
                                if (e) return;
                            }
                        );
                    });
                });
            }
        )
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