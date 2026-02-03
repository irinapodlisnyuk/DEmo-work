const STORAGE_KEY = 'favorite_tracks';

// 1. Теперь возвращаем массив строк (string[]), чтобы хранить "type-id"
export const getFavorites = (): string[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Ошибка парсинга избранного:", e);
    return [];
  }
};

// 2. Универсальная функция переключения (теперь работает с типом)
export const toggleLocalCache = (id: number, type: string): boolean => {
  const favs = getFavorites();
  const itemKey = `${type}-${id}`; // Создаем уникальную строку
  const isFav = favs.includes(itemKey);
  
  let newFavs;
  if (isFav) {
    newFavs = favs.filter(key => key !== itemKey);
  } else {
    newFavs = [...favs, itemKey];
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs));
  return !isFav; // Возвращаем новый статус (true - добавлен, false - удален)
};

// 3. Утилита для проверки (тоже использует составной ключ)
export const isTrackFavorite = (favs: string[], id: number, type: string) => {
  return favs.includes(`${type}-${id}`);
};