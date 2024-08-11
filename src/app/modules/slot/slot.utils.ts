export const parseTimeToMinutes = (time: string) => {
  const [hour, minutes] = time.split(':').map(Number);
  const totalMinutes = hour * 60 + minutes;
  return totalMinutes;
};

export const formatMinutesToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;
  const timeFormat = `${String(hours).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
  return timeFormat;
};
