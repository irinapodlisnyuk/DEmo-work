const express = require('express');
const router = express.Router();

// Если папка controllers лежит в том же корне, что и этот файл:
const authController = require("../controllers/authController");
const trackController = require("../controllers/trackController");
const authenticate = require("../middleware/authMiddleware");

router.post("/register", authController.register); 
router.post("/login", authController.login);       
router.get("/tracks", trackController.getTracks);
router.get("/podcasts", trackController.getPodcasts);  

router.post("/favorites", authenticate, trackController.addToFavorites);
router.delete("/favorites", authenticate, trackController.removeFromFavorites);
router.get("/favorites", authenticate, trackController.getFavorites);

module.exports = router;