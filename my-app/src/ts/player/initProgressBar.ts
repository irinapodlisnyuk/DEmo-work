import { player } from "./player";

export function initProgressBar() {
  const progressContainer = document.getElementById("player-progress-container");

  progressContainer?.addEventListener("click", (e: MouseEvent) => {
    // 1. Получаем точные координаты и размеры контейнера на экране
    const rect = progressContainer.getBoundingClientRect();
    
    // 2. Вычисляем клик строго относительно левого края контейнера
    // e.clientX — это абсолютная координата клика в окне браузера
    const clickX = e.clientX - rect.left;
    
    // 3. Рассчитываем процент, ограничивая его от 0 до 1 (на всякий случай)
    const width = rect.width;
    const percent = Math.max(0, Math.min(1, clickX / width));

    // 4. Перематываем
    player.seekToPercent(percent);
    
    // 5. Сразу обновляем визуально (не дожидаясь интервала), чтобы не было "прыжка" назад
    const progressEl = document.getElementById("progress");
    if (progressEl) {
      progressEl.style.width = `${percent * 100}%`;
    }
  });
}