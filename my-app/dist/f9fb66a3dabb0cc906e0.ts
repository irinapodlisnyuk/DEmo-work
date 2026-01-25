import { btnUser } from "./btn-user";
import { cardUser } from "./user-card";
import { audioPlayer } from "./player";
import { volumeWork } from "./volume";
import { tracks } from "./tracks";
import { loadTracks } from "./loadTracks";
import '../scss/main_style.scss';
import '../images/sprite.svg';
window.addEventListener("DOMContentLoaded", function () {
    btnUser();
    cardUser();
    audioPlayer();
    volumeWork();
    tracks();
    loadTracks();
});
