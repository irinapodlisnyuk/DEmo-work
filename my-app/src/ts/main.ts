import { btnUser } from "./btn-user";
import { cardUser } from "./user-card";
import { audioPlayer } from "./player";
import { volumeWork } from "./volume";
import { getAllAudio } from "./getAllAudio";
import { loadTracks} from "./loadTracks";
import { nameUser} from "./nameUserAdd";
import { exitBtn} from "./exitBtn";

import '../scss/main_style.scss';
import '../images/sprite.svg';
import 'simplebar/dist/simplebar.css';

window.addEventListener("DOMContentLoaded", () => {
  btnUser();
  cardUser();
  audioPlayer();
  volumeWork();
  getAllAudio();
  loadTracks();
  nameUser();
  exitBtn();
});
