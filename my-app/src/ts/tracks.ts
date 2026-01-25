import { Request, Response } from "express";
// Если файл .js, используйте import или приведите к типу
import dataImport from "../../data/tracks";
import { DataStorage, Track} from "./typesTracks";

export function tracks() {

  const data = dataImport as unknown as DataStorage;

  const getTracks = (req: Request, res: Response): void => {
    try {
      // 1. Извлекаем массив треков
      const allTracks: Track[] = data.tracks;

      // 2. Проверка наличия данных
      if (!allTracks || allTracks.length === 0) {
        res.status(404).json({ message: "Треки не найдены" });
        return; // Важно завершить выполнение
      }

      // 3. Отправка типизированного JSON-ответа
      res.status(200).json(allTracks);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({
        message: "Ошибка сервера при получении данных",
        error: errorMessage,
      });
    }
  };
}
