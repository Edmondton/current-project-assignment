import visitController from '../../src/controllers/visit';
import { mockRequest, mockResponse } from "../lib/test-utils";

jest.mock("../../src/models/visit.js");

import { VisitModel } from '../../src/models/visit.js'

describe('visit controller GET', () => {
    it('should return 404 for no visitId param', () => {
        const req = mockRequest({});
        const res = mockResponse();

        visitController.get(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 404 for no visitId found', async () => {
        VisitModel.findOne = jest.fn().mockReturnValue({
            populate: jest.fn().mockReturnValue(null)
        });

        const req = mockRequest({visitId: 1});
        const res = mockResponse();

        await visitController.get(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should return json data', async () => {
        const response = {
            visitId: 1,
            timestamp: 2,
            merchant: {
                merchantId: 3,
                merchantName: 'name'
            },
            user: {
                userId: 5
            }
        }
        VisitModel.findOne = jest.fn().mockReturnValue({
            populate: jest.fn().mockReturnValue(response)
        });

        const req = mockRequest({ visitId: 1 });
        const res = mockResponse();

        await visitController.get(req, res);

        expect(res.json).toHaveBeenCalledWith(response);
    })
});
