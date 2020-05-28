import mongoose, {Schema} from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';
import {v1 as uuidv1} from 'uuid';

const VisitSchema = new Schema(
    {
        visitId: {
            type: String,
            trim: true,
            index: true,
            unique: true,
            default: () => uuidv1()
        },
        timestamp: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000)
        },
        merchant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Merchant'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    { collections: 'visits' },
    {
        timestamps: { timestamp: () => Math.floor(Date.now() / 1000) }
    }
);

VisitSchema.plugin(bcrypt);
VisitSchema.plugin(timestamps);
VisitSchema.plugin(mongooseStringQuery);

VisitSchema.index({ visitId: 1, user: 2, merchant: 3 });

module.exports = {
    VisitModel: mongoose.model('Visit', VisitSchema),
    VisitSchema
}
