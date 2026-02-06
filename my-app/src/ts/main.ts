import { btnUser } from "./user/btn-user";
import { cardUser } from "./user/user-card";
import { volumeWork } from "./player/volume";
import { loadTracks} from "./tableList/loadTracks";
import { nameUser} from "./user/nameUserAdd";
import { exitBtn} from "./user/exitBtn";
import { filterTracks} from "./tableList/filterTracks";
import { initProgressBar} from "./player/initProgressBar";
import { validateSearch} from "../validate/validateSearch";
import { btnControls} from "../ts/player/btnControls";

import '../scss/main_style.scss';
import '../images/sprite.svg';
import 'simplebar/dist/simplebar.css';

window.addEventListener("DOMContentLoaded", () => {
  btnUser();
  cardUser();
  volumeWork();
  loadTracks();
  nameUser();
  exitBtn();
  filterTracks();
  initProgressBar();
  validateSearch();
  btnControls() 
});
