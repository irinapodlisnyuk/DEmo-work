import { loadTracks } from "./loadTracks";

// Выбор списка треков: все или избранные
export function filterTracks() {
  
  const tracksAll = document.getElementById("all-audio");
  const tracksFav = document.getElementById("radio-favorites");

  [tracksAll, tracksFav].forEach(radio => {
    radio?.addEventListener("change", () => {
      loadTracks(); 
    });
  });
}