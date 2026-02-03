import { player } from "./player";

export function initProgressBar() {
  const progressContainer = document.getElementById("player-progress-container");

  progressContainer?.addEventListener("click", (e: MouseEvent) => {
    // Получаем ширину всего контейнера
    const width = progressContainer.clientWidth;
    // Получаем позицию клика относительно начала контейнера
    const clickX = e.offsetX;
    
    // Рассчитываем процент (от 0 до 1)
    const percent = clickX / width;

    // Перематываем трек
    player.seekToPercent(percent);
  });
}