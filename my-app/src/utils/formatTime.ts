export const formatTime = (duration: number): string => {
  // Разделяем число на целую часть (минуты) и дробную (секунды)
  const parts = duration.toString().split('.');
  const min = parts[0];
  let sec = parts[1] || '00';

  // Если секунд меньше 10 (например, .5), добавляем ноль спереди (05)
  if (sec.length === 1) {
    sec = '0' + sec;
  }
  
  // Берем только первые две цифры секунд, если их больше
  sec = sec.substring(0, 2);

  return `${min}:${sec}`;
};
