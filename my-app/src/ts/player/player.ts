import { Howl } from "howler";
import { AudioItem } from "../tableList/typesTracks";

class PlayerService {
  private sound: Howl | null = null;
  private currentIndex: number = -1;
  private playlist: AudioItem[] = [];

  public isLoop: boolean = false;
  public isShuffle: boolean = false;

  // Метод запуска трека
  // public playTrack(index: number, currentList: AudioItem[]) {
  //   this.playlist = currentList;
  //   this.currentIndex = index;
  //   const item = this.playlist[index];

  //   if (this.sound) this.sound.unload();

  //   // Собираем URL: http://localhost:8000/ + audio/podcast-1.mp3
  //   const fileUrl = `http://localhost:8000/${item.encoded_audio}`;

  //   this.sound = new Howl({
  //     src: [fileUrl],
  //     html5: true, // Важно для длинных подкастов
  //     autoplay: true,
  //     onplay: () => this.updateUI(),
  //     onend: () => this.next(),
  //   });
  // }

  public playTrack(index: number, currentList: AudioItem[]) {
    this.playlist = currentList;
    this.currentIndex = index;
    const item = this.playlist[index];

    if (this.sound) this.sound.unload();

    const isUrl =
      item.encoded_audio.includes(".mp3") ||
      item.encoded_audio.includes(".wav");
    const isBase64 = item.encoded_audio.startsWith("data:audio") || !isUrl;

    let trackSrc = isBase64
      ? item.encoded_audio.startsWith("data:audio")
        ? item.encoded_audio
        : `data:audio/mpeg;base64,${item.encoded_audio}`
      : `http://localhost:8000/${item.encoded_audio}`;

    this.sound = new Howl({
      src: [trackSrc],
      format: ["mp3"],
      html5: false, // МЕНЯЕМ НА FALSE: это решит проблему с тем, что пауза не нажимается
      autoplay: true,
      loop: this.isLoop, // Передаем текущее состояние повтора новому треку
      onplay: () => this.updateUI(),
      onend: () => {
        // Если повтор выключен — идем дальше, если включен — Howler сам переиграет (из-за loop: true)
        if (!this.isLoop) this.next();
      },
      onloaderror: (id, err) => console.error("Ошибка загрузки:", err),
    });
  }

  public setVolume(val: number) {
    // Переводим 0-100 в 0.0-1.0
    const volume = val / 100;

    if (this.sound) {
      this.sound.volume(volume);
    }

    // Сохраняем значение, чтобы новые треки запускались с той же громкостью
    Howler.volume(volume);
  }

  public isPlaying(): boolean {
    return this.sound ? this.sound.playing() : false;
  }

  public togglePlay() {
    if (!this.sound) return;
    this.sound.playing() ? this.sound.pause() : this.sound.play();
  }

  public next() {
    let nextIndex = this.currentIndex + 1;
    if (this.isShuffle) {
      nextIndex = Math.floor(Math.random() * this.playlist.length);
    } else if (nextIndex >= this.playlist.length) {
      nextIndex = 0;
    }
    this.playTrack(nextIndex, this.playlist);
  }

  public prev() {
    let prevIndex = this.currentIndex - 1;
    if (prevIndex < 0) prevIndex = this.playlist.length - 1;
    this.playTrack(prevIndex, this.playlist);
  }

  public toggleLoop() {
    this.isLoop = !this.isLoop;
    if (this.sound) this.sound.loop(this.isLoop);
    return this.isLoop;
  }

  public toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    return this.isShuffle;
  }

  public skip(seconds: number) {
    if (!this.sound) return;
    const currentPos = this.sound.seek() as number;
    this.sound.seek(currentPos + seconds);
  }

  public seekToPercent(percent: number) {
    if (!this.sound) return;
    const duration = this.sound.duration();
    this.sound.seek(duration * percent);
  }

  // Получение текущего прогресса для прогресс-бара
  public getProgress() {
    if (!this.sound) return { percent: 0, current: 0, total: 0 };
    const current = this.sound.seek() as number;
    const total = this.sound.duration();
    return {
      percent: (current / total) * 100,
      current: current,
      total: total,
    };
  }

  private updateUI() {
    const track = this.playlist[this.currentIndex];
    const titleEl = document.getElementById("player-title");
    const artistEl = document.getElementById("player-artist");

    // Ищем иконки
    const playIcon = document.querySelector(".footer__btn-play") as HTMLElement;
    const pauseIcon = document.querySelector(
      ".footer__btn-pause",
    ) as HTMLElement;

    if (titleEl) titleEl.innerText = track.title;

    if (artistEl) {
      const author = track.type === "track" ? track.artist : track.host;
      artistEl.innerText = author || "Unknown";
    }

    // ТАК КАК МЫ ЗАПУСТИЛИ ТРЕК (onplay):
    // Скрываем Play, показываем Pause
    if (playIcon) playIcon.style.display = "none";
    if (pauseIcon) pauseIcon.style.display = "block";
  }

}

export const player = new PlayerService();
