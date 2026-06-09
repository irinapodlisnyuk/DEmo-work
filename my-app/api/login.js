const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secretKey = "your_secret_key";

export default async function handler(req, res) {
  // Настройка CORS заголовков
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Обработка предзапроса браузера (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Разрешаем только POST-запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { username, password } = req.body;
    const user = User.find(username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(400)
        .json({ message: "произошла ошибка при авторизации - неверные данные" });
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    return res.status(200).json({ message: "авторизация прошла успешно", token });
  } catch (error) {
    return res.status(500).json({ message: "Внутренняя ошибка сервера", error: error.message });
  }
}