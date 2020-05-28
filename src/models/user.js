import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';
import { VisitSchema } from "./visit";

const UserSchema = new Schema(
    {
        userId: {
            type: String,
            trim: true,
            index: true,
            unique: true,
            required: true
        },
        visits: [VisitSchema]
    },
    { collections: 'users' }
)

UserSchema.plugin(bcrypt);
UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);

UserSchema.index({ userId: 1 });

module.exports = {
    UserModel: mongoose.model('User', UserSchema),
    UserSchema
}
