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
exports.SlotServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("../service/service.model");
const slot_utils_1 = require("./slot.utils");
const slot_model_1 = require("./slot.model");
const slot_constant_1 = require("./slot.constant");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createSlotsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { service, date, startTime, endTime } = payload;
    // check if service exists or not
    const isServiceExists = yield service_model_1.Service.findById(service);
    if (!isServiceExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found.');
    }
    const startMinutes = (0, slot_utils_1.parseTimeToMinutes)(startTime);
    const endMinutes = (0, slot_utils_1.parseTimeToMinutes)(endTime);
    const slotDuration = 60;
    const numberOfSlots = (endMinutes - startMinutes) / slotDuration;
    const createdSlot = [];
    let currentStartTime = startMinutes;
    for (let i = 0; i < numberOfSlots; i++) {
        const slotStartTime = (0, slot_utils_1.formatMinutesToTime)(currentStartTime);
        const slotEndTime = (0, slot_utils_1.formatMinutesToTime)(currentStartTime + slotDuration);
        // Check if the slot already exists
        const existingSlot = yield slot_model_1.Slot.findOne({
            service,
            date,
            startTime: slotStartTime,
            endTime: slotEndTime,
        });
        if (existingSlot) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, 'Slot already exists.');
        }
        const slot = {
            service,
            date,
            startTime: slotStartTime,
            endTime: slotEndTime,
            isBooked: slot_constant_1.BookedOption.available,
        };
        createdSlot.push(slot);
        currentStartTime = currentStartTime + slotDuration;
    }
    const result = yield slot_model_1.Slot.create(createdSlot);
    return result;
});
const getAvailableSlotsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (query.serviceId) {
        query.service = query.serviceId;
        delete query.serviceId;
    }
    const slotQuery = new QueryBuilder_1.default(slot_model_1.Slot.find(), query)
        .search(slot_constant_1.slotSearchFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield slotQuery.modelQuery;
    return result;
});
exports.SlotServices = {
    createSlotsIntoDB,
    getAvailableSlotsFromDB,
};
