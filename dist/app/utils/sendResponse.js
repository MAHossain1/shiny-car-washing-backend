"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const { statusCode, success, message, data: responseData, metadata, error, } = data;
    // Adjust the message and success if data is empty
    const finalSuccess = Array.isArray(responseData) && responseData.length === 0 ? false : success;
    const finalMessage = Array.isArray(responseData) && responseData.length === 0
        ? 'No Data Found'
        : message;
    const responsePayload = {
        success: finalSuccess,
        statusCode,
        message: finalMessage,
        data: responseData || null,
    };
    if (metadata) {
        responsePayload.metadata = metadata;
    }
    if (error) {
        responsePayload.error = error;
    }
    res.status(statusCode).json(responsePayload);
};
exports.default = sendResponse;
