"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../config/middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../config/middlewares/validateRequest"));
const review_validation_1 = require("./review.validation");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('user'), (0, validateRequest_1.default)(review_validation_1.ReviewZodValidationSchema.createReviewValidation), review_controller_1.ReviewControllers.createAReview);
// router.get('/', auth('admin'), BookingControllers.getAllBookings);
exports.ReviewRoutes = router;
