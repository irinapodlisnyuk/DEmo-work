
import { getAllAudio } from "./getAllAudio"; // импортируйте вашу функцию
import { el, mount } from "redom";
import { Track, Podcast } from "./typesTracks";

export type AudioItem = ((Track & { type: 'track' }) | (Podcast & { type: 'podcast' })) & { isFavorite?: boolean };

export async function loadTracks() {
  const items = await getAllAudio(); // Получаем данные с сервера

  const elements = items.map((item: AudioItem) =>
    el("li.audio-item", [
      el("span.icon", item.type === "track" ? "🎵" : "🎙️"), // Разные иконки
      el("span.title", item.title),
      el("span.category", item.type === "track" ? "Песня" : "Подкаст"),
    ]),
  );
   const container = document.getElementById("tracks-tbody") as HTMLElement;
  const list = el("ul.track-list", elements);

 // Очищаем старые данные и монтируем новые
  container.innerHTML = "";
  mount(container, el("fragment", elements)); 

}
