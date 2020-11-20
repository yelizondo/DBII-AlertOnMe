import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const locationSchema = new Schema({
    guid: String,
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number]
        }
    },
    canton: String,
    timestamp: Date,
    dotw: Number
});

export const Location = mongoose.model('location', locationSchema);