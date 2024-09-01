"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Service name is required.'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required'],
    },
    imgUrl: {
        type: String,
        default: 'www.img.com',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Service = (0, mongoose_1.model)('Service', serviceSchema);
