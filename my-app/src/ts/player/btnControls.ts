import { player } from "./player";
import { formatTime } from "../../utils/formatTime";

export function btnControls() {
  document
    .getElementById("prevBtn")
    ?.addEventListener("click", () => player.togglePlay());
  document
    .getElementById("nextBtn")
    ?.addEventListener("click", () => player.next());
  document
    .getElementById("prev-btn")
    ?.addEventListener("click", () => player.prev());

  document
    .getElementById("skip-forward")
    ?.addEventListener("click", () => player.skip(15));
  document
    .getElementById("skip-back")
    ?.addEventListener("click", () => player.skip(-15));

  // Обновление таймера каждую секунду
  setInterval(() => {
    const progress = player.getProgress();
    const timeEl = document.getElementById("player-time");
    const barEl = document.getElementById("player-progress-bar");

    if (timeEl) timeEl.innerText = formatTime(progress.current);
    if (barEl) barEl.style.width = `${progress.percent}%`;
  }, 1000);

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
}
