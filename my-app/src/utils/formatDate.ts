export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Сегодня";
  if (diffInDays === 1) return "Вчера";
  if (diffInDays < 7) return `${diffInDays} дня назад`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} нед. назад`;
  
  return date.toLocaleDateString('ru-RU'); // Если очень старый — просто дата
}