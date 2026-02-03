export const formatTime = (time: number, isSeconds: boolean = false): string => {
  if (isNaN(time) || time < 0) return "0:00";

  // Если это секунды (из плеера), переводим в минуты и секунды
  if (isSeconds) {
    const total = Math.floor(time);
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // Если это минуты из твоих данных (50.3), просто форматируем строку
  const parts = time.toString().split('.');
  const min = parts[0];
  let sec = parts[1] || '00';
  if (sec.length === 1) sec += '0'; // превращаем .3 в :30
  return `${min}:${sec.substring(0, 2)}`;
};
