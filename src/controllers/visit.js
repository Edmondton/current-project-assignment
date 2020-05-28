import pick from 'lodash/pick';
import { VisitModel } from '../models/visit';

async function get(req, res) {
    if (!req.params.visitId)
        return res.status(400).send('Invalid visitId.');

    try {
        const result = await VisitModel.findOne({ visitId: req.params.visitId })
            .populate('merchant user');
        const fields = [
            'visitId',
            'timestamp',
            'merchant.merchantId',
            'merchant.merchantName',
            'user.userId'
        ]

        if (!result) {
            return res.status(404).send('Not found')
        }
        res.json(pick(result, fields));
    } catch(err) {
        console.error(err);
        res.status(500).send(err.errors);
    }
}

export default {
    get
}
