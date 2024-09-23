"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentServices = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const booking_model_1 = require("../booking/booking.model");
const payment_utlis_1 = require("./payment.utlis");
// eslint-disable-next-line no-unused-vars
const confirmPayment = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedResponse = yield (0, payment_utlis_1.verifyPayment)(transactionId);
    let result, message;
    if (verifiedResponse && verifiedResponse.pay_status === 'Successful') {
        result = yield booking_model_1.Booking.findOneAndUpdate({ transactionId }, {
            paymentStatus: 'Paid',
            paymentConfirmationDate: new Date(),
        });
        message =
            'Successfully Paid!<br>Thank you for your payment. You will receive a confirmation email shortly. Please check your inbox for the details.';
    }
    else {
        message =
            'Payment Failed!<br>Unfortunately, your payment was not successful. Please try again or contact support if the issue persists.';
    }
    const filePath = (0, path_1.join)(__dirname, '../../views/confirmation.html');
    let template = (0, fs_1.readFileSync)(filePath, 'utf8');
    template = template.replace('{{message}}', message);
    return template;
});
exports.PaymentServices = {
    confirmPayment,
};
