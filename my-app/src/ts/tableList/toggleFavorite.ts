import { loadTracks } from "./loadTracks";
import { toggleLocalCache } from "./favoritesTrack"; // импортируем переименованную
import { state} from "./state";

export async function toggleFavorite(
  id: number,
  type: "track" | "podcast",
  isFavorite: boolean | undefined,
) {
  const token = localStorage.getItem("token");

  // 1. Сразу обновляем localStorage (чтобы сердечко сохранилось при перезагрузке)
  toggleLocalCache(id, type);

  const method = isFavorite ? "DELETE" : "POST";

  try {
    const response = await fetch("http://localhost:8000/api/favorites", {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        trackId: id,
        type: type,
      }),
    });

    if (response.ok) {
      const trackInState = state.allTracks.find(
        (t) => t.id === id && t.type === type,
      );
      if (trackInState) {
        trackInState.isFavorite = !isFavorite;
      }

      const isFavTab = (
        document.getElementById("radio-favorites") as HTMLInputElement
      )?.checked;

      if (isFavTab) {
        loadTracks();
      }
      return true;
    } else {
      toggleLocalCache(id, type);
      alert("Ошибка сервера при обновлении избранного");
      return false;
    }
  } catch (error) {
    toggleLocalCache(id, type);
    console.error("Ошибка сети:", error);
    return false;
  }
}
