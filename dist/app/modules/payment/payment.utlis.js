"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.initiatePayment = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const initiatePayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId, price, customerName, customerEmail, customerAddress, customerPhone, serviceName, startTime, } = paymentData;
    try {
        const response = axios_1.default.post(config_1.default.payment_url, {
            store_id: config_1.default.store_id,
            signature_key: config_1.default.signature_key,
            tran_id: transactionId,
            //   success_url: `http://localhost:${config.port}/api/payment/confirmation?transactionId=${transactionId}&status=success`,
            success_url: `https://shiny-car-washing-backend.vercel.app/api/payment/confirmation?transactionId=${transactionId}&status=success`,
            //   fail_url: `http://localhost:${config.port}/api/payment/confirmation?status=fail`,
            fail_url: `https://shiny-car-washing-backend.vercel.app/api/payment/confirmation?status=fail`,
            cancel_url: 'https://shiny-car-washing-service.netlify.app',
            amount: price,
            currency: 'BDT',
            desc: serviceName + ' is booked at ' + startTime,
            cus_name: customerName,
            cus_email: customerEmail,
            cus_phone: customerPhone,
            cus_add1: customerAddress,
            cus_add2: 'N/A',
            cus_city: 'N/A',
            cus_country: 'N/A',
            cus_postcode: '',
            payment_method: 'online',
            type: 'json',
        });
        return (yield response).data;
    }
    catch (err) {
        throw new AppError_1.default(401, 'Payment initiation failed!');
    }
});
exports.initiatePayment = initiatePayment;
const verifyPayment = (tnxId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(config_1.default.payment_verification_url, {
            params: {
                store_id: config_1.default.store_id,
                signature_key: config_1.default.signature_key,
                request_id: tnxId,
                type: 'json',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.FAILED_DEPENDENCY, 'Payment initiated failed.');
    }
});
exports.verifyPayment = verifyPayment;
