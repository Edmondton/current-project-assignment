import pick from 'lodash/pick'
import isNil from 'lodash/isNil'

import { UserModel } from '../models/user';
import { MerchantModel } from '../models/merchant';
import { VisitModel } from '../models/visit';

async function findMerchantOrCreate(merchantId, merchantName) {
    return MerchantModel.findOneAndUpdate({merchantId, merchantName}, {}, {
        new: true, upsert: true
    });
}

export async function createVisit(merchant, user) {
    const visit = new VisitModel({
        merchant: merchant._id, user: user._id
    })
    return visit.save()
}

async function findUserOrCreate(userId, populateOptions = "visits", options = null) {
    return UserModel.findOneAndUpdate({ userId }, {}, options).populate(populateOptions)
}

async function getByUserIdAndSearch(req, res) {
    const userId = req.params.userId;

    if (isNil(userId)) {
        return res.status(400).send('Invalid userId.');
    }

    try {
        const user = await UserModel.findOne({ userId }, { new: false, upsert: false })
            .populate("visits visits.user visits.merchant");

        if (user) {
            const searchText = req.query.searchString
            let visits = user.visits || [];
            if (searchText) {
                const regex = new RegExp(searchText, "ig");
                visits = visits.filter(v => regex.test(v.merchant.merchantName))
            }
            const fields = ['visitId', 'timestamp', 'merchant.merchantId', 'merchant.merchantName', 'user.userId'];
            const response = visits.map(v => {
                return pick(v, fields)
            });
            res.json(response)
        } else {
            res.status(404).send('User not found')
        }
    } catch(err) {
        console.error(err);
        res.status(500).send(err.errors);
    }

}

async function post(req, res) {
    const data = req.body || {};

    if (isNil(data.merchant) || isNil(data.merchant.merchantId)) {
        return res.status(400).send('Invalid merchantId.');
    } else if (isNil(data.merchant.merchantName)) {
        return res.status(400).send('Invalid merchantName.');
    } else if (isNil(req.params.userId)) {
        return res.status(400).send('Invalid userId.');
    }

    const merchantId = data.merchant.merchantId;
    const merchantName = data.merchant.merchantName;

    try {
        const user = await findUserOrCreate(req.params.userId, "visits", {
            new: true, upsert: true
        });
        const merchant = await findMerchantOrCreate(merchantId, merchantName);
        const visit = await createVisit(merchant, user);
        if (visit) {
            if (user.visits) {
                user.visits.push(visit);
            } else {
                user.visits = [visit];
            }
        }
        await user.save();
        res.json({ visitId: visit.visitId, timestamp:visit.timestamp });
    } catch(err) {
        console.error(err);
        res.status(500).send(err.errors);
    }
}

export default {
    post,
    getByUserIdAndSearch
}
