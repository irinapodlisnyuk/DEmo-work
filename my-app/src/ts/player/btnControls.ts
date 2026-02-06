import { player } from "./player";
import { formatTime } from "../../utils/formatTime";

export function btnControls() {
  const playPauseBtn = document.getElementById("play-pauseBtn");
  const playIcon = document.querySelector(".footer__btn-play") as HTMLElement;
  const pauseIcon = document.querySelector(".footer__btn-pause") as HTMLElement;

  // 1. Единая функция обновления иконок
  const updateIcon = () => {
    const isPlaying = player.isPlaying();
    if (playIcon && pauseIcon) {
      playIcon.style.display = isPlaying ? "none" : "block";
      pauseIcon.style.display = isPlaying ? "block" : "none";
    }
  };

  // 2. Обработчик Play/Pause (исправленный ID и логика)
  playPauseBtn?.addEventListener("click", () => {
    player.togglePlay();
    updateIcon();
  });

  // 3. Навигация
  document.getElementById("prevBtn")?.addEventListener("click", () => {
    player.prev();
    updateIcon();
  });

  document.getElementById("nextBtn")?.addEventListener("click", () => {
    player.next();
    updateIcon();
  });

  // 4. Единый цикл обновлений (ускорен до 200мс для плавности полоски)
  setInterval(() => {
    const progress = player.getProgress();
    const timeEl = document.getElementById("timer");
    const durationEl = document.getElementById("duration");
    const barEl = document.getElementById("progress");

    // Текущее время
    if (timeEl) timeEl.innerText = formatTime(progress.current, true);

    // Общая длительность
    if (durationEl && progress.total > 0) {
      durationEl.innerText = formatTime(progress.total, true);
    }

    // Полоска прогресса (теперь плавная)
    if (barEl) barEl.style.width = `${progress.percent}%`;

    // Синхронизация иконок (на случай автопереключения трека)
    updateIcon();
  }, 200);

  // 5. Дополнительные кнопки (Skip/Shuffle/Loop)
  document
    .getElementById("skip-forwardBtn")
    ?.addEventListener("click", () => player.skip(10));
  document
    .getElementById("skip-backBtn")
    ?.addEventListener("click", () => player.skip(-10));

  const shuffleBtn = document.getElementById("shuffleBtn");
  shuffleBtn?.addEventListener("click", () => {
    const active = player.toggleShuffle();
    shuffleBtn.classList.toggle("active", active);
  });

  const loopBtn = document.getElementById("repeatBtn");
  loopBtn?.addEventListener("click", () => {
    const active = player.toggleLoop();
    loopBtn.classList.toggle("active", active);
  });

  const progressContainer = document.querySelector(
    ".footer__controlsProgress",
  ) as HTMLElement; // ID всего серого фона полоски

  progressContainer?.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth; // Общая ширина полоски
    const clickX = e.offsetX; // Где именно кликнули (в пикселях)
    // Вычисляем процент (от 0 до 1)
    const percent = clickX / width;
    // Вызываем метод перемотки в сервисе
    player.seekToPercent(percent);
  });

  document.addEventListener("keydown", (e) => {
  // Проверяем, не пишет ли пользователь в этот момент в поиске или чате
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

  switch (e.code) {
    case "ArrowRight":
      player.skip(10); // Вперед на 10 секунд
      break;
    case "ArrowLeft":
      player.skip(-10); // Назад на 10 секунд
      break;
    case "Space":
      e.preventDefault(); // Чтобы страница не прыгала вниз
      player.togglePlay();
      // Не забудьте вызвать updateIcon(), если она у вас в этой области видимости
     updateIcon();
     
      break;
  }
});
}
