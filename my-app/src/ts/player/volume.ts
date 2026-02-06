import { player } from "./player";

export function volumeWork() {
  const input = document.getElementById("volume") as HTMLInputElement;
  const progressBar = document.getElementById("progressBar") as HTMLDivElement;

  if (!input || !progressBar) return;

  const updateVolume = (value: number) => {
    // Ограничиваем диапазон от 0 до 100
    const clampedValue = Math.max(0, Math.min(100, value));
    
    input.value = clampedValue.toString();
    progressBar.style.width = `${clampedValue}%`;
    player.setVolume(clampedValue);
  };

  // Обработчик для ползунка (инпут)
  input.addEventListener("input", () => {
    updateVolume(parseInt(input.value) || 0);
  });

  // Обработчик для колесика мыши
  input.addEventListener("wheel", (event: WheelEvent) => {
    event.preventDefault(); // Запрещаем прокрутку страницы

    const step = 5;
    const currentValue = parseInt(input.value) || 0;
    
    // event.deltaY < 0 — крутим вверх, иначе вниз
    const newValue = event.deltaY < 0 ? currentValue + step : currentValue - step;

    updateVolume(newValue);
  }, { passive: false });

  // Инициализация
  updateVolume(parseInt(input.value) || 0);
}

