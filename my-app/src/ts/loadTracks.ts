import { Track, Podcast } from "./typesTracks";
import { podcasts, tracks } from "../../data/tracks";

export function loadTracks() {
  const podcastList = podcasts as Podcast[];
  const trackList = tracks as unknown as Track[];

  // Совмещаем списки в один массив
  const combinedData = [
    ...(podcasts as Podcast[]),
    ...(tracks as unknown as Track[]),
  ];

  // Пример вывода в HTML
  const container = document.getElementById("tracks-tbody");
  if (container) {
    container.innerHTML = `
    <h2>Podcasts</h2>
    <ul>${podcastList.map((p) => `<li>${p.title} (${p.host})</li>`).join("")}</ul>
    <h2>Tracks</h2>
    <ul>${trackList.map((t) => `<li>${t.title} - ${t.duration}</li>`).join("")}</ul>
  `;
  }
}
