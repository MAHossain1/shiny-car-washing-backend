"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewZodValidationSchema = void 0;
const zod_1 = require("zod");
const createReviewValidation = zod_1.z.object({
    body: zod_1.z.object({
        reviewText: zod_1.z.string({
            required_error: 'Review Text is required.',
        }),
        ratting: zod_1.z.number({
            required_error: 'Ratting is required.',
        }),
    }),
});
exports.ReviewZodValidationSchema = {
    createReviewValidation,
};
