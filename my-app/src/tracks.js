// Импортируем объект, содержащий и треки, и подкасты
const data = require('../data/tracks'); 

exports.getTracks = (req, res) => {
    try {
        // 1. Извлекаем только массив треков из объекта
        const allTracks = data.tracks;

        // 2. Форматируем и отправляем JSON-ответ
        if (!allTracks) {
            return res.status(404).json({ message: "Треки не найдены" });
        }

        res.status(200).json(allTracks);
    } catch (error) {
        res.status(500).json({ 
            message: "Ошибка сервера при получении данных",
            error: error.message 
        });
    }
};