"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const slot_controller_1 = require("./slot.controller");
const router = express_1.default.Router();
//this route transfer to service route;
// router.post(
//   '/',
//   auth('admin'),
//   validateRequest(SlotValidationSchema.createSlotValidationSchema),
//   SlotControllers.createSlots
// );
router.get('/availability', slot_controller_1.SlotControllers.getAvailableSlots);
exports.SlotRoutes = router;
