import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const intersectionSchema = new Schema({
    latitude: Number,
    longitude: Number,
    count: Number,
    canton: String
});

export const Intersection = mongoose.model('intersection', intersectionSchema);