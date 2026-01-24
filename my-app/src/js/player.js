"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioPlayer = audioPlayer;
var howler_1 = require("howler");
function audioPlayer() {
    var _a, _b;
    var AudioPlayer = /** @class */ (function () {
        function AudioPlayer(src) {
            var _this = this;
            this.sound = new howler_1.Howl({
                src: [src],
                html5: true, // Рекомендуется для больших аудиофайлов
                onplay: function () { return _this.updateStatus('Воспроизведение...'); },
                onpause: function () { return _this.updateStatus('Пауза'); },
                onstop: function () { return _this.updateStatus('Остановлено'); },
                onend: function () { return _this.updateStatus('Завершено'); }
            });
        }
        AudioPlayer.prototype.play = function () {
            if (!this.sound.playing()) {
                this.sound.play();
            }
        };
        AudioPlayer.prototype.pause = function () {
            this.sound.pause();
        };
        AudioPlayer.prototype.updateStatus = function (text) {
            var statusEl = document.getElementById('status');
            if (statusEl)
                statusEl.innerText = text;
        };
        return AudioPlayer;
    }());
    // Инициализация
    var player = new AudioPlayer('https://www.soundhelix.com');
    (_a = document.getElementById('playBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return player.play(); });
    (_b = document.getElementById('pauseBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return player.pause(); });
    // this.sound.volume(0.5); — установка громкости (0.0 - 1.0).
    // this.sound.seek(30); — перемотка на 30-ю секунду.
    // this.sound.unload(); — полная выгрузка файла из памяти (полезно при смене треков).
}
// import { Howl } from 'howler';
// // Класс для управления плеером
// class AudioPlayer {
//     private sound: Howl;
//     private playButton: HTMLButtonElement;
//     private pauseButton: HTMLButtonElement;
//     private progressSlider: HTMLInputElement;
//     private durationDisplay: HTMLSpanElement;
//     constructor(audioUrl: string, playBtnId: string, pauseBtnId: string, sliderId: string, durationId: string) {
//         // Создаем экземпляр Howl
//         this.sound = new Howl({
//             src: [audioUrl], // Массив URL для разных форматов
//             html5: true, // Использовать HTML5 Audio для надежности
//             onplay: () => {
//                 console.log('Аудио играет!');
//                 this.updateProgress();
//             },
//             onpause: () => {
//                 console.log('Аудио поставлено на паузу.');
//             },
//             onend: () => {
//                 console.log('Аудио закончено.');
//                 this.resetPlayer();
//             },
//             onloaderror: (id, error) => {
//                 console.error(`Ошибка загрузки аудио: ${error}`);
//             }
//         });
//         // Инициализация UI элементов
//         this.playButton = document.getElementById(playBtnId) as HTMLButtonElement;
//         this.pauseButton = document.getElementById(pauseBtnId) as HTMLButtonElement;
//         this.progressSlider = document.getElementById(sliderId) as HTMLInputElement;
//         this.durationDisplay = document.getElementById(durationId) as HTMLSpanElement;
//         this.setupEventListeners();
//         this.updateDuration();
//     }
//     private setupEventListeners(): void {
//         this.playButton.addEventListener('click', () => this.play());
//         this.pauseButton.addEventListener('click', () => this.pause());
//         this.progressSlider.addEventListener('input', (e) => {
//             const seekTime = parseFloat((e.target as HTMLInputElement).value);
//             this.seek(seekTime);
//         });
//     }
//     play(): void {
//         this.sound.play();
//         this.updateUIState();
//     }
//     pause(): void {
//         this.sound.pause();
//         this.updateUIState();
//     }
//     seek(time: number): void {
//         this.sound.seek(time);
//     }
//     stop(): void {
//         this.sound.stop();
//         this.resetPlayer();
//     }
//     private updateDuration(): void {
//         const duration = this.sound.duration();
//         if (duration) {
//             this.progressSlider.max = duration.toString();
//             this.durationDisplay.textContent = this.formatTime(duration);
//         }
//     }
//     private updateProgress(): void {
//         // Обновляем ползунок и время, пока играет
//         const interval = setInterval(() => {
//             if (this.sound.playing()) {
//                 const currentTime = this.sound.seek();
//                 this.progressSlider.value = currentTime.toString();
//                 this.durationDisplay.textContent = `${this.formatTime(currentTime)} / ${this.formatTime(this.sound.duration())}`;
//             } else {
//                 clearInterval(interval);
//             }
//         }, 500); // Обновляем каждую 500ms
//     }
//     private updateUIState(): void {
//         // Логика для управления видимостью кнопок play/pause (
//     }
// }
