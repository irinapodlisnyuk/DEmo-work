import { player } from "./player";

export function volumeWork() {
  const input = document.getElementById("volume") as HTMLInputElement;
  const progressBar = document.getElementById("progressBar") as HTMLDivElement;

  if (!input || !progressBar) return;

  const handleVolumeChange = () => {
    const value = parseInt(input.value) || 0;

    // 1. Визуальное обновление (синий/зеленый бар)
    progressBar.style.width = `${value}%`;

    // 2. Реальное изменение звука через наш плеер
    player.setVolume(value);
  };

  input.addEventListener("input", handleVolumeChange);
  
  // Установим начальное состояние при загрузке
  handleVolumeChange();
}