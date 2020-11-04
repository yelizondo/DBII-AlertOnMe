import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const locationSchema = new Schema({
    guid: String,
    latitude: Number,
    longitude: Number,
    canton: String,
    timestamp: Date
});

export const Location = mongoose.model('location', locationSchema);