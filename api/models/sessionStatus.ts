import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const sessionStatusSchema = new Schema({
    status: Boolean,
    guid: String,
    timestamp: Date
});

export const SessionStatus = mongoose.model('sessionstatus', sessionStatusSchema)