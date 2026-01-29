// routes.js
// const express = require('express');
// const router = express.Router();

// // Define a simple GET route
// router.get('/', (req, res) => {
//   res.status(200).json({ message: 'Welcome to the API' });
// });


// Define a POST route that uses the body-parser
// router.post('/data', (req, res) => {
//     console.log(req.body); // Contains the parsed JSON data
//     res.status(200).json({ received: req.body });
// });

// const express = require("express");
// const cors = require("cors");
// const router = require("./routes/routes.js"); // Подключаем ваш файл index.js

// const app = express();

// app.use(cors()); 
// app.use(express.json()); 

// // Привязываем импортированный роутер к префиксу /api
// app.use("/api", router);

// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`Сервер запущен: http://localhost:${PORT}`);
// });