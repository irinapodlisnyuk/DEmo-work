import { player } from "./player";
import { formatTime } from "../../utils/formatTime";

export function startPlayer() {
  const timeEl = document.getElementById("timer");
  const durationEl = document.getElementById("duration");
  const progressEl = document.getElementById("progress");

  setInterval(() => {
    const progress = player.getProgress();

    // 1. Текущее время (передаем true, так как Howler дает секунды)
    if (timeEl) timeEl.innerText = formatTime(progress.current, true);

    // 2. Общая длительность файла (когда он загрузится)
    if (durationEl && progress.total > 0) {
      durationEl.innerText = formatTime(progress.total, true);
    }

    // 3. Ширина полоски прогресса
    if (progressEl) progressEl.style.width = `${progress.percent}%`;
  }, 100); // 100мс  Для плавной полоски 
}