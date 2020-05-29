import userController from '../../src/controllers/user';
import {mockRequest, mockResponse} from "../lib/test-utils";

jest.mock("../../src/models/user.js");
jest.mock("../../src/models/merchant.js");
jest.unmock('lodash/isEmpty');
jest.unmock('lodash/pick');
jest.setTimeout(300);

import {UserModel} from '../../src/models/user';
import {MerchantModel} from "../../src/models/merchant";
import {VisitModel} from "../../src/models/visit";

describe('user controller', () => {
    describe('post endpoint', () => {
        it('should 400 for invalid merchant data', async () => {
            const req = mockRequest();
            req.body = null;
            const res = mockResponse();

            await userController.post(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should post data', async () => {
            const visitResult = {visitId: 123, timestamp: 456};
            const req = mockRequest({userId: 12});
            req.body = {
                merchant: {
                    merchantId: '123',
                    merchantName: 'mer name'
                }
            };
            const res = mockResponse();
            UserModel.findOneAndUpdate = jest.fn().mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    save: jest.fn(),
                    visits: []
                }),
            });

            MerchantModel.findOneAndUpdate = jest.fn().mockReturnValue({});
            jest.spyOn(VisitModel.prototype, 'save').mockImplementation(() => visitResult);

            await userController.post(req, res);

            expect(res.json).toHaveBeenCalledWith(visitResult);
        });
    });

    describe('getByUserIdAndSearch', () => {
        it('should return 404 for no userId', async () => {
            const req = mockRequest({});
            const res = mockResponse();

            await userController.getByUserIdAndSearch(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should return 404 for no user found', async () => {
            UserModel.findOne = jest.fn().mockReturnValue({
                populate: jest.fn().mockReturnValue(null)
            });

            const req = mockRequest({userId: 1});
            const res = mockResponse();

            await userController.getByUserIdAndSearch(req, res);

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
            UserModel.findOne = jest.fn().mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    visits: [response]
                })
            });

            const req = mockRequest({
                userId: 1
            });
            req.query = {
                searchString: null
            }
            const res = mockResponse();

            await userController.getByUserIdAndSearch(req, res);

            expect(res.json).toHaveBeenCalledWith([response]);
        });

        it('should return json data with searchString', async () => {
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
            UserModel.findOne = jest.fn().mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    visits: [response]
                })
            });

            const req = mockRequest({
                userId: 1
            });
            req.query = {
                searchString: 'ame'
            }
            const res = mockResponse();

            await userController.getByUserIdAndSearch(req, res);

            expect(res.json).toHaveBeenCalledWith([response]);
        });
    });
});
