import { loadTracks } from "./loadTracks";
import { toggleLocalCache } from "./favoritesTrack";
import { state } from "./state";
import { player } from "../player/player"; // Импортируем экземпляр плеера

export async function toggleFavorite(
  id: number,
  type: "track" | "podcast",
  isFavorite: boolean | undefined,
) {
  const token = localStorage.getItem("token");
  toggleLocalCache(id, type);

  const method = isFavorite ? "DELETE" : "POST";

  try {
    const response = await fetch("http://localhost:8000/api/favorites", {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ trackId: id, type: type }),
    });

    if (response.ok) {
      const trackInState = state.allTracks.find(
        (t) => t.id === id && t.type === type,
      );
      if (trackInState) {
        trackInState.isFavorite = !isFavorite;
      }

      // РАССЫЛАЕМ СОБЫТИЕ ОБ ОБНОВЛЕНИИ
      window.dispatchEvent(
        new CustomEvent("favoriteUpdate", {
          detail: { id, type, isFavorite: !isFavorite },
        }),
      );

      const isFavTab = (
        document.getElementById("radio-favorites") as HTMLInputElement
      )?.checked;
      if (isFavTab) loadTracks();

      return true;
    } else {
      toggleLocalCache(id, type);
      return false;
    }
  } catch (error) {
    toggleLocalCache(id, type);
    return false;
  }
}
