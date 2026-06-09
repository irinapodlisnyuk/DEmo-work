const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secretKey = "your_secret_key";

export default async function handler(req, res) {
  // Настройка CORS заголовков
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Обработка предзапроса браузера (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Разрешаем только GET-запросы для получения профиля
  if (req.method !== 'GET') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Получаем токен из заголовков запроса (Authorization: Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Токен отсутствует или невалиден" });
    }

    const token = authHeader.split(" ")[1];

    // Проверяем токен
    const decoded = jwt.verify(token, secretKey);
    
    // Ищем пользователя в вашей базе данных/модели
    const user = User.find(decoded.username);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // Возвращаем данные пользователя на фронтенд (без пароля ради безопасности)
    return res.status(200).json({
      username: user.username,
      // Здесь можно добавить другие поля, например, избранные треки или плейлисты:
       favorites: user.favorites || []
    });

  } catch (error) {
    // Если токен просрочен или изменен
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Сессия устарела, войдите заново" });
    }
    return res.status(500).json({ message: "Внутренняя ошибка сервера", error: error.message });
  }
}