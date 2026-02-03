import { player } from "./player";
import { formatTime } from "../../utils/formatTime";

function startPlayerUpdates() {
  const timeEl = document.getElementById("player-time");
  const durationEl = document.getElementById("player-duration");
  const barEl = document.getElementById("player-progress-bar"); // Тот, что синий/зеленый

  setInterval(() => {
    const progress = player.getProgress();

    // 1. Текущее время (передаем true, так как Howler дает секунды)
    if (timeEl) timeEl.innerText = formatTime(progress.current, true);

    // 2. Общая длительность файла (когда он загрузится)
    if (durationEl && progress.total > 0) {
      durationEl.innerText = formatTime(progress.total, true);
    }

    // 3. Ширина полоски прогресса
    if (barEl) barEl.style.width = `${progress.percent}%`;
  }, 1000); // 1000мс = 1 сек. Для плавной полоски можно поставить 100мс
}