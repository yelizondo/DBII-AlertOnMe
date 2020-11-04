import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const tourSchema = new Schema({
    name: String,
    schedule: [{
        week_day:String,
        times:[Date]
    }],
    date: Date,
    duration: String,
    bike_adult_price: Number,
    bike_child_price: Number,
    child_seat_price: Number,
    child_trailer_price: Number,
    basket_price: Number,
    tagalong_price: Number
});

export const Tour = mongoose.model('Tour', tourSchema);