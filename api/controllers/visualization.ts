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
                        "dotw" : true,
                        "location": true
                    }
                },
                {
                    $group: {
                        _id: {location: "$location"},
                        canton: {$first: "$canton"}
                    }
                }
            ]
        ).exec((err, result) => { // ! Error
            result.forEach((myDoc) =>{
            let canton = myDoc.canton;
            let longitude = myDoc._id.location.coordinates[0];
            let latitude = myDoc._id.location.coordinates[1];
            let intersectionCount = result.find( // ! Aqui empieza el error
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
            ).estimatedDocumentCount((err, count) => {
                Intersection.findOneAndUpdate(
                    {longitude, latitude, canton},
                    { count },
                    { upsert: true, new: true, setDefaultsOnInsert: true },
                    (e, result) => {
                        if (e) return;
                    }
                );
            });
        })})
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