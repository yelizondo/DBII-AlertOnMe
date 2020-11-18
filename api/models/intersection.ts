import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const intersectionSchema = new Schema({
    latitude: Number,
    longitude: Number,
    count: Number
});

export const Intersection = mongoose.model('intersection', intersectionSchema);