import  {Track,  Podcast} from "./typesTracks";
import {AudioItem} from "./typesTracks"


export async function getAllAudio(): Promise<AudioItem[]> {
  const token = localStorage.getItem("token");
  const headers = { 
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  try {
    const [tracksRes, podcastsRes, favsRes] = await Promise.all([
      fetch("http://localhost:8000/api/tracks", { headers }),
      fetch("http://localhost:8000/api/podcasts", { headers }),
      fetch("http://localhost:8000/api/favorites", { headers })
    ]);

    if ([tracksRes, podcastsRes, favsRes].some(r => r.status === 401)) {
      localStorage.clear();
      window.location.href = "index.html";
      return [];
    }

    const tracks = tracksRes.ok ? await tracksRes.json() : [];
    const podcasts = podcastsRes.ok ? await podcastsRes.json() : [];
    const favorites = favsRes.ok ? await favsRes.json() : [];

    // Создаем Set из ID избранного для быстрой проверки (там теперь объекты с типом)
    const favoriteIds = new Set(favorites.map((f: any) => `${f.type}_${f.id}`));

    const allItems = [
      ...tracks.map((t: Track) => ({ ...t, type: 'track' as const })),
      ...podcasts.map((p: Podcast) => ({ ...p, type: 'podcast' as const }))
    ];

    // Добавляем каждому элементу флаг isFavorite
    return allItems.map(item => ({
      ...item,
      isFavorite: favoriteIds.has(`${item.type}_${item.id}`)
    })) as AudioItem[];

  } catch (error) {
    console.error("Ошибка при загрузке аудио-данных:", error);
    return [];
  }
}
 

