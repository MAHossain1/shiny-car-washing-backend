"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const mongoose_1 = require("mongoose");
const slot_constant_1 = require("./slot.constant");
const slotSchema = new mongoose_1.Schema({
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'service',
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    isBooked: {
        type: String,
        enum: Object.keys(slot_constant_1.BookedOption),
    },
}, {
    timestamps: true,
});
exports.Slot = (0, mongoose_1.model)('Slot', slotSchema);
