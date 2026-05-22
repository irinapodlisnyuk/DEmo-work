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

  // 4. Единый цикл обновлений 
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
  ) as HTMLElement;

  progressContainer?.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth; 
    const clickX = e.offsetX; 

    const percent = clickX / width;
   
    player.seekToPercent(percent);
  });

  document.addEventListener("keydown", (e) => {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

  switch (e.code) {
    case "ArrowRight":
      player.skip(10); 
      break;
    case "ArrowLeft":
      player.skip(-10); 
      break;
    case "Space":
      e.preventDefault(); 
      player.togglePlay();
     updateIcon();
     
      break;
  }
});
}
