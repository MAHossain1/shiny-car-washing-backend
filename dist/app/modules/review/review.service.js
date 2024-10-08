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
exports.ReviewServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const review_model_1 = require("./review.model");
const createAReviewIntoDB = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewText, ratting } = payload;
    const user = yield user_model_1.User.findOne({ email: email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not a valid user.');
    }
    const customerId = user._id;
    const reviewData = {
        customerId,
        reviewText,
        ratting,
    };
    const result = yield review_model_1.Review.create(reviewData);
    return result;
});
const getAllReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.Review.find().populate('customerId');
    return reviews;
});
exports.ReviewServices = {
    createAReviewIntoDB,
    getAllReviews,
};
