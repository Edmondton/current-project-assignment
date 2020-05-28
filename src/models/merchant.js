import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';

export const MerchantSchema = new Schema(
    {
        merchantId: {
            type: String,
            trim: true,
            index: true,
            unique: true,
            required: true
        },
        merchantName: {
            type: String,
            trim: true,
            index: true,
            unique: true,
            required: true
        }
    },
    { collections: 'merchants' }
)

MerchantSchema.plugin(bcrypt);
MerchantSchema.plugin(timestamps);
MerchantSchema.plugin(mongooseStringQuery);

MerchantSchema.index({ merchantId: 1, merchantName: 2 });

module.exports = {
    MerchantModel: mongoose.model('Merchant', MerchantSchema),
    MerchantSchema
}
