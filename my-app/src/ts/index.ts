import { btnUser } from "./btn-user";
import { cardUser } from "./user-card";
import { audioPlayer } from "./player";
import { volumeWork } from "./volume";
import { tracks } from "./tracks";

window.addEventListener("DOMContentLoaded", () => {
  btnUser();
  cardUser();
  audioPlayer();
  volumeWork();
  tracks()
});
