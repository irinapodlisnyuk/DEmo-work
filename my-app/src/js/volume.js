"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.volumeWork = volumeWork;
function volumeWork() {
    // const slider = document.getElementById("volume") as HTMLInputElement;
    // slider.addEventListener("input", (e: Event) => {
    //   const target = e.target as HTMLInputElement;
    //   const value = target.value;
    //   // Обновляем градиент: часть до ползунка — зеленая, после — серая
    //   target.style.backgroundColor = `linear-gradient(to right, $color-burnt-orange ${value}%, $color-whisper ${value}%)`;
    // });
    // slider.dispatchEvent(new Event("input"));
    // Получаем элементы с явным указанием типов
    var input = document.getElementById('volume');
    var progressBar = document.getElementById('progressBar');
    // Функция обновления ширины бара
    var updateProgress = function () {
        var value = parseInt(input.value);
        // Валидация диапазона 0-100
        if (isNaN(value) || value < 0)
            value = 0;
        if (value > 100)
            value = 100;
        // Установка ширины
        progressBar.style.width = "".concat(value, "%");
    };
    input.addEventListener('input', updateProgress);
}
