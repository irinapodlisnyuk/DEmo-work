"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var btn_user_1 = require("./btn-user");
var user_card_1 = require("./user-card");
var player_1 = require("./player");
var volume_1 = require("./volume");
var tracks_1 = require("./tracks");
window.addEventListener("DOMContentLoaded", function () {
    (0, btn_user_1.btnUser)();
    (0, user_card_1.cardUser)();
    (0, player_1.audioPlayer)();
    (0, volume_1.volumeWork)();
    (0, tracks_1.tracks)();
});
