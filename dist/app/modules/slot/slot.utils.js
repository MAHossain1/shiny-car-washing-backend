"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMinutesToTime = exports.parseTimeToMinutes = void 0;
const parseTimeToMinutes = (time) => {
    const [hour, minutes] = time.split(':').map(Number);
    const totalMinutes = hour * 60 + minutes;
    return totalMinutes;
};
exports.parseTimeToMinutes = parseTimeToMinutes;
const formatMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    const timeFormat = `${String(hours).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
    return timeFormat;
};
exports.formatMinutesToTime = formatMinutesToTime;
