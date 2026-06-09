const bcrypt = require("bcryptjs");
const User = require("../models/User");

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
    const existingUser = User.find(username);

    if (existingUser) {
      return res.status(400).json({ message: "пользователь уже существует" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = User.create(username, hashedPassword);

    console.log("Список всех юзеров:", User.getAll());

    return res.status(201).json({ 
      message: "пользователь успешно добавлен", 
      user: newUser,  
      username: User.username 
    });
  } catch (error) {
    return res.status(500).json({ message: "Внутренняя ошибка сервера", error: error.message });
  }
}