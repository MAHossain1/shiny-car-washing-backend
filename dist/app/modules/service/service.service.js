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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceServices = void 0;
const service_model_1 = require("./service.model");
const createServiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.create(payload);
    return result;
});
const getAServiceFromDB = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findById(serviceId);
    return result;
});
const getAllServicesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.find();
    return result;
});
const updateAServiceIntoDB = (serviceId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findByIdAndUpdate(serviceId, payload, {
        new: true,
    });
    return result;
});
const deleteAServiceFromDB = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findByIdAndDelete(serviceId);
    return result;
});
exports.ServiceServices = {
    createServiceIntoDB,
    getAServiceFromDB,
    getAllServicesFromDB,
    updateAServiceIntoDB,
    deleteAServiceFromDB,
};
